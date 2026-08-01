import React from 'react';

export const CalendarPage: React.FC = () => {
  const festivals = [
    {
      id: 'indra-jatra',
      name: 'Indra Jatra (Yenya)',
      date: 'September 28, 2026',
      location: 'Kathmandu Durbar Square',
      category: 'Living Goddess Chariot Procession',
      description: 'The largest street festival in Kathmandu celebrating King Indra. Features the public chariot procession of the Living Goddess Kumari, masked Lakhey dancers, and sacred oil lamps.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkdPjr7E2IawyIP0QKUnL9exdYx-QHrn0VCvfOCfbP8mmi-GxVr-uyLhjFJK-gTYggYS6Q_E7N-hOeyPFKuI0GbvH027qQuBt-UKI4iXcm0vBKbPDNV1WVYcTl1F7eNFoUsNHCbeGG177dWchEfzeQ3IU3tFG1Kxqh1g8mXhhhXsQioQwq8_CBKyS_Ds9PwzGGm_MYc-oJDk8eEMja2w6Mrj4JFIAJSeDctmplFquxJ6MTf9CD4J8Gvm076_bPT9Df7t4ndgiC2K8',
      active: true,
    },
    {
      id: 'dashain',
      name: 'Bada Dashain',
      date: 'October 18 - 28, 2026',
      location: 'Nationwide',
      category: 'Victory of Good over Evil',
      description: 'Nepal’s grandest 15-day religious celebration. Families gather across the country for tika, jamara, elder blessings, bamboo swings (Linge Ping), and flying kites.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9zDoHJ832MWuu6GOQo8OprehtIaUeEpfGWQo8xb6u4qQnLL2ngFYcjnQOy3_6QCqDLeerBFnkxbwMcNTt-EfiKRWvHPPwa9ucBkbJQNrFiZwTfm85TjQkAAAt0wzPO84H_IIjGWzVQ28Hn7ASmXJfyX2EwPrRZyW4YoOEqj8r9VUlhA98B6PprQXWYKyqDN3N9jHFZ4p_AaKw4kGmGigTJppZ-6nFEGlRnA3bkTCtj59bbgbFpNhKxKHnOEGUmZKGzJgxzjsPLII',
      active: false,
    },
    {
      id: 'tihar',
      name: 'Tihar & Mha Puja',
      date: 'November 8 - 12, 2026',
      location: 'Nationwide & Newar Households',
      category: 'Festival of Lights',
      description: 'The 5-day festival of lights honoring crows, dogs, cows, and Laxmi (Goddess of Wealth). Includes Newari Mha Puja (self-reverence) and colorful mandala floor art (Rangoli).',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfH7v-k_9tE-SFjN3GJo9zdYYmw93ms92CaoSAK5WAGwZCr_AiOVQ1PzeujJFsaM4uFPf5xVvR_YQ9wCLdzQiF3SCRurlUuGT7rhvhDxeAyQx6Xcv78Phr1IeoGD66j3bhayr0h2RMAwNlrXZfV5VXJRjGRkM7tCs8NVy5MQ4Rn9fYFbEKlV1V_KkD8d3xaypDjSxqbX4JoJz6fHlgILbIGxa6tEy8xFmM6Rh9nejhgZYaXMjq3oYJ1-Nxbfn0S9i02TpAZOQwzJc',
      active: false,
    },
    {
      id: 'bisket-jatra',
      name: 'Bisket Jatra',
      date: 'April 13 - 19, 2027',
      location: 'Bhaktapur Durbar Square',
      category: 'Newar New Year Chariot Tug',
      description: 'A vibrant spring chariot festival marking the Newar New Year in Bhaktapur. Massive wooden chariots carrying Bhairava and Bhadrakali are pulled through narrow cobbled streets.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoV1aBdlrFyPEn1NjXHrVmIuw-IHKelTKwpNf2SP9Siwl6jdF8qB9h-smIqZ_P9ecUMdj6Nx5-QvWERAJz4Fd4gpXKknvlUoLetcEc1pnS7Ia6YE8c_MXYjVIMwXNKrq2JFOmbLbfbJv6xCejf86K_jDLDt91b0MagBDe_sSoASMdqMDrF6z-zjuMJPF9ejDucyc91YAxMjnI8AriCcGxI7olBLphKLVn_4AcVBHjeVO7nHl5N4PeFkNjYPVTzexLjZjZzIYFAPYs',
      active: false,
    }
  ];

  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-12 md:py-20 min-h-screen text-slate-100">
      <header className="mb-12">
        <span className="inline-block font-sans-body text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
          Living Traditions
        </span>
        <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-4">
          Cultural Calendar &amp; Festivals
        </h1>
        <p className="font-sans-body text-base text-slate-300 max-w-2xl">
          Plan your visit around Nepal’s ancient living festivals, sacred chariot processions, and seasonal celebrations.
        </p>
      </header>

      {/* Featured Active Festival Banner */}
      <div className="mb-16 glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 h-72 md:h-80 rounded-2xl overflow-hidden relative glass border border-white/10">
          <img
            src={festivals[0].imageUrl}
            alt={festivals[0].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-amber-500/80 text-white px-3 py-1 rounded-full font-sans-body text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md border border-amber-400/40">
            Happening Now
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <span className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest">
            {festivals[0].category}
          </span>
          <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-white">
            {festivals[0].name}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans-body font-bold text-slate-300">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-cyan-400">calendar_today</span>
              {festivals[0].date}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-cyan-400">location_on</span>
              {festivals[0].location}
            </span>
          </div>
          <p className="font-sans-body text-xs text-slate-300 leading-relaxed">
            {festivals[0].description}
          </p>
          <div className="pt-2">
            <button
              onClick={() => alert('Indra Jatra procession routes pass directly through Kathmandu Durbar Square. Foreign visitors are advised to arrive early before 14:00.')}
              className="glass-button-cyan px-6 py-3 rounded-xl font-sans-body text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Festival Viewing Guidance
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <h2 className="font-serif-headline text-2xl font-bold text-white mb-8">
        Upcoming Cultural Timeline (2026-2027)
      </h2>

      <div className="space-y-6">
        {festivals.slice(1).map((f) => (
          <div
            key={f.id}
            className="glass-card glass-card-hover rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="glass text-cyan-300 px-3 py-1 rounded-full text-xs font-bold font-sans-body border border-cyan-400/30">
                  {f.date}
                </span>
                <span className="text-xs font-sans-body font-semibold text-slate-400">
                  {f.location}
                </span>
              </div>
              <h3 className="font-serif-headline text-2xl font-bold text-white">
                {f.name}
              </h3>
              <p className="font-sans-body text-xs text-slate-300">
                {f.description}
              </p>
            </div>

            <button
              onClick={() => alert(`Details for ${f.name}: Scheduled for ${f.date} at ${f.location}.`)}
              className="glass text-slate-200 border border-white/10 hover:border-cyan-400/50 hover:text-white px-5 py-2.5 rounded-xl font-sans-body text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              View Schedule
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
