import React, { useState, useEffect } from 'react';
import { HeritageSite, Booking } from '../types';
import { api } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: HeritageSite | null;
  onProceedToCheckout: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  site,
  onProceedToCheckout,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('Foreign National');
  const [visitDate, setVisitDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [travelerType, setTravelerType] = useState<'solo' | 'group' | 'researcher'>('solo');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !site) return null;

  const basePriceUSD = site.foreignFeeUSD || 15;
  const totalPriceUSD = basePriceUSD * guests;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!fullName || !email || !visitDate) {
      setError('Please fill in your name, email, and visit date');
      return;
    }

    try {
      setLoading(true);
      const booking = await api.createBooking({
        clientName: fullName,
        email,
        passportNumber,
        nationality,
        siteId: site.id,
        siteName: site.name,
        visitDate,
        guests,
        totalPriceUSD,
        paymentMethod: 'Card',
      });
      setLoading(false);
      onClose();
      onProceedToCheckout(booking);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Booking creation failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md glass-panel h-full shadow-2xl z-10 flex flex-col border-l border-white/15 overflow-hidden text-slate-100 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 glass">
          <div>
            <h2 className="font-serif-headline text-2xl font-bold text-white">
              Book Tickets
            </h2>
            <p className="font-sans-body text-xs text-cyan-400 mt-0.5">
              {site.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-300 text-xs rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Traveler Type */}
            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'solo' as const, label: 'Solo Tourist', icon: 'person', desc: 'Affordable' },
                  { key: 'group' as const, label: 'Group', icon: 'group', desc: 'Shared' },
                  { key: 'researcher' as const, label: 'Researcher', icon: 'science', desc: 'Academic' },
                ].map((type) => (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => setTravelerType(type.key)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      travelerType === type.key
                        ? 'border-amber-400/60 bg-amber-500/15 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                        : 'border-white/10 glass hover:border-white/25'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-xl block mx-auto mb-1 ${
                      travelerType === type.key ? 'text-amber-400' : 'text-slate-400'
                    }`}>{type.icon}</span>
                    <p className={`font-outfit text-[11px] font-bold ${
                      travelerType === type.key ? 'text-amber-300' : 'text-slate-300'
                    }`}>{type.label}</p>
                    <p className="font-sans-body text-[10px] text-slate-500">{type.desc}</p>
                  </button>
                ))}
              </div>
              {travelerType === 'researcher' && (
                <div className="mt-2 p-2.5 rounded-xl bg-violet-500/10 border border-violet-400/25 flex items-start gap-2">
                  <span className="material-symbols-outlined text-violet-400 text-sm mt-0.5">info</span>
                  <p className="font-sans-body text-[11px] text-violet-300">Academic access includes restricted zones. Please bring your institution ID on the day of visit.</p>
                </div>
              )}
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-sm focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-sm focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nationality
                </label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-3 font-sans-body text-sm bg-slate-900/90 text-white focus:outline-none"
                >
                  <option value="Foreign National" className="bg-slate-900 text-white">Foreign ($15)</option>
                  <option value="SAARC Member" className="bg-slate-900 text-white">SAARC ($5)</option>
                  <option value="Nepali Citizen" className="bg-slate-900 text-white">Nepali (Free)</option>
                </select>
              </div>

              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Passport / ID
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="Passport ID"
                  className="w-full glass-input rounded-xl px-3 py-3 font-sans-body text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Visit Date *
              </label>
              <input
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Number of Visitors
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/20 rounded-xl glass overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="px-4 py-2.5 hover:bg-white/10 transition-colors text-white font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 font-bold font-sans-body text-base text-cyan-400">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="px-4 py-2.5 hover:bg-white/10 transition-colors text-white font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <div className="text-right flex-1">
                  <div className="font-sans-body text-xs text-slate-400">Total Fee</div>
                  <div className="font-serif-headline font-bold text-xl text-cyan-400">
                    ${totalPriceUSD}.00 USD
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3">
              <span className="material-symbols-outlined text-cyan-400 text-xl">shield</span>
              <p>
                100% of your ticket fee supports ongoing site conservation, restoration, and local heritage craftsman programs.
              </p>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 glass">
          <button
            type="submit"
            form="booking-form"
            disabled={loading}
            className="w-full glass-button-cyan font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-sans-body text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin material-symbols-outlined">refresh</span>
            ) : (
              <>
                <span>Proceed to Payment (${totalPriceUSD}.00)</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
