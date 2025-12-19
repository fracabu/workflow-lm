import React from 'react';
import { AppStatus } from '../types';

interface ScenarioInputProps {
  scenario: string;
  agentCount: number;
  setScenario: (val: string) => void;
  setAgentCount: (val: number) => void;
  onGenerate: () => void;
  status: AppStatus;
  isDarkMode?: boolean;
}

const ScenarioInput: React.FC<ScenarioInputProps> = ({ 
  scenario, 
  agentCount, 
  setScenario, 
  setAgentCount, 
  onGenerate, 
  status,
  isDarkMode = true
}) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenario.trim()) {
      onGenerate();
    }
  };

  const predefinedScenarios = [
    "Launch a marketing campaign",
    "Python web scraper",
    "Write a mystery novel",
  ];

  return (
    // Added mt-8 md:mt-12 to fix header overlap and ensure spacing
    <div className="w-full max-w-4xl mx-auto mt-8 md:mt-12 px-2 md:px-0">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[32px] opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
        
        <div className={`relative rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-2xl border flex flex-col gap-6 transition-colors duration-300 ${isDarkMode ? 'bg-nb-surface border-nb-border' : 'bg-white border-gray-200'}`}>
          
          <textarea
            className={`w-full bg-transparent border-none focus:ring-0 text-lg md:text-xl font-normal resize-none min-h-[100px] md:min-h-[140px] leading-relaxed scrollbar-hide placeholder-gray-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            placeholder="Describe your goal (e.g., 'Create a team to build a SaaS MVP')..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            disabled={status === AppStatus.LOADING}
            required
            autoFocus
          />

          {/* Footer Controls - Improved Responsive Layout */}
          <div className={`flex flex-col md:flex-row justify-between items-center border-t pt-5 mt-2 gap-6 w-full ${isDarkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
             
             {/* Left Section (Agents + Chips) */}
             <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto justify-center md:justify-start">
                
                {/* Agent Slider */}
                <div className="flex flex-col w-full sm:w-auto items-center sm:items-start">
                  <label htmlFor="agentCount" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Team Size
                  </label>
                  <div className={`flex items-center gap-4 px-4 py-2 rounded-full border transition-colors ${isDarkMode ? 'bg-[#131314] border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={agentCount}
                        onChange={(e) => setAgentCount(parseInt(e.target.value))}
                        className={`w-32 md:w-28 h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                        disabled={status === AppStatus.LOADING}
                    />
                    <span className={`font-mono text-sm w-5 text-center ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{agentCount}</span>
                  </div>
                </div>

                <div className={`hidden md:block h-8 w-[1px] mx-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

                {/* Predefined Scenarios List */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 justify-center md:justify-start hide-scrollbar mask-image-fade">
                   {predefinedScenarios.map((text, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setScenario(text)}
                        className={`whitespace-nowrap flex-shrink-0 text-xs px-3 py-1.5 rounded-lg transition-colors border ${isDarkMode ? 'bg-[#2D2D2D] hover:bg-[#3D3D3D] text-gray-400 hover:text-white border-transparent hover:border-gray-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black border-gray-200'}`}
                    >
                        {text}
                    </button>
                    ))}
                </div>
             </div>

             {/* Submit Button */}
             <button
                type="submit"
                disabled={!scenario.trim() || status === AppStatus.LOADING}
                className={`w-full md:w-auto md:aspect-square h-12 md:h-14 px-8 md:px-0 rounded-full flex items-center justify-center transition-all flex-shrink-0 shadow-lg
                    ${!scenario.trim() || status === AppStatus.LOADING 
                    ? (isDarkMode ? 'bg-gray-800 text-gray-600 border border-gray-700' : 'bg-gray-200 text-gray-400 border border-gray-200') + ' cursor-not-allowed'
                    : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white hover:scale-105 hover:shadow-blue-500/20'}`}
             >
                {status === AppStatus.LOADING ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white/50 border-t-white rounded-full"></div>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="md:hidden font-medium">Design Workflow</span>
                        <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                        </svg>
                    </div>
                )}
             </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScenarioInput;