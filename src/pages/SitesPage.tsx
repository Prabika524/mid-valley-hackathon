import React, { useEffect, useState } from 'react';
import { HeritageSite } from '../types';
import { api } from '../services/api';

interface SitesPageProps {
  onSelectSite: (site: HeritageSite) => void;
  onOpenBooking: (site: HeritageSite) => void;
}

export const SitesPage: React.FC<SitesPageProps> = ({
  onSelectSite,
  onOpenBooking,
}) => {
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadSites() {
      try {
        const data = await api.getSites();
        setSites(data);
      } catch (err) {
        console.error('Failed to load sites:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSites();
  }, []);

  const regions = ['All', 'Kathmandu Valley', 'Lumbini', 'Chitwan', 'Sagarmatha'];

  const filteredSites = sites.filter((site) => {
    const matchesRegion =
      selectedRegion === 'All' || site.region.toLowerCase() === selectedRegion.toLowerCase();
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-12 md:py-20 min-h-screen text-slate-100">
      {/* Header Section */}
      <header className="mb-12">
        <span className="inline-block font-sans-body text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
          Cultural Heritage Directory
        </span>
        <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-4">
          UNESCO Heritage Sites
        </h1>
        <p className="font-sans-body text-base text-slate-300 max-w-2xl">
          Explore the ancient stone architecture, woodcarving sanctuaries, and living history of Nepal's most revered cultural landmarks.
        </p>

        <div className="carved-line my-8 opacity-30" />

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-sans-body text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
              Regions:
            </span>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full font-sans-body text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'glass-button-cyan shadow-md'
                    : 'glass text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 glass-input rounded-xl text-xs font-sans-body focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Grid Display */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 h-96 glass rounded-3xl animate-pulse" />
          <div className="col-span-12 md:col-span-4 h-96 glass rounded-3xl animate-pulse" />
        </div>
      ) : filteredSites.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl border border-white/10 p-8">
          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">location_off</span>
          <h3 className="font-serif-headline font-bold text-xl text-white">No Heritage Sites Found</h3>
          <p className="font-sans-body text-xs text-slate-400 mt-1">
            Try adjusting your search criteria or regional filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredSites.map((site, index) => {
            const isFeatured = index === 0 && filteredSites.length > 2;
            return (
              <article
                key={site.id}
                className={`${
                  isFeatured ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4'
                } glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col group`}
              >
                <div
                  className={`relative ${
                    isFeatured ? 'h-72 md:h-96' : 'h-60'
                  } overflow-hidden`}
                >
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="glass-button-cyan px-3 py-1 rounded-full font-sans-body text-xs font-bold shadow-md">
                      ${site.foreignFeeUSD} USD
                    </span>
                    <span className="glass backdrop-blur-md text-slate-200 px-3 py-1 rounded-full font-sans-body text-xs font-semibold">
                      {site.region}
                    </span>
                    <span className="flex items-center gap-1 bg-emerald-500/25 backdrop-blur-md text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full font-sans-body text-xs font-bold shadow-md">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Verified
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="font-serif-headline text-2xl md:text-3xl font-bold mb-1 drop-shadow-md">
                      {site.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="grid grid-cols-2 gap-2 mb-4 font-sans-body text-xs text-slate-400">
                    <div>
                      <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        Operating Hours
                      </span>
                      <span className="font-semibold text-slate-200">{site.operatingHours}</span>
                    </div>
                    <div>
                      <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        SAARC Fee
                      </span>
                      <span className="font-semibold text-cyan-400">NPR {site.saarcFeeNPR}</span>
                    </div>
                  </div>

                  <p className="font-sans-body text-xs text-slate-300 line-clamp-3 mb-6 flex-1">
                    {site.description}
                  </p>

                  <div className="flex gap-2 pt-2 mt-auto border-t border-white/10">
                    <button
                      onClick={() => onSelectSite(site)}
                      className="flex-1 py-2.5 px-3 glass text-slate-200 rounded-xl font-sans-body text-xs font-bold hover:text-white hover:border-cyan-400/50 transition-colors cursor-pointer border border-white/10"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(site)}
                      className="flex-1 py-2.5 px-3 glass-button-cyan rounded-xl font-sans-body text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">confirmation_number</span>
                      Book Ticket
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
