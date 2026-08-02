import React from 'react';
import { useAuth } from '../context/AuthContext';

interface AdminSidebarProps {
  adminTab: 'dashboard' | 'bookings' | 'approvals' | 'content' | 'booking-detail';
  setAdminTab: (tab: 'dashboard' | 'bookings' | 'approvals' | 'content') => void;
  setActiveTab: (tab: string) => void;
  onAddNewListing?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  adminTab,
  setAdminTab,
  setActiveTab,
  onAddNewListing,
}) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: 'dashboard' },
    { id: 'bookings', label: 'Bookings', icon: 'event_available' },
    { id: 'approvals', label: 'Approvals', icon: 'verified_user' },
    { id: 'content', label: 'Content', icon: 'edit_note' },
  ];

  return (
    <aside className="w-full md:w-64 glass-panel flex flex-col p-5 shrink-0 border-r border-white/10 text-white min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="font-serif-headline font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Operator Portal
          </div>
          <div className="font-sans-body text-xs text-slate-400 mt-0.5">
            Managing Annapurna &amp; Heritage
          </div>
        </div>
        <button
          onClick={() => setActiveTab('home')}
          className="md:hidden text-cyan-400 hover:bg-white/10 p-2 rounded-xl"
          title="Back to Public Site"
        >
          <span className="material-symbols-outlined">public</span>
        </button>
      </div>

      {/* Admin / Operator User Profile */}
      <div className="mb-6 p-3.5 glass rounded-2xl flex items-center gap-3 border border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md overflow-hidden shrink-0">
          {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-sans-body font-bold text-sm text-white truncate">
            {user?.name || 'Admin User'}
          </div>
          <div className="font-sans-body text-xs text-cyan-400 truncate">
            {user?.companyName || user?.role || 'Operator'}
          </div>
        </div>
      </div>

      {/* Add New Listing Button */}
      <button
        onClick={() => {
          if (onAddNewListing) onAddNewListing();
          else setAdminTab('content');
        }}
        className="w-full glass-button-cyan font-bold py-3 px-4 rounded-xl font-sans-body text-xs transition-all flex items-center justify-center gap-2 mb-6 shadow-lg cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">add</span>
        Add New Listing
      </button>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = adminTab === item.id || (adminTab === 'booking-detail' && item.id === 'bookings');
          return (
            <button
              key={item.id}
              onClick={() => setAdminTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans-body text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-400 font-bold border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.2)] translate-x-1'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${isActive ? 'text-cyan-400 fill-1' : 'text-slate-400'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-white/10 space-y-2 mt-auto">
        <button
          onClick={() => setActiveTab('home')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-sans-body text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg text-cyan-400">open_in_new</span>
          <span>View Main Portal</span>
        </button>
        <button
          onClick={() => {
            logout();
            setActiveTab('home');
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-sans-body text-xs text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
