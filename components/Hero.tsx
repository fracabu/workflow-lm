import React from 'react';

interface HeroProps {
  onStart: () => void;
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onStart, isDarkMode = true }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full z-10 animate-fade-in-up px-4 min-h-[calc(100vh-100px)]">
        
      {/* Main Hero Text */}
      <div className="text-center mb-12 max-w-6xl">
        <h1 className={`text-6xl sm:text-7xl md:text-[7rem] font-medium tracking-tight mb-10 leading-[1.05] transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Design <br className="lg:hidden" />
          <span className="bg-clip-text text-transparent bg-notebook-gradient">
            any workflow
          </span>
        </h1>
        <p className={`text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto font-light leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <span className={`font-medium border-b pb-0.5 ${isDarkMode ? 'text-gray-200 border-gray-600' : 'text-gray-800 border-gray-300'}`}>100+ Pro Templates</span> to design AI agent teams in seconds.
        </p>
      </div>

      {/* Main CTA */}
      <div className="mb-16 relative z-20">
        <button
          onClick={onStart}
          className={`group relative inline-flex items-center gap-5 px-12 py-5 rounded-full text-2xl font-medium transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] ${isDarkMode ? 'bg-white text-black hover:bg-blue-600 hover:text-white' : 'bg-black text-white hover:bg-blue-600'}`}
        >
          {/* Backlit Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition duration-500 -z-10"></div>

          <span className="relative z-10">Create new Workflow</span>
          
          <div className={`rounded-full p-2.5 transition-colors duration-300 z-10 shadow-sm ${isDarkMode ? 'bg-black text-white group-hover:bg-white group-hover:text-blue-600' : 'bg-white text-black group-hover:bg-white group-hover:text-blue-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;