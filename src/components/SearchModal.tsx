import React, { useState, useEffect, useRef } from 'react';
import { HeritageSite, TrekkingRoute } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  sites: HeritageSite[];
  treks: TrekkingRoute[];
  onSelectSite: (site: HeritageSite) => void;
  onSelectTab: (tab: string) => void;
  currency: 'USD' | 'NPR';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  sites,
  treks,
  onSelectSite,
  onSelectTab,
  currency,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'sites' | 'treks' | 'events'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredSites = sites.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.region.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTreks = treks.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.region.toLowerCase().includes(query.toLowerCase())
  );

  const culturalEvents = [
    { name: 'Indra Jatra Festival', region: 'Kathmandu Valley', date: 'September', type: 'Festival' },
    { name: 'Mani Rimdu Festival', region: 'Everest Region', date: 'November', type: 'Buddhist Ritual' },
    { name: 'Bisket Jatra', region: 'Bhaktapur Durbar Square', date: 'April', type: 'New Year Festival' },
    { name: 'Rato Machhindranath Jatra', region: 'Patan', date: 'May', type: 'Chariot Festival' },
  ].filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.region.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults =
    (activeCategory === 'all' || activeCategory === 'sites' ? filteredSites.length : 0) +
    (activeCategory === 'all' || activeCategory === 'treks' ? filteredTreks.length : 0) +
    (activeCategory === 'all' || activeCategory === 'events' ? culturalEvents.length : 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden z-10 text-slate-100 flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="p-4 md:p-6 border-b border-white/10 glass flex items-center gap-3">
          <span className="material-symbols-outlined text-cyan-400 text-2xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search heritage sites, trekking routes, festivals..."
            className="w-full bg-transparent text-white placeholder-slate-400 font-sans-body text-base md:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
          <kbd className="hidden md:inline-block px-2 py-1 glass text-[10px] font-mono text-slate-400 rounded-md border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Filter Categories */}
        <div className="px-4 md:px-6 py-3 bg-slate-900/50 border-b border-white/5 flex gap-2 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'sites', label: 'Heritage Sites' },
            { id: 'treks', label: 'Trekking Routes' },
            { id: 'events', label: 'Cultural Events' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-full font-sans-body font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6 flex-1">
          {totalResults === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2 text-slate-500">search_off</span>
              <p className="font-serif-headline text-lg text-slate-300">No matching heritage sites or routes</p>
              <p className="font-sans-body text-xs mt-1">Try searching for "Changu Narayan", "Annapurna", or "Indra Jatra"</p>
            </div>
          ) : (
            <>
              {/* Heritage Sites Category */}
              {(activeCategory === 'all' || activeCategory === 'sites') && filteredSites.length > 0 && (
                <div>
                  <div className="text-xs font-bold font-sans-body uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">account_balance</span>
                    <span>Heritage Sites ({filteredSites.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredSites.map((site) => (
                      <div
                        key={site.id}
                        onClick={() => {
                          onSelectSite(site);
                          onClose();
                        }}
                        className="glass-card glass-card-hover p-3 rounded-2xl flex items-center justify-between cursor-pointer group border border-white/10"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={site.imageUrl}
                            alt={site.name}
                            className="w-12 h-12 rounded-xl object-cover border border-white/15"
                          />
                          <div>
                            <div className="font-serif-headline font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {site.name}
                            </div>
                            <div className="text-xs text-slate-400 font-sans-body">
                              {site.region} • Managed by {site.managedBy}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                            {currency === 'USD' ? `$${site.foreignFeeUSD}` : `NPR ${site.saarcFeeNPR * 3}`}
                          </span>
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-cyan-300 text-lg">
                            chevron_right
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trekking Routes Category */}
              {(activeCategory === 'all' || activeCategory === 'treks') && filteredTreks.length > 0 && (
                <div>
                  <div className="text-xs font-bold font-sans-body uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">hiking</span>
                    <span>Trekking Routes ({filteredTreks.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredTreks.map((trek) => (
                      <div
                        key={trek.id}
                        onClick={() => {
                          onSelectTab('trekking');
                          onClose();
                        }}
                        className="glass-card glass-card-hover p-3 rounded-2xl flex items-center justify-between cursor-pointer group border border-white/10"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={trek.imageUrl}
                            alt={trek.name}
                            className="w-12 h-12 rounded-xl object-cover border border-white/15"
                          />
                          <div>
                            <div className="font-serif-headline font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {trek.name}
                            </div>
                            <div className="text-xs text-slate-400 font-sans-body">
                              {trek.durationDays} Days • {trek.difficulty}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-sky-300 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                            {trek.region}
                          </span>
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-cyan-300 text-lg">
                            chevron_right
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cultural Events Category */}
              {(activeCategory === 'all' || activeCategory === 'events') && culturalEvents.length > 0 && (
                <div>
                  <div className="text-xs font-bold font-sans-body uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">celebration</span>
                    <span>Cultural Events ({culturalEvents.length})</span>
                  </div>
                  <div className="space-y-2">
                    {culturalEvents.map((evt, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onSelectTab('calendar');
                          onClose();
                        }}
                        className="glass-card glass-card-hover p-3 rounded-2xl flex items-center justify-between cursor-pointer group border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                            <span className="material-symbols-outlined text-xl">event</span>
                          </div>
                          <div>
                            <div className="font-serif-headline font-bold text-white group-hover:text-amber-300 transition-colors">
                              {evt.name}
                            </div>
                            <div className="text-xs text-slate-400 font-sans-body">
                              {evt.region} • {evt.date}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                          {evt.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 glass flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="token-pulse" />
            <span>Nepal Heritage Live Index</span>
          </span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
