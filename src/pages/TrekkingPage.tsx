import React, { useEffect, useState } from 'react';
import { TrekkingRoute } from '../types';
import { api } from '../services/api';

interface TrekkingPageProps {
  setActiveTab: (tab: string) => void;
}

export const TrekkingPage: React.FC<TrekkingPageProps> = () => {
  const [treks, setTreks] = useState<TrekkingRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTreks() {
      try {
        const data = await api.getTreks();
        setTreks(data);
      } catch (err) {
        console.error('Failed to load treks:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTreks();
  }, []);

  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-12 md:py-20 min-h-screen text-slate-100">
      {/* Header */}
      <header className="mb-12">
        <span className="inline-block font-sans-body text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
          Himalayan Expeditions
        </span>
        <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-4">
          Annapurna &amp; Himalayan Trekking Routes
        </h1>
        <p className="font-sans-body text-base text-slate-300 max-w-2xl">
          Verified route guides, live ridge weather conditions, and ACAP permit guidelines for classic and off-the-beaten-path Himalayan trails.
        </p>
      </header>

      {/* Live Mountain Weather Widget */}
      <div className="mb-12 glass-panel p-6 rounded-3xl border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400 text-2xl">thermostat</span>
            <div>
              <h3 className="font-serif-headline font-bold text-lg text-white">
                Live Mountain Weather &amp; Ridge Conditions
              </h3>
              <p className="font-sans-body text-xs text-slate-400">
                Station: Jomsom / Thorong La High Pass (5,416m)
              </p>
            </div>
          </div>
          <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/30">
            Updated Today • 07:00 NPT
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="glass p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-sans-body text-slate-400 block mb-1">Temperature</span>
            <span className="font-serif-headline text-2xl font-bold text-white">12°C</span>
          </div>
          <div className="glass p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-sans-body text-slate-400 block mb-1">Condition</span>
            <span className="font-serif-headline text-lg font-bold text-cyan-300">Clear Ridge</span>
          </div>
          <div className="glass p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-sans-body text-slate-400 block mb-1">Wind Speed</span>
            <span className="font-serif-headline text-2xl font-bold text-white">15 km/h</span>
          </div>
          <div className="glass p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-sans-body text-slate-400 block mb-1">Visibility</span>
            <span className="font-serif-headline text-2xl font-bold text-white">10+ km</span>
          </div>
        </div>
      </div>

      {/* Trek Routes Grid */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 glass rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {treks.map((trek) => (
            <div
              key={trek.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row group"
            >
              <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden shrink-0">
                <img
                  src={trek.imageUrl}
                  alt={trek.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 glass-button-cyan px-3 py-1 rounded-full font-sans-body text-xs font-bold shadow-md">
                  ACAP Permit: ${trek.acapFeeUSD} USD
                </div>
              </div>

              <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="glass text-slate-200 px-3 py-1 rounded-full text-xs font-bold font-sans-body">
                      {trek.region}
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold font-sans-body border border-cyan-400/30">
                      {trek.durationDays} Days
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold font-sans-body border border-amber-400/30">
                      Difficulty: {trek.difficulty}
                    </span>
                  </div>

                  <h2 className="font-serif-headline text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {trek.name}
                  </h2>

                  <p className="font-sans-body text-xs text-slate-300 leading-relaxed mb-4">
                    {trek.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-sans-body text-xs text-slate-400">
                    <span className="font-bold text-white">Required Permits:</span> ACAP Entry Permit + TIMS Card
                  </div>

                  <button
                    onClick={() => {
                      alert(`To arrange licensed guiding and official ACAP permits for ${trek.name}, please contact an authorized operator via the Operator Portal.`);
                    }}
                    className="glass-button-cyan px-6 py-2.5 rounded-xl font-sans-body text-xs font-bold transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">landscape</span>
                    <span>Inquire / Booking Guidance</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
