import React, { useEffect, useState } from 'react';
import { HiddenGem } from '../types';
import { api } from '../services/api';

export const HiddenGemsPage: React.FC = () => {
  const [gems, setGems] = useState<HiddenGem[]>([]);
  const [loading, setLoading] = useState(true);

  // Submit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [location, setLocation] = useState('');
  const [highlight, setHighlight] = useState('Community Tourism');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const loadApprovedGems = async () => {
    try {
      setLoading(true);
      const data = await api.getHiddenGems();
      setGems(data);
    } catch (err) {
      console.error('Failed to load hidden gems:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovedGems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await api.submitHiddenGem({
        name,
        subtitle,
        location,
        highlight,
        description,
        imageUrl,
        submittedBy,
        contactEmail,
      });

      setSubmitSuccessMsg(`Thank you! "${name}" has been sent to the admin portal for verification. It will appear on the site once approved.`);
      setIsModalOpen(false);
      // Reset form
      setName('');
      setSubtitle('');
      setLocation('');
      setHighlight('Community Tourism');
      setDescription('');
      setImageUrl('');
      setSubmittedBy('');
      setContactEmail('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit location');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-12 md:py-20 min-h-screen text-slate-100 space-y-8">
      {/* Header Banner */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <span className="inline-block font-sans-body text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
            Off the Beaten Path
          </span>
          <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-3">
            Hidden Cultural Gems
          </h1>
          <p className="font-sans-body text-base text-slate-300 max-w-2xl">
            Step beyond the mainstream tourist hubs to support rural community tourism and discover peaceful, untouched heritage sanctuaries.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="glass-button-cyan font-bold py-3.5 px-6 rounded-2xl font-sans-body text-xs flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add_location_alt</span>
          <span>Submit Unpopular Place</span>
        </button>
      </header>

      {/* Success Notification */}
      {submitSuccessMsg && (
        <div className="p-4 glass border border-emerald-400/40 bg-emerald-950/20 text-emerald-300 text-xs font-bold font-sans-body rounded-2xl flex items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-xl">verified</span>
            <span>{submitSuccessMsg}</span>
          </div>
          <button
            onClick={() => setSubmitSuccessMsg('')}
            className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hidden Gems Grid */}
      {loading ? (
        <div className="py-20 text-center font-sans-body text-slate-400">
          Loading untouched heritage gems...
        </div>
      ) : gems.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-cyan-400">explore</span>
          <h3 className="font-serif-headline text-xl font-bold text-white">No Approved Hidden Gems Yet</h3>
          <p className="font-sans-body text-xs text-slate-400 max-w-md mx-auto">
            Be the first citizen to submit a hidden traveling place! Click "Submit Unpopular Place" above to share your discovery with the community.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gems.map((gem) => (
            <div
              key={gem.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col group"
            >
              <div className="h-64 relative overflow-hidden bg-slate-900">
                <img
                  src={gem.imageUrl}
                  alt={gem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback thumbnail if image fails to load
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000';
                  }}
                />
                <div className="absolute top-4 left-4 glass-button-cyan px-3 py-1 rounded-full font-sans-body text-xs font-bold shadow-md">
                  {gem.highlight}
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <span className="font-sans-body text-xs text-slate-400 block mb-1">
                    Location: {gem.location}
                  </span>
                  <h2 className="font-serif-headline text-2xl font-bold text-white mb-1">
                    {gem.name}
                  </h2>
                  <h3 className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                    {gem.subtitle}
                  </h3>
                  <p className="font-sans-body text-xs text-slate-300 leading-relaxed">
                    {gem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="font-sans-body text-xs text-slate-400 italic">
                    {gem.submittedBy ? `Suggested by ${gem.submittedBy}` : 'Local Guide Recommended'}
                  </span>
                  <button
                    onClick={() => alert(`Exploring ${gem.name}: Contact local community homestay networks or regional heritage trust for authentic visits.`)}
                    className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Visitor Information</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Citizen Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-cyan-400/30 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b border-white/10">
              <div>
                <span className="font-sans-body text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                  Citizen Community Portal
                </span>
                <h2 className="font-serif-headline text-2xl font-bold text-white">
                  Suggest an Offbeat / Unpopular Place
                </h2>
                <p className="font-sans-body text-xs text-slate-400">
                  Share lesser-known cultural sites, villages, or scenic sanctuaries. Your submission will be reviewed by the municipal admin before being published to the main site.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 glass border border-red-500/30 text-red-300 text-xs font-bold font-sans-body rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Place Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Namobuddha Cave Temple"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Sacred Tiger Sacrifice Sanctuary"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Location / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kavrepalanchok, Bagmati"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Highlight Badge Tag
                  </label>
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    placeholder="e.g. Monastic Hermitage"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Leave blank to automatically assign a curated scenic photo.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Description &amp; Cultural Significance *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe why this place is unique, its local history, traditional culture, and how to reach it..."
                  className="w-full glass-input rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Your Name (Citizen / Local Guide)
                  </label>
                  <input
                    type="text"
                    value={submittedBy}
                    onChange={(e) => setSubmittedBy(e.target.value)}
                    placeholder="e.g. Aarav Tamang"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Contact Email (For status update)
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="aarav@example.com"
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-button-cyan font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">send</span>
                      <span>Send to Admin Portal</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
