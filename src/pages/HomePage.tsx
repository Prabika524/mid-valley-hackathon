import React, { useEffect, useState } from 'react';
import { HeritageSite, TrekkingRoute } from '../types';
import { api } from '../services/api';

// ─── Mini Festival Calendar ───────────────────────────────────────────────────

interface HomeFestival {
  id: string; name: string; month: number; year: number;
  startDay: number; endDay?: number;
  location: string; isNationwide: boolean;
  category: string; description: string; experience: string;
}

const HOME_FESTIVALS: HomeFestival[] = [
  { id:'indra-jatra', name:'Indra Jatra', month:8, year:2026, startDay:28,
    location:'Kathmandu Durbar Square', isNationwide:false,
    category:'Living Goddess Chariot Procession',
    description:'The largest street festival in Kathmandu. Features the public chariot procession of the Living Goddess Kumari, masked Lakhey dancers, and oil lamps lit across the old city.',
    experience:'Standing in Kathmandu Durbar Square as the Kumari\'s golden chariot passes by is something tourists rarely forget. Arrive before 14:00 for a good spot.' },
  { id:'dashain', name:'Bada Dashain', month:9, year:2026, startDay:18, endDay:28,
    location:'Nationwide', isNationwide:true,
    category:'Victory of Good over Evil',
    description:'Nepal\'s grandest 15-day festival. Families gather from across the world, elders give tika and jamara blessings, bamboo swings are erected, and kites fill the sky.',
    experience:'Receiving tika from elders on Vijaya Dashami is the heart of the festival. The sight of kites filling the sky over Kathmandu is unforgettable.' },
  { id:'tihar', name:'Tihar & Mha Puja', month:10, year:2026, startDay:8, endDay:12,
    location:'Nationwide & Newar Households', isNationwide:true,
    category:'Festival of Lights',
    description:'A 5-day festival of lights honoring crows, dogs, cows, and Laxmi. Colorful Rangoli mandalas, oil lamps on every window, and Deusi-Bhailo singing fill the nights.',
    experience:'Kathmandu Valley at night during Tihar is magical — every street glows with butter lamps and the air rings with song.' },
  { id:'chhath', name:'Chhath Puja', month:10, year:2026, startDay:14,
    location:'Riverbanks of Terai', isNationwide:false,
    category:'Sun Worship Festival',
    description:'Devotees fast for 36 hours and offer prayers to the setting and rising sun, standing in rivers at dusk and dawn in a profoundly moving act of devotion.',
    experience:'Thousands of sari-clad women standing in the river at dawn with hands raised toward the rising sun — one of Nepal\'s most spiritually powerful sights.' },
  { id:'maha-shivaratri', name:'Maha Shivaratri', month:1, year:2027, startDay:26,
    location:'Pashupatinath Temple, Nationwide', isNationwide:true,
    category:'Great Night of Shiva',
    description:'Over a million devotees descend on Pashupatinath. Ash-covered Sadhus from across the subcontinent gather, bonfires burn all night, and the air is thick with devotion.',
    experience:'Hundreds of Sadhus with dreadlocks, tridents, and sacred fires at Pashupatinath makes this unlike any other festival in the world.' },
  { id:'holi', name:'Holi (Fagu Purnima)', month:2, year:2027, startDay:3,
    location:'Nationwide', isNationwide:true,
    category:'Festival of Colors',
    description:'The famous festival of colors celebrating the arrival of spring. Streets become a riot of colored powder and water, with Kathmandu celebrating a day before the Terai.',
    experience:'Basantapur Durbar Square on Holi morning — thousands drenching each other in color against ancient temple backdrops — is pure, joyful chaos.' },
];

const MONTH_NAMES_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_NAMES_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES_MINI = ['S','M','T','W','T','F','S'];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}
function getFestivalsForDay(festivals: HomeFestival[], month: number, year: number, day: number) {
  return festivals.filter(f => {
    if (f.month !== month || f.year !== year) return false;
    return f.endDay ? day >= f.startDay && day <= f.endDay : f.startDay === day;
  });
}

interface HomeFestivalCalendarProps { setActiveTab: (tab: string) => void; }

const HomeFestivalCalendar: React.FC<HomeFestivalCalendarProps> = ({ setActiveTab }) => {
  const [currentMonth, setCurrentMonth] = useState(8); // Sep 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [selected, setSelected] = useState<HomeFestival | null>(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthFestivals = HOME_FESTIVALS.filter(f => f.month === currentMonth && f.year === currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelected(null);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <section className="py-16 px-4 md:px-10 relative z-10 bg-gradient-to-b from-transparent to-[#0f172a]/50">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-3">
          <div>
            <span className="font-sans-body text-xs font-bold uppercase tracking-widest text-amber-400">Cultural Events</span>
            <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-white mt-1">Festival Calendar</h2>
            <p className="text-slate-300 font-sans-body text-sm mt-1">Celebrate Nepal's living traditions alongside locals.</p>
          </div>
          <button onClick={() => setActiveTab('calendar')} className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto shrink-0">
            <span>Full Calendar</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mini Calendar */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10 shadow-xl lg:w-[380px] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="glass p-1.5 rounded-lg border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <div className="text-center">
                <p className="font-serif-headline text-lg font-bold text-white">{MONTH_NAMES_FULL[currentMonth]}</p>
                <p className="font-sans-body text-xs text-cyan-400 font-bold">{currentYear}</p>
              </div>
              <button onClick={nextMonth} className="glass p-1.5 rounded-lg border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
              {DAY_NAMES_MINI.map((d, i) => (
                <div key={i} className="text-center font-sans-body text-[10px] font-bold text-slate-500 py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {cells.map((day, idx) => {
                if (!day) return <div key={`e-${idx}`} className="h-9" />;
                const fests = getFestivalsForDay(HOME_FESTIVALS, currentMonth, currentYear, day);
                const hasFest = fests.length > 0;
                const isSel = selected && fests.some(f => f.id === selected.id);
                return (
                  <div
                    key={day}
                    onClick={() => hasFest && setSelected(fests[0])}
                    className={`h-9 flex flex-col items-center justify-center rounded-lg transition-all relative
                      ${hasFest ? 'cursor-pointer' : 'cursor-default'}
                      ${isSel ? 'bg-amber-500/30 border border-amber-400/60' : hasFest ? 'bg-amber-500/10 border border-amber-400/30 hover:bg-amber-500/20' : 'border border-transparent'}
                    `}
                  >
                    <span className={`font-sans-body text-xs font-bold ${isSel ? 'text-amber-300' : hasFest ? 'text-amber-200' : 'text-slate-400'}`}>{day}</span>
                    {hasFest && <span className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-1" />}
                  </div>
                );
              })}
            </div>

            {monthFestivals.length === 0 && (
              <p className="text-center font-sans-body text-xs text-slate-500 mt-4 py-2">No major festivals this month</p>
            )}

            {monthFestivals.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                {monthFestivals.map(f => (
                  <button key={f.id} onClick={() => setSelected(f)}
                    className={`w-full flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${selected?.id === f.id ? 'bg-amber-500/20 border border-amber-400/40' : 'glass border border-white/10 hover:border-amber-400/30'}`}>
                    <span className="material-symbols-outlined text-sm text-amber-400">celebration</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans-body text-xs font-bold text-white truncate">{f.name}</p>
                      <p className="font-sans-body text-[10px] text-slate-400">{MONTH_NAMES_SHORT[f.month]} {f.startDay}{f.endDay ? `–${f.endDay}` : ''} · {f.isNationwide ? 'Nationwide' : f.location}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Event Detail */}
          <div className="flex-1">
            {selected ? (
              <div className="glass-panel rounded-3xl border border-white/10 shadow-xl p-6 md:p-8 h-full flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 glass rounded-2xl px-3 py-2 border border-amber-400/30 text-center min-w-[52px]">
                    <p className="font-serif-headline text-xl font-bold text-amber-300 leading-none">{selected.startDay}</p>
                    <p className="font-sans-body text-[10px] text-slate-400 uppercase">{MONTH_NAMES_SHORT[selected.month]}</p>
                  </div>
                  <div>
                    <span className="font-sans-body text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{selected.category}</span>
                    <h3 className="font-serif-headline text-2xl font-bold text-white leading-tight">{selected.name}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-xs font-sans-body">
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="material-symbols-outlined text-sm text-cyan-400">location_on</span>
                    {selected.isNationwide ? 'Celebrated all over Nepal' : selected.location}
                  </span>
                  {selected.endDay && (
                    <span className="flex items-center gap-1 text-slate-300">
                      <span className="material-symbols-outlined text-sm text-cyan-400">date_range</span>
                      {MONTH_NAMES_SHORT[selected.month]} {selected.startDay}–{selected.endDay}, {selected.year}
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${selected.isNationwide ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'}`}>
                    {selected.isNationwide ? '🇳🇵 Nationwide' : '📍 Specific Location'}
                  </span>
                </div>

                <div className="carved-line opacity-20" />

                <p className="font-sans-body text-sm text-slate-300 leading-relaxed flex-1">{selected.description}</p>

                <div className="glass rounded-2xl p-4 border border-cyan-400/20">
                  <p className="font-sans-body text-xs font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">star</span>
                    What you'll experience
                  </p>
                  <p className="font-sans-body text-xs text-slate-300 leading-relaxed">{selected.experience}</p>
                </div>

                <button onClick={() => setActiveTab('calendar')}
                  className="glass-button-cyan self-start px-5 py-2.5 rounded-xl font-sans-body text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2">
                  <span>See All Festivals</span>
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                </button>
              </div>
            ) : (
              <div className="glass-panel rounded-3xl border border-white/10 shadow-xl p-8 h-full flex flex-col items-center justify-center text-center min-h-[280px] gap-4">
                <span className="material-symbols-outlined text-5xl text-slate-600">celebration</span>
                <div>
                  <h3 className="font-serif-headline text-xl font-bold text-white mb-2">Explore Nepal's Festivals</h3>
                  <p className="font-sans-body text-xs text-slate-400 max-w-xs">
                    Click any highlighted date or festival name on the calendar to see what's happening and what you can experience.
                  </p>
                </div>
                <button onClick={() => setActiveTab('calendar')}
                  className="glass text-cyan-400 border border-cyan-400/30 hover:border-cyan-400 px-5 py-2.5 rounded-xl font-sans-body text-xs font-bold transition-all cursor-pointer flex items-center gap-2">
                  <span>Open Full Calendar</span>
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectSite: (site: HeritageSite) => void;
  onOpenBooking: (site: HeritageSite) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onSelectSite,
  onOpenBooking,
}) => {
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [treks, setTreks] = useState<TrekkingRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [sitesData, treksData] = await Promise.all([
          api.getSites(),
          api.getTreks(),
        ]);
        setSites(sitesData);
        setTreks(treksData);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      {/* Hero Section */}
      <section className="relative w-full h-[560px] md:h-[640px] flex items-start justify-center overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkdPjr7E2IawyIP0QKUnL9exdYx-QHrn0VCvfOCfbP8mmi-GxVr-uyLhjFJK-gTYggYS6Q_E7N-hOeyPFKuI0GbvH027qQuBt-UKI4iXcm0vBKbPDNV1WVYcTl1F7eNFoUsNHCbeGG177dWchEfzeQ3IU3tFG1Kxqh1g8mXhhhXsQioQwq8_CBKyS_Ds9PwzGGm_MYc-oJDk8eEMja2w6Mrj4JFIAJSeDctmplFquxJ6MTf9CD4J8Gvm076_bPT9Df7t4ndgiC2K8"
            alt="Ancient stone temple in Nepal"
            className="w-full h-full object-cover transform scale-105 filter brightness-75 opacity-80 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-10 max-w-[1280px] mx-auto w-full flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full font-sans-body text-xs text-cyan-300 border border-cyan-400/30 uppercase tracking-widest mb-5 shadow-lg">
            <span className="token-pulse" />
            Official Nepal Conservation &amp; Ticketing Portal
          </span>

          <h1 className="font-serif-headline text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5 max-w-4xl drop-shadow-lg leading-tight">
            Verified Tickets &amp; Transparent Planning for Nepal's Heritage.
          </h1>

          <p className="font-sans-body text-base sm:text-lg text-slate-300 mb-8 max-w-2xl drop-shadow">
            Support local conservation with every booking. Discover sacred temples, living monuments, and curated mountain trekking routes.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab('sites')}
              className="glass-button-cyan px-8 py-4 rounded-full font-sans-body text-sm font-bold transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg flex items-center gap-2"
            >
              <span>Explore Sites</span>
              <span className="material-symbols-outlined text-lg">explore</span>
            </button>
            <button
              onClick={() => setActiveTab('trekking')}
              className="glass px-8 py-4 rounded-full text-slate-200 border border-white/20 font-sans-body text-sm font-bold hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              Trekking Routes
            </button>
          </div>
        </div>
      </section>

      {/* Festival Banner */}
      <div className="glass py-4 px-4 md:px-10 border-y border-white/10 backdrop-blur-md relative z-10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/20 text-amber-300 px-3.5 py-1 rounded-full font-sans-body text-xs font-bold flex items-center gap-1.5 border border-amber-400/30">
              <span className="material-symbols-outlined text-base">celebration</span>
              Happening Now
            </span>
            <span className="font-serif-headline font-bold text-lg text-white">
              Indra Jatra Festival
            </span>
            <span className="text-slate-300 font-sans-body text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-cyan-400">location_on</span>
              Kathmandu Valley
            </span>
          </div>

          <button
            onClick={() => setActiveTab('calendar')}
            className="text-cyan-400 hover:text-cyan-300 font-sans-body text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>View Cultural Calendar</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Festival Calendar Section */}
      <HomeFestivalCalendar setActiveTab={setActiveTab} />

      {/* Heritage Sites Section */}
      <section className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto w-full relative z-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-white mb-2">
              Heritage Sites
            </h2>
            <p className="text-slate-300 font-sans-body text-sm">
              Explore the ancient stone &amp; wood architecture of the Kathmandu Valley.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('sites')}
            className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>See all sites</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 glass rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sites.slice(0, 3).map((site) => (
              <div
                key={site.id}
                className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col h-full border border-white/10"
              >
                <div className="aspect-[3/2] w-full overflow-hidden relative">
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-cyan-300 font-sans-body text-xs font-bold shadow-md border border-white/20">
                    ${site.foreignFeeUSD} Entry
                  </div>
                  {site.tag && (
                    <div className="absolute top-4 left-4 bg-amber-500/80 backdrop-blur-md text-white px-3 py-1 rounded-full font-sans-body text-xs font-bold shadow-md border border-amber-400/40">
                      {site.tag}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3
                    onClick={() => onSelectSite(site)}
                    className="font-serif-headline text-xl font-bold text-white mb-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {site.name}
                  </h3>
                  <p className="text-slate-400 font-sans-body text-xs mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-cyan-400">apartment</span>
                    Managed by {site.managedBy}
                  </p>

                  <p className="text-slate-300 font-sans-body text-xs line-clamp-2 mb-6 flex-1">
                    {site.description}
                  </p>

                  <div className="carved-line mb-4 opacity-30" />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectSite(site)}
                      className="flex-1 py-2.5 px-3 glass text-slate-200 rounded-xl font-sans-body text-xs font-bold hover:text-white hover:border-cyan-400/50 transition-colors text-center cursor-pointer border border-white/10"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(site)}
                      className="flex-1 py-2.5 px-3 glass-button-cyan rounded-xl font-sans-body text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">confirmation_number</span>
                      Book Online
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust & Conservation Callout Banner */}
      <section className="py-16 glass-panel border-y border-white/10 relative z-10 my-8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <blockquote className="font-serif-headline text-2xl md:text-3xl font-bold text-white max-w-4xl mx-auto leading-relaxed mb-4">
            "100% of your entry fee goes directly to site conservation, historical restoration, and local artisan heritage funds."
          </blockquote>
          <p className="font-sans-body text-xs text-slate-400">
            Official Partnership with the Department of Archaeology &amp; Municipal Heritage Committees of Nepal.
          </p>
        </div>
      </section>

      {/* Trekking Routes Section */}
      <section className="py-20 px-4 md:px-10 max-w-[1280px] mx-auto w-full relative z-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-white mb-2">
              Trekking Routes
            </h2>
            <p className="text-slate-300 font-sans-body text-sm">
              Plan your journey through the majestic Himalayas.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('trekking')}
            className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore all treks</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {treks.slice(0, 2).map((trek) => (
            <div
              key={trek.id}
              className="flex flex-col sm:flex-row glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 group"
            >
              <div className="w-full sm:w-2/5 relative h-56 sm:h-auto shrink-0">
                <img
                  src={trek.imageUrl}
                  alt={trek.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 w-full sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {trek.tag === 'High Traffic' ? (
                      <span className="bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full font-sans-body text-xs font-bold border border-red-500/30">
                        High Traffic
                      </span>
                    ) : (
                      <span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full font-sans-body text-xs font-bold border border-cyan-400/30">
                        Recommended Alternative
                      </span>
                    )}
                    <span className="glass text-slate-300 px-2.5 py-0.5 rounded-full font-sans-body text-xs font-bold">
                      {trek.durationDays} Days • {trek.difficulty}
                    </span>
                  </div>

                  <h3 className="font-serif-headline text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {trek.name}
                  </h3>

                  <p className="text-slate-300 font-sans-body text-xs line-clamp-3 mb-6">
                    {trek.description}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('trekking')}
                  className="text-cyan-400 font-sans-body text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer mt-auto"
                >
                  <span>Route Details &amp; Weather</span>
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
