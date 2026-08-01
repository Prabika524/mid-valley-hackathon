import React, { useState } from 'react';

interface Festival {
  id: string;
  name: string;
  month: number; // 0-indexed (0=Jan)
  year: number;
  startDay: number;
  endDay?: number;
  location: string;
  isNationwide: boolean;
  category: string;
  description: string;
  experience: string;
  imageUrl: string;
  mapUrl?: string; // Google Maps link for specific-location festivals
}

const FESTIVALS: Festival[] = [
  // ── APRIL ────────────────────────────────────────────────────────────────
  {
    id: 'bisket-jatra',
    name: 'Bisket Jatra',
    month: 3, year: 2027, startDay: 13, endDay: 19,
    location: 'Bhaktapur Durbar Square', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Bhaktapur+Durbar+Square,+Nepal',
    category: 'Newar New Year Chariot Tug',
    description: 'Massive wooden chariots carrying Bhairava and Bhadrakali are pulled through the narrow cobbled streets of Bhaktapur, marking the Newar New Year with incredible energy and devotion.',
    experience: 'Watch the dramatic tug-of-war between east and west Bhaktapur as they pull the chariot. The raising of the massive pole (Yosin) is a sight unlike anything else.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bisket_Jatra_2018.jpg/640px-Bisket_Jatra_2018.jpg',
  },
  {
    id: 'ubhauli',
    name: 'Ubhauli',
    month: 3, year: 2027, startDay: 14,
    location: 'Hilly regions, Kirat communities', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Khotang+Solukhumbu+Nepal',
    category: 'Kirat Seasonal Festival',
    description: 'Ubhauli marks the upward migration season for Kirat (Rai & Limbu) communities. Nature is worshipped, traditional Sakela dances are performed, and offerings are made to Sumnima and Paruhang.',
    experience: 'Join the Kirat communities in their vibrant Sakela dance — a rhythmic circle dance that connects people to nature and ancestry.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sakela_dance.jpg/640px-Sakela_dance.jpg',
  },
  {
    id: 'ram-navami',
    name: 'Ram Navami',
    month: 3, year: 2027, startDay: 6,
    location: 'Janaki Mandir (Janakpur) & Nationwide', isNationwide: true,
    category: 'Birth of Lord Ram',
    description: 'Celebrates the birth of Lord Ram, the seventh avatar of Vishnu. Janakpur — the birthplace of Sita — is the spiritual center, with processions, bhajan singing, and grand temple decorations.',
    experience: 'The Janaki Mandir in Janakpur is spectacularly decorated with flowers and lights. Joining the morning aarti with thousands of devotees is a deeply moving experience.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Janaki_Mandir_Janakpur.jpg/640px-Janaki_Mandir_Janakpur.jpg',
  },
  // ── MAY ──────────────────────────────────────────────────────────────────
  {
    id: 'buddha-jayanti',
    name: 'Buddha Jayanti',
    month: 4, year: 2027, startDay: 23,
    location: 'Lumbini, Swayambhunath, Boudhanath', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Lumbini+Nepal',
    category: 'Birth of the Buddha',
    description: 'Celebrating the birth, enlightenment, and passing of Siddhartha Gautama. Thousands of pilgrims gather at Lumbini (his birthplace), Boudhanath, and Swayambhunath for prayer and processions.',
    experience: 'Witness the grand butter lamp lighting at Boudhanath at dusk — thousands of flames reflecting off the golden spire is a deeply moving spectacle.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Boudhanath_stupa.jpg/640px-Boudhanath_stupa.jpg',
  },
  {
    id: 'rato-machhindranath',
    name: 'Rato Machhindranath Jatra',
    month: 4, year: 2027, startDay: 1, endDay: 30,
    location: 'Patan (Lalitpur)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Patan+Durbar+Square+Lalitpur+Nepal',
    category: 'Longest Chariot Festival',
    description: "The world's longest chariot festival. A towering chariot (sometimes 15m+ tall) built from wood and bamboo is slowly pulled through Patan's streets over several months to honor the God of Harvest.",
    experience: 'The Bhoto Jatra — the public display of a jewelled vest — is the grand finale, traditionally attended by the head of state. A UNESCO-recognized living heritage.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rato_Machhindranath_chariot_festival.jpg/640px-Rato_Machhindranath_chariot_festival.jpg',
  },
  // ── JULY ─────────────────────────────────────────────────────────────────
  {
    id: 'dumji',
    name: 'Dumji',
    month: 6, year: 2026, startDay: 15,
    location: 'Khumbu (Everest Region), Sherpa Villages', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Tengboche+Monastery+Nepal',
    category: 'Sherpa Monastery Festival',
    description: 'A sacred Sherpa festival held at monasteries in the Khumbu valley. Monks perform elaborate masked Cham dances to ward off evil spirits and bring blessings to the community for the year ahead.',
    experience: 'Witness the colorful Cham masked dances at Tengboche or Thame monastery. The sound of long horns and cymbals echoing across the Himalayas is unforgettable.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tengboche_monastery.jpg/640px-Tengboche_monastery.jpg',
  },
  {
    id: 'janai-purnima',
    name: 'Janai Purnima (Raksha Bandhan)',
    month: 7, year: 2026, startDay: 9,
    location: 'Pashupatinath, Gosaikunda, Nationwide', isNationwide: true,
    category: 'Sacred Thread Festival',
    description: 'Hindu men change their sacred thread (janai) on this full moon day. Thousands of pilgrims trek to the high-altitude Gosaikunda Lake. Sisters tie protective threads (rakhi) on brothers\' wrists.',
    experience: 'The Gosaikunda pilgrimage — trekking to a glacial lake at 4,380m surrounded by chanting pilgrims — is a once-in-a-lifetime spiritual journey.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gosaikunda_Lake.jpg/640px-Gosaikunda_Lake.jpg',
  },
  // ── AUGUST ───────────────────────────────────────────────────────────────
  {
    id: 'gai-jatra',
    name: 'Gai Jatra (Saparu)',
    month: 7, year: 2026, startDay: 24,
    location: 'Kathmandu, Bhaktapur, Patan', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Kathmandu+Durbar+Square+Nepal',
    category: 'Festival of Cows & Remembrance',
    description: 'Families who lost a member in the past year lead a cow (or a child dressed as one) through the streets to guide the departed soul to heaven. Features satirical street performances mocking the government.',
    experience: 'The satirical processions of Bhaktapur are legendary — locals in wild costumes perform dark comedy. A deeply unique mix of grief and laughter.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Gai_Jatra_parade.jpg/640px-Gai_Jatra_parade.jpg',
  },
  {
    id: 'teej',
    name: 'Teej',
    month: 7, year: 2026, startDay: 27,
    location: 'Pashupatinath Temple & Nationwide', isNationwide: true,
    category: "Women's Festival of Devotion",
    description: 'Women dress in bright red, fast for their husbands\' longevity, and dance joyfully. Pashupatinath becomes a sea of red-clad women singing and swaying, and the festive mood spreads nationwide.',
    experience: 'Thousands of women in red saris singing Teej songs and dancing together in front of Pashupatinath is one of Nepal\'s most vibrant and joyful spectacles.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Teej_festival_Nepal.jpg/640px-Teej_festival_Nepal.jpg',
  },
  {
    id: 'krishna-janmashtami',
    name: 'Krishna Janmashtami (Ashtimki)',
    month: 7, year: 2026, startDay: 16,
    location: 'Krishna Mandir, Patan & Nationwide', isNationwide: true,
    mapUrl: 'https://www.google.com/maps/search/Krishna+Mandir+Patan+Nepal',
    category: 'Birth of Lord Krishna',
    description: 'Celebrating the birth of Lord Krishna at midnight. The Krishna Temple in Patan (a UNESCO site) becomes the epicenter, surrounded by oil lamps and devotional singing through the night.',
    experience: 'The Krishna Mandir in Patan glowing with hundreds of oil lamps at midnight is a magical, intimate experience unlike anything else.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Krishna_Mandir_Patan.jpg/640px-Krishna_Mandir_Patan.jpg',
  },
  // ── SEPTEMBER ────────────────────────────────────────────────────────────
  {
    id: 'indra-jatra',
    name: 'Indra Jatra (Yenya)',
    month: 8, year: 2026, startDay: 28,
    location: 'Kathmandu Durbar Square', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Kathmandu+Durbar+Square+Nepal',
    category: 'Living Goddess Chariot Procession',
    description: 'The largest street festival in Kathmandu celebrating King Indra. Features the public chariot procession of the Living Goddess Kumari, masked Lakhey dancers, and sacred oil lamps lit across the old city.',
    experience: 'Standing in Kathmandu Durbar Square as the Kumari\'s golden chariot passes by is something tourists rarely forget. Arrive before 14:00 for a good spot.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kumari_chariot_Indra_Jatra.jpg/640px-Kumari_chariot_Indra_Jatra.jpg',
  },
  // ── OCTOBER ──────────────────────────────────────────────────────────────
  {
    id: 'dashain',
    name: 'Bada Dashain',
    month: 9, year: 2026, startDay: 18, endDay: 28,
    location: 'Nationwide', isNationwide: true,
    category: 'Victory of Good over Evil',
    description: 'Nepal\'s grandest 15-day festival. Families gather from across the world, elders give tika and jamara blessings, bamboo swings (Linge Ping) are erected in every village, and kites fill the sky.',
    experience: 'Receiving tika from elders on Vijaya Dashami is the heart of the festival. The sight of kites filling the sky over every village is an image of pure Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dashain_festival.jpg/640px-Dashain_festival.jpg',
  },
  {
    id: 'jitiya',
    name: 'Jitiya (Jivitputrika)',
    month: 9, year: 2026, startDay: 6,
    location: 'Terai (Madhesh Province)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Madhesh+Province+Nepal',
    category: "Mother's Fast for Children",
    description: 'A major festival in the Terai where mothers fast for three days without water to pray for the long life and prosperity of their children. Observed mainly by Maithili and Bhojpuri communities.',
    experience: 'The devotion of mothers — fasting completely for three days by riversides, praying and performing rituals — is a profound display of maternal love unique to the Terai culture.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chhath_Puja_Ghat.jpg/640px-Chhath_Puja_Ghat.jpg',
  },
  {
    id: 'mani-rimdu-oct',
    name: 'Mani Rimdu',
    month: 10, year: 2026, startDay: 25,
    location: 'Tengboche Monastery, Khumbu', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Tengboche+Monastery+Khumbu+Nepal',
    category: 'Sherpa Monastery Masked Dance',
    description: 'A three-day Sherpa Buddhist festival at Tengboche Monastery (3,867m) featuring elaborate Cham masked dances by monks, fire pujas, and the distribution of sacred pills for blessings.',
    experience: 'Watching the masked Cham dances at Tengboche with Ama Dablam and Everest visible behind is a bucket-list experience for trekkers in the Khumbu region.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tengboche_monastery_mani_rimdu.jpg/640px-Tengboche_monastery_mani_rimdu.jpg',
  },
  // ── NOVEMBER ─────────────────────────────────────────────────────────────
  {
    id: 'tihar',
    name: 'Tihar & Mha Puja',
    month: 10, year: 2026, startDay: 8, endDay: 12,
    location: 'Nationwide & Newar Households', isNationwide: true,
    category: 'Festival of Lights',
    description: 'A 5-day festival of lights honoring crows, dogs, cows, and Laxmi (Goddess of Wealth). The Newari Mha Puja (self-reverence ritual) and colorful Rangoli mandalas make this festival unique in the world.',
    experience: 'Kathmandu Valley at night during Tihar — every street lit with butter lamps and the air full of Deusi-Bhailo singing — is one of the most magical sights in all of Asia.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tihar_festival_Nepal_lights.jpg/640px-Tihar_festival_Nepal_lights.jpg',
  },
  {
    id: 'chhath',
    name: 'Chhath Puja',
    month: 10, year: 2026, startDay: 14,
    location: 'Riverbanks of Terai (Bagmati, Koshi, etc.)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Bagmati+River+Kathmandu+Nepal',
    category: 'Sun Worship Festival',
    description: 'Devotees from the Terai/Madhesh fast for 36 hours and offer prayers to the setting and rising sun, standing in rivers at dusk and dawn. A profoundly powerful act of devotion.',
    experience: 'Thousands of devotees standing in the sacred river at dawn, hands raised toward the rising sun in silence, is one of the most spiritually moving sights in Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chhath_Puja_Ghat.jpg/640px-Chhath_Puja_Ghat.jpg',
  },
  {
    id: 'sama-chakeva',
    name: 'Sama Chakeva',
    month: 10, year: 2026, startDay: 10, endDay: 15,
    location: 'Mithila region, Terai', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Janakpur+Madhesh+Nepal',
    category: 'Maithili Bird Festival',
    description: 'A unique Maithili festival celebrating the bond between brother and sister. Women craft beautiful clay birds (Sama and Chakeva) and sing folk songs for several days before ritually immersing them in a river.',
    experience: 'The intricate clay bird figurines crafted by women and girls, and the melodic Maithili folk songs sung at dusk, are a rare window into the living folk arts of the Terai.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Janaki_Mandir_Janakpur.jpg/640px-Janaki_Mandir_Janakpur.jpg',
  },
  {
    id: 'vivah-panchami',
    name: 'Vivah Panchami',
    month: 10, year: 2026, startDay: 26,
    location: 'Janaki Mandir, Janakpur', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Janaki+Temple+Janakpur+Nepal',
    category: 'Divine Wedding of Ram & Sita',
    description: 'Commemorates the divine wedding of Lord Ram and Sita at the ornate Janaki Mandir in Janakpur. A grand re-enactment procession with decorated elephants draws hundreds of thousands of devotees.',
    experience: 'The grand wedding procession through Janakpur — elephants, horses, and a Ram effigy — is one of the most theatrical religious spectacles in South Asia.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Janaki_Mandir_Janakpur.jpg/640px-Janaki_Mandir_Janakpur.jpg',
  },
  {
    id: 'udhauli',
    name: 'Udhauli',
    month: 10, year: 2026, startDay: 30,
    location: 'Kirat communities, Hills & Terai', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Khotang+Nepal',
    category: 'Kirat Downward Migration Festival',
    description: 'The companion festival to Ubhauli, Udhauli marks the downward migration from hills to warmer Terai for winter. Kirat (Rai & Limbu) communities celebrate with Sakela dances and offerings to nature gods.',
    experience: 'The Sakela circle dances performed outdoors at dusk, with drumming and traditional costumes, are a vibrant expression of the Kirat people\'s deep connection to seasonal cycles.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sakela_dance.jpg/640px-Sakela_dance.jpg',
  },
  // ── DECEMBER ─────────────────────────────────────────────────────────────
  {
    id: 'tamu-losar',
    name: 'Tamu Losar (Gurung New Year)',
    month: 11, year: 2026, startDay: 30,
    location: 'Gurung villages, Pokhara & Kathmandu', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Pokhara+Nepal',
    category: 'Gurung New Year',
    description: 'The New Year celebration of the Gurung (Tamu) people. Features traditional Ghatu and Chudka dances, family gatherings, and offerings to ancestors across the Annapurna region.',
    experience: 'In Pokhara and the Gurung villages, the Ghatu dance — young women telling mythological stories through movement — is a rare and beautiful tradition to witness.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Gurung_dance_Nepal.jpg/640px-Gurung_dance_Nepal.jpg',
  },
  // ── JANUARY ──────────────────────────────────────────────────────────────
  {
    id: 'maghe-sankranti',
    name: 'Maghe Sankranti',
    month: 0, year: 2027, startDay: 14,
    location: 'Devghat, Triveni & Nationwide', isNationwide: true,
    category: 'Winter Solstice Harvest Festival',
    description: 'Marks the end of the inauspicious month Poush. People take holy dips at river confluences, eat sesame sweets (til ko laddu), sweet potatoes, and ghee. Devghat near Chitwan is the holiest pilgrimage site.',
    experience: 'A morning dip at the sacred Devghat confluence surrounded by sadhus and devotees in the winter fog is deeply atmospheric and memorable.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Devghat_confluence.jpg/640px-Devghat_confluence.jpg',
  },
  {
    id: 'maghi',
    name: 'Maghi (Tharu New Year)',
    month: 0, year: 2027, startDay: 14,
    location: 'Terai (Tharu communities)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Chitwan+Bardiya+Nepal',
    category: 'Tharu New Year',
    description: 'The most important festival for the Tharu people of the Terai. Maghi marks their new year with community feasts, traditional stick dances (Deuda/Lathi), and the election of new village leaders.',
    experience: 'The energetic Tharu stick dance (Lathi Nach) — performed around bonfires on a cold January night in Chitwan or Bardiya — is a thrilling and rarely-seen cultural spectacle.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Devghat_confluence.jpg/640px-Devghat_confluence.jpg',
  },
  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  {
    id: 'sonam-losar',
    name: 'Sonam Losar (Tamang New Year)',
    month: 1, year: 2027, startDay: 7,
    location: 'Tamang communities, Kathmandu & hills', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Langtang+Valley+Nepal',
    category: 'Tamang New Year',
    description: 'The Tamang New Year celebrated with Damphu drum dances, traditional songs, and offerings to Lha (sky deities). The Tamang people\'s rich culture comes alive in villages around the Langtang region.',
    experience: 'The energetic Damphu dance — men and women performing together with the distinctive round frame drum — is one of Nepal\'s most recognizable and joyful folk traditions.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tamang_damphu_dance.jpg/640px-Tamang_damphu_dance.jpg',
  },
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    month: 1, year: 2027, startDay: 26,
    location: 'Pashupatinath Temple, Nationwide', isNationwide: true,
    category: 'Great Night of Shiva',
    description: 'One of the holiest nights in Hinduism. Over a million devotees descend on Pashupatinath in Kathmandu. Ash-covered Sadhus from across the subcontinent gather, bonfires burn all night.',
    experience: 'Hundreds of Sadhus with dreadlocks, tridents, and sacred fires gathered at Pashupatinath makes this unlike any festival anywhere in the world.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pashupatinath_Shivaratri.jpg/640px-Pashupatinath_Shivaratri.jpg',
  },
  // ── MARCH ────────────────────────────────────────────────────────────────
  {
    id: 'holi',
    name: 'Holi (Fagu Purnima)',
    month: 2, year: 2027, startDay: 3,
    location: 'Nationwide (Kathmandu & Terai lead)', isNationwide: true,
    category: 'Festival of Colors',
    description: 'The famous festival of colors celebrating the victory of good over evil and the arrival of spring. Streets become a riot of colored powder and water, with Kathmandu celebrating a day before the Terai.',
    experience: 'Basantapur Durbar Square on Holi morning — thousands drenching each other in color against the backdrop of ancient temples — is pure, joyful chaos at its best.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Holi_festival_Nepal.jpg/640px-Holi_festival_Nepal.jpg',
  },
  {
    id: 'sherpa-losar',
    name: 'Sherpa Losar',
    month: 2, year: 2027, startDay: 5,
    location: 'Sherpa communities, Khumbu & Kathmandu', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Namche+Bazaar+Khumbu+Nepal',
    category: 'Sherpa New Year',
    description: 'The Sherpa New Year celebrated in the Khumbu and among Sherpa diaspora in Kathmandu. Features monastery prayers, traditional feasts, music, and community gatherings in colorful traditional dress.',
    experience: 'Celebrating Losar with Sherpa families in a Khumbu village — the warmth, the traditional butter tea, the prayers at the local monastery — offers a genuine window into Himalayan Buddhist culture.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tengboche_monastery.jpg/640px-Tengboche_monastery.jpg',
  },
  {
    id: 'seto-machhindranath',
    name: 'Seto Machhindranath Jatra',
    month: 2, year: 2027, startDay: 15,
    location: 'Old Kathmandu (Asan to Jana Bahal)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Jana+Bahal+Kathmandu+Nepal',
    category: 'White Machhindranath Chariot',
    description: 'The chariot festival of White (Seto) Machhindranath in old Kathmandu. A tall chariot is pulled through the historic lanes of the old city over several days, drawing massive crowds of devotees.',
    experience: 'The chariot procession through narrow ancient lanes — devotees pressing forward to touch the wheels for blessings — is intense, crowded, and utterly alive with devotion.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Seto_Machhindranath_chariot.jpg/640px-Seto_Machhindranath_chariot.jpg',
  },
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const INITIAL_MONTH = 8; // September 2026
const INITIAL_YEAR = 2026;

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}
function getFestivalsForDay(month: number, year: number, day: number): Festival[] {
  return FESTIVALS.filter(f => {
    if (f.month !== month || f.year !== year) return false;
    if (f.endDay) return day >= f.startDay && day <= f.endDay;
    return f.startDay === day;
  });
}
function getFestivalsForMonth(month: number, year: number): Festival[] {
  return FESTIVALS.filter(f => f.month === month && f.year === year);
}

// Sort festivals chronologically for the list
const FESTIVALS_SORTED = [...FESTIVALS].sort((a, b) => {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.startDay - b.startDay;
});

export const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(INITIAL_MONTH);
  const [currentYear, setCurrentYear] = useState(INITIAL_YEAR);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthFestivals = getFestivalsForMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelectedDay(null); setSelectedFestival(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelectedDay(null); setSelectedFestival(null);
  };
  const handleDayClick = (day: number) => {
    const fests = getFestivalsForDay(currentMonth, currentYear, day);
    if (fests.length > 0) { setSelectedDay(day); setSelectedFestival(fests[0]); }
    else { setSelectedDay(null); setSelectedFestival(null); }
  };

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-12 md:py-20 min-h-screen text-slate-100">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="mb-10">
        <span className="inline-block font-sans-body text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
          Living Traditions
        </span>
        <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-4">
          Cultural Calendar &amp; Festivals
        </h1>
        <p className="font-sans-body text-base text-slate-300 max-w-2xl">
          Plan your visit around Nepal's ancient living festivals, sacred chariot processions, and seasonal celebrations. Click any highlighted date to discover the event.
        </p>
      </header>

      {/* ── Calendar + Detail (side by side) ──────────────────────────────── */}
      <div className="flex flex-col xl:flex-row gap-8">

        {/* Calendar Grid */}
        <div className="flex-1 min-w-0">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">

            {/* Month Nav */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="glass p-2 rounded-xl border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <div className="text-center">
                <h2 className="font-serif-headline text-2xl font-bold text-white">{MONTH_NAMES[currentMonth]}</h2>
                <p className="font-sans-body text-xs text-cyan-400 font-bold">{currentYear}</p>
              </div>
              <button onClick={nextMonth} className="glass p-2 rounded-xl border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-center font-sans-body text-xs font-bold text-slate-400 py-2">{d}</div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`} />;
                const fests = getFestivalsForDay(currentMonth, currentYear, day);
                const hasFestival = fests.length > 0;
                const isSelected = selectedDay === day;
                return (
                  <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`
                      relative flex flex-col items-center justify-start p-1.5 rounded-xl min-h-[52px] transition-all
                      ${hasFestival ? 'cursor-pointer' : 'cursor-default'}
                      ${isSelected
                        ? 'bg-cyan-500/30 border border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                        : hasFestival
                          ? 'glass border border-amber-400/30 hover:border-amber-400/70 hover:bg-amber-500/10'
                          : 'border border-transparent'}
                    `}
                  >
                    <span className={`font-sans-body text-sm font-bold leading-none mb-1 ${isSelected ? 'text-cyan-300' : hasFestival ? 'text-amber-300' : 'text-slate-400'}`}>
                      {day}
                    </span>
                    {hasFestival && (
                      <div className="flex flex-col items-center gap-0.5 w-full">
                        {fests.slice(0, 2).map(f => (
                          <span key={f.id} className="w-full text-center font-sans-body text-[9px] leading-tight text-amber-200 truncate px-0.5">
                            {f.name.split(' ')[0]}
                          </span>
                        ))}
                        {fests.length > 2 && (
                          <span className="font-sans-body text-[9px] text-cyan-400">+{fests.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* This month's list */}
            {monthFestivals.length > 0 && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="font-sans-body text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">This Month's Festivals</p>
                <div className="flex flex-col gap-2">
                  {monthFestivals.map(f => (
                    <button
                      key={f.id}
                      onClick={() => { setSelectedFestival(f); setSelectedDay(f.startDay); }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${selectedFestival?.id === f.id ? 'bg-amber-500/20 border border-amber-400/50' : 'glass border border-white/10 hover:border-amber-400/40'}`}
                    >
                      <span className="material-symbols-outlined text-base text-amber-400">celebration</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans-body text-xs font-bold text-white truncate">{f.name}</p>
                        <p className="font-sans-body text-[10px] text-slate-400">
                          {f.endDay ? `${MONTH_NAMES[f.month].slice(0,3)} ${f.startDay}–${f.endDay}` : `${MONTH_NAMES[f.month].slice(0,3)} ${f.startDay}`}
                          {' · '}{f.isNationwide ? '🇳🇵 Nationwide' : f.location}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {monthFestivals.length === 0 && (
              <div className="mt-6 pt-4 border-t border-white/10 text-center text-slate-500 font-sans-body text-sm py-4">
                No major festivals this month. Navigate to find upcoming events.
              </div>
            )}
          </div>
        </div>

        {/* Event Detail Panel */}
        <div className="xl:w-[420px] shrink-0">
          {selectedFestival ? (
            <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden sticky top-24">
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={selectedFestival.imageUrl}
                  alt={selectedFestival.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Boudhanath_stupa.jpg/640px-Boudhanath_stupa.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest">{selectedFestival.category}</span>
                  <h3 className="font-serif-headline text-2xl font-bold text-white mt-1">{selectedFestival.name}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-slate-300 font-sans-body text-xs">
                    <span className="material-symbols-outlined text-base text-cyan-400">calendar_today</span>
                    {selectedFestival.endDay
                      ? `${MONTH_NAMES[selectedFestival.month]} ${selectedFestival.startDay}–${selectedFestival.endDay}, ${selectedFestival.year}`
                      : `${MONTH_NAMES[selectedFestival.month]} ${selectedFestival.startDay}, ${selectedFestival.year}`}
                  </div>

                  {/* Location row with optional map link */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 text-slate-300 font-sans-body text-xs flex-1">
                      <span className="material-symbols-outlined text-base text-cyan-400 mt-0.5">location_on</span>
                      <span>
                        {selectedFestival.isNationwide
                          ? `Celebrated all over Nepal (main hub: ${selectedFestival.location})`
                          : selectedFestival.location}
                      </span>
                    </div>
                    {selectedFestival.mapUrl && (
                      <a
                        href={selectedFestival.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1 glass px-2.5 py-1 rounded-lg border border-cyan-400/30 hover:border-cyan-400/70 text-cyan-400 hover:text-cyan-300 font-sans-body text-[10px] font-bold transition-all"
                      >
                        <span className="material-symbols-outlined text-xs">map</span>
                        View on Map
                      </a>
                    )}
                  </div>

                  {/* Location type badge */}
                  {selectedFestival.isNationwide ? (
                    <span className="self-start bg-cyan-500/15 text-cyan-300 px-3 py-1 rounded-full font-sans-body text-[10px] font-bold border border-cyan-400/30">
                      🇳🇵 Celebrated Nationwide
                    </span>
                  ) : (
                    <span className="self-start bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full font-sans-body text-[10px] font-bold border border-amber-400/30">
                      📍 Specific Location
                    </span>
                  )}
                </div>
                <div className="carved-line opacity-30" />
                <div>
                  <p className="font-sans-body text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">About This Festival</p>
                  <p className="font-sans-body text-xs text-slate-300 leading-relaxed">{selectedFestival.description}</p>
                </div>
                <div className="glass rounded-2xl p-4 border border-cyan-400/20">
                  <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">star</span>
                    Tourist Experience
                  </p>
                  <p className="font-sans-body text-xs text-slate-300 leading-relaxed">{selectedFestival.experience}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center text-center min-h-[320px] sticky top-24">
              <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">calendar_month</span>
              <h3 className="font-serif-headline text-xl font-bold text-white mb-2">Select a Festival Date</h3>
              <p className="font-sans-body text-xs text-slate-400 max-w-xs">
                Click on any highlighted date on the calendar to see full details about that festival — what it is, where it happens, and what you can experience.
              </p>
              {monthFestivals.length === 0 && (
                <p className="font-sans-body text-xs text-cyan-400 mt-4 font-bold">
                  ← Navigate the months to find upcoming festivals
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── All Festivals List ─────────────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="font-serif-headline text-2xl font-bold text-white mb-2 text-center">All Upcoming Festivals (2026–2027)</h2>
        <p className="font-sans-body text-sm text-slate-400 text-center mb-8">Click any festival to jump to it on the calendar.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {FESTIVALS_SORTED.map(f => (
            <button
              key={f.id}
              onClick={() => {
                setCurrentMonth(f.month);
                setCurrentYear(f.year);
                setSelectedDay(f.startDay);
                setSelectedFestival(f);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glass-card glass-card-hover rounded-2xl p-4 border border-white/10 text-left flex items-start gap-4 cursor-pointer transition-all hover:border-amber-400/40 group"
            >
              <div className="shrink-0 w-12 h-12 glass rounded-xl flex flex-col items-center justify-center border border-amber-400/30 group-hover:border-amber-400/60 transition-all">
                <span className="font-serif-headline text-sm font-bold text-amber-300 leading-none">{f.startDay}</span>
                <span className="font-sans-body text-[9px] text-slate-400 uppercase">{MONTH_NAMES[f.month].slice(0, 3)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans-body text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">{f.name}</p>
                <p className="font-sans-body text-[10px] text-cyan-400 font-semibold mb-1">{f.category}</p>
                <p className="font-sans-body text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {f.isNationwide ? '🇳🇵 Nationwide' : f.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
