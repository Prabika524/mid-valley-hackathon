import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

interface CheckoutPageProps {
  booking: Booking | null;
  onBackToHome: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  booking,
  onBackToHome,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'esewa' | 'khalti'>('card');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || isPaid) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPaid]);

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-slate-100">
        <span className="material-symbols-outlined text-5xl text-slate-400 mb-3">confirmation_number</span>
        <h2 className="font-serif-headline text-2xl font-bold text-white mb-2">
          No Pending Booking Found
        </h2>
        <p className="font-sans-body text-xs text-slate-300 mb-6">
          Please select a heritage site or trekking route to issue a ticket.
        </p>
        <button
          onClick={onBackToHome}
          className="glass-button-cyan font-bold py-3 px-6 rounded-xl font-sans-body text-xs"
        >
          Return to Heritage Portal
        </button>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1800);
  };

  return (
    <div className="w-full px-4 md:px-10 max-w-[1000px] mx-auto py-12 min-h-screen text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBackToHome}
          className="text-cyan-400 font-sans-body text-xs font-bold flex items-center gap-1.5 mb-4 hover:underline cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Back to Heritage Directory</span>
        </button>
        <h1 className="font-serif-headline text-3xl md:text-4xl font-bold text-white">
          {isPaid ? 'Ticket Confirmation' : 'Secure Heritage Checkout'}
        </h1>
      </div>

      {!isPaid ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Reservation Countdown & Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Timer Banner */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-sans-body font-bold text-white">
                <span className="material-symbols-outlined text-cyan-400 text-lg">timer</span>
                <span>Ticket held for:</span>
              </div>
              <span className="font-serif-headline text-lg font-bold text-cyan-300">
                {formattedTime}
              </span>
            </div>

            {/* Payment Options */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h2 className="font-serif-headline text-xl font-bold text-white">
                Select Payment Method
              </h2>

              <div className="space-y-3">
                {/* Credit / Debit Card */}
                <label
                  onClick={() => setSelectedPayment('card')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPayment === 'card'
                      ? 'border-cyan-400/80 bg-cyan-500/10 shadow-lg'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'card'}
                      onChange={() => setSelectedPayment('card')}
                      className="accent-cyan-400"
                    />
                    <div>
                      <div className="font-sans-body font-bold text-xs text-white">
                        International Credit / Debit Card
                      </div>
                      <div className="font-sans-body text-[11px] text-slate-400">
                        Visa, Mastercard, American Express
                      </div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-cyan-400">credit_card</span>
                </label>

                {/* eSewa */}
                <label
                  onClick={() => setSelectedPayment('esewa')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPayment === 'esewa'
                      ? 'border-cyan-400/80 bg-cyan-500/10 shadow-lg'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'esewa'}
                      onChange={() => setSelectedPayment('esewa')}
                      className="accent-cyan-400"
                    />
                    <div>
                      <div className="font-sans-body font-bold text-xs text-white">
                        eSewa Digital Wallet
                      </div>
                      <div className="font-sans-body text-[11px] text-slate-400">
                        Direct Wallet or Mobile Banking (NPR)
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded border border-emerald-400/30">
                    eSewa
                  </span>
                </label>

                {/* Khalti */}
                <label
                  onClick={() => setSelectedPayment('khalti')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPayment === 'khalti'
                      ? 'border-cyan-400/80 bg-cyan-500/10 shadow-lg'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'khalti'}
                      onChange={() => setSelectedPayment('khalti')}
                      className="accent-cyan-400"
                    />
                    <div>
                      <div className="font-sans-body font-bold text-xs text-white">
                        Khalti Digital Wallet
                      </div>
                      <div className="font-sans-body text-[11px] text-slate-400">
                        Instant NPR Payment &amp; QR
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded border border-purple-400/30">
                    Khalti
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full glass-button-cyan font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-sans-body text-sm cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="animate-spin material-symbols-outlined">refresh</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">lock</span>
                      <span>Pay ${booking.totalPriceUSD}.00 USD</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
              <h2 className="font-serif-headline text-xl font-bold text-white">
                Reservation Summary
              </h2>

              <div className="carved-line opacity-30" />

              <div className="space-y-3 font-sans-body text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Reference #</span>
                  <span className="font-bold text-white">{booking.id}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Visitor Name</span>
                  <span className="font-bold text-white">{booking.clientName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Heritage Site</span>
                  <span className="font-bold text-cyan-400">{booking.siteName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Visit Date</span>
                  <span className="font-bold text-white">{booking.visitDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Guests</span>
                  <span className="font-bold text-white">{booking.guests}</span>
                </div>
              </div>

              <div className="carved-line opacity-30" />

              <div className="flex justify-between items-baseline pt-2">
                <span className="font-sans-body font-bold text-xs text-slate-200">Total Amount</span>
                <span className="font-serif-headline text-2xl font-bold text-cyan-300">
                  ${booking.totalPriceUSD}.00 USD
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Downloadable Digital QR Ticket View */
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/15 shadow-2xl max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h2 className="font-serif-headline text-3xl font-bold text-white">
              Ticket Confirmed &amp; Issued
            </h2>
            <p className="font-sans-body text-xs text-slate-300">
              Present this verified digital QR pass at the municipal turnstiles.
            </p>
          </div>

          <div className="glass p-6 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Official Entry Pass #{booking.id}
                </span>
                <h3 className="font-serif-headline text-2xl font-bold text-white">
                  {booking.siteName}
                </h3>
                <div className="font-sans-body text-xs text-slate-300 space-y-0.5">
                  <div>Holder: <strong className="text-white">{booking.clientName}</strong></div>
                  <div>Valid Date: <strong className="text-white">{booking.visitDate}</strong></div>
                  <div>Gate: <strong className="text-cyan-400">{booking.entryGate || 'Main Entrance'}</strong></div>
                </div>
              </div>

              {/* QR Code Placeholder Box */}
              <div className="w-32 h-32 bg-white/90 p-2 rounded-2xl border border-white/20 flex flex-col items-center justify-center text-center shadow-md">
                <span className="material-symbols-outlined text-6xl text-slate-900">qr_code_2</span>
                <span className="font-sans-body text-[9px] text-slate-700 uppercase tracking-wider font-bold mt-1">
                  Scan at Gate
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 glass text-slate-200 border border-white/10 hover:border-cyan-400/50 hover:text-white rounded-xl font-sans-body text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">print</span>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onBackToHome}
              className="flex-1 py-3 px-4 glass-button-cyan rounded-xl font-sans-body text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              <span>Return to Portal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
