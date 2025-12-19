import React, { useState, useEffect } from 'react';
import { Agent, AppStatus, WorkflowData } from './types';
import { generateWorkflow } from './services/geminiService';
import ScenarioInput from './components/ScenarioInput';
import WorkflowDisplay from './components/WorkflowDisplay';
import Loader from './components/Loader';
import VoiceAssistant from './components/VoiceAssistant';
import HistorySidebar from './components/HistorySidebar';
import Hero from './components/Hero';
import ExamplesGrid from './components/ExamplesGrid';
import BackgroundAnimation from './components/BackgroundAnimation';

type ViewState = 'home' | 'workspace';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [workflowData, setWorkflowData] = useState<WorkflowData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // History State
  const [history, setHistory] = useState<WorkflowData[]>([]);

  // Lifted state for shared access
  const [scenario, setScenario] = useState('');
  const [agentCount, setAgentCount] = useState(3);

  // Initialize Theme
  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('awa_theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to dark for that "NotebookLM" feel initially
      setIsDarkMode(true);
    }
  }, []);

  // Apply Theme to HTML tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('awa_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('awa_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Load History from Local Storage on Mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('awa_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Helper to safely save history to local storage with quota management
  const persistHistory = (targetHistory: WorkflowData[]) => {
    // 1. Update State first so UI is responsive
    setHistory(targetHistory);

    // Helper to attempt saving
    const trySave = (data: WorkflowData[]) => {
        try {
            localStorage.setItem('awa_history', JSON.stringify(data));
            return true;
        } catch (e: any) {
             if (e.name === 'QuotaExceededError' || e.code === 22 || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                 return false;
             }
             console.error("LocalStorage error:", e);
             return false;
        }
    };

    // 2. Try to save full history
    if (trySave(targetHistory)) return;

    console.warn("Local Storage full. Attempting to clean up...");
    
    // Strategy 1: Iteratively remove the oldest item
    let cleanedHistory = [...targetHistory];
    
    while (cleanedHistory.length > 1) { 
      // Remove the oldest (last) item
      cleanedHistory.pop();
      
      if (trySave(cleanedHistory)) {
         console.log(`Recovered storage space. History truncated to ${cleanedHistory.length} items.`);
         return; 
      }
    }
    
    // Strategy 2: If we are down to 1 item and it still fails, it's likely too big (heavy images).
    // Try saving it without avatars or visuals.
    if (cleanedHistory.length === 1) {
        const singleItem = cleanedHistory[0];
        const lightItem: WorkflowData = {
            ...singleItem,
            visualUrl: undefined, // Strip large visual
            agents: singleItem.agents.map(a => ({ ...a, avatarUrl: undefined }))
        };
        
        if (trySave([lightItem])) {
            console.log("Storage critical. Saved newest item without heavy assets.");
            return;
        }
    }
    
    console.error("Storage completely full. Could not persist history.");
  };

  const saveToHistory = (data: WorkflowData) => {
    // Limit to 10 items to prevent storage bloat
    const newHistory = [data, ...history].slice(0, 10);
    persistHistory(newHistory);
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your workflow history? This will wipe all local data.")) {
      setHistory([]);
      localStorage.removeItem('awa_history');
      setIsHistoryOpen(false);
    }
  };

  const handleGenerate = async (finalScenario: string, finalCount: number) => {
    // Ensure we are in workspace view
    setCurrentView('workspace');
    setStatus(AppStatus.LOADING);
    setError(null);
    setWorkflowData(null);

    try {
      const data = await generateWorkflow(finalScenario, finalCount);
      
      const enrichedData: WorkflowData = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        scenario: finalScenario
      };

      setWorkflowData(enrichedData);
      saveToHistory(enrichedData);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleLoadFromHistory = (item: WorkflowData) => {
    setWorkflowData(item);
    setScenario(item.scenario || '');
    setAgentCount(item.agents.length);
    setStatus(AppStatus.SUCCESS);
    setCurrentView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVoiceUpdate = (newScenario: string) => {
    setScenario(newScenario);
    if (currentView === 'home') {
        setCurrentView('workspace');
    }
  };

  const handleStartFromHero = () => {
    setScenario('');
    setWorkflowData(null);
    setStatus(AppStatus.IDLE);
    setCurrentView('workspace');
  };

  const handleSampleSelect = (sampleScenario: string, sampleCount: number) => {
      setScenario(sampleScenario);
      setAgentCount(sampleCount);
      // We remain in workspace, input is filled, user can click generate
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
      setCurrentView('home');
      setWorkflowData(null);
      setStatus(AppStatus.IDLE);
      setScenario('');
  };

  return (
    <div className={`font-sans flex flex-col relative transition-colors duration-300 
      ${isDarkMode ? 'bg-nb-bg text-nb-text' : 'bg-gray-50 text-gray-900'}
      ${currentView === 'home' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'}`}
    >
      
      {/* --- GLOBAL BACKGROUND ANIMATION (Home Only) --- */}
      {currentView === 'home' && (
        <BackgroundAnimation isDarkMode={isDarkMode} />
      )}

      {/* Header - Fixed & Blurred */}
      <header className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center border-b transition-colors duration-300 ${
        currentView === 'home' 
          ? 'bg-transparent border-transparent' 
          : isDarkMode 
            ? 'bg-nb-bg/90 backdrop-blur-md border-nb-border' 
            : 'bg-white/80 backdrop-blur-md border-gray-200'
      }`}>
        <button onClick={goHome} className="flex items-center gap-4 hover:opacity-80 transition-opacity focus:outline-none group">
          
          {/* Custom Logo */}
          <div className="relative">
             {/* Backlit Glow */}
             <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
             
             {/* Dark/Light Squircle Container */}
             <div className={`relative w-12 h-12 md:w-14 md:h-14 border rounded-2xl flex items-center justify-center shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-[#18181b] border-white/10' : 'bg-white border-gray-200'}`}>
                {/* 3-Node Hub Icon */}
                <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none">
                    <defs>
                        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A78BFA" /> {/* Purple-400 */}
                            <stop offset="100%" stopColor="#F472B6" /> {/* Pink-400 */}
                        </linearGradient>
                    </defs>
                    
                    <path d="M12 12L12 7" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                    <path d="M12 12L16.5 16" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                    <path d="M12 12L7.5 16" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                    
                    <circle cx="12" cy="12" r="2.5" stroke="url(#icon-gradient)" strokeWidth="2" fill={isDarkMode ? "#18181b" : "#ffffff"} />
                    <circle cx="12" cy="6" r="2" fill="url(#icon-gradient)" />
                    <circle cx="17" cy="16.5" r="2" fill="url(#icon-gradient)" />
                    <circle cx="7" cy="16.5" r="2" fill="url(#icon-gradient)" />
                </svg>
             </div>
          </div>

          <h1 className={`text-2xl md:text-3xl font-medium tracking-tight hidden sm:block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Workflow<span className="text-gray-500 font-light">LM</span>
          </h1>
        </button>
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'hover:bg-nb-surface text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-black'}`}
            title="Toggle Theme"
          >
            {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {currentView === 'workspace' && (
            <button
                onClick={() => setIsHistoryOpen(true)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'hover:bg-nb-surface text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-black'}`}
                title="History / Chronology"
            >
                {/* Chronology / History Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
          )}

          <button 
            onClick={() => setIsVoiceMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-black'}`}
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
             </svg>
             <span className="hidden sm:inline">Voice Mode</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-4 w-full flex-1 flex flex-col ${currentView === 'home' ? 'justify-center items-center' : ''}`}>
        
        {currentView === 'home' ? (
            <Hero onStart={handleStartFromHero} isDarkMode={isDarkMode} />
        ) : (
            // WORKSPACE VIEW
            <div className="animate-fade-in w-full max-w-7xl mx-auto">
                <div className="mb-6">
                     <ScenarioInput 
                        scenario={scenario}
                        agentCount={agentCount}
                        setScenario={setScenario}
                        setAgentCount={setAgentCount}
                        onGenerate={() => handleGenerate(scenario, agentCount)}
                        status={status}
                        isDarkMode={isDarkMode}
                    />
                </div>

                {/* Show Examples Grid only when Idle (no generation active) */}
                {status === AppStatus.IDLE && !workflowData && (
                    <ExamplesGrid onSelect={handleSampleSelect} isDarkMode={isDarkMode} />
                )}

                {status === AppStatus.LOADING && (
                <div className="mt-16">
                    <Loader message="Analyzing scenario and architecting agents..." />
                </div>
                )}

                {status === AppStatus.ERROR && error && (
                <div className="mt-8 bg-red-900/20 border border-red-800 text-red-200 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p>{error}</p>
                </div>
                )}

                {status === AppStatus.SUCCESS && workflowData && (
                <div className="mt-8 md:mt-12">
                    <WorkflowDisplay 
                    data={workflowData} 
                    isDarkMode={isDarkMode}
                    onUpdateData={(newData) => {
                        setWorkflowData(newData);
                        if (newData.id) {
                            const updatedHistory = history.map(item => item.id === newData.id ? newData : item);
                            persistHistory(updatedHistory);
                        }
                    }}
                    />
                </div>
                )}
            </div>
        )}
      </main>
      
      {/* Footer - Minimalist */}
      <footer className={`relative z-10 w-full py-2 border-t mt-auto ${isDarkMode ? 'border-white/5 bg-nb-bg/80' : 'border-gray-200 bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
            <a 
                href="https://github.com/fracabu" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors text-xs font-medium ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black'}`}
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
            </a>
        </div>
      </footer>

      {/* Sidebars and Modals */}
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={handleLoadFromHistory}
        onClear={clearHistory}
        isDarkMode={isDarkMode}
      />

      {isVoiceMode && (
        <VoiceAssistant 
          onClose={() => setIsVoiceMode(false)} 
          onUpdateScenario={handleVoiceUpdate}
        />
      )}

    </div>
  );
};

export default App;