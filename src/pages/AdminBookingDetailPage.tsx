import React, { useState } from 'react';
import { Booking } from '../types';
import { api } from '../services/api';

interface AdminBookingDetailPageProps {
  booking: Booking;
  onBack: () => void;
  onUpdateBooking: (updated: Booking) => void;
}

export const AdminBookingDetailPage: React.FC<AdminBookingDetailPageProps> = ({
  booking,
  onBack,
  onUpdateBooking,
}) => {
  const [notes, setNotes] = useState(booking.operatorNotes || '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [status, setStatus] = useState(booking.status);
  const [savingStatus, setSavingStatus] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    setMessage('');
    try {
      const updated = await api.updateBookingNotes(booking.id, notes);
      setSavingNotes(false);
      setMessage('Operator notes saved successfully');
      onUpdateBooking(updated);
    } catch (err: any) {
      setSavingNotes(false);
      setMessage(err.message || 'Failed to save notes');
    }
  };

  const handleStatusChange = async (newStatus: 'Confirmed' | 'Pending' | 'Cancelled') => {
    setSavingStatus(true);
    setMessage('');
    try {
      const updated = await api.updateBookingStatus(booking.id, newStatus);
      setStatus(newStatus);
      setSavingStatus(false);
      setMessage(`Status updated to ${newStatus}`);
      onUpdateBooking(updated);
    } catch (err: any) {
      setSavingStatus(false);
      setMessage(err.message || 'Failed to update status');
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1000px] mx-auto w-full text-slate-100">
      <button
        onClick={onBack}
        className="text-cyan-400 font-sans-body text-xs font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        <span>Back to Bookings Table</span>
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-serif-headline text-3xl font-bold text-white">
              Booking #{booking.id}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-sans-body border ${
                status === 'Confirmed'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                  : status === 'Pending'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                  : 'bg-red-500/20 text-red-300 border-red-400/30'
              }`}
            >
              {status}
            </span>
          </div>
          <p className="font-sans-body text-xs text-slate-400">
            Created on {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Status Actions */}
        <div className="flex items-center gap-2">
          {status !== 'Confirmed' && (
            <button
              onClick={() => handleStatusChange('Confirmed')}
              disabled={savingStatus}
              className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold px-4 py-2 rounded-xl text-xs font-sans-body hover:bg-emerald-500/30 transition-colors cursor-pointer"
            >
              Confirm Reservation
            </button>
          )}
          {status !== 'Cancelled' && (
            <button
              onClick={() => handleStatusChange('Cancelled')}
              disabled={savingStatus}
              className="bg-red-500/20 text-red-300 border border-red-500/30 font-bold px-4 py-2 rounded-xl text-xs font-sans-body hover:bg-red-500/30 transition-colors cursor-pointer"
            >
              Cancel Reservation
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="p-3 glass border border-cyan-400/30 text-cyan-300 text-xs rounded-xl font-bold font-sans-body flex items-center gap-2">
          <span className="material-symbols-outlined text-base">info</span>
          <span>{message}</span>
        </div>
      )}

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visitor Info Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <h2 className="font-serif-headline text-xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">person</span>
            Visitor Details
          </h2>
          <div className="carved-line opacity-30" />
          <div className="space-y-2.5 font-sans-body text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Client Name:</span>
              <strong className="text-white">{booking.clientName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <strong className="text-white">{booking.email}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Phone:</span>
              <strong className="text-white">{booking.phone || 'N/A'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Passport / ID:</span>
              <strong className="text-white">{booking.passportNumber || 'N/A'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Nationality:</span>
              <strong className="text-white">{booking.nationality || 'Foreign National'}</strong>
            </div>
          </div>
        </div>

        {/* Site & Financials Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <h2 className="font-serif-headline text-xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">receipt_long</span>
            Ticket &amp; Commission
          </h2>
          <div className="carved-line opacity-30" />
          <div className="space-y-2.5 font-sans-body text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Site / Expedition:</span>
              <strong className="text-cyan-300">{booking.siteName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Visit Date:</span>
              <strong className="text-white">{booking.visitDate}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Guests Count:</span>
              <strong className="text-white">{booking.guests}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Fee Paid:</span>
              <strong className="text-white">${booking.totalPriceUSD}.00 USD</strong>
            </div>
            <div className="flex justify-between py-1.5 glass px-3 rounded-xl border border-white/10">
              <span className="text-slate-300">Operator Commission (15%):</span>
              <strong className="text-emerald-400">${booking.commissionUSD || Math.round(booking.totalPriceUSD * 0.15)} USD</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Operator Notes Editor */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <h2 className="font-serif-headline text-xl font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-cyan-400">edit_note</span>
          Operator Dispatch Notes
        </h2>
        <p className="font-sans-body text-xs text-slate-400">
          Add internal notes regarding guide assignment, gate entry instructions, or special client requests.
        </p>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Assigned guide Pemba Sherpa. Client requested morning entry at Lion Gate."
          className="w-full glass-input rounded-xl p-4 font-sans-body text-xs focus:outline-none"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSaveNotes}
            disabled={savingNotes}
            className="glass-button-cyan font-bold py-2.5 px-6 rounded-xl font-sans-body text-xs transition-colors shadow-md cursor-pointer disabled:opacity-50"
          >
            {savingNotes ? 'Saving Notes...' : 'Save Dispatch Notes'}
          </button>
        </div>
      </div>
    </div>
  );
};
