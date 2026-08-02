import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface CustomerDashboardPageProps {
  setActiveTab: (tab: string) => void;
}

const quickLinks = [
  { icon: "account_balance", label: "Heritage Sites", tab: "sites", color: "from-cyan-500/20 to-sky-500/10 border-cyan-400/30", iconColor: "text-cyan-400" },
  { icon: "hiking", label: "Trekking Routes", tab: "trekking", color: "from-emerald-500/20 to-green-500/10 border-emerald-400/30", iconColor: "text-emerald-400" },
  { icon: "explore", label: "Hidden Gems", tab: "gems", color: "from-violet-500/20 to-purple-500/10 border-violet-400/30", iconColor: "text-violet-400" },
  { icon: "event", label: "Cultural Calendar", tab: "calendar", color: "from-amber-500/20 to-orange-500/10 border-amber-400/30", iconColor: "text-amber-400" },
  { icon: "inventory_2", label: "Tour Packages", tab: "packages", color: "from-rose-500/20 to-pink-500/10 border-rose-400/30", iconColor: "text-rose-400" },
  { icon: "confirmation_number", label: "Book a Site", tab: "sites", color: "from-sky-500/20 to-blue-500/10 border-sky-400/30", iconColor: "text-sky-400" },
];

const highlights = [
  { icon: "verified", title: "Digital Ticket", desc: "Instant QR-verified entry for heritage sites", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-400/20" },
  { icon: "group", title: "Group & Solo", desc: "Packages for every type of traveler", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-400/20" },
  { icon: "support_agent", title: "AI Guide", desc: "Himalayan Guide chatbot always available", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-400/20" },
  { icon: "translate", title: "Multi-Currency", desc: "View prices in USD or NPR", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-400/20" },
];

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({ setActiveTab }) => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<"overview" | "profile">("overview");

  if (!user) return null;

  const initials = user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-10 max-w-[1100px] mx-auto space-y-8">

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-7 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-violet-600/10 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.35)] shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <p className="text-xs font-sans-body text-slate-400 uppercase tracking-widest mb-0.5">{getGreeting()},</p>
            <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-xs font-sans-body text-slate-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Tourist Account · {user.email}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveSection(activeSection === "profile" ? "overview" : "profile")}
              className="px-3 py-2 glass rounded-xl text-xs font-sans-body font-semibold text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-base text-cyan-400">manage_accounts</span>
              My Profile
            </button>
            <button
              onClick={() => { logout(); setActiveTab("home"); }}
              className="px-3 py-2 glass rounded-xl text-xs font-sans-body font-semibold text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-400/40 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Section Toggle */}
      <div className="flex gap-2">
        {(["overview", "profile"] as const).map(s => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-5 py-2.5 rounded-xl font-sans-body text-xs font-bold capitalize transition-all cursor-pointer ${
              activeSection === s
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                : "text-slate-400 glass border border-white/8 hover:text-white"
            }`}
          >
            {s === "overview" ? "??? Overview" : "?? Profile"}
          </button>
        ))}
      </div>

      {activeSection === "overview" && (
        <>
          <section>
            <h2 className="font-cinzel text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400 text-lg">apps</span>
              Explore Nepal Heritage
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.tab + link.label}
                  onClick={() => setActiveTab(link.tab)}
                  className={`group glass-panel bg-gradient-to-br ${link.color} border rounded-2xl p-5 flex flex-col gap-3 text-left cursor-pointer hover:scale-[1.02] transition-all hover:shadow-lg`}
                >
                  <span className={`material-symbols-outlined text-2xl ${link.iconColor} group-hover:scale-110 transition-transform`}>{link.icon}</span>
                  <span className="font-cinzel text-sm font-bold text-white leading-tight">{link.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-cinzel text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-lg">star</span>
              Your Tourist Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div key={h.title} className={`glass-panel ${h.bg} border rounded-2xl p-5 flex items-start gap-4`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${h.bg}`}>
                    <span className={`material-symbols-outlined text-xl ${h.color}`}>{h.icon}</span>
                  </div>
                  <div>
                    <p className={`font-cinzel text-sm font-bold ${h.color} mb-0.5`}>{h.title}</p>
                    <p className="font-sans-body text-xs text-slate-400">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-3xl p-7 border border-cyan-500/20 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 text-center">
            <span className="material-symbols-outlined text-4xl text-cyan-400 mb-3 block">explore</span>
            <h2 className="font-cinzel text-xl font-bold text-white mb-2">Start Exploring Nepal</h2>
            <p className="font-sans-body text-xs text-slate-400 max-w-md mx-auto mb-5">
              Discover UNESCO heritage sites, hidden gems off the beaten path, and upcoming cultural festivals — all verified and curated.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => setActiveTab("sites")} className="glass-button-cyan px-6 py-2.5 rounded-xl font-sans-body text-xs font-bold flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-base">account_balance</span>
                Browse Heritage Sites
              </button>
              <button onClick={() => setActiveTab("gems")} className="glass px-6 py-2.5 rounded-xl font-sans-body text-xs font-bold border border-white/15 text-slate-200 hover:text-white flex items-center gap-2 cursor-pointer transition-all">
                <span className="material-symbols-outlined text-base text-violet-400">explore</span>
                Hidden Gems
              </button>
            </div>
          </section>
        </>
      )}

      {activeSection === "profile" && (
        <section className="glass-panel rounded-3xl p-7 border border-white/10 space-y-6">
          <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">manage_accounts</span>
            My Account Details
          </h2>
          <div className="space-y-3">
            {[
              { icon: "badge", label: "Full Name", value: user.name },
              { icon: "email", label: "Email Address", value: user.email },
              { icon: "shield", label: "Account Role", value: "Tourist / Traveler" },
              { icon: "verified_user", label: "Account Status", value: "Active & Verified" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-4 glass rounded-xl px-5 py-4 border border-white/8">
                <span className="material-symbols-outlined text-lg text-cyan-400 shrink-0">{row.icon}</span>
                <div className="flex-1">
                  <p className="text-[10px] font-sans-body text-slate-400 uppercase tracking-wider">{row.label}</p>
                  <p className="text-sm font-cinzel font-bold text-white mt-0.5">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => { logout(); setActiveTab("home"); }}
              className="w-full py-3.5 rounded-xl font-sans-body text-xs font-bold text-red-400 border border-red-500/25 hover:bg-red-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Sign Out of Account
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
