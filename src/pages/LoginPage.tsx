import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  setActiveTab: (tab: string) => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  setActiveTab,
  onLoginSuccess,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setLoading(false);
      onLoginSuccess();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Login failed');
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setLoading(true);
    try {
      await login(demoEmail, demoPass);
      setLoading(false);
      onLoginSuccess();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Demo login failed');
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 py-12 text-slate-100">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <h1 className="font-serif-headline text-3xl font-bold text-white">
            Operator Portal Login
          </h1>
          <p className="font-sans-body text-xs text-slate-400">
            Authorized Municipal &amp; Trekking Operator Authentication
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Credentials Switcher */}
        <div className="glass p-3.5 rounded-2xl border border-white/10 space-y-2">
          <div className="font-sans-body text-[10px] font-bold text-cyan-400 uppercase tracking-wider text-center">
            Demo Accounts (Click to Auto-login)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@heritage.np', 'admin123')}
              className="py-2 px-3 glass hover:bg-white/10 border border-white/10 rounded-xl text-left text-xs font-sans-body transition-all cursor-pointer"
            >
              <div className="font-bold text-cyan-300 text-xs">Admin Account</div>
              <div className="text-slate-400 text-[10px]">admin@heritage.np</div>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('pemba@everesthightreks.np', 'operator123')}
              className="py-2 px-3 glass hover:bg-white/10 border border-white/10 rounded-xl text-left text-xs font-sans-body transition-all cursor-pointer"
            >
              <div className="font-bold text-amber-300 text-xs">Trek Operator</div>
              <div className="text-slate-400 text-[10px]">pemba@everesthightreks.np</div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@company.np"
              className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full glass-input rounded-xl px-4 py-3 font-sans-body text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button-cyan font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-sans-body text-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin material-symbols-outlined">refresh</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">login</span>
                <span>Sign In with JWT</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center space-y-2">
          <p className="font-sans-body text-xs text-slate-400">
            Don't have an approved operator license?
          </p>
          <button
            onClick={() => setActiveTab('register')}
            className="text-cyan-400 font-sans-body text-xs font-bold hover:underline cursor-pointer"
          >
            Submit Operator License Application →
          </button>
        </div>
      </div>
    </div>
  );
};
