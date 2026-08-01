import React from 'react';

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full py-12 px-6 md:px-10 max-w-[1280px] mx-auto glass rounded-t-3xl border-t border-x border-white/10 mt-auto relative z-10 text-slate-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <button
            onClick={() => setActiveTab?.('home')}
            className="font-serif-headline text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 hover:opacity-90 cursor-pointer block mb-1"
          >
            Nepal Heritage
          </button>
          <p className="font-sans-body text-xs text-slate-400">
            Preserving living history and supporting local conservation.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 font-sans-body text-xs text-slate-300">
          <button onClick={() => setActiveTab?.('sites')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Heritage Sites
          </button>
          <button onClick={() => setActiveTab?.('trekking')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Trekking Routes
          </button>
          <button onClick={() => setActiveTab?.('gems')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Hidden Gems
          </button>
          <button onClick={() => setActiveTab?.('calendar')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Cultural Calendar
          </button>
          <button onClick={() => setActiveTab?.('register')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Operator Application
          </button>
        </nav>

        <div className="font-sans-body text-xs text-slate-400 text-center md:text-right">
          © 2026 Nepal Heritage Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
