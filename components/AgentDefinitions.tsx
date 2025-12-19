import React from 'react';
import { Agent } from '../types';
import AgentCard from './AgentCard';

interface AgentDefinitionsProps {
  agents: Agent[];
  onUpdateAgent: (index: number, updatedAgent: Agent) => void;
}

const AgentDefinitions: React.FC<AgentDefinitionsProps> = ({ agents, onUpdateAgent }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-medium text-white">Agents</h2>
        <span className="bg-[#2D2D2D] text-gray-300 text-xs font-mono px-3 py-1 rounded-full">
          {agents.length} DEFINED
        </span>
      </div>
      {/* Changed from Grid to Flex Column for full-width cards */}
      <div className="flex flex-col gap-8">
        {agents.map((agent, index) => (
          <AgentCard 
            key={index} 
            agent={agent} 
            index={index} 
            onUpdate={onUpdateAgent}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentDefinitions;