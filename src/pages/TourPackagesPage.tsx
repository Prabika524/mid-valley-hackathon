import React, { useState } from "react";
import { TourPackage, Guide } from "../types";

const GUIDES: Guide[] = [
  { id: "g1", name: "Pemba Sherpa", specialty: "High Altitude & Himalayan Routes", languages: ["English", "Nepali", "Tibetan"], ratingOutOf5: 4.9, experienceYears: 14, dailyRateUSD: 45, tier: "expert", available: true, badge: "Everest Summiteer", imageInitials: "PS", accentColor: "#06b6d4" },
  { id: "g2", name: "Sita Thapa", specialty: "Kathmandu Valley Heritage & Culture", languages: ["English", "Nepali", "Hindi"], ratingOutOf5: 4.8, experienceYears: 9, dailyRateUSD: 35, tier: "standard", available: true, badge: "Cultural Expert", imageInitials: "ST", accentColor: "#f59e0b" },
  { id: "g3", name: "Ram Bahadur", specialty: "Lumbini & Buddhist Circuit", languages: ["English", "Nepali"], ratingOutOf5: 4.7, experienceYears: 6, dailyRateUSD: 25, tier: "budget", available: true, imageInitials: "RB", accentColor: "#10b981" },
  { id: "g4", name: "Dr. Anita Rai", specialty: "Archaeological Research & Ancient Scripts", languages: ["English", "Nepali", "Sanskrit (reading)"], ratingOutOf5: 5.0, experienceYears: 18, dailyRateUSD: 80, tier: "expert", available: true, badge: "PhD Archaeologist", imageInitials: "AR", accentColor: "#8b5cf6" },
  { id: "g5", name: "Krishna Tamang", specialty: "Solo Trekking & Nature Trails", languages: ["English", "Nepali"], ratingOutOf5: 4.6, experienceYears: 4, dailyRateUSD: 20, tier: "budget", available: true, imageInitials: "KT", accentColor: "#06b6d4" },
  { id: "g6", name: "Maya Gurung", specialty: "Women-led Heritage & Textile Tours", languages: ["English", "Nepali", "French"], ratingOutOf5: 4.9, experienceYears: 11, dailyRateUSD: 40, tier: "standard", available: false, badge: "Top Rated", imageInitials: "MG", accentColor: "#ec4899" },
];

const PACKAGES: TourPackage[] = [
  {
    id: "pkg-solo",
    name: "Solo Explorer",
    tagline: "Discover Nepal on your own terms — affordable, flexible, authentic.",
    targetType: "solo",
    priceUSD: 79,
    durationDays: 3,
    maxGroupSize: 1,
    includedSiteCount: 3,
    includedSites: [
      "Pashupatinath Temple",
      "Boudhanath Stupa",
      "Swayambhunath Stupa"
    ],
    includesGuide: true,
    guideTier: "budget",
    colorScheme: "cyan",
    highlightBadge: "Most Affordable",
    features: ["Entry to 3 verified heritage sites", "Budget-tier licensed guide (1 day)", "Digital e-ticket with QR code", "UNESCO site etiquette guide", "Emergency helpline access"]
  },
  {
    id: "pkg-cultural",
    name: "Cultural Immersion",
    tagline: "The full Nepal experience — temple rituals, local cuisine, expert storytelling.",
    targetType: "group",
    priceUSD: 249,
    durationDays: 7,
    maxGroupSize: 8,
    includedSiteCount: 7,
    includedSites: [
      "Pashupatinath Temple",
      "Boudhanath Stupa",
      "Swayambhunath Stupa",
      "Patan Durbar Square",
      "Bhaktapur Durbar Square",
      "Changu Narayan Temple",
      "Lumbini Sacred Garden"
    ],
    includesGuide: true,
    guideTier: "standard",
    colorScheme: "gold",
    popularLabel: "Most Popular",
    features: ["Entry to 7 premium heritage sites", "Standard-tier cultural guide (3 days)", "Festival calendar integration", "Local restaurant & hotel recommendations", "Transport coordination assistance", "Group photo stops at key monuments"]
  },
  {
    id: "pkg-premium",
    name: "Premium Heritage",
    tagline: "Exclusive access, expert guides, and curated luxury for the discerning traveler.",
    targetType: "all",
    priceUSD: 499,
    durationDays: 10,
    maxGroupSize: 6,
    includedSiteCount: 12,
    includedSites: [
      "Pashupatinath Temple",
      "Boudhanath Stupa",
      "Swayambhunath Stupa",
      "Patan Durbar Square",
      "Bhaktapur Durbar Square",
      "Changu Narayan Temple",
      "Lumbini Sacred Garden",
      "Chitwan National Park",
      "Sagarmatha National Park",
      "Janaki Mandir (Janakpur)",
      "Muktinath Temple",
      "Gosaikunda Holy Lake"
    ],
    includesGuide: true,
    guideTier: "expert",
    colorScheme: "violet",
    highlightBadge: "All Inclusive",
    features: ["All 12 verified UNESCO heritage sites", "Expert-tier guide (full duration)", "After-hours exclusive site access", "Curated hotel & fine dining bookings", "Private vehicle transfers", "Puja ceremony participation", "Priority booking & concierge support"]
  },
  {
    id: "pkg-research",
    name: "Research Scholar",
    tagline: "Academic access to archives, historical sites, and expert archaeological guides.",
    targetType: "researcher",
    priceUSD: 349,
    durationDays: 5,
    maxGroupSize: 4,
    includedSiteCount: 8,
    includedSites: [
      "Pashupatinath Temple Archives",
      "Boudhanath Stupa",
      "Swayambhunath Stupa",
      "Patan Durbar Square Museum",
      "Bhaktapur Art Gallery & Durbar",
      "Changu Narayan Inscriptions",
      "Lumbini Archaeological Site",
      "National Archives of Nepal"
    ],
    includesGuide: true,
    guideTier: "expert",
    colorScheme: "emerald",
    highlightBadge: "Scholars Only",
    features: ["Access to 8 sites", "PhD-level archaeological guide", "Coordination with Dept. of Archaeology", "Photography & documentation permits", "Access to on-site artifact records", "Academic institution letter of support"]
  },
];

const SCHEME: Record<string, { badge: string; glow: string; border: string; accent: string; iconBg: string; iconText: string; barColor: string }> = {
  cyan:    { badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",      glow: "shadow-[0_0_30px_rgba(6,182,212,0.2)]",      border: "border-cyan-400/30",    accent: "text-cyan-300",    iconBg: "bg-cyan-500/15",    iconText: "text-cyan-400",    barColor: "#06b6d4" },
  gold:    { badge: "bg-amber-500/20 text-amber-300 border-amber-400/40",   glow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]",     border: "border-amber-400/30",   accent: "text-amber-300",   iconBg: "bg-amber-500/15",   iconText: "text-amber-400",   barColor: "#f59e0b" },
  emerald: { badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]", border: "border-emerald-400/30", accent: "text-emerald-300", iconBg: "bg-emerald-500/15", iconText: "text-emerald-400", barColor: "#10b981" },
  violet:  { badge: "bg-violet-500/20 text-violet-300 border-violet-400/40",  glow: "shadow-[0_0_30px_rgba(139,92,246,0.2)]",   border: "border-violet-400/30",  accent: "text-violet-300",  iconBg: "bg-violet-500/15",  iconText: "text-violet-400",  barColor: "#8b5cf6" },
};

const TIER_LABEL: Record<string, string> = { budget: "Budget Guide", standard: "Standard Guide", expert: "Expert Guide", none: "Self-Guided" };
const TIER_COLOR: Record<string, string> = { budget: "bg-slate-500/20 text-slate-300 border-slate-500/30", standard: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30", expert: "bg-amber-500/20 text-amber-300 border-amber-400/30", none: "bg-slate-600/20 text-slate-400 border-slate-600/30" };

const GuideCard: React.FC<{ guide: Guide; onSelect?: (g: Guide) => void; selected?: boolean }> = ({ guide, onSelect, selected }) => (
  <div
    onClick={() => guide.available && onSelect?.(guide)}
    className={`glass-card rounded-2xl p-4 border transition-all duration-300 relative
      ${guide.available ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}
      ${selected ? "border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.25)] bg-amber-500/10" : guide.available ? "border-white/10 hover:border-amber-400/40" : "border-white/5"}
    `}
  >
    {selected && <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center"><span className="material-symbols-outlined text-black" style={{ fontSize: "14px" }}>check</span></div>}
    {!guide.available && <div className="absolute top-3 right-3 bg-slate-700/80 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Unavailable</div>}
    <div className="flex items-start gap-3 mb-3">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm shrink-0" style={{ background: `${guide.accentColor}30`, border: `1px solid ${guide.accentColor}50` }}>
        <span style={{ color: guide.accentColor }}>{guide.imageInitials}</span>
      </div>
      <div className="min-w-0">
        <p className="font-outfit font-bold text-sm text-white leading-tight truncate">{guide.name}</p>
        <p className="font-sans-body text-[11px] text-slate-400 mt-0.5 truncate">{guide.specialty}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 mb-3">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${TIER_COLOR[guide.tier]}`}>{TIER_LABEL[guide.tier]}</span>
      {guide.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">{guide.badge}</span>}
    </div>
    <div className="grid grid-cols-3 gap-2 text-center mb-3">
      <div><p className="font-cinzel text-sm font-bold text-white">{guide.ratingOutOf5}</p><p className="font-sans-body text-[10px] text-slate-400">Rating</p></div>
      <div><p className="font-cinzel text-sm font-bold text-white">{guide.experienceYears}y</p><p className="font-sans-body text-[10px] text-slate-400">Exp.</p></div>
      <div><p className="font-cinzel text-sm font-bold text-amber-300">${guide.dailyRateUSD}</p><p className="font-sans-body text-[10px] text-slate-400">/day</p></div>
    </div>
    <div className="flex flex-wrap gap-1">
      {guide.languages.map((lang) => <span key={lang} className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{lang}</span>)}
    </div>
  </div>
);

const PackageCard: React.FC<{ pkg: TourPackage; selected: boolean; onSelect: (p: TourPackage) => void }> = ({ pkg, selected, onSelect }) => {
  const s = SCHEME[pkg.colorScheme];
  return (
    <div onClick={() => onSelect(pkg)} className={`glass-card rounded-3xl border transition-all duration-300 cursor-pointer group relative ${selected ? `${s.border} ${s.glow} scale-[1.02]` : `border-white/10 hover:${s.border} hover:${s.glow}`}`}>
      {pkg.popularLabel && <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[11px] font-bold border ${s.badge}`}>⭐ {pkg.popularLabel}</div>}
      {pkg.highlightBadge && !pkg.popularLabel && <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[11px] font-bold border ${s.badge}`}>{pkg.highlightBadge}</div>}
      <div className="h-1.5 w-full rounded-t-3xl overflow-hidden" style={{ background: `linear-gradient(90deg,${s.barColor},transparent)` }} />
      <div className="p-6">
        <div className="mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${s.badge}`}>
            {pkg.targetType === "solo" ? "🏃 Solo Tourist" : pkg.targetType === "group" ? "👥 Group Travel" : pkg.targetType === "researcher" ? "🔬 Research Scholar" : "🌏 All Travelers"}
          </span>
        </div>
        <h3 className="font-cinzel text-xl font-bold text-white mb-1">{pkg.name}</h3>
        <p className="font-sans-body text-xs text-slate-400 mb-4 leading-relaxed">{pkg.tagline}</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[{ label: "Days", value: `${pkg.durationDays}` }, { label: "Sites", value: `${pkg.includedSiteCount}` }, { label: "Max Pax", value: `${pkg.maxGroupSize}` }, { label: "Guide", value: TIER_LABEL[pkg.guideTier].split(" ")[0] }].map((stat) => {
            const isSiteStat = stat.label === "Sites";
            return (
              <div key={stat.label} className={`text-center p-2 rounded-xl ${s.iconBg} ${isSiteStat ? "relative group/sitestat cursor-pointer" : ""}`}>
                <p className={`font-cinzel text-sm font-bold ${s.accent}`}>{stat.value}</p>
                <p className="font-sans-body text-[10px] text-slate-500">{stat.label}</p>

                {isSiteStat && pkg.includedSites && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/sitestat:block w-64 p-3 bg-slate-900/95 border border-amber-400/40 rounded-xl shadow-2xl z-50 text-left backdrop-blur-md pointer-events-none">
                    <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 mb-2">
                      <span className="material-symbols-outlined text-amber-400 text-sm">location_on</span>
                      <span className="font-outfit text-xs font-bold text-amber-300">Included Sites ({pkg.includedSites.length})</span>
                    </div>
                    <ul className="space-y-1 max-h-48 overflow-y-auto">
                      {pkg.includedSites.map((site, i) => (
                        <li key={i} className="font-sans-body text-[11px] text-slate-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.barColor }}></span>
                          <span>{site}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <ul className="space-y-1.5 mb-5">
          {pkg.features.map((feat) => {
            const isSiteFeat = feat.toLowerCase().includes("site");
            return (
              <li key={feat} className={`flex items-start gap-2 ${isSiteFeat ? "relative group/sitefeat cursor-pointer" : ""}`}>
                <span className={`material-symbols-outlined text-sm mt-0.5 shrink-0 ${s.iconText}`}>
                  {isSiteFeat ? "location_on" : "check_circle"}
                </span>
                <span className={`font-sans-body text-xs ${isSiteFeat ? "text-slate-200 underline decoration-dotted underline-offset-4 group-hover/sitefeat:text-amber-300 transition-colors" : "text-slate-300"}`}>
                  {feat} {isSiteFeat && <span className="text-[10px] text-amber-400/80 ml-1 font-semibold">(hover to view sites)</span>}
                </span>

                {isSiteFeat && pkg.includedSites && (
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover/sitefeat:block w-64 p-3 bg-slate-900/95 border border-amber-400/40 rounded-xl shadow-2xl z-50 text-left backdrop-blur-md pointer-events-none">
                    <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 mb-2">
                      <span className="material-symbols-outlined text-amber-400 text-sm">map</span>
                      <span className="font-outfit text-xs font-bold text-amber-300">Included Sites ({pkg.includedSites.length})</span>
                    </div>
                    <ul className="space-y-1 max-h-48 overflow-y-auto">
                      {pkg.includedSites.map((site, i) => (
                        <li key={i} className="font-sans-body text-[11px] text-slate-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.barColor }}></span>
                          <span>{site}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="font-sans-body text-[10px] text-slate-500 uppercase tracking-wider">Starting from</p>
            <p className={`font-cinzel text-2xl font-bold ${s.accent}`}>${pkg.priceUSD}<span className="text-slate-500 text-xs font-sans-body font-normal ml-1">USD</span></p>
          </div>
          <div className={`px-4 py-2 rounded-xl font-outfit text-xs font-bold border transition-all ${selected ? `${s.badge}` : "glass border-white/20 text-slate-300"}`}>
            {selected ? "✓ Selected" : "Select Package"}
          </div>
        </div>
      </div>
    </div>
  );
};

type TravelerFilter = "all" | "solo" | "group" | "researcher";

interface TourPackagesPageProps {
  onOpenBooking?: () => void;
}

export const TourPackagesPage: React.FC<TourPackagesPageProps> = ({ onOpenBooking }) => {
  const [travelerFilter, setTravelerFilter] = useState<TravelerFilter>("all");
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [showGuides, setShowGuides] = useState(false);

  const filteredPackages = PACKAGES.filter((p) => travelerFilter === "all" || p.targetType === travelerFilter || p.targetType === "all");

  const relevantGuides = selectedPackage
    ? GUIDES.filter((g) => {
        if (selectedPackage.guideTier === 'budget') return true;
        if (selectedPackage.guideTier === 'standard') return g.tier === 'standard' || g.tier === 'expert';
        return g.tier === 'expert';
      })
    : [];

  const TRAVELER_TYPES: { key: TravelerFilter; label: string; icon: string; desc: string }[] = [
    { key: "all",        label: "All Packages",  icon: "public",       desc: "Browse everything" },
    { key: "solo",       label: "Solo Tourist",  icon: "person",       desc: "Affordable solo rates" },
    { key: "group",      label: "Group Travel",  icon: "group",        desc: "Share the experience" },
    { key: "researcher", label: "Researcher",    icon: "science",      desc: "Scholarly site access" },
  ];

  return (
    <div className="w-full min-h-screen text-slate-100 pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden py-20 px-4 md:px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <span className="inline-block font-outfit text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-3">Verified Tour Packages</span>
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Nepal Heritage<br />
            <span className="text-gold-gradient">Curated Journeys</span>
          </h1>
          <p className="font-sans-body text-base text-slate-300 max-w-2xl mb-8 leading-relaxed">
            From solo budget explorers to research scholars — choose a verified package with licensed guides, official entry permits, and priority access to Nepal&apos;s most sacred sites.
          </p>
          <div className="flex flex-wrap gap-6">
            {[{ icon: "verified", label: "12 Verified Sites", color: "text-cyan-400" }, { icon: "badge", label: "6 Licensed Guides", color: "text-amber-400" }, { icon: "shield", label: "Govt. Approved", color: "text-emerald-400" }, { icon: "currency_exchange", label: "USD Pricing", color: "text-violet-400" }].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-lg ${s.color}`}>{s.icon}</span>
                <span className="font-outfit text-xs font-semibold text-slate-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        {/* Traveler filter */}
        <section className="mb-10">
          <p className="font-outfit text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">I am a...</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TRAVELER_TYPES.map((type) => (
              <button key={type.key} onClick={() => setTravelerFilter(type.key)} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group ${travelerFilter === type.key ? "glass-panel border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : "glass border-white/10 hover:border-white/25"}`}>
                <span className={`material-symbols-outlined text-2xl mb-2 block ${travelerFilter === type.key ? "text-amber-400" : "text-slate-400 group-hover:text-slate-200"}`}>{type.icon}</span>
                <p className={`font-outfit text-sm font-bold ${travelerFilter === type.key ? "text-white" : "text-slate-300"}`}>{type.label}</p>
                <p className="font-sans-body text-[11px] text-slate-500 mt-0.5">{type.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Packages grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cinzel text-2xl font-bold text-white">{filteredPackages.length} Package{filteredPackages.length !== 1 ? "s" : ""} Available</h2>
            {selectedPackage && (
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-amber-400/30">
                <span className="material-symbols-outlined text-amber-400 text-base">inventory_2</span>
                <span className="font-outfit text-xs font-bold text-amber-300">{selectedPackage.name} Selected</span>
                <button onClick={() => { setSelectedPackage(null); setSelectedGuide(null); setShowGuides(false); }} className="material-symbols-outlined text-slate-500 hover:text-white text-sm cursor-pointer transition-colors">close</button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} selected={selectedPackage?.id === pkg.id} onSelect={(p) => { setSelectedPackage(p); setSelectedGuide(null); setShowGuides(p.includesGuide); }} />
            ))}
          </div>
        </section>

        {/* Guide selector */}
        {showGuides && selectedPackage && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-amber-400">support_agent</span>
              <h2 className="font-cinzel text-2xl font-bold text-white">Choose Your Guide</h2>
              <span className="text-[11px] font-outfit font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-lg border border-white/10">{TIER_LABEL[selectedPackage.guideTier]} included</span>
            </div>
            <p className="font-sans-body text-xs text-slate-400 mb-6">All guides are government-licensed and background-verified. Select one for your trip.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relevantGuides.map((guide) => <GuideCard key={guide.id} guide={guide} selected={selectedGuide?.id === guide.id} onSelect={setSelectedGuide} />)}
            </div>
          </section>
        )}

        {/* Booking CTA */}
        {selectedPackage && (
          <section className="mb-8">
            <div className="glass-panel rounded-3xl border border-amber-400/25 p-8 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="font-outfit text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">Your Selection</p>
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-1">{selectedPackage.name}</h3>
                  {selectedGuide ? (
                    <p className="font-sans-body text-sm text-slate-300">Guide: <span className="text-amber-300 font-bold">{selectedGuide.name}</span> · <span className="text-slate-400">{selectedGuide.specialty}</span></p>
                  ) : (
                    selectedPackage.includesGuide && <p className="font-sans-body text-xs text-amber-400/80 flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">info</span>Please select a guide above to continue</p>
                  )}
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p className="font-sans-body text-[10px] text-slate-500 uppercase tracking-wider">Total</p>
                    <p className="font-cinzel text-3xl font-bold text-amber-300">${selectedGuide ? selectedPackage.priceUSD + selectedGuide.dailyRateUSD : selectedPackage.priceUSD}<span className="text-slate-500 text-sm font-sans-body font-normal ml-1">USD</span></p>
                    {selectedGuide && <p className="font-sans-body text-[10px] text-slate-500">Package ${selectedPackage.priceUSD} + Guide ${selectedGuide.dailyRateUSD}/day</p>}
                  </div>
                  <button onClick={onOpenBooking} disabled={selectedPackage.includesGuide && !selectedGuide} className={`px-8 py-3.5 rounded-2xl font-outfit font-bold text-sm transition-all shadow-lg flex items-center gap-2 ${selectedPackage.includesGuide && !selectedGuide ? "bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed" : "glass-button-gold cursor-pointer hover:scale-105"}`}>
                    <span className="material-symbols-outlined text-lg">confirmation_number</span>
                    Book This Package
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="py-12 border-t border-white/8">
          <div className="text-center mb-10">
            <span className="font-outfit text-xs font-bold uppercase tracking-widest text-cyan-400">Process</span>
            <h2 className="font-cinzel text-3xl font-bold text-white mt-2">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "person_search", title: "Choose Profile", desc: "Select your traveler type — Solo, Group, or Researcher." },
              { step: "02", icon: "inventory_2",   title: "Pick Package",   desc: "Browse government-approved packages with verified sites." },
              { step: "03", icon: "support_agent", title: "Select Guide",   desc: "Choose from licensed, background-checked local experts." },
              { step: "04", icon: "confirmation_number", title: "Book & Go", desc: "Receive your digital e-ticket with QR code instantly." },
            ].map((step) => (
              <div key={step.step} className="glass-card rounded-2xl p-6 border border-white/10 text-center group hover:border-amber-400/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <span className="material-symbols-outlined text-amber-400 text-xl">{step.icon}</span>
                </div>
                <p className="font-cinzel text-xs text-amber-400/60 font-bold tracking-widest mb-1">{step.step}</p>
                <h4 className="font-outfit text-sm font-bold text-white mb-2">{step.title}</h4>
                <p className="font-sans-body text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
