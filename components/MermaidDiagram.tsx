import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  isDarkMode: boolean;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark', // Always dark for NotebookLM style
      themeVariables: {
        primaryColor: '#1E1F20',
        primaryTextColor: '#E3E3E3',
        primaryBorderColor: '#A8C7FA', // Blue accent border
        lineColor: '#5F6368',
        secondaryColor: '#303134',
        tertiaryColor: '#1E1F20',
        fontFamily: 'Inter, sans-serif'
      },
      securityLevel: 'loose',
    });

    const cleanMermaidCode = (code: string) => {
      if (!code) return '';
      // Remove markdown code blocks if they somehow got in
      let cleaned = code.replace(/```mermaid/g, '').replace(/```/g, '').trim();
      
      // Fix common LLM hallucination: "Node[Label]: Description" -> "Node[Label] -- Description"
      // This regex matches a closing bracket followed immediately by a colon
      cleaned = cleaned.replace(/\]:/g, '] --');

      // Fix unquoted edge labels with special chars: -->|Text| becomes -->|"Text"|
      // This protects against parentheses in labels which cause 'PS' parse errors
      // Matches arrows (--> or -.-> or ==>) followed by |text| where text doesn't start with "
      cleaned = cleaned.replace(/((?:--|==|-\.)>)\s*\|([^"|\r\n]+?)\|/g, '$1|"$2"|');
      
      return cleaned;
    };

    const renderChart = async () => {
      if (!containerRef.current || !chart) return;
      
      const cleanedChart = cleanMermaidCode(chart);

      try {
        setError(false);
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        containerRef.current.innerHTML = '';
        const { svg } = await mermaid.render(id, cleanedChart);
        setSvgContent(svg);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (e) {
        console.error("Mermaid render error:", e);
        // On error, we try one more fallback: ensure 'graph TD' is at top if missing
        if (!cleanedChart.startsWith('graph') && !cleanedChart.startsWith('flowchart')) {
             try {
                const retryChart = `graph TD\n${cleanedChart}`;
                const id = `mermaid-retry-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, retryChart);
                setSvgContent(svg);
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
                return;
             } catch (retryError) {
                console.error("Mermaid retry failed:", retryError);
             }
        }
        setError(true);
      }
    };

    renderChart();
  }, [chart]); // Remove isDarkMode dependency as it is now always dark

  const handleDownload = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow-infographic.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (error) return (
      <div className="bg-nb-surface rounded-[32px] shadow-sm border border-nb-border overflow-hidden mb-8 p-8 flex flex-col items-center justify-center text-center">
        <svg className="w-10 h-10 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-gray-300">Unable to render workflow diagram.</p>
        <p className="text-xs text-gray-500 mt-2 font-mono break-all max-w-md">{chart.substring(0, 100)}...</p>
      </div>
  );

  return (
    <div className="bg-nb-surface rounded-[32px] shadow-sm border border-nb-border overflow-hidden mb-8">
      <div className="bg-[#1A1A1A] px-8 py-5 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-medium text-white text-lg flex items-center gap-2">
           <span className="p-2 bg-blue-900/30 text-blue-400 rounded-lg">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
             </svg>
           </span>
          Workflow Map
        </h3>
        <button
          onClick={handleDownload}
          className="text-xs bg-[#303134] text-gray-300 hover:text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download SVG
        </button>
      </div>
      <div className="p-8 overflow-x-auto flex justify-center bg-[#131314]">
        <div ref={containerRef} className="mermaid w-full flex justify-center" />
      </div>
    </div>
  );
};

export default MermaidDiagram;