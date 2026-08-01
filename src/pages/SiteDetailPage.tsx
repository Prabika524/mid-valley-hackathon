import React from 'react';
import { HeritageSite } from '../types';

interface SiteDetailPageProps {
  site: HeritageSite;
  onBack: () => void;
  onOpenBooking: (site: HeritageSite) => void;
}

export const SiteDetailPage: React.FC<SiteDetailPageProps> = ({
  site,
  onBack,
  onOpenBooking,
}) => {
  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-10 min-h-screen text-slate-100">
      {/* Navigation Breadcrumb */}
      <button
        onClick={onBack}
        className="text-cyan-400 font-sans-body text-xs font-bold flex items-center gap-2 mb-8 hover:underline cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        <span>Back to Heritage Directory</span>
      </button>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left / Primary Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="glass-button-cyan px-3 py-1 rounded-full font-sans-body text-xs font-bold uppercase tracking-wider">
                UNESCO World Heritage Site
              </span>
              <span className="glass text-slate-200 px-3 py-1 rounded-full font-sans-body text-xs font-semibold">
                {site.region}
              </span>
            </div>

            <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-3">
              {site.name}
            </h1>

            <p className="font-sans-body text-xs text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-cyan-400">apartment</span>
              Managed by: <span className="font-bold text-white">{site.managedBy}</span>
            </p>
          </div>

          {/* Large Showcase Image */}
          <div className="w-full h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl relative">
            <img
              src={site.imageUrl}
              alt={site.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
            <h2 className="font-serif-headline text-2xl font-bold text-white">
              About {site.name}
            </h2>
            <p className="font-sans-body text-sm text-slate-300 leading-relaxed">
              {site.description}
            </p>
          </div>

          {/* Getting There */}
          {site.gettingThere && (
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-3">
              <h3 className="font-serif-headline text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-cyan-400">directions_bus</span>
                Getting There
              </h3>
              <p className="font-sans-body text-xs text-slate-300">
                {site.gettingThere}
              </p>
            </div>
          )}

          {/* Cultural Etiquette */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="font-serif-headline text-xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400">self_improvement</span>
              Visitor Etiquette &amp; Code of Conduct
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's */}
              <div className="space-y-3 glass p-4 rounded-2xl border border-emerald-500/30">
                <h4 className="font-sans-body font-bold text-xs uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                  Recommended (Do)
                </h4>
                <ul className="space-y-2">
                  {(site.etiquetteDo || [
                    'Remove shoes before entering active temple courtyards',
                    'Walk clockwise around stupas and shrines',
                    'Dress respectfully covering shoulders and knees'
                  ]).map((item, idx) => (
                    <li key={idx} className="font-sans-body text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div className="space-y-3 glass p-4 rounded-2xl border border-red-500/30">
                <h4 className="font-sans-body font-bold text-xs uppercase tracking-wider text-red-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-red-400 text-lg">cancel</span>
                  Prohibited (Don't)
                </h4>
                <ul className="space-y-2">
                  {(site.etiquetteDont || [
                    'Do not take photos of inner sanctum idols without permission',
                    'Avoid climbing on ancient stone brick structures',
                    'Never touch sacred items with footwear'
                  ]).map((item, idx) => (
                    <li key={idx} className="font-sans-body text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Sidebar Booking Ticket Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/15 shadow-2xl sticky top-28 space-y-6">
            <div>
              <span className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Verified Entry Fees
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif-headline text-3xl font-bold text-white">
                  ${site.foreignFeeUSD}.00
                </span>
                <span className="font-sans-body text-xs text-slate-400">USD / Foreign Visitor</span>
              </div>
            </div>

            <div className="carved-line opacity-30" />

            {/* Fee Breakdown */}
            <div className="space-y-3 font-sans-body text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Foreign Nationals</span>
                <span className="font-bold text-cyan-400">${site.foreignFeeUSD} USD</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">SAARC Member Fee</span>
                <span className="font-bold text-white">NPR {site.saarcFeeNPR}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Nepali Citizens</span>
                <span className="font-bold text-emerald-400">{site.nepaliFee}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Operating Hours</span>
                <span className="font-bold text-white">{site.operatingHours}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking(site)}
              className="w-full glass-button-cyan font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-sans-body text-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">confirmation_number</span>
              <span>Book Ticket Online</span>
            </button>

            {/* Conservation Note */}
            <div className="glass p-4 rounded-2xl border border-cyan-500/30 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-cyan-400 text-lg">verified_user</span>
                <span>Conservation Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-300">
                100% of proceeds are deposited into the municipal heritage trust for stone preservation, timber restoration, and sanitation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
