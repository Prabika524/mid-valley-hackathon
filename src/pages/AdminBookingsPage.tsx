import React, { useEffect, useState } from 'react';
import { Booking } from '../types';
import { api } from '../services/api';

interface AdminBookingsPageProps {
  onSelectBooking: (booking: Booking) => void;
}

export const AdminBookingsPage: React.FC<AdminBookingsPageProps> = ({
  onSelectBooking,
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await api.getBookings();
      setBookings(data);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    const matchesSite =
      selectedSite === 'All' || b.siteName.toLowerCase().includes(selectedSite.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All' || b.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesQuery =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.siteName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSite && matchesStatus && matchesQuery;
  });

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1200px] mx-auto w-full text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-headline text-3xl font-bold text-white">
            Booking Transactions
          </h1>
          <p className="font-sans-body text-xs text-slate-400">
            Manage, verify, and edit client ticket reservations.
          </p>
        </div>

        <button
          onClick={loadBookings}
          className="glass text-slate-200 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold font-sans-body hover:bg-white/10 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          <span>Refresh Bookings</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="glass-input rounded-xl px-3 py-2 text-xs font-sans-body focus:outline-none"
          >
            <option value="All" className="bg-slate-900 text-white">All Sites &amp; Routes</option>
            <option value="Bhaktapur" className="bg-slate-900 text-white">Bhaktapur Durbar</option>
            <option value="Patan" className="bg-slate-900 text-white">Patan Durbar</option>
            <option value="Pashupatinath" className="bg-slate-900 text-white">Pashupatinath</option>
            <option value="Boudhanath" className="bg-slate-900 text-white">Boudhanath</option>
            <option value="Annapurna" className="bg-slate-900 text-white">Annapurna Expedition</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="glass-input rounded-xl px-3 py-2 text-xs font-sans-body focus:outline-none"
          >
            <option value="All" className="bg-slate-900 text-white">All Statuses</option>
            <option value="Confirmed" className="bg-slate-900 text-white">Confirmed</option>
            <option value="Pending" className="bg-slate-900 text-white">Pending</option>
            <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search ref #, name, or site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 glass-input rounded-xl text-xs font-sans-body focus:outline-none"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-sans-body text-xs text-slate-400">
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-slate-500">search_off</span>
            <div className="font-serif-headline font-bold text-lg text-white">No Bookings Found</div>
            <p className="font-sans-body text-xs text-slate-400">Try clearing your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans-body text-xs">
              <thead>
                <tr className="glass border-b border-white/10 text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ref #</th>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Site / Expedition</th>
                  <th className="py-3.5 px-4">Visit Date</th>
                  <th className="py-3.5 px-4">Guests</th>
                  <th className="py-3.5 px-4">Total Fee</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{b.id}</td>
                    <td className="py-4 px-4 text-slate-300">
                      <div className="font-bold text-white">{b.clientName}</div>
                      <div className="text-[10px] text-slate-400">{b.email}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-cyan-300">{b.siteName}</td>
                    <td className="py-4 px-4 text-slate-300">{b.visitDate}</td>
                    <td className="py-4 px-4 text-slate-300">{b.guests}</td>
                    <td className="py-4 px-4 font-bold text-white">${b.totalPriceUSD}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
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
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onSelectBooking(b)}
                        className="glass-button-cyan font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Details &amp; Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
