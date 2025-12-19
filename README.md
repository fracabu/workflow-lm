# WorkflowLM (Agentic Workflow Architect)

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-19-blue) ![Gemini API](https://img.shields.io/badge/Google-Gemini%203%20Pro-8E44AD)

**WorkflowLM** is an enterprise-grade AI Architect designed to conceptualize, design, and prototype multi-agent AI systems in seconds. By leveraging Google's most powerful Gemini 3 models, it transforms high-level user scenarios into detailed architectural blueprints, complete with specialized agent personas, system prompts, visual flowcharts, and professional executive reports.

## ✨ Key Features

### 🤖 Intelligent Architecture Engine
- **Automated Agent Design**: Instantly generates a team of specialized AI agents based on a natural language scenario.
- **Dynamic Configuration**: Adjust team size (1-10 agents) to fit the complexity of your task.
- **Orchestrator Logic**: Generates a master execution prompt to coordinate the multi-agent system.

### 📂 Massive Template Library (100+)
Access a curated library of over 100 real-world scenarios across 12+ professional categories:
- **Tech**: SaaS MVP, DevOps Pipelines, Cybersecurity, Web3 Smart Contracts, Legacy Migration.
- **Data & ML**: RAG Pipelines, Fraud Detection, Sports Analytics, Predictive Maintenance.
- **Science**: Drug Discovery, Climate Modeling, Quantum Simulation, Genomics.
- **Marketing**: Product Launches, Viral Social Media Teams, SEO Factories, Crisis PR.
- **Business**: M&A Due Diligence, Startup Pitch Decks, Supply Chain Optimization.
- **Ops**: HR Recruitment, Event Planning, Disaster Recovery, Fleet Management.
- **Legal**: IP Protection, GDPR Compliance, Litigation Prep, Contract Negotiation.
- **Healthcare**: Clinical Trials, Patient Triage, Mental Health Bots, Telehealth.
- **Lifestyle**: Personal Fitness, Travel Concierge, Wedding Planning, Financial Wellness.
- **Creative**: YouTube Channel Management, Screenwriting, Comic Book Creation, Music Production.
- **Game Dev**: Indie Game Studio, Level Design, QA Swarms, E-sports Management.

### 📄 Premium Executive Reports
- Generates a **downloadable PDF report** in a sleek dark-mode design.
- Includes:
  - **Executive Summary** & Business Impact.
  - **3D Isometric Infographic** of the system architecture.
  - **Agent Roster** with role definitions.
  - **Implementation Roadmap** (Prototype -> Scale).
  - **Risk Management** strategies.

### 📊 Advanced Visualization
- **Mermaid.js Flowcharts**: Dynamic, editable diagrams showing logic flow.
- **AI Concept Art**: Uses *Imagen 3* / *Gemini Flash Image* to generate stunning 3D isometric representations of your specific workflow.
- **Agent Avatars**: Automatically generates unique, minimalist vector icons for each agent using AI.

### 🎭 Interactive Simulation
- **Dialogue Engine**: Simulates a realistic conversation between your generated agents to validate their roles and interactions.
- **Voice Mode**: A real-time, hands-free voice assistant powered by **Gemini Live API** to brainstorm and refine your scenario verbally.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **PDF Engine**: jsPDF
- **AI Models**: 
  - `gemini-3-pro-preview` (Logic & Reasoning)
  - `gemini-2.5-flash-image` (Avatars & Visuals)
  - `imagen-3.0-generate-001` (High-Fidelity Concept Art)
  - `gemini-2.5-flash-native-audio-preview` (Live Voice Interaction)
- **Visualization**: Mermaid.js

## 🚀 Getting Started

### Prerequisites
- A valid [Google Gemini API Key](https://aistudio.google.com/).
- Node.js and npm/yarn installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/agentic-workflow-architect.git
    cd agentic-workflow-architect
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Add Assets:**
    Ensure `hero-infographic.png` is placed in the project root directory.

5.  **Run the application:**
    ```bash
    npm start
    ```

## 📖 Usage Guide

1.  **Select a Template**: Browse the "Explore More Templates" grid to find a starting point (e.g., "SaaS Product Team").
2.  **Or Describe Your Own**: Type a custom goal or use the microphone button to talk to the AI architect.
3.  **Generate**: Watch as the system designs your agents, writes their prompts, and maps their workflow.
4.  **Visualize & Simulate**: 
    - Click "Generate 3D Infographic" to see the system concept.
    - Click "Simulate Workflow" to watch the agents talk.
5.  **Export**: Download the JSON configuration or the professional PDF report for stakeholders.

## 📄 License

This project is licensed under the MIT License.