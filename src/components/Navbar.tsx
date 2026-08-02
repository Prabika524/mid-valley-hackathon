import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal?: () => void;
  onOpenSearch: () => void;
  currency: 'USD' | 'NPR';
  toggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openBookingModal,
  onOpenSearch,
  currency,
  toggleCurrency,
}) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Primary visible nav links
  const primaryLinks = [
    { id: 'gems',     label: 'Hidden Gems',      icon: 'explore' },
    { id: 'calendar', label: 'Cultural Calendar', icon: 'event' },
    { id: 'packages', label: 'Tour Packages',     icon: 'inventory_2' },
  ];

  // Secondary links hidden inside the "⋯" more menu
  const moreLinks = [
    { id: 'home',     label: 'Home',             icon: 'home' },
    { id: 'sites',    label: 'Heritage Sites',   icon: 'account_balance' },
    { id: 'trekking', label: 'Trekking Routes',  icon: 'hiking' },
  ];

  // All links for mobile menu
  const allLinks = [...primaryLinks, ...moreLinks];

  // Close more-menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderNavBtn = (id: string, label: string, icon: string) => {
    const isActive = activeTab === id;
    return (
      <button
        key={id}
        onClick={() => { setActiveTab(id); setMoreMenuOpen(false); }}
        className={`px-3.5 py-2 rounded-xl font-sans-body text-xs font-semibold tracking-wide transition-all cursor-pointer relative flex items-center gap-1.5 whitespace-nowrap ${
          isActive
            ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_14px_rgba(34,211,238,0.25)]'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className={`material-symbols-outlined text-base ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
          {icon}
        </span>
        <span>{label}</span>
        {isActive && (
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
        )}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 glass-navbar text-white transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-cyan-950/80 border-b border-cyan-500/20 py-1 px-4 text-[11px] font-sans-body hidden sm:block">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="token-pulse" />
              PILOT SITE LIVE:
            </span>
            <span>Verified Digital Ticketing Active for Changu Narayan Temple</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">Department of Archaeology Approved</span>
            <span className="text-cyan-400">24/7 Helpline: +977-1-4200000</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Row */}
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1280px] mx-auto h-[68px]">

        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="font-cinzel text-lg font-bold flex items-center gap-2.5 cursor-pointer group text-left shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 flex items-center justify-center shadow-[0_0_18px_rgba(34,211,238,0.45)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl text-white">account_balance</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 font-bold tracking-tight text-base">Nepal Heritage</span>
            <span className="text-[9px] font-outfit font-semibold tracking-[0.2em] text-cyan-400/80 uppercase mt-0.5">
              Conservation Portal
            </span>
          </div>
        </button>

        {/* Desktop Primary Nav + More Menu */}
        <nav className="hidden lg:flex items-center gap-1 h-full ml-6">
          {primaryLinks.map((link) => renderNavBtn(link.id, link.label, link.icon))}

          {/* ⋯ More Menu */}
          <div ref={moreMenuRef} className="relative">
            <button
              onClick={() => setMoreMenuOpen((v) => !v)}
              className={`px-3 py-2 rounded-xl font-sans-body text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                moreMenuOpen || moreLinks.some((l) => l.id === activeTab)
                  ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              title="More pages"
              aria-label="More navigation options"
            >
              <span className="material-symbols-outlined text-base">more_horiz</span>
              {moreLinks.some((l) => l.id === activeTab) && (
                <span className="text-cyan-300 text-[10px] font-bold hidden xl:inline">
                  {moreLinks.find((l) => l.id === activeTab)?.label}
                </span>
              )}
            </button>

            {moreMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 glass-panel rounded-2xl shadow-2xl border border-white/12 py-1.5 z-50">
                {/* Arrow tip */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 glass-panel border-l border-t border-white/12 rotate-45" />
                {moreLinks.map((link) => {
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => { setActiveTab(link.id); setMoreMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 font-sans-body text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isActive
                          ? 'text-cyan-300 bg-cyan-500/12'
                          : 'text-slate-300 hover:text-white hover:bg-white/8'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-base ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                        {link.icon}
                      </span>
                      {link.label}
                      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-input text-slate-300 hover:text-white hover:border-cyan-400/50 text-xs font-sans-body transition-all cursor-pointer group"
            title="Search (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-base text-cyan-400 group-hover:scale-110 transition-transform">search</span>
            <span className="hidden xl:inline">Search...</span>
            <kbd className="hidden xl:inline px-1.5 py-0.5 glass text-[10px] font-mono text-slate-400 rounded border border-white/10">/</kbd>
          </button>

          {/* Currency */}
          <button
            onClick={toggleCurrency}
            className="px-2.5 py-1.5 rounded-full glass text-[11px] font-bold text-cyan-300 border border-cyan-400/25 hover:border-cyan-400/55 transition-all cursor-pointer"
            title="Switch Currency"
          >
            {currency}
          </button>

          {/* Book Ticket CTA */}
          {openBookingModal && (
            <button
              onClick={openBookingModal}
              className="glass-button-cyan px-4 py-2 rounded-full font-sans-body text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">confirmation_number</span>
              <span>Book Ticket</span>
            </button>
          )}

          {/* Auth / Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-all border border-cyan-500/25 cursor-pointer shadow-md"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold flex items-center justify-center text-xs border border-cyan-300/40">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-xs hidden xl:block">
                  <div className="font-bold text-white leading-tight">{user.name}</div>
                  <div className="text-cyan-400 text-[10px] capitalize">{user.role}</div>
                </div>
                <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl shadow-2xl border border-white/12 py-2 z-50">
                  <div className="px-4 py-2 border-b border-white/10 text-xs mb-1">
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
                  </div>
                  {(user.role === 'admin' || user.role === 'operator') && (
                    <button
                      onClick={() => { setActiveTab('admin'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 font-sans-body text-xs text-slate-200 hover:bg-white/10 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg text-cyan-400">dashboard</span>
                      Operator Dashboard
                    </button>
                  )}
                  {user.role === 'user' && (
                    <button
                      onClick={() => { setActiveTab('customer'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 font-sans-body text-xs text-slate-200 hover:bg-white/10 hover:text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg text-emerald-400">travel_explore</span>
                      My Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => { logout(); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 font-sans-body text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('login')}
                className="px-3.5 py-1.5 rounded-full glass text-slate-200 hover:text-white transition-all font-sans-body text-xs font-semibold cursor-pointer border border-white/12"
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className="px-3.5 py-1.5 rounded-full glass-button-cyan text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Mobile: Search + Hamburger */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <button onClick={onOpenSearch} className="p-2 glass rounded-xl text-cyan-300 border border-white/10 cursor-pointer" aria-label="Search">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 glass rounded-xl text-cyan-400 border border-cyan-400/30 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cyan-500/20 px-4 py-4 space-y-2">
          {/* Search */}
          <button
            onClick={() => { onOpenSearch(); setMobileMenuOpen(false); }}
            className="w-full py-2.5 px-4 glass-input rounded-xl text-slate-300 text-xs font-sans-body flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-cyan-400">search</span>
            <span>Search sites, treks, events...</span>
          </button>

          {/* All nav links */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {allLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false); }}
                  className={`px-3 py-3 rounded-xl font-sans-body text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-300 glass border border-white/8 hover:border-white/20'
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {link.icon}
                  </span>
                  <span className="leading-tight">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom: currency + auth */}
          <div className="pt-2 border-t border-white/8 flex items-center justify-between">
            <button onClick={toggleCurrency} className="px-3 py-1.5 rounded-full glass text-xs font-bold text-cyan-300 border border-cyan-400/30">
              {currency}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-sans-body">{user.name}</span>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-xs text-red-400 font-bold font-sans-body hover:text-red-300 cursor-pointer">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => { setActiveTab('login'); setMobileMenuOpen(false); }} className="text-xs text-slate-300 font-sans-body font-bold hover:text-white cursor-pointer">Login</button>
                <button onClick={() => { setActiveTab('register'); setMobileMenuOpen(false); }} className="px-3 py-1.5 rounded-full glass-button-cyan text-xs font-bold cursor-pointer">Apply</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};


