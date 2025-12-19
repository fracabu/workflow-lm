import React, { useState } from 'react';
import { PRIMARY_TEMPLATES, CATEGORY_TEMPLATES, TemplateData } from '../data/templates';

interface ExamplesGridProps {
  onSelect: (scenario: string, agentCount: number) => void;
  isDarkMode?: boolean;
}

type Category = 'All' | 'Tech' | 'Finance' | 'Real Estate' | 'HR' | 'Legal' | 'Healthcare' | 'Supply Chain' | 'Marketing' | 'Science' | 'Creative' | 'Education';

// Color Configuration for each category
const CATEGORY_STYLES: Record<Category, { dot: string; text: string; bg: string; border: string; gradient: string }> = {
  'All': { dot: 'bg-gray-400', text: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20', gradient: 'from-gray-500 to-slate-500' },
  'Tech': { dot: 'bg-blue-400', text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', gradient: 'from-blue-500 to-indigo-500' },
  'Finance': { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', gradient: 'from-emerald-500 to-green-600' },
  'Real Estate': { dot: 'bg-amber-400', text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', gradient: 'from-amber-500 to-orange-500' },
  'HR': { dot: 'bg-rose-400', text: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20', gradient: 'from-rose-500 to-red-500' },
  'Legal': { dot: 'bg-stone-400', text: 'text-stone-400', bg: 'bg-stone-400/10', border: 'border-stone-400/20', gradient: 'from-stone-500 to-neutral-500' },
  'Healthcare': { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', gradient: 'from-red-500 to-rose-600' },
  'Supply Chain': { dot: 'bg-orange-400', text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', gradient: 'from-orange-500 to-yellow-600' },
  'Marketing': { dot: 'bg-pink-400', text: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20', gradient: 'from-pink-500 to-rose-500' },
  'Science': { dot: 'bg-teal-400', text: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20', gradient: 'from-teal-500 to-emerald-500' },
  'Creative': { dot: 'bg-fuchsia-400', text: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-400/20', gradient: 'from-fuchsia-500 to-purple-500' },
  'Education': { dot: 'bg-violet-400', text: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/20', gradient: 'from-violet-500 to-purple-500' },
};

const ExamplesGrid: React.FC<ExamplesGridProps> = ({ onSelect, isDarkMode = true }) => {
  const [showMore, setShowMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  // --- Icon Components ---
  const IconRocket = () => <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.11.02-.22.04-.33.06a15.09 15.09 0 01-2.45-2.45 14.9 14.9 0 01.06-.33m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>;
  const IconBriefcase = () => <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
  const IconHome = () => <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
  const IconUsers = () => <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
  const IconTruck = () => <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-3 4.5V18m-6 0h6m-6 0F5.25 5.25 0 0112 3h.75a5.25 5.25 0 015.25 5.25v9M4.5 9h15" /></svg>;
  const IconScale = () => <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>;
  const IconPulse = () => <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>;
  const IconChart = () => <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;

  // Helper to attach icon component to data
  const getIconForCategory = (category: string | undefined): React.ReactElement => {
    switch(category) {
        case 'Finance': return <IconBriefcase />;
        case 'Supply Chain': return <IconTruck />;
        case 'Tech': return <IconRocket />;
        case 'Healthcare': return <IconPulse />;
        case 'Real Estate': return <IconHome />;
        case 'HR': return <IconUsers />;
        case 'Legal': return <IconScale />;
        case 'Marketing': return <IconChart />;
        case 'Science': return <IconRocket />;
        case 'Creative': return <IconRocket />;
        case 'Education': return <IconRocket />;
        default: return <IconRocket />;
    }
  };

  // Reconstitute the Primary Samples with Icons
  const primarySamples = PRIMARY_TEMPLATES.map(t => ({
      ...t,
      icon: getIconForCategory(t.category)
  }));

  // Reconstitute the detailed categories
  const allSecondary = Object.entries(CATEGORY_TEMPLATES).flatMap(([cat, items]) => 
    items.map(item => ({ 
        ...item, 
        category: cat,
        icon: getIconForCategory(cat) // Attach icon for display
    }))
  );

  const displayList = activeCategory === 'All' 
    ? allSecondary 
    : CATEGORY_TEMPLATES[activeCategory].map(item => ({ 
        ...item, 
        category: activeCategory,
        icon: getIconForCategory(activeCategory)
    }));

  return (
    <div className="w-full mt-4 animate-fade-in-up pb-10">
        <div className="flex items-center justify-between mb-4 px-2">
            <h3 className={`text-sm font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start with a professional template</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {primarySamples.map((sample, idx) => (
             <TemplateCard key={idx} sample={sample} onSelect={onSelect} isDarkMode={isDarkMode} />
          ))}
        </div>

        {/* Expandable Section */}
        <div className="flex flex-col items-center">
            
            {showMore && (
                <div className="w-full animate-fade-in">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {(['All', 'Finance', 'Real Estate', 'Tech', 'HR', 'Legal', 'Healthcare', 'Supply Chain', 'Marketing', 'Science', 'Creative', 'Education'] as Category[]).map(cat => {
                            const style = CATEGORY_STYLES[cat] || CATEGORY_STYLES['All'];
                            const isActive = activeCategory === cat;
                            // Update buttons for light mode
                            const buttonBaseClass = isDarkMode 
                                ? 'bg-[#1E1F20] text-gray-400 border-[#333] hover:bg-[#252627]' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-black';

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                                        isActive
                                        ? `${style.bg} ${style.text} ${style.border}`
                                        : buttonBaseClass
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {displayList.map((sample, idx) => (
                            <TemplateCard key={`sec-${activeCategory}-${idx}`} sample={sample} onSelect={onSelect} isDarkMode={isDarkMode} />
                        ))}
                    </div>
                </div>
            )}

            <button 
                onClick={() => setShowMore(!showMore)}
                className={`group flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all text-sm font-medium ${isDarkMode ? 'bg-[#1E1F20] border-[#333] hover:border-gray-500 hover:bg-[#252627] text-gray-400 hover:text-white' : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-600 hover:text-black'}`}
            >
                {showMore ? 'Show Less' : 'Explore All 100+ Templates'}
                <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    </div>
  );
};

interface TemplateCardProps {
    sample: any;
    onSelect: (s: string, c: number) => void;
    isDarkMode: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ sample, onSelect, isDarkMode }) => {
    const category = sample.category as Category;
    const style = CATEGORY_STYLES[category] || CATEGORY_STYLES['Tech'];

    return (
        <button
            onClick={() => onSelect(sample.scenario, sample.agentCount)}
            className={`border rounded-3xl p-5 text-left transition-all duration-300 group h-40 md:h-48 flex flex-col justify-between relative overflow-hidden shadow-md 
                ${isDarkMode 
                    ? `bg-nb-surface border-nb-border hover:bg-[#252627] hover:border-opacity-50 hover:border-2 hover:${style.text.replace('text-', 'border-')}` 
                    : `bg-white border-gray-200 hover:border-2 hover:border-${style.text.split('-')[1]}-500 hover:shadow-lg hover:-translate-y-1`
                }`}
        >
            {/* Decorative gradient blob */}
            <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-3xl transition-opacity bg-gradient-to-br ${style.gradient} ${isDarkMode ? 'opacity-10 group-hover:opacity-20' : 'opacity-5 group-hover:opacity-15'}`}></div>

            <div>
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-[#131314] border-nb-border' : 'bg-gray-50 border-gray-100'}`}>
                    <div className={`${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'} transition-colors`}>
                        {sample.icon}
                    </div>
                </div>
                <h4 className={`font-medium text-sm mb-1.5 transition-colors ${isDarkMode ? `text-white group-hover:${style.text}` : 'text-gray-900 group-hover:text-blue-600'}`}>{sample.title}</h4>
                <p className={`text-xs leading-relaxed line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{sample.desc}</p>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-tight">
                <div className="flex items-center">
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.dot}`}></span>
                    {sample.category}
                </div>
                <div className={`px-1.5 py-0.5 rounded text-[9px] border ${isDarkMode ? 'bg-[#2D2D2D] text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {sample.agentCount} Agents
                </div>
            </div>
        </button>
    );
};

export default ExamplesGrid;