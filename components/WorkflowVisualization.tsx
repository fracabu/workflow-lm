import React from 'react';
import { Agent } from '../types';

interface WorkflowVisualizationProps {
  agents: Agent[];
  isDarkMode?: boolean;
}

const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({ agents, isDarkMode = true }) => {
  // SVG Canvas Dimensions
  const width = 900;
  const height = 400;
  
  // Layout Logic
  const orchestratorPos = { x: width / 2, y: 250 };
  const outputPos = { x: width / 2, y: 350 };
  const agentsY = 80;
  
  // Distribute agents horizontally across the top
  const agentPositions = agents.map((agent, index) => {
    const totalWidth = width - 100; // Padding
    const segment = totalWidth / (agents.length + 1);
    const x = 50 + segment * (index + 1);
    return { x, y: agentsY, ...agent };
  });

  // Colors for cycling
  const colors = ['#4285F4', '#9B72CB', '#D96570', '#34A853', '#FBBC04'];

  // Theme Constants
  const theme = {
    bg: isDarkMode ? '#131314' : '#F9FAFB', // Dark vs Gray-50
    nodeFill: isDarkMode ? '#1E1F20' : '#FFFFFF',
    nodeStroke: isDarkMode ? '#333333' : '#E5E7EB',
    textPrimary: isDarkMode ? '#E3E3E3' : '#111827',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    lineBase: isDarkMode ? '#444746' : '#D1D5DB',
    grid: isDarkMode ? '#333333' : '#E5E7EB',
    glow: isDarkMode ? 'bg-blue-900/10' : 'bg-blue-100/50'
  };

  return (
    <div className={`rounded-[32px] shadow-sm border overflow-hidden mb-8 group transition-colors duration-300 ${isDarkMode ? 'bg-nb-surface border-nb-border' : 'bg-white border-gray-200'}`}>
      
      {/* Header Bar */}
      <div className={`px-8 py-5 border-b flex justify-between items-center transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1A1A] border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className={`font-medium text-lg flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
           <span className="p-2 bg-blue-900/30 text-blue-400 rounded-lg">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
             </svg>
           </span>
          Live Architecture Map
        </h3>
        <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-gray-500">ACTIVE</span>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="relative w-full overflow-hidden flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: theme.bg }}>
        {/* Ambient Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-[100px] rounded-full ${theme.glow}`}></div>

        <svg 
            className="w-full h-auto max-h-[500px] select-none p-4" 
            viewBox={`0 0 ${width} ${height}`} 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.lineBase} stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#A8C7FA" stopOpacity="0.5" />
                    <stop offset="100%" stopColor={theme.lineBase} stopOpacity="0.2" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#5F6368" />
                </marker>
            </defs>

            {/* Background Grid */}
            <path d={`M0 100 H${width} M0 200 H${width} M0 300 H${width}`} stroke={theme.grid} strokeWidth="1" opacity="0.3" strokeDasharray="5 5" />

            {/* Connections: Agents -> Orchestrator */}
            {agentPositions.map((agent, idx) => (
                <g key={`conn-${idx}`}>
                     <path 
                        d={`M${agent.x} ${agent.y + 40} C${agent.x} ${agent.y + 100}, ${orchestratorPos.x} ${orchestratorPos.y - 100}, ${orchestratorPos.x} ${orchestratorPos.y - 40}`} 
                        stroke="url(#lineGradient)" 
                        strokeWidth="1.5" 
                        fill="none"
                        strokeDasharray="4 4"
                    />
                    {/* Data Packets Agent -> Orchestrator */}
                    <circle r="3" fill={colors[idx % colors.length]}>
                        <animateMotion 
                            dur={`${2 + idx * 0.5}s`} 
                            repeatCount="indefinite"
                            path={`M${agent.x} ${agent.y + 40} C${agent.x} ${agent.y + 100}, ${orchestratorPos.x} ${orchestratorPos.y - 100}, ${orchestratorPos.x} ${orchestratorPos.y - 40}`}
                        />
                    </circle>
                </g>
            ))}

            {/* Connection: Orchestrator -> Output */}
            <line 
                x1={orchestratorPos.x} y1={orchestratorPos.y + 40} 
                x2={outputPos.x} y2={outputPos.y - 30} 
                stroke="#5F6368" 
                strokeWidth="2" 
                markerEnd="url(#arrowhead)"
            />
            <circle r="3" fill="#E3E3E3">
                 <animateMotion 
                    dur="1.5s" 
                    repeatCount="indefinite"
                    path={`M${orchestratorPos.x} ${orchestratorPos.y + 40} L${outputPos.x} ${outputPos.y - 30}`}
                />
            </circle>

            {/* Orchestrator Node */}
            <g transform={`translate(${orchestratorPos.x - 100}, ${orchestratorPos.y - 40})`}>
                <rect width="200" height="80" rx="16" fill={theme.nodeFill} stroke="#A8C7FA" strokeWidth="2" className="drop-shadow-lg filter shadow-blue-500/20" />
                <rect x="10" y="10" width="180" height="60" rx="12" fill={theme.nodeFill} stroke={theme.nodeStroke} strokeWidth="1" />
                {/* Simulated Text Lines */}
                <rect x="70" y="30" width="60" height="6" rx="3" fill={isDarkMode ? "#E3E3E3" : "#9CA3AF"} />
                <rect x="50" y="45" width="100" height="4" rx="2" fill={isDarkMode ? "#5F6368" : "#D1D5DB"} />
                
                <circle cx="40" cy="40" r="15" fill={theme.bg} stroke="#4285F4" strokeWidth="2" />
                <path d="M40 32 V48 M32 40 H48" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
                
                <text x="100" y="70" textAnchor="middle" fill="#A8C7FA" fontSize="10" fontFamily="sans-serif" letterSpacing="1" opacity="0.8" fontWeight="bold">ORCHESTRATOR</text>
            </g>

            {/* Agent Nodes */}
            {agentPositions.map((agent, idx) => (
                <g key={`node-${idx}`} transform={`translate(${agent.x - 60}, ${agent.y - 30})`}>
                    <rect width="120" height="60" rx="12" fill={theme.nodeFill} stroke={colors[idx % colors.length]} strokeWidth="1.5" />
                    <circle cx="30" cy="30" r="10" fill={colors[idx % colors.length]} opacity="0.2" />
                    <text x="30" y="34" textAnchor="middle" fill={colors[idx % colors.length]} fontSize="12" fontWeight="bold">{agent.name.charAt(0)}</text>
                    
                    <text x="50" y="25" fill={theme.textPrimary} fontSize="10" fontWeight="bold" width="60" style={{ whiteSpace: 'pre' }}>
                        {agent.name.length > 10 ? agent.name.substring(0, 8) + '..' : agent.name}
                    </text>
                    <text x="50" y="40" fill={theme.textSecondary} fontSize="8">Agent 0{idx + 1}</text>
                </g>
            ))}

            {/* Output Node */}
            <g transform={`translate(${outputPos.x - 75}, ${outputPos.y - 30})`}>
                <rect width="150" height="50" rx="25" fill={isDarkMode ? "#333" : "#F3F4F6"} stroke="#5F6368" strokeWidth="1" strokeDasharray="2 2" />
                <text x="75" y="30" textAnchor="middle" fill={theme.textPrimary} fontSize="12" fontFamily="sans-serif" letterSpacing="1">FINAL OUTPUT</text>
            </g>

        </svg>
      </div>
    </div>
  );
};

export default WorkflowVisualization;