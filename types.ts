export interface Agent {
  name: string;
  description: string;
  prompt: string;
  avatarUrl?: string;
}

export interface SimulationMessage {
  speaker: string;
  content: string;
}

export interface WorkflowData {
  id?: string;
  timestamp?: number;
  scenario?: string;
  agents: Agent[];
  executionPrompt: string;
  simulationMessages?: SimulationMessage[];
  mermaidDefinition?: string;
  visualUrl?: string;
  implementationGuide?: string;
}

export interface ScenarioInputData {
  scenario: string;
  agentCount: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}