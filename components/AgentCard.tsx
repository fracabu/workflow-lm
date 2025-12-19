import React from 'react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  index: number;
  onUpdate: (index: number, updatedAgent: Agent) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, index, onUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedAgent, setEditedAgent] = React.useState(agent);

  const handleCopy = () => {
    navigator.clipboard.writeText(agent.prompt);
  };

  const handleSave = () => {
    onUpdate(index, editedAgent);
    setIsEditing(false);
  };

  const handleChange = (field: keyof Agent, value: string) => {
    setEditedAgent({ ...editedAgent, [field]: value });
  };

  // Re-styled to match ExecutionPrompt (Wide, Header + Content)
  return (
    <div className="bg-white dark:bg-nb-surface rounded-[24px] border border-gray-200 dark:border-nb-border overflow-hidden w-full group transition-all duration-300 hover:border-blue-300 dark:hover:border-gray-500 shadow-sm">
      
      {/* Header Bar: Identity & Actions */}
      <div className="bg-gray-50 dark:bg-[#1A1A1A] px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
           {/* Avatar */}
           <div className="h-12 w-12 rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex-shrink-0 shadow-inner">
            {agent.avatarUrl ? (
              <img 
                src={agent.avatarUrl} 
                alt={agent.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white font-bold text-lg">
                {agent.name.charAt(0)}
              </div>
            )}
           </div>

           {/* Name & Role Inputs/Text */}
           <div className="flex-1 min-w-0">
              {isEditing ? (
                 <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editedAgent.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="bg-white dark:bg-[#2D2D2D] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded text-sm font-bold w-full sm:w-64 focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Agent Name"
                    />
                    <input
                      type="text"
                      value={editedAgent.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      className="bg-white dark:bg-[#2D2D2D] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-xs w-full sm:w-96 focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Short Description"
                    />
                 </div>
              ) : (
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors flex items-center gap-2">
                        {agent.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{agent.description}</p>
                 </div>
              )}
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
            <button 
                onClick={handleCopy}
                className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2D2D2D] text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                title="Copy Prompt"
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                Copy
            </button>
            
            {isEditing ? (
                <button 
                    onClick={handleSave}
                    className="px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                >
                    Save
                </button>
            ) : (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white text-gray-900 dark:text-black text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-200 transition-colors"
                >
                    Edit
                </button>
            )}
        </div>
      </div>

      {/* Body: Prompt Editor */}
      <div className="bg-white dark:bg-[#131314] p-0 relative transition-colors">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-50"></div>
        
        {isEditing ? (
            <textarea
              value={editedAgent.prompt}
              onChange={(e) => handleChange('prompt', e.target.value)}
              className="w-full min-h-[250px] bg-white dark:bg-[#131314] text-gray-800 dark:text-gray-300 font-mono text-sm p-6 focus:ring-0 border-none outline-none resize-y leading-relaxed"
              spellCheck={false}
            />
        ) : (
            <div className="w-full min-h-[120px] max-h-[500px] overflow-y-auto p-6 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-white">
                {agent.prompt}
            </div>
        )}
      </div>
    </div>
  );
};

export default AgentCard;