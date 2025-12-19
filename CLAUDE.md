# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WorkflowLM is a React application that uses Google Gemini AI models to design multi-agent AI systems. Users describe a scenario, and the app generates specialized AI agents with system prompts, Mermaid.js workflow diagrams, agent avatars, simulated dialogues, and executive PDF reports.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on port 3000
npm run build        # Production build
npm run preview      # Preview production build
```

## Environment Setup

Create `.env.local` with:
```
GEMINI_API_KEY=your_google_gemini_api_key
```

The key is exposed to the frontend via Vite's `define` config in `vite.config.ts`.

## Architecture

### Entry Points
- `index.html` - HTML shell with Tailwind CSS via CDN
- `index.tsx` - React 19 entry point
- `App.tsx` - Main application component managing view state (home/workspace), theme, and workflow history

### Core Types (`types.ts`)
- `Agent` - name, description, prompt, optional avatarUrl
- `WorkflowData` - agents array, executionPrompt, mermaidDefinition, simulationMessages, visualUrl
- `AppStatus` - IDLE, LOADING, SUCCESS, ERROR

### AI Service (`services/geminiService.ts`)
All Gemini API calls are centralized here:
- `generateWorkflow()` - Uses `gemini-3-pro-preview` with JSON schema to generate agents and Mermaid diagrams
- `generateImplementationGuide()` - Creates executive report text for PDF export
- `generateWorkflowVisual()` - Uses `gemini-2.5-flash-image` or `imagen-3.0-generate-001` for infographics
- `generateAgentAvatar()` - Generates minimalist vector icons for agents
- `generateSimulationDialogue()` - Creates multi-agent conversation scripts

### Key Components
- `ScenarioInput` - Text input with agent count slider
- `WorkflowDisplay` - Main results view with PDF/JSON export, simulation, and visual generation
- `VoiceAssistant` - Real-time voice interaction using Gemini Live API (`gemini-2.5-flash-native-audio-preview`)
- `MermaidDiagram` - Renders Mermaid.js flowcharts
- `ExamplesGrid` - Template selector grid
- `HistorySidebar` - Local storage workflow history (max 10 items with quota management)

### Template System (`data/templates.ts`)
- `PRIMARY_TEMPLATES` - Featured templates on homepage
- `CATEGORY_TEMPLATES` - Organized by domain (Tech, Finance, Healthcare, Legal, etc.)

## Key Patterns

- Theme toggle with dark mode as default (stored in localStorage as `awa_theme`)
- Workflow history persisted to localStorage with automatic cleanup on quota exceeded
- All AI-generated content forced to English via system instructions
- PDF generation uses jsPDF with custom layout (cover page, agent roster, visualization, implementation guide)
- Voice mode uses Web Audio API for real-time PCM audio streaming to Gemini Live
