import React, { useEffect, useState } from 'react';
import { HeritageSite } from '../types';
import { api } from '../services/api';

export const AdminContentPage: React.FC = () => {
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);

  // Edit fields
  const [editFee, setEditFee] = useState<number>(15);
  const [editHours, setEditHours] = useState<string>('');

  // Add new site fields
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Heritage Site' | 'Trekking Route'>('Heritage Site');
  const [newManagedBy, setNewManagedBy] = useState('');
  const [newFee, setNewFee] = useState(15);
  const [newHours, setNewHours] = useState('08:00 - 18:00');
  const [newRegion, setNewRegion] = useState('Kathmandu Valley');
  const [newDescription, setNewDescription] = useState('');

  const [message, setMessage] = useState('');

  const loadSites = async () => {
    try {
      setLoading(true);
      const data = await api.getSites();
      setSites(data);
    } catch (err) {
      console.error('Failed to load sites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleSaveSite = async (siteId: string) => {
    setMessage('');
    try {
      await api.updateSite(siteId, {
        foreignFeeUSD: Number(editFee),
        operatingHours: editHours,
      });
      setMessage('Site fees and operating hours updated');
      setEditingSiteId(null);
      loadSites();
    } catch (err: any) {
      setMessage(err.message || 'Failed to update site');
    }
  };

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.createSite({
        name: newName,
        category: newCategory,
        managedBy: newManagedBy || 'Municipal Heritage Trust',
        foreignFeeUSD: Number(newFee),
        saarcFeeNPR: 500,
        nepaliFee: 'Free',
        operatingHours: newHours,
        region: newRegion,
        description: newDescription,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9zDoHJ832MWuu6GOQo8OprehtIaUeEpfGWQo8xb6u4qQnLL2ngFYcjnQOy3_6QCqDLeerBFnkxbwMcNTt-EfiKRWvHPPwa9ucBkbJQNrFiZwTfm85TjQkAAAt0wzPO84H_IIjGWzVQ28Hn7ASmXJfyX2EwPrRZyW4YoOEqj8r9VUlhA98B6PprQXWYKyqDN3N9jHFZ4p_AaKw4kGmGigTJppZ-6nFEGlRnA3bkTCtj59bbgbFpNhKxKHnOEGUmZKGzJgxzjsPLII',
      });
      setMessage('New listing created successfully');
      setShowAddForm(false);
      setNewName('');
      setNewDescription('');
      loadSites();
    } catch (err: any) {
      setMessage(err.message || 'Failed to create listing');
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1200px] mx-auto w-full text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-headline text-3xl font-bold text-white">
            Directory &amp; Fee Management
          </h1>
          <p className="font-sans-body text-xs text-slate-400">
            Update entry fees, municipal operating hours, or register new heritage locations.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="glass-button-cyan font-bold py-2.5 px-5 rounded-xl font-sans-body text-xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-md"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>{showAddForm ? 'Cancel Add Form' : 'Add New Listing'}</span>
        </button>
      </div>

      {message && (
        <div className="p-3 glass border border-cyan-400/30 text-cyan-300 text-xs font-bold font-sans-body rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-base">info</span>
          <span>{message}</span>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleCreateSite} className="glass-panel p-6 rounded-3xl border border-cyan-400/30 shadow-2xl space-y-4">
          <h2 className="font-serif-headline text-xl font-bold text-white">
            New Heritage Site / Trekking Listing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Nyatapola Temple Courtyard"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 font-sans-body text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full glass-input rounded-xl px-3 py-2.5 font-sans-body text-xs focus:outline-none"
              >
                <option value="Heritage Site" className="bg-slate-900 text-white">Heritage Site</option>
                <option value="Trekking Route" className="bg-slate-900 text-white">Trekking Route</option>
              </select>
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Region
              </label>
              <input
                type="text"
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                placeholder="Kathmandu Valley / Annapurna"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 font-sans-body text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Foreign Entry Fee ($ USD)
              </label>
              <input
                type="number"
                value={newFee}
                onChange={(e) => setNewFee(Number(e.target.value))}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 font-sans-body text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                placeholder="07:00 - 18:00"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 font-sans-body text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Managing Body
              </label>
              <input
                type="text"
                value={newManagedBy}
                onChange={(e) => setNewManagedBy(e.target.value)}
                placeholder="Bhaktapur Municipality"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 font-sans-body text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans-body text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Historical overview and significance..."
              className="w-full glass-input rounded-xl p-3 font-sans-body text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="glass-button-cyan font-bold py-2.5 px-6 rounded-xl font-sans-body text-xs transition-colors shadow-md cursor-pointer"
          >
            Save New Listing
          </button>
        </form>
      )}

      {/* Existing Listings Grid */}
      {loading ? (
        <div className="p-8 text-center font-sans-body text-xs text-slate-400">
          Loading directory listings...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sites.map((site) => {
            const isEditing = editingSiteId === site.id;
            return (
              <div
                key={site.id}
                className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-sans-body text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                      {site.region} • {site.category}
                    </span>
                    <h3 className="font-serif-headline text-xl font-bold text-white">
                      {site.name}
                    </h3>
                  </div>

                  {!isEditing ? (
                    <button
                      onClick={() => {
                        setEditingSiteId(site.id);
                        setEditFee(site.foreignFeeUSD);
                        setEditHours(site.operatingHours);
                      }}
                      className="text-cyan-400 font-bold text-xs hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingSiteId(null)}
                      className="text-red-400 font-bold text-xs hover:underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <div className="grid grid-cols-2 gap-3 glass p-3.5 rounded-2xl border border-white/10 font-sans-body text-xs">
                    <div>
                      <span className="text-slate-400 block">Foreign Entry Fee</span>
                      <strong className="text-white">${site.foreignFeeUSD} USD</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Operating Hours</span>
                      <strong className="text-white">{site.operatingHours}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 glass p-4 rounded-2xl border border-white/10">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">
                          Fee ($ USD)
                        </label>
                        <input
                          type="number"
                          value={editFee}
                          onChange={(e) => setEditFee(Number(e.target.value))}
                          className="w-full glass-input rounded-lg p-2 font-sans-body text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">
                          Hours
                        </label>
                        <input
                          type="text"
                          value={editHours}
                          onChange={(e) => setEditHours(e.target.value)}
                          className="w-full glass-input rounded-lg p-2 font-sans-body text-xs"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleSaveSite(site.id)}
                      className="glass-button-cyan font-bold py-2 px-4 rounded-xl font-sans-body text-xs transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
