import React, { useState } from 'react';
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

  const navLinks = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'sites', label: 'Heritage Sites', icon: 'account_balance' },
    { id: 'trekking', label: 'Trekking Routes', icon: 'hiking' },
    { id: 'packages', label: 'Tour Packages', icon: 'inventory_2' },
    { id: 'gems', label: 'Hidden Gems', icon: 'explore' },
    { id: 'calendar', label: 'Cultural Calendar', icon: 'event' },
  ];

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

      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1280px] mx-auto h-20">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="font-serif-headline text-xl md:text-2xl font-bold flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined fill-1 text-2xl">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 font-bold tracking-tight">
                Nepal Heritage
              </span>
              <span className="text-[10px] font-sans-body font-semibold tracking-widest text-cyan-400 uppercase -mt-1">
                Conservation Portal
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex gap-1 items-center h-full">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-4 py-2 rounded-xl font-sans-body text-xs font-semibold tracking-wide transition-all cursor-pointer relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`material-symbols-outlined text-base ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-input text-slate-300 hover:text-white hover:border-cyan-400/50 text-xs font-sans-body transition-all cursor-pointer group"
            title="Search sites, treks, festivals (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-base text-cyan-400 group-hover:scale-110 transition-transform">
              search
            </span>
            <span className="text-slate-300">Search...</span>
            <kbd className="px-1.5 py-0.5 glass text-[10px] font-mono text-slate-400 rounded-md border border-white/10 ml-1">
              /
            </kbd>
          </button>

          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="px-3 py-1.5 rounded-full glass text-xs font-bold text-cyan-300 border border-cyan-400/30 hover:border-cyan-400/60 transition-all cursor-pointer flex items-center gap-1"
            title="Switch Currency"
          >
            <span className="text-slate-400 text-[10px]">CURRENCY:</span>
            <span>{currency}</span>
          </button>

          {/* Quick Booking CTA */}
          {openBookingModal && (
            <button
              onClick={openBookingModal}
              className="glass-button-cyan px-4 py-2 rounded-full font-sans-body text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">confirmation_number</span>
              <span>Book Ticket</span>
            </button>
          )}

          {/* Auth & Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass hover:bg-white/10 transition-all border border-cyan-500/30 text-left cursor-pointer shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-md border border-cyan-300/40">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white leading-tight">{user.name}</div>
                  <div className="text-cyan-400 font-medium capitalize text-[10px]">{user.role} Portal</div>
                </div>
                <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl border border-cyan-500/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-white/10 text-xs">
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
                  </div>
                  {(user.role === 'admin' || user.role === 'operator') && (
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 font-sans-body text-xs text-slate-200 hover:bg-white/10 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg text-cyan-400">dashboard</span>
                      <span>Operator Dashboard</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 font-sans-body text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('login')}
                className="px-4 py-2 rounded-full glass text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all font-sans-body text-xs font-semibold cursor-pointer border border-white/15"
              >
                Operator Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className="px-4 py-2 rounded-full glass-button-cyan text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Apply as Operator
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu & Search Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 glass rounded-xl text-cyan-300 border border-white/10 cursor-pointer"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 glass rounded-xl text-cyan-400 border border-cyan-400/30 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cyan-500/30 px-4 py-5 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 glass-input rounded-xl text-slate-300 text-xs font-sans-body flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-cyan-400">search</span>
                <span>Search sites, treks, events...</span>
              </span>
              <span className="text-[10px] text-cyan-400 font-bold">SEARCH</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-sans-body text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                  activeTab === link.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-cyan-400">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                {activeTab === link.id && (
                  <span className="material-symbols-outlined text-sm text-cyan-400">chevron_right</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-slate-400 font-sans-body">Display Currency</span>
              <button
                onClick={toggleCurrency}
                className="px-3 py-1 rounded-full glass text-xs font-bold text-cyan-300 border border-cyan-400/30"
              >
                {currency}
              </button>
            </div>

            {user ? (
              <div className="space-y-2 pt-2">
                <div className="px-3 py-2 font-bold text-xs text-cyan-400 glass rounded-xl">
                  Logged in as {user.name} ({user.role})
                </div>
                {(user.role === 'admin' || user.role === 'operator') && (
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-3 rounded-xl glass-button-cyan text-xs font-bold"
                  >
                    Operator Portal Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-xs font-bold border border-red-500/20"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center glass rounded-xl text-xs font-bold text-slate-200"
                >
                  Operator Login
                </button>
                <button
                  onClick={() => {
                    setActiveTab('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center glass-button-cyan rounded-xl text-xs font-bold"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
