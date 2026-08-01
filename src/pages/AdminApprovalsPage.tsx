import React, { useEffect, useState } from 'react';
import { OperatorApplication, HiddenGem } from '../types';
import { api } from '../services/api';

export const AdminApprovalsPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'operators' | 'gems'>('gems');

  // Operator Applications state
  const [applications, setApplications] = useState<OperatorApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  // Hidden Gems state
  const [gems, setGems] = useState<HiddenGem[]>([]);
  const [loadingGems, setLoadingGems] = useState(true);

  const [actionMsg, setActionMsg] = useState('');

  const loadApplications = async () => {
    try {
      setLoadingApps(true);
      const data = await api.getOperatorApplications();
      setApplications(data);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  const loadGems = async () => {
    try {
      setLoadingGems(true);
      const data = await api.getAllHiddenGems();
      setGems(data);
    } catch (err) {
      console.error('Failed to load hidden gems:', err);
    } finally {
      setLoadingGems(false);
    }
  };

  useEffect(() => {
    loadApplications();
    loadGems();
  }, []);

  const handleOperatorStatusUpdate = async (id: string, status: 'Approved' | 'Rejected') => {
    setActionMsg('');
    try {
      await api.updateOperatorApplicationStatus(id, status);
      setActionMsg(`Operator application ${status.toLowerCase()} successfully.`);
      loadApplications();
    } catch (err: any) {
      setActionMsg(err.message || 'Failed to update application');
    }
  };

  const handleGemStatusUpdate = async (id: string, status: 'Approved' | 'Rejected') => {
    setActionMsg('');
    try {
      await api.updateHiddenGemStatus(id, status);
      setActionMsg(`Hidden gem submission ${status.toLowerCase()} successfully.`);
      loadGems();
    } catch (err: any) {
      setActionMsg(err.message || 'Failed to update gem status');
    }
  };

  const pendingGemsCount = gems.filter((g) => g.status === 'Pending').length;
  const pendingAppsCount = applications.filter((a) => a.status === 'Pending').length;

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1200px] mx-auto w-full text-slate-100">
      <div>
        <h1 className="font-serif-headline text-3xl font-bold text-white">
          Approvals &amp; Moderation Portal
        </h1>
        <p className="font-sans-body text-xs text-slate-400">
          Review citizen hidden gem place submissions and tour operator license accreditations.
        </p>
      </div>

      {/* Action Banner */}
      {actionMsg && (
        <div className="p-3 glass border border-cyan-400/30 text-cyan-300 text-xs font-bold font-sans-body rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-base">verified</span>
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex gap-3 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveSubTab('gems')}
          className={`px-4 py-2 rounded-xl font-sans-body text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'gems'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">explore</span>
          <span>Citizen Gem Submissions</span>
          {pendingGemsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold">
              {pendingGemsCount} pending
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('operators')}
          className={`px-4 py-2 rounded-xl font-sans-body text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'operators'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">badge</span>
          <span>Operator Licenses</span>
          {pendingAppsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold">
              {pendingAppsCount} pending
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: CITIZEN HIDDEN GEMS SUBMISSIONS */}
      {activeSubTab === 'gems' && (
        <div className="space-y-6">
          {loadingGems ? (
            <div className="p-8 text-center font-sans-body text-xs text-slate-400">
              Loading citizen hidden gem submissions...
            </div>
          ) : gems.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-2">
              <span className="material-symbols-outlined text-4xl text-emerald-400">check_circle</span>
              <div className="font-serif-headline font-bold text-lg text-white">Queue Cleared</div>
              <p className="font-sans-body text-xs text-slate-400">No citizen gem submissions found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gems.map((gem) => (
                <div
                  key={gem.id}
                  className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-sans-body text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                          Location: {gem.location}
                        </span>
                        <h3 className="font-serif-headline text-xl font-bold text-white">
                          {gem.name}
                        </h3>
                        <p className="font-sans-body text-xs text-cyan-300 font-semibold">
                          {gem.subtitle}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold font-sans-body border ${
                          gem.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                            : gem.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                            : 'bg-red-500/20 text-red-300 border-red-400/30'
                        }`}
                      >
                        {gem.status}
                      </span>
                    </div>

                    {gem.imageUrl && (
                      <div className="h-40 w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                        <img
                          src={gem.imageUrl}
                          alt={gem.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000';
                          }}
                        />
                      </div>
                    )}

                    <div className="font-sans-body text-xs text-slate-300 leading-relaxed p-3 glass rounded-2xl border border-white/10">
                      {gem.description}
                    </div>

                    <div className="space-y-1 font-sans-body text-xs text-slate-400 bg-white/5 p-3 rounded-2xl">
                      <div>Badge Tag: <strong className="text-white">{gem.highlight}</strong></div>
                      <div>Submitted By: <strong className="text-white">{gem.submittedBy || 'Anonymous Citizen'}</strong></div>
                      {gem.contactEmail && (
                        <div>Contact Email: <strong className="text-cyan-300">{gem.contactEmail}</strong></div>
                      )}
                      <div>Submitted Date: <strong className="text-slate-300">{new Date(gem.createdAt).toLocaleDateString()}</strong></div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-white/10">
                    {gem.status !== 'Approved' && (
                      <button
                        onClick={() => handleGemStatusUpdate(gem.id, 'Approved')}
                        className="flex-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold py-2.5 px-3 rounded-xl font-sans-body text-xs hover:bg-emerald-500/30 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>Approve &amp; Publish</span>
                      </button>
                    )}
                    {gem.status !== 'Rejected' && (
                      <button
                        onClick={() => handleGemStatusUpdate(gem.id, 'Rejected')}
                        className="flex-1 bg-red-500/20 text-red-300 border border-red-500/30 font-bold py-2.5 px-3 rounded-xl font-sans-body text-xs hover:bg-red-500/30 transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">cancel</span>
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: OPERATOR LICENSE APPLICATIONS */}
      {activeSubTab === 'operators' && (
        <div className="space-y-6">
          {loadingApps ? (
            <div className="p-8 text-center font-sans-body text-xs text-slate-400">
              Loading operator applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-2">
              <span className="material-symbols-outlined text-4xl text-emerald-400">check_circle</span>
              <div className="font-serif-headline font-bold text-lg text-white">Queue Cleared</div>
              <p className="font-sans-body text-xs text-slate-400">No pending operator license applications at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-sans-body text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                          License #{app.licenseNumber}
                        </span>
                        <h3 className="font-serif-headline text-xl font-bold text-white">
                          {app.companyName}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold font-sans-body border ${
                          app.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                            : app.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                            : 'bg-red-500/20 text-red-300 border-red-400/30'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 font-sans-body text-xs text-slate-300 glass p-3.5 rounded-2xl border border-white/10">
                      <div>Contact Person: <strong className="text-white">{app.contactPerson}</strong></div>
                      <div>Official Email: <strong className="text-white">{app.email}</strong></div>
                      <div>Phone: <strong className="text-white">{app.phone}</strong></div>
                      <div>Office Address: <strong className="text-white">{app.officeAddress}</strong></div>
                      <div>Document Attachment: <strong className="text-cyan-300">{app.documentName || 'license.pdf'}</strong></div>
                    </div>
                  </div>

                  {app.status === 'Pending' && (
                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => handleOperatorStatusUpdate(app.id, 'Approved')}
                        className="flex-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold py-2.5 px-3 rounded-xl font-sans-body text-xs hover:bg-emerald-500/30 transition-colors shadow-xs cursor-pointer"
                      >
                        Approve License
                      </button>
                      <button
                        onClick={() => handleOperatorStatusUpdate(app.id, 'Rejected')}
                        className="flex-1 bg-red-500/20 text-red-300 border border-red-500/30 font-bold py-2.5 px-3 rounded-xl font-sans-body text-xs hover:bg-red-500/30 transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
