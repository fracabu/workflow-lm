import React, { useState } from 'react';

interface ExecutionPromptProps {
  prompt: string;
  onUpdate: (newPrompt: string) => void;
}

const ExecutionPrompt: React.FC<ExecutionPromptProps> = ({ prompt, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
  };

  const handleSave = () => {
    onUpdate(editedPrompt);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-nb-surface rounded-[32px] border border-gray-200 dark:border-nb-border overflow-hidden mt-8 transition-colors duration-300">
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A1A] flex justify-between items-center transition-colors">
        <h2 className="text-gray-900 dark:text-white font-medium text-xl flex items-center gap-3">
          <span className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </span>
          Orchestrator Prompt
        </h2>
        
        <div className="flex gap-2">
           <button 
             onClick={handleCopy}
             className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
           >
             Copy
           </button>
           <button 
             onClick={isEditing ? handleSave : () => setIsEditing(true)}
             className="px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
           >
             {isEditing ? 'Save' : 'Edit'}
           </button>
        </div>
      </div>
      
      <div className="p-8 bg-white dark:bg-[#131314] transition-colors">
        {isEditing ? (
          <textarea
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            className="w-full h-80 p-4 font-mono text-sm bg-gray-50 dark:bg-[#1E1F20] text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-1 focus:ring-blue-500 dark:focus:ring-white outline-none"
          />
        ) : (
          <div className="w-full h-80 p-4 font-mono text-sm bg-gray-50 dark:bg-[#1E1F20] text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl overflow-y-auto whitespace-pre-wrap">
            {prompt}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionPrompt;