import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface RegisterPageProps {
  setActiveTab: (tab: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ setActiveTab }) => {
  const { applyOperator, register } = useAuth();
  const [mode, setMode] = useState<'operator' | 'user'>('operator');

  // Operator form fields
  const [companyName, setCompanyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [fileName, setFileName] = useState('');

  // User form fields
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleOperatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await applyOperator({
        companyName,
        licenseNumber,
        contactPerson,
        email,
        phone,
        officeAddress,
        documentName: fileName || 'license_document.pdf',
      });
      setLoading(false);
      setSuccessMsg('Your Operator License Application has been submitted to the Department of Tourism & Municipal Heritage Board for verification.');
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Submission failed');
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await register({
        name: userName,
        email: userEmail,
        password: userPassword,
        role: 'user',
      });
      setLoading(false);
      setActiveTab('sites');
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Registration failed');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 text-slate-100">
      <div className="glass-panel rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-serif-headline text-3xl font-bold text-white">
            {mode === 'operator' ? 'Operator License Accreditation' : 'Create Visitor Account'}
          </h1>
          <p className="font-sans-body text-xs text-slate-400">
            Official Registration Portal for Nepal Heritage Platform
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex glass p-1.5 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => {
              setMode('operator');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-sans-body text-xs font-bold transition-all cursor-pointer ${
              mode === 'operator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Trekking / Tour Operator Application
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('user');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-sans-body text-xs font-bold transition-all cursor-pointer ${
              mode === 'user'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Visitor Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg ? (
          <div className="p-6 glass border border-emerald-400/30 rounded-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <h3 className="font-serif-headline font-bold text-xl text-white">
              Application Received
            </h3>
            <p className="font-sans-body text-xs text-slate-300 leading-relaxed">
              {successMsg}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('login')}
                className="glass-button-cyan font-bold py-2.5 px-6 rounded-xl text-xs font-sans-body"
              >
                Go to Login Page
              </button>
            </div>
          </div>
        ) : mode === 'operator' ? (
          <form onSubmit={handleOperatorSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Company / Agency Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Annapurna Treks Ltd"
                  className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Govt License Number *
                </label>
                <input
                  type="text"
                  required
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="e.g. #NHT-2026-102"
                  className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Full Official Name"
                  className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@agency.np"
                  className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977 9801234567"
                  className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Office Address
                </label>
                <input
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  placeholder="Thamel, Kathmandu"
                  className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Document Upload Simulation */}
            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Attach License / Business Permit (PDF/JPG)
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-4 text-center glass hover:border-cyan-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  id="doc-upload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
                <label htmlFor="doc-upload" className="cursor-pointer space-y-1 block">
                  <span className="material-symbols-outlined text-3xl text-cyan-400">upload_file</span>
                  <div className="font-sans-body text-xs font-bold text-white">
                    {fileName ? `Selected: ${fileName}` : 'Click to Upload Agency Certificate'}
                  </div>
                  <div className="font-sans-body text-[10px] text-slate-400">
                    Official Department of Tourism registration PDF
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full glass-button-cyan font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-sans-body text-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-spin material-symbols-outlined">refresh</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Submit Application for Review</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="visitor@example.com"
                className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full glass-button-cyan font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg font-sans-body text-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
