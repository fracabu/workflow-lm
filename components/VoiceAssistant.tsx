import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob, Type, FunctionDeclaration } from '@google/genai';
import { CATEGORY_TEMPLATES } from '../data/templates';

// --- Audio Helper Functions ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

interface VoiceAssistantProps {
  onClose: () => void;
  onUpdateScenario: (scenario: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose, onUpdateScenario }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTalking, setIsTalking] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  
  // Refs to manage persistent objects across renders
  const audioContextsRef = useRef<{ input?: AudioContext; output?: AudioContext }>({});
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanup = useCallback(() => {
    if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => {
            try {
                session.close();
            } catch (e) {
                console.warn("Error closing session", e);
            }
        });
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextsRef.current.input) {
      audioContextsRef.current.input.close();
    }
    if (audioContextsRef.current.output) {
      audioContextsRef.current.output.close();
    }
    
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    
    setIsConnected(false);
  }, []);

  const initializeLiveSession = async () => {
    try {
      if (!process.env.API_KEY) throw new Error("API Key missing");
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Setup Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Ensure contexts are running (sometimes they start suspended)
      if (inputCtx.state === 'suspended') await inputCtx.resume();
      if (outputCtx.state === 'suspended') await outputCtx.resume();

      audioContextsRef.current = { input: inputCtx, output: outputCtx };
      
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      // Get Microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Define Tool
      const updateScenarioTool: FunctionDeclaration = {
        name: "updateScenario",
        description: "Update the user's workflow scenario description in the main application form. Call this when the user has described their goal, when the user asks to write it down, or when you have gathered enough information to define the task.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            scenarioDescription: {
              type: Type.STRING,
              description: "The full, detailed description of the scenario to be written into the application form."
            }
          },
          required: ["scenarioDescription"]
        }
      };

      // Generate context from templates
      const templateContext = Object.entries(CATEGORY_TEMPLATES)
        .map(([category, items]) => {
          const itemList = items.map(i => `- "${i.title}": ${i.desc}`).join('\n');
          return `Category: ${category}\n${itemList}`;
        })
        .join('\n\n');

      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          // System instruction: strictly English, with injected template knowledge
          systemInstruction: `You are an expert Agentic Workflow Architect. 
          1. Language: You must speak strictly in English.
          2. Role: Be highly interactive and advisory. Do not just listen. Propose ideas, suggest agent roles, and give advice on how to structure the AI system.
          3. Knowledge Base: You are aware of the following predefined workflow templates available in the application. If a user's request is vague, check if it matches one of these and suggest it to them:
          
          ${templateContext}
          
          4. Action: When the conversation has established a clear scenario, or if the user asks you to "write it down" or "fill the form", you MUST use the 'updateScenario' tool to populate the application text area with the detailed scenario description.`,
          tools: [{ functionDeclarations: [updateScenarioTool] }],
          inputAudioTranscription: {}, // Enable transcription so user sees their input
        },
      };

      const sessionPromise = ai.live.connect({
        ...config,
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            
            // Start streaming input
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             // Handle Function Calls (Tool Usage)
             if (message.toolCall) {
                for (const fc of message.toolCall.functionCalls) {
                  if (fc.name === 'updateScenario') {
                    const desc = (fc.args as any).scenarioDescription;
                    onUpdateScenario(desc);
                    
                    // Send response back to model
                    sessionPromise.then(session => {
                      session.sendToolResponse({
                        functionResponses: {
                          id: fc.id,
                          name: fc.name,
                          response: { result: "Scenario updated successfully." }
                        }
                      });
                    });
                  }
                }
             }

             // Handle Input Transcription (for UI feedback)
             if (message.serverContent?.inputTranscription) {
               setTranscript(message.serverContent.inputTranscription.text);
             }

             // Handle Audio Output
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio) {
                setIsTalking(true);
                const ctx = audioContextsRef.current.output!;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBuffer = await decodeAudioData(
                  decode(base64Audio),
                  ctx,
                  24000,
                  1
                );
                
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNode);
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) {
                      setIsTalking(false);
                  }
                });
                
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
             }

             // Handle interruptions
             if (message.serverContent?.interrupted) {
               sourcesRef.current.forEach(s => s.stop());
               sourcesRef.current.clear();
               nextStartTimeRef.current = 0;
               setIsTalking(false);
             }
          },
          onclose: () => {
            setIsConnected(false);
          },
          onerror: (e) => {
            console.error("Live API Error", e);
            setError("Connection error. Please try again.");
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start audio session");
    }
  };

  useEffect(() => {
    initializeLiveSession();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#1E1F20] rounded-[32px] p-8 border border-[#444746] shadow-2xl overflow-hidden flex flex-col items-center">
        
        {/* Ambient Glow behind content - Matches app gradient */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-64 h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-[80px] opacity-20 transition-opacity duration-1000 ${isTalking ? 'opacity-40 animate-pulse' : ''}`}></div>

        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Visualizer Circle */}
          <div className="mb-8 mt-4 relative">
             {/* Outer Ring */}
             <div className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 border border-[#444746] bg-[#131314]">
                {/* Active Inner Circle */}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 
                    ${isTalking 
                        ? 'scale-110 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.6)]' 
                        : 'bg-[#2D2D2D]'
                    }
                    ${!isConnected && 'animate-pulse bg-gray-700'}
                `}>
                    <svg className={`w-10 h-10 transition-colors ${isTalking ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </div>
             </div>
             
             {/* Connecting Status */}
             {!isConnected && (
                 <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] px-3 py-1 rounded-full border border-gray-700 whitespace-nowrap">
                    Connecting...
                 </div>
             )}
          </div>
          
          <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">
            {isConnected ? "Listening..." : "Initializing"}
          </h3>
          
          {/* Transcript Area */}
          <div className="w-full min-h-[100px] flex flex-col items-center justify-center mb-8">
             {transcript ? (
                <div className="w-full bg-[#131314] p-4 rounded-2xl border border-[#333] text-center animate-fade-in-up">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">You said</p>
                  <p className="text-gray-200 text-sm leading-relaxed">"{transcript}"</p>
                </div>
             ) : (
                <p className="text-gray-500 text-center font-light text-lg">
                   Describe your workflow idea...
                </p>
             )}
          </div>

          {error && (
            <div className="mb-6 bg-red-900/20 text-red-300 px-4 py-2 rounded-xl text-sm w-full text-center border border-red-900/50">
              {error}
            </div>
          )}

          {/* Done Button - Primary White Pill Style */}
          <button 
            onClick={onClose}
            className="group relative inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full text-sm font-bold transition-all transform hover:scale-105 hover:bg-gray-100 shadow-lg"
          >
            <span>Done</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;