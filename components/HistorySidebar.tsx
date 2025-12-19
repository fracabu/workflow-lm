import React from 'react';
import { WorkflowData } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: WorkflowData[];
  onSelect: (item: WorkflowData) => void;
  onClear: () => void;
  isDarkMode?: boolean;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose, history, onSelect, onClear, isDarkMode = true }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 border-r z-[60] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isDarkMode ? 'bg-nb-surface border-nb-border' : 'bg-white border-gray-200'}`}>
        <div className={`p-6 border-b flex justify-between items-center ${isDarkMode ? 'bg-[#131314] border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <h2 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Workflows</h2>
          <button 
            onClick={onClose}
            className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${isDarkMode ? 'bg-[#131314]' : 'bg-white'}`}>
          {history.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-sm">No workflows saved.</p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all group ${isDarkMode ? 'border-gray-800 bg-[#1E1F20] hover:bg-[#2D2D2D] hover:border-gray-600' : 'border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200'}`}
              >
                <div className={`font-medium text-sm line-clamp-2 mb-2 group-hover:text-blue-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.scenario || "Untitled Workflow"}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{new Date(item.timestamp || 0).toLocaleDateString()}</span>
                  <span className={`px-2 py-0.5 rounded text-gray-500 ${isDarkMode ? 'bg-black/40' : 'bg-white border border-gray-200'}`}>{item.agents.length} Agents</span>
                </div>
              </button>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className={`p-4 border-t ${isDarkMode ? 'bg-[#131314] border-gray-800' : 'bg-white border-gray-200'}`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClear();
              }}
              className="w-full py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-full transition-colors font-medium"
            >
              Clear all history
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HistorySidebar;