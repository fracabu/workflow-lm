import { GoogleGenAI, Type } from "@google/genai";
import { Agent, SimulationMessage, WorkflowData } from "../types";

const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateWorkflow = async (scenario: string, agentCount: number): Promise<WorkflowData> => {
  const ai = getAI();

  const systemInstruction = `
    You are an expert AI Agentic Workflow Architect. Your goal is to design robust, multi-agent AI systems based on high-level user scenarios.
    
    When given a scenario and a desired number of agents:
    1. Analyze the task and break it down into logical sub-components.
    2. Define exactly ${agentCount} specialized AI agents to handle these components. 
       - Give each agent a creative and professional name.
       - Provide a concise description of their role.
       - Write a detailed, high-quality system prompt for that agent.
    3. Create a "Master Execution Prompt" or "Orchestrator Prompt" that would be used to initialize the entire system or guide a primary controller agent.
    4. Generate a Mermaid.js diagram definition (graph TD) that visualizes the workflow logic.
       - Start with "graph TD".
       - Use simple alphanumeric node IDs (e.g., Agent1, Agent2) without spaces.
       - Put descriptive labels in square brackets: Agent1["Agent Name"].
       - Relationships: Agent1 -->|"Action or Output"| Agent2.
       - IMPORTANT: ALWAYS wrap the relationship label text in double quotes (e.g. -->|"Text with (parens)"|) to prevent syntax errors with special characters.
       - CRITICAL: Do NOT use colons (:) after node definitions or labels (e.g., "A[Name]: Text" is INVALID).
       - Ensure the graph syntax is strictly standard Mermaid.js.
    
    IMPORTANT: All generated content (Names, Descriptions, Prompts, Execution Plan) MUST be in ENGLISH, regardless of the input language.
    
    Output strictly in JSON format.
  `;

  const prompt = `
    Scenario: ${scenario}
    Number of Agents: ${agentCount}
    
    Please design this workflow.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          agents: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                prompt: { type: Type.STRING },
              },
              required: ["name", "description", "prompt"],
            },
          },
          executionPrompt: { type: Type.STRING },
          mermaidDefinition: { type: Type.STRING, description: "A valid Mermaid.js graph definition string (e.g., 'graph TD; A-->B;')" },
        },
        required: ["agents", "executionPrompt", "mermaidDefinition"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response received from Gemini.");
  }

  try {
    return JSON.parse(text) as WorkflowData;
  } catch (error) {
    console.error("Failed to parse JSON response:", text);
    throw new Error("Failed to parse the generated workflow.");
  }
};

export const generateImplementationGuide = async (scenario: string, agents: Agent[]): Promise<string> => {
  const ai = getAI();
  const agentList = agents.map(a => `- ${a.name}: ${a.description}`).join("\n");

  const prompt = `
    Scenario: ${scenario}
    Agents:
    ${agentList}

    Act as a Chief Technology Officer (CTO) and AI Solutions Architect.
    Write a professional "Executive Implementation Guide" for the proposed Multi-Agent System above.
    
    The guide should be formatted in clean text (Markdown style headers allowed) and include:
    1. **Executive Summary**: A high-level overview of the value this system brings.
    2. **Technical Architecture Strategy**: How these agents should be orchestrated (e.g., sequential, hierarchical, or swarm).
    3. **Implementation Roadmap**: 3 distinct phases (Prototype, Integration, Scaling).
    4. **Risk Management**: Potential pitfalls (hallucinations, loops) and how to mitigate them.
    5. **Business Impact**: Expected KPIs and ROI.

    Keep it concise, professional, and suitable for a PDF report presented to board members.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
        systemInstruction: "You are a C-level technical consultant writing a formal report."
    }
  });

  return response.text || "Report generation failed.";
};

export const generateWorkflowVisual = async (scenario: string, agents: Agent[]): Promise<string> => {
  const ai = getAI();
  
  const agentRoles = agents.map(a => a.name).join(", ");
  
  // Prompt optimized for "NotebookLM" Dark Aesthetic
  const prompt = `
    Create a stunning, futuristic technical infographic for an AI workflow: "${scenario}".
    
    Design Style: Dark Mode UI, "Glassmorphism", Tech Dashboard. 
    Background: Deep charcoal/black (#131314).
    Palette: Neon accents in Blue (#4285F4), Purple (#9B72CB), and Pink (#D96570) to match the Google Gemini brand aesthetic.
    
    Composition:
    - Bento Grid layout with rounded corners.
    - Glowing connection lines between nodes.
    - Abstract representations of the agents: ${agentRoles}.
    - Minimalist charts and data widgets (progress bars, waveforms).
    
    NO LEGIBLE TEXT: Use abstract lines and shapes to simulate text blocks. Focus purely on visual impact, structure, and lighting.
    Aspect Ratio: 16:9.
  `;

  try {
    // Attempt 1: Gemini 2.5 Flash Image (Most widely available)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    // Attempt 2: Imagen 3 (Fallback for higher quality if available)
    try {
      const imagenResponse = await ai.models.generateImages({
        model: 'imagen-3.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });

      const base64 = imagenResponse.generatedImages?.[0]?.image?.imageBytes;
      if (base64) {
        return `data:image/jpeg;base64,${base64}`;
      }
    } catch (imagenError) {
      console.warn("Imagen generation failed", imagenError);
    }
    
    throw new Error("No image generated.");
  } catch (e) {
    console.error("Visual generation failed", e);
    return "";
  }
};

export const generateAgentAvatar = async (agent: Agent): Promise<string> => {
  const ai = getAI();
  
  // Revised prompt for ultra-minimalist icons suitable for small avatars
  const prompt = `Design a flat, ultra-minimalist vector icon for an AI agent specialized in: ${agent.description}. 
  Style: Flat Design, App Icon style. 
  Visuals: Use a solid, vibrant color background. The subject should be a single, simple central symbol or a very stylized robot face using basic geometric shapes (circles, squares). 
  Constraints: High contrast, thick lines, no shading, no gradients, no fine details, no text. Optimized for visibility at very small sizes (32x32 pixels).`;

  try {
    // Attempt 1: Gemini 2.5 Flash Image (Preferred)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    // If we're here, the model probably returned text (refusal or misunderstanding)
    const textPart = response.candidates?.[0]?.content?.parts?.find(p => p.text);
    if (textPart) {
        console.warn(`Gemini Flash Image returned text instead of image for ${agent.name}:`, textPart.text);
    }
    
    throw new Error("No inlineData (image) returned from gemini-2.5-flash-image");

  } catch (e) {
    console.warn("Avatar generation with Flash Image failed, attempting fallback to Imagen...", e);
    
    try {
        // Attempt 2: Imagen Fallback
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
        });
        
        const base64 = response.generatedImages?.[0]?.image?.imageBytes;
        if (base64) {
             return `data:image/jpeg;base64,${base64}`;
        }
    } catch (fallbackError) {
        console.error("Fallback avatar generation also failed", fallbackError);
    }
    
    return "";
  }
};

export const generateSimulationDialogue = async (agents: Agent[], scenario: string): Promise<SimulationMessage[]> => {
  const ai = getAI();

  const agentsContext = agents.map(a => `${a.name} (${a.description})`).join("\n");

  const systemInstruction = `
    You are a scriptwriter for AI simulations. 
    1. Write a realistic conversation (about 6-10 turns) between the following AI agents as they collaborate to solve the scenario.
    2. The agents should sound professional, referring to their specific roles and capabilities defined in the context.
    3. The output must be valid JSON array of objects with 'speaker' (exact agent name) and 'content' (what they say).
    4. The language of the dialogue MUST be ENGLISH.
  `;

  const prompt = `
    Scenario: ${scenario}
    
    Agents:
    ${agentsContext}
    
    Generate the dialogue simulation.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            speaker: { type: Type.STRING },
            content: { type: Type.STRING },
          },
          required: ["speaker", "content"],
        }
      },
    },
  });

  const text = response.text;
  if (!text) return [];

  try {
    return JSON.parse(text) as SimulationMessage[];
  } catch (e) {
    console.error("Failed to parse simulation", e);
    return [];
  }
};