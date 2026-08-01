import React, { useEffect, useState } from 'react';
import { DashboardStats, Booking } from '../types';
import { api } from '../services/api';

interface AdminDashboardPageProps {
  setAdminTab: (tab: 'dashboard' | 'bookings' | 'approvals' | 'content') => void;
  onSelectBooking: (booking: Booking) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  setAdminTab,
  onSelectBooking,
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchRef, setSearchRef] = useState('');

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const handleQuickLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef) return;
    try {
      const booking = await api.getBookingById(searchRef.trim());
      onSelectBooking(booking);
    } catch {
      alert(`Booking ref #${searchRef} not found. Please try BK-8924.`);
    }
  };

  if (loading || !stats) {
    return (
      <div className="p-8 space-y-6 animate-pulse text-slate-100">
        <div className="h-10 glass rounded-xl w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 glass rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const { metrics, activities, recentBookings } = stats;

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1200px] mx-auto w-full text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-headline text-3xl md:text-4xl font-bold text-white">
            Operator Dashboard
          </h1>
          <p className="font-sans-body text-xs text-slate-400">
            Annapurna &amp; Kathmandu Valley Municipal Heritage Overview
          </p>
        </div>

        {/* Quick Booking Lookup Bar */}
        <form onSubmit={handleQuickLookup} className="flex gap-2">
          <input
            type="text"
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder="Quick Ref # (e.g. BK-8924)"
            className="glass-input rounded-xl px-3.5 py-2 text-xs font-sans-body focus:outline-none"
          />
          <button
            type="submit"
            className="glass-button-cyan font-bold px-4 py-2 rounded-xl text-xs font-sans-body cursor-pointer shadow-md"
          >
            Lookup
          </button>
        </form>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="font-sans-body text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <span className="material-symbols-outlined text-xl text-cyan-400">payments</span>
          </div>
          <div className="font-serif-headline text-2xl font-bold text-white">
            ${metrics.totalRevenueUSD.toLocaleString()}.00 USD
          </div>
          <div className="font-sans-body text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+14.2% from last month</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="font-sans-body text-xs font-bold uppercase tracking-wider">Total Bookings</span>
            <span className="material-symbols-outlined text-xl text-cyan-400">confirmation_number</span>
          </div>
          <div className="font-serif-headline text-2xl font-bold text-white">
            {metrics.totalBookingsCount} Issued
          </div>
          <div className="font-sans-body text-[11px] text-slate-300">
            {metrics.activeClientGroups} Active Groups
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="font-sans-body text-xs font-bold uppercase tracking-wider">Active Operators</span>
            <span className="material-symbols-outlined text-xl text-cyan-400">nature_people</span>
          </div>
          <div className="font-serif-headline text-2xl font-bold text-white">
            {metrics.activeOperatorsCount} Licensed
          </div>
          <div className="font-sans-body text-[11px] text-slate-300">
            Department Accredited
          </div>
        </div>

        <div
          onClick={() => setAdminTab('approvals')}
          className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl space-y-2 cursor-pointer hover:border-cyan-400/50 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="font-sans-body text-xs font-bold uppercase tracking-wider">Pending Approvals</span>
            <span className="material-symbols-outlined text-xl text-amber-400">verified_user</span>
          </div>
          <div className="font-serif-headline text-2xl font-bold text-white">
            {metrics.pendingApprovalsCount} Agency Apps
          </div>
          <div className="font-sans-body text-[11px] text-cyan-400 font-bold flex items-center gap-1">
            <span>Review Applications</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Bookings + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif-headline text-xl font-bold text-white">
              Recent Booking Transactions
            </h2>
            <button
              onClick={() => setAdminTab('bookings')}
              className="text-cyan-400 font-sans-body text-xs font-bold hover:underline cursor-pointer"
            >
              View All Bookings →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans-body text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-2">Ref #</th>
                  <th className="py-3 px-2">Client Group</th>
                  <th className="py-3 px-2">Site / Trek</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-2 font-bold text-white">{b.id}</td>
                    <td className="py-3.5 px-2 text-slate-300">{b.clientName}</td>
                    <td className="py-3.5 px-2 font-bold text-cyan-300">{b.siteName}</td>
                    <td className="py-3.5 px-2 text-slate-300">{b.visitDate}</td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                            : b.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                            : 'bg-red-500/20 text-red-300 border-red-400/30'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => onSelectBooking(b)}
                        className="text-cyan-400 hover:text-white font-bold cursor-pointer"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <h2 className="font-serif-headline text-xl font-bold text-white">
            Operator Activity Log
          </h2>

          <div className="space-y-4 font-sans-body text-xs">
            {activities.map((act) => (
              <div key={act.id} className="p-3.5 glass rounded-2xl border border-white/10 space-y-1">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="font-bold text-cyan-300">{act.operator}</span>
                  <span className="text-[10px]">{act.timeAgo}</span>
                </div>
                <div className="font-bold text-white text-xs">{act.title}</div>
                <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1">
                  <span>Status: <strong className="text-cyan-400">{act.status}</strong></span>
                  <span className="capitalize text-slate-400 text-[10px]">{act.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
