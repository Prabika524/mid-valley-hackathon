import React, { useEffect, useState } from 'react';
import { HeritageSite, TrekkingRoute } from '../types';
import { api } from '../services/api';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectSite: (site: HeritageSite) => void;
  onOpenBooking: (site: HeritageSite) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onSelectSite,
  onOpenBooking,
}) => {
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [treks, setTreks] = useState<TrekkingRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [sitesData, treksData] = await Promise.all([
          api.getSites(),
          api.getTreks(),
        ]);
        setSites(sitesData);
        setTreks(treksData);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      {/* Hero Section */}
      <section className="relative w-full h-[620px] md:h-[720px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkdPjr7E2IawyIP0QKUnL9exdYx-QHrn0VCvfOCfbP8mmi-GxVr-uyLhjFJK-gTYggYS6Q_E7N-hOeyPFKuI0GbvH027qQuBt-UKI4iXcm0vBKbPDNV1WVYcTl1F7eNFoUsNHCbeGG177dWchEfzeQ3IU3tFG1Kxqh1g8mXhhhXsQioQwq8_CBKyS_Ds9PwzGGm_MYc-oJDk8eEMja2w6Mrj4JFIAJSeDctmplFquxJ6MTf9CD4J8Gvm076_bPT9Df7t4ndgiC2K8"
            alt="Ancient stone temple in Nepal"
            className="w-full h-full object-cover transform scale-105 filter brightness-75 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-10 max-w-[1280px] mx-auto w-full flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full font-sans-body text-xs text-cyan-300 border border-cyan-400/30 uppercase tracking-widest mb-6 shadow-lg">
            <span className="token-pulse" />
            Official Nepal Conservation &amp; Ticketing Portal
          </span>

          <h1 className="font-serif-headline text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl drop-shadow-lg leading-tight">
            Verified Tickets &amp; Transparent Planning for Nepal's Heritage.
          </h1>

          <p className="font-sans-body text-base sm:text-lg text-slate-300 mb-10 max-w-2xl drop-shadow">
            Support local conservation with every booking. Discover sacred temples, living monuments, and curated mountain trekking routes.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab('sites')}
              className="glass-button-cyan px-8 py-4 rounded-full font-sans-body text-sm font-bold transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg flex items-center gap-2"
            >
              <span>Explore Sites</span>
              <span className="material-symbols-outlined text-lg">explore</span>
            </button>
            <button
              onClick={() => setActiveTab('trekking')}
              className="glass px-8 py-4 rounded-full text-slate-200 border border-white/20 font-sans-body text-sm font-bold hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              Trekking Routes
            </button>
          </div>
        </div>
      </section>

      {/* Festival Banner */}
      <div className="glass py-4 px-4 md:px-10 border-y border-white/10 backdrop-blur-md relative z-10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/20 text-amber-300 px-3.5 py-1 rounded-full font-sans-body text-xs font-bold flex items-center gap-1.5 border border-amber-400/30">
              <span className="material-symbols-outlined text-base">celebration</span>
              Happening Now
            </span>
            <span className="font-serif-headline font-bold text-lg text-white">
              Indra Jatra Festival
            </span>
            <span className="text-slate-300 font-sans-body text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-cyan-400">location_on</span>
              Kathmandu Valley
            </span>
          </div>

          <button
            onClick={() => setActiveTab('calendar')}
            className="text-cyan-400 hover:text-cyan-300 font-sans-body text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>View Cultural Calendar</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Heritage Sites Section */}
      <section className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto w-full relative z-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-white mb-2">
              Heritage Sites
            </h2>
            <p className="text-slate-300 font-sans-body text-sm">
              Explore the ancient stone &amp; wood architecture of the Kathmandu Valley.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('sites')}
            className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>See all sites</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 glass rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sites.slice(0, 3).map((site) => (
              <div
                key={site.id}
                className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col h-full border border-white/10"
              >
                <div className="aspect-[3/2] w-full overflow-hidden relative">
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-cyan-300 font-sans-body text-xs font-bold shadow-md border border-white/20">
                    ${site.foreignFeeUSD} Entry
                  </div>
                  {site.tag && (
                    <div className="absolute top-4 left-4 bg-amber-500/80 backdrop-blur-md text-white px-3 py-1 rounded-full font-sans-body text-xs font-bold shadow-md border border-amber-400/40">
                      {site.tag}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3
                    onClick={() => onSelectSite(site)}
                    className="font-serif-headline text-xl font-bold text-white mb-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {site.name}
                  </h3>
                  <p className="text-slate-400 font-sans-body text-xs mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-cyan-400">apartment</span>
                    Managed by {site.managedBy}
                  </p>

                  <p className="text-slate-300 font-sans-body text-xs line-clamp-2 mb-6 flex-1">
                    {site.description}
                  </p>

                  <div className="carved-line mb-4 opacity-30" />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectSite(site)}
                      className="flex-1 py-2.5 px-3 glass text-slate-200 rounded-xl font-sans-body text-xs font-bold hover:text-white hover:border-cyan-400/50 transition-colors text-center cursor-pointer border border-white/10"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(site)}
                      className="flex-1 py-2.5 px-3 glass-button-cyan rounded-xl font-sans-body text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">confirmation_number</span>
                      Book Online
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust & Conservation Callout Banner */}
      <section className="py-16 glass-panel border-y border-white/10 relative z-10 my-8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <blockquote className="font-serif-headline text-2xl md:text-3xl font-bold text-white max-w-4xl mx-auto leading-relaxed mb-4">
            "100% of your entry fee goes directly to site conservation, historical restoration, and local artisan heritage funds."
          </blockquote>
          <p className="font-sans-body text-xs text-slate-400">
            Official Partnership with the Department of Archaeology &amp; Municipal Heritage Committees of Nepal.
          </p>
        </div>
      </section>

      {/* Trekking Routes Section */}
      <section className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto w-full relative z-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-white mb-2">
              Trekking Routes
            </h2>
            <p className="text-slate-300 font-sans-body text-sm">
              Plan your journey through the majestic Himalayas.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('trekking')}
            className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore all treks</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {treks.slice(0, 2).map((trek) => (
            <div
              key={trek.id}
              className="flex flex-col sm:flex-row glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 group"
            >
              <div className="w-full sm:w-2/5 relative h-56 sm:h-auto shrink-0">
                <img
                  src={trek.imageUrl}
                  alt={trek.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 w-full sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {trek.tag === 'High Traffic' ? (
                      <span className="bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full font-sans-body text-xs font-bold border border-red-500/30">
                        High Traffic
                      </span>
                    ) : (
                      <span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full font-sans-body text-xs font-bold border border-cyan-400/30">
                        Recommended Alternative
                      </span>
                    )}
                    <span className="glass text-slate-300 px-2.5 py-0.5 rounded-full font-sans-body text-xs font-bold">
                      {trek.durationDays} Days • {trek.difficulty}
                    </span>
                  </div>

                  <h3 className="font-serif-headline text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {trek.name}
                  </h3>

                  <p className="text-slate-300 font-sans-body text-xs line-clamp-3 mb-6">
                    {trek.description}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('trekking')}
                  className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer mt-auto"
                >
                  <span>Route Details &amp; Weather</span>
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
