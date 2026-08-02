import React, { useState } from 'react';

interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
  rating: number;
  priceRange: string;
  mapUrl: string;
}

interface Festival {
  id: string;
  name: string;
  month: number; // 0-indexed: 0=Jan, 1=Feb, 2=Mar, 3=Apr, 4=May, 5=Jun, 6=Jul, 7=Aug, 8=Sep, 9=Oct, 10=Nov, 11=Dec
  year: number;
  startDay: number;
  endDay?: number;
  location: string;
  isNationwide: boolean;
  category: string;
  description: string;
  history: string;
  whatHappens: string[];
  experience: string;
  imageUrl: string;
  photos: string[]; // additional gallery images
  mapUrl?: string;
  nearbyHotels: NearbyPlace[];
  nearbyRestaurants: NearbyPlace[];
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
    description: 'Massive wooden chariots carrying Bhairava and Bhadrakali are pulled through the narrow cobbled streets of Bhaktapur, marking the Newar New Year with incredible energy, dramatic tug-of-war contests, and devotion.',
    history: 'Bisket Jatra dates back over 1,600 years to the reign of the Malla kings. The word "Bisket" is believed to derive from "Bi" (snake) and "syaku" (slain) — referring to the legend of a prince who defeated two serpents hiding in a princess\'s hair. The festival marks the Nepali solar new year and has been continuously celebrated in Bhaktapur, making it one of the oldest surviving urban festivals in South Asia.',
    whatHappens: [
      'A massive wooden chariot (rath) is constructed fresh each year using ancient carpentry techniques, reaching over 10 meters tall.',
      'Two teams from the east and west sides of Bhaktapur engage in a dramatic tug-of-war to pull the chariot through the streets.',
      'A towering pole (Yosin) decorated with cloth streamers is raised in Taumadhi Square — its falling direction predicts fortune for the city.',
      'The chariot procession carries images of Bhairava and Bhadrakali through the ancient city lanes over eight days.',
      'On the final day the pole is brought down and the festival concludes with offerings and music.',
    ],
    experience: 'Watch the dramatic tug-of-war between east and west Bhaktapur. The raising and falling of the Yosin pole in front of Nyatapola Temple is a sight unlike anything else in the world.',
    imageUrl: '/festivals/page_1_img_1.jpeg',
    photos: [
      '/festivals/page_1_img_1.jpeg',
      '/festivals/page_2_img_1.jpeg',
      '/festivals/page_2_img_2.jpeg',
      '/festivals/page_1.png'
    ],
    nearbyHotels: [
      { name: 'Bhaktapur Heritage Hotel', type: 'Heritage Boutique', distance: '0.3 km', rating: 4.5, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Bhaktapur+Durbar+Square' },
      { name: 'Shiva Guesthouse', type: 'Budget Guesthouse', distance: '0.5 km', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+Bhaktapur+Nepal' },
      { name: 'Pagoda Guest House', type: 'Mid-range Hotel', distance: '0.7 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Pagoda+Guest+House+Bhaktapur' },
    ],
    nearbyRestaurants: [
      { name: 'Cafe Nyatapola', type: 'Newari & Continental', distance: '0.1 km', rating: 4.6, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Cafe+Nyatapola+Bhaktapur' },
      { name: 'Sunny Restaurant', type: 'Nepali Traditional', distance: '0.3 km', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurants+near+Bhaktapur+Durbar+Square' },
      { name: 'Marco Polo Restaurant', type: 'Multi-cuisine', distance: '0.6 km', rating: 4.0, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Marco+Polo+Restaurant+Bhaktapur' },
    ],
  },
  {
    id: 'ubhauli',
    name: 'Ubhauli',
    month: 3, year: 2027, startDay: 14,
    location: 'Hilly regions, Kirat communities', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Khotang+Solukhumbu+Nepal',
    category: 'Kirat Seasonal Festival',
    description: 'Ubhauli marks the upward migration season for Kirat (Rai & Limbu) communities. Nature is worshipped, traditional Sakela dances are performed, and offerings are made to Sumnima and Paruhang.',
    history: 'Ubhauli is one of the two great seasonal festivals of the Kirat people (the other being Udhauli in winter). Rooted in the ancient animistic religion of Kirat Mundhum, the festival is tied to the agricultural calendar — marking the time when people and livestock move to higher pastures.',
    whatHappens: [
      'Communities gather at a communal ground (chautari) in the village for collective worship.',
      'Shamans (Bijuwa or Mangpa) perform rituals and offerings to nature deities Sumnima and Paruhang.',
      'The Sakela dance is performed in large circles — men and women moving together in synchronized steps mimicking nature.',
      'Traditional Kirat food and chhyang (millet beer) are shared among the community.',
    ],
    experience: 'Joining the Sakela circle dance — hundreds of people moving in unison to the beat of the dhol drum — is a rare, joyful cultural immersion.',
    imageUrl: '/festivals/page_26_img_1.jpeg',
    photos: [
      '/festivals/page_26_img_1.jpeg',
      '/festivals/page_26_img_2.jpeg',
      '/festivals/page_23_img_1.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Khumbu', type: 'Mountain Lodge', distance: '2 km', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Khotang+Nepal' },
      { name: 'Rai Community Homestay', type: 'Homestay', distance: '0.5 km', rating: 4.4, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/homestay+Khotang+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Kirat Bhojanalaya', type: 'Traditional Kirat', distance: '0.3 km', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+Khotang+Nepal' },
    ],
  },
  // ── MAY ──────────────────────────────────────────────────────────────────
  {
    id: 'buddha-jayanti',
    name: 'Buddha Jayanti',
    month: 4, year: 2027, startDay: 23,
    location: 'Lumbini, Swayambhunath, Boudhanath', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Lumbini+Nepal',
    category: 'Birth of the Buddha (Lumbini)',
    description: 'Celebrating the birth, enlightenment, and parinirvana of Siddhartha Gautama in Lumbini (his birthplace). Monks and pilgrims gather for candlelit prayer ceremonies, flower offerings, and colorful processions.',
    history: 'Buddha Jayanti (also called Vesak) commemorates three key events in Siddhartha Gautama\'s life — his birth (563 BCE), enlightenment, and death — all said to have occurred on the same full moon day. Lumbini in Nepal\'s Terai is the verified birthplace of the Buddha, recognized by UNESCO. The festival has been observed by Buddhists globally for over 2,500 years.',
    whatHappens: [
      'At Lumbini, monks from Buddhist nations worldwide gather for prayers and the lighting of thousands of butter lamps at Maya Devi Temple.',
      'The sacred Bodhi tree at Lumbini is decorated with prayer flags and offerings.',
      'At Boudhanath stupa in Kathmandu, thousands of devotees walk clockwise (kora) around the stupa all night spinning prayer wheels.',
      'At Swayambhunath, the hilltop stupa is illuminated and elaborate puja rituals are performed by monks.',
      'Buddhist processions with monks in saffron robes carrying relics pass through Kathmandu and Lumbini.',
    ],
    experience: 'The butter lamp lighting at Maya Devi Temple in Lumbini and Boudhanath at dusk — thousands of flames reflecting off sacred monuments while monks chant — is one of the most peaceful and spiritual sights in Nepal.',
    imageUrl: '/festivals/page_3_img_1.jpeg',
    photos: [
      '/festivals/page_3_img_1.jpeg',
      '/festivals/page_4_img_1.jpeg',
      '/festivals/page_4_img_2.jpeg',
      '/festivals/page_3.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Lumbini Garden', type: 'Heritage Resort', distance: '0.3 km', rating: 4.5, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Lumbini+Nepal' },
      { name: 'Buddha Maya Gardens Hotel', type: 'Boutique Hotel', distance: '0.5 km', rating: 4.6, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Buddha+Maya+Gardens+Hotel+Lumbini' },
      { name: 'Boudha Stupa Guesthouse', type: 'Budget Guesthouse', distance: '0.2 km from Boudhanath', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+near+Boudhanath+stupa' },
    ],
    nearbyRestaurants: [
      { name: 'Café du Temple', type: 'Continental & Tibetan', distance: '0.1 km from Boudhanath', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/cafe+near+Boudhanath+Kathmandu' },
      { name: 'Lumbini Organic Kitchen', type: 'Vegetarian & Vegan', distance: '0.4 km', rating: 4.3, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/vegetarian+restaurant+Lumbini+Nepal' },
    ],
  },
  // ── MAY–JUNE ─────────────────────────────────────────────────────────────
  {
    id: 'rato-machhindranath',
    name: 'Rato Machhindranath Jatra',
    month: 4, year: 2027, startDay: 1, endDay: 30,
    location: "Patan\'s Long Chariot Procession", isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Patan+Durbar+Square+Lalitpur+Nepal',
    category: 'Longest Chariot Festival (Patan)',
    description: "The world\'s longest chariot festival. A towering chariot built from wood and leafy pine branches is slowly pulled through Patan\'s streets over months to honor Rato Machhindranath, the God of Harvest and Rain.",
    history: 'Dating back to the 10th century, this festival originated when Kathmandu Valley faced a catastrophic drought. The farmer-god Machhindranath (also revered as Bunga Dyo) was brought to Patan to bring rain. The annual chariot festival re-enacts this journey. The chariot is constructed fresh each year by skilled Newar craftsmen using traditional techniques passed down for generations.',
    whatHappens: [
      'Master craftsmen spend weeks building the massive chariot entirely from bamboo, pine wood, and cloth using no nails.',
      'The chariot — over 15 meters tall — is slowly towed by hand through Patan\'s narrow streets over 4-6 weeks.',
      'Thousands of devotees pull the thick ropes attached to the chariot as an act of devotion and blessing.',
      'The grand finale is Bhoto Jatra — the public display of a sacred jewelled vest (bhoto) said to belong to a serpent king.',
      'The head of state traditionally presides over the Bhoto Jatra ceremony, making it a national highlight.',
    ],
    experience: 'Standing beside the towering chariot as it sways through Patan\'s medieval streets — surrounded by thousands of cheering devotees — is one of the most visceral living-heritage experiences in the world.',
    imageUrl: '/festivals/page_5_img_1.jpeg',
    photos: [
      '/festivals/page_5_img_1.jpeg',
      '/festivals/page_6_img_1.jpeg',
      '/festivals/page_7_img_1.jpeg',
      '/festivals/page_5.png'
    ],
    nearbyHotels: [
      { name: 'Inn Patan', type: 'Boutique Heritage Hotel', distance: '0.4 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Patan+Durbar+Square' },
      { name: 'Hotel Himalaya Patan', type: 'Mid-range Hotel', distance: '1.2 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Himalaya+Patan+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Café de Patan', type: 'Newari Fusion', distance: '0.1 km', rating: 4.5, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/cafe+near+Patan+Durbar+Square' },
      { name: 'Newari Kitchen', type: 'Traditional Newari', distance: '0.3 km', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Newari+restaurant+Patan+Nepal' },
    ],
  },
  // ── JULY–AUGUST ──────────────────────────────────────────────────────────
  {
    id: 'janai-purnima',
    name: 'Janai Purnima',
    month: 6, year: 2026, startDay: 9,
    location: 'Pashupatinath, Gosaikunda & Nationwide', isNationwide: true,
    category: 'Sacred Thread Festival',
    description: 'Hindu men change their sacred thread (janai) on this full moon day. Thousands of pilgrims trek to high-altitude Gosaikunda Lake, while priests tie protective yellow/red sacred threads on wrists.',
    history: 'Janai Purnima falls on the full moon of Shrawan. The janai (sacred thread) worn by Hindu men is ritually renewed once a year. The Gosaikunda pilgrimage tradition is ancient — the glacial lake at 4,380m is believed to have been created by Lord Shiva\'s trident. Raksha Bandhan, observed on the same day, represents the bond of protection and family love.',
    whatHappens: [
      'Brahmin priests change the janai (sacred thread) of Hindu men at temples and river ghats across Nepal.',
      'Thousands of pilgrims trek through the Langtang range to reach Gosaikunda Lake for a sacred dip.',
      'Priests and sisters tie colorful protective threads (raksha bandhan) on wrists.',
      'Special sacred foods like Kwati (sprouted nine-bean soup) are prepared and shared in families.',
      'At Pashupatinath, priests perform elaborate thread blessing rituals at dawn.',
    ],
    experience: 'The Gosaikunda pilgrimage is one of Nepal\'s great spiritual hikes — trekking through rhododendron forests, passing high-altitude lakes, and arriving at a sacred glacial lake ringed by snow peaks.',
    imageUrl: '/festivals/page_9_img_2.jpeg',
    photos: [
      '/festivals/page_9_img_2.jpeg',
      '/festivals/page_8_img_1.jpeg',
      '/festivals/page_9_img_1.jpeg',
      '/festivals/page_9.png'
    ],
    nearbyHotels: [
      { name: 'Gosaikunda Lodge', type: 'Mountain Lodge', distance: '0.2 km', rating: 3.8, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/lodge+Gosaikunda+Nepal' },
      { name: 'Hotel Pashupatinath', type: 'Mid-range Hotel', distance: '0.3 km from Pashupatinath', rating: 4.1, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Pashupatinath+Temple' },
    ],
    nearbyRestaurants: [
      { name: 'Dhungechhap Tea House', type: 'Nepali Tea House', distance: '0.5 km from Gosaikunda', rating: 3.7, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/tea+house+Langtang+Nepal' },
      { name: 'Chhayabari Restaurant', type: 'Nepali & Continental', distance: '0.5 km from Pashupatinath', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+near+Pashupatinath+Kathmandu' },
    ],
  },
  // ── AUGUST ───────────────────────────────────────────────────────────────
  {
    id: 'teej',
    name: 'Teej',
    month: 7, year: 2026, startDay: 27,
    location: 'Pashupatinath Temple & Nationwide', isNationwide: true,
    category: "Women\'s Festival (Red Saris)",
    description: 'Women dress in vibrant red saris, fast for marital bliss and family prosperity, and dance joyfully in groups. Pashupatinath becomes a stunning sea of red-clad women singing and swaying together.',
    history: 'Teej is rooted in the legend of Goddess Parvati, who fasted and prayed for Lord Shiva to accept her as his bride. Observed on the third day of Bhadra, the festival is one of the most important for Hindu women in Nepal. It blends religious devotion with social celebration — a rare space where women sing, dance publicly, and express social joy.',
    whatHappens: [
      'The evening before (Dar Khane Din) women feast on rich foods before beginning their day-long fast.',
      'On Teej day, women dress in bright red saris, gold ornaments, and green bangles, gathering at Pashupatinath from dawn.',
      'Thousands of women sing traditional Teej folk songs, dance in groups, and pray at Shiva temples.',
      'Women fast completely — many without taking a drop of water — for the full day as an act of devotion.',
      'The festival is a major social reunion: women visit their maternal homes and celebrate mother-daughter bonds.',
    ],
    experience: 'The sight of tens of thousands of red saris gathered at Pashupatinath temple — singing, laughing, and dancing together under the sun — is one of Nepal\'s most vibrant and joyful spectacles.',
    imageUrl: '/festivals/page_10_img_1.jpeg',
    photos: [
      '/festivals/page_10_img_1.jpeg',
      '/festivals/page_11_img_1.jpeg',
      '/festivals/page_11_img_2.jpeg',
      '/festivals/page_10.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Ganesha Himal', type: 'Mid-range Hotel', distance: '0.5 km from Pashupatinath', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Pashupatinath+Temple+Kathmandu' },
      { name: 'Hyatt Regency Kathmandu', type: 'Luxury Hotel', distance: '0.3 km', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Hyatt+Regency+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: 'Pashupati Area Dhabas', type: 'Traditional Nepali', distance: '0.2 km', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+near+Pashupatinath+Kathmandu' },
      { name: "The Dwarika\'s Restaurant", type: 'Heritage Dining', distance: '1 km', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
    ],
  },
  {
    id: 'gai-jatra',
    name: 'Gai Jatra',
    month: 7, year: 2026, startDay: 24,
    location: 'Kathmandu, Bhaktapur, Patan', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Kathmandu+Durbar+Square+Nepal',
    category: 'Cow Procession & Satire',
    description: 'Families who lost a member in the past year lead children dressed with cow crowns and paper headpieces through the streets to guide souls to heaven, alongside satirical street performances.',
    history: 'Gai Jatra was established by 17th century Malla king Pratap Malla to console his queen after their son died. When nothing made her smile, the king invited all bereaved families to parade through Kathmandu — the sight of the city united in humor and solidarity finally brought comfort. The tradition of lighthearted satire and political parody grew from this original act.',
    whatHappens: [
      'Families who lost a member dress a young boy with painted paper crowns with cow motifs (or lead a real cow) in procession.',
      'Participants dress in creative costumes — clowns, demons, political satire figures — for colorful street parades.',
      'Newspapers and street artists perform dark comedy acts and political satire shows across Durbar squares.',
      'In Bhaktapur, masked stick dancers (Gheintang Nati) perform energetic street dances all day long.',
    ],
    experience: 'The satirical processions of Bhaktapur and Kathmandu — a unique mix of remembrance, humor, and street theater — offer a deeply original view into Nepali culture.',
    imageUrl: '/festivals/page_12_img_1.jpeg',
    photos: [
      '/festivals/page_12_img_1.jpeg',
      '/festivals/page_13_img_2.jpeg',
      '/festivals/page_14_img_1.jpeg',
      '/festivals/page_13_img_1.jpeg'
    ],
    nearbyHotels: [
      { name: 'Hotel Yak & Yeti', type: 'Luxury Hotel', distance: '1.5 km', rating: 4.6, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Yak+Yeti+Kathmandu' },
      { name: 'Thamel House Hotel', type: 'Boutique Hotel', distance: '1 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Kathmandu+Durbar+Square' },
    ],
    nearbyRestaurants: [
      { name: 'Café Soma', type: 'Newari & Fusion', distance: '0.3 km', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/cafe+near+Kathmandu+Durbar+Square' },
    ],
  },
  // ── SEPTEMBER ────────────────────────────────────────────────────────────
  {
    id: 'indra-jatra',
    name: 'Indra Jatra',
    month: 8, year: 2026, startDay: 28,
    location: 'Kathmandu Durbar Square (Kumari)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Kathmandu+Durbar+Square+Nepal',
    category: 'Living Goddess Kumari Chariot',
    description: 'The largest street festival in Kathmandu. Features the grand golden chariot procession of the Living Goddess Kumari, red-masked Lakhey dancers, and sacred butter lamps lit across the ancient city.',
    history: 'Indra Jatra dates back over 1,500 years and honors Indra, king of gods. King Jayaprakash Malla added the chariot procession of the Living Goddess Kumari in 1768 CE to seek her blessing for his realm. The president of Nepal traditionally receives tika from the Kumari during Indra Jatra.',
    whatHappens: [
      'A tall pole (linga) of Indra is raised at Hanuman Dhoka, officially opening the eight-day festival.',
      'Red-masked Lakhey dancers perform high-energy demonic protection dances through Kathmandu streets.',
      'The Living Goddess Kumari rides her golden chariot through the narrow ancient lanes of Kathmandu.',
      'Sacred oil lamps (diya) light up temple steps and ancient carved windows at dusk.',
    ],
    experience: 'Standing in Kathmandu Durbar Square as the golden chariot of the Living Goddess Kumari passes — flanked by masked dancers and thousands of devotees — is an unforgettable experience.',
    imageUrl: '/festivals/page_14_img_1.jpeg',
    photos: [
      '/festivals/page_14_img_1.jpeg',
      '/festivals/page_13_img_2.jpeg',
      '/festivals/page_14.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Shanker', type: 'Heritage Palace Hotel', distance: '1 km', rating: 4.5, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Shanker+Kathmandu' },
      { name: 'Thamel House Hotel', type: 'Boutique Hotel', distance: '0.8 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Kathmandu+Durbar+Square' },
    ],
    nearbyRestaurants: [
      { name: 'Bhojan Griha', type: 'Traditional Newari Fine Dining', distance: '0.5 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Bhojan+Griha+Kathmandu' },
    ],
  },
  // ── SEPTEMBER–OCTOBER ────────────────────────────────────────────────────
  {
    id: 'dashain',
    name: 'Bada Dashain',
    month: 9, year: 2026, startDay: 18, endDay: 28,
    location: "Nationwide (Nepal\'s Biggest Festival)", isNationwide: true,
    category: "Nepal\'s Biggest Festival (Tika Ceremony)",
    description: 'Nepal\'s grandest 15-day festival. Elders bless family members with red tika and sprouted yellow jamara grass, towering bamboo swings (Linge Ping) are erected on hilltops, and kites fly over blue skies.',
    history: 'Dashain celebrates the triumph of Goddess Durga over the demon Mahishasura. It is Nepal\'s longest national holiday. Rooted in ancient tradition, Dashain is the emotional center of Nepali family life, reuniting families from all corners of the world.',
    whatHappens: [
      'Ghatasthapana (Day 1): Sacred seeds are sown in darkness to sprout into yellow Jamara grass.',
      'Fulpati (Day 7): Sacred flowers are brought in state procession to Kathmandu.',
      'Maha Ashtami & Navami (Days 8-9): Special pujas and weapon blessings at temples.',
      'Vijaya Dashami (Day 10): Elders place red Tika and Jamara on foreheads of younger generations with blessings.',
      'Throughout: Giant bamboo swings (Linge Ping) are built in village squares for people to swing high into the sky.',
    ],
    experience: 'Receiving tika and jamara from family elders on a crisp autumn morning — surrounded by mountains and soaring bamboo swings — captures the true essence of Nepali hospitality.',
    imageUrl: '/festivals/page_16_img_2.jpeg',
    photos: [
      '/festivals/page_16_img_2.jpeg',
      '/festivals/page_15_img_1.jpeg',
      '/festivals/page_16_img_1.jpeg',
      '/festivals/page_15.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Yak & Yeti', type: 'Luxury', distance: 'Central Kathmandu', rating: 4.6, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/luxury+hotels+Kathmandu' },
      { name: 'Gokarna Forest Resort', type: 'Resort', distance: '8 km from city center', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Gokarna+Forest+Resort+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: "The Dwarika\'s Restaurant", type: 'Heritage Nepali', distance: 'Dwarika\'s Hotel', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
    ],
  },
  // ── OCTOBER–NOVEMBER ─────────────────────────────────────────────────────
  {
    id: 'mani-rimdu-oct',
    name: 'Mani Rimdu',
    month: 9, year: 2026, startDay: 25,
    location: 'Tengboche Monastery (Everest Region)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Tengboche+Monastery+Khumbu+Nepal',
    category: 'Masked Dances (Tengboche Monastery)',
    description: 'A 3-day sacred Sherpa Buddhist festival at Tengboche Monastery (3,867m). Monks in elaborate silk robes and deity masks perform Cham dances against the backdrop of Mount Ama Dablam and Everest.',
    history: 'Mani Rimdu was introduced to Tengboche Monastery by Lama Gulu Rinpoche in 1916. The festival enacts the victory of Tibetan Buddhism over ancient demonic forces. Directly relevant for Annapurna and Khumbu high-altitude trekking routes.',
    whatHappens: [
      'Day 1 (Fire Puja): Head lamas perform elaborate sacred fire rituals for peace and spiritual protection.',
      'Day 2 (Cham Masked Dances): Monks wear colorful masks representing Buddhist protectors, dancing in the courtyard.',
      'Sacred red blessing pills (Mani Rimdu) are distributed to all attendees and village elders.',
      'Trekkers on the Everest circuit join local Sherpas in celebrating under the open Himalayan sky.',
    ],
    experience: 'Watching the vivid Cham masked dances at Tengboche Monastery with the towering snowy peak of Ama Dablam rising behind is a bucket-list Himalayan cultural highlight.',
    imageUrl: '/festivals/page_17_img_1.jpeg',
    photos: [
      '/festivals/page_17_img_1.jpeg',
      '/festivals/page_18_img_1.jpeg',
      '/festivals/page_19_img_1.jpeg',
      '/festivals/page_17.png'
    ],
    nearbyHotels: [
      { name: 'Tengboche Guesthouse', type: 'Monastery Lodge', distance: '0.1 km', rating: 4.3, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+Tengboche+Nepal' },
      { name: 'Namche Bazaar Lodges', type: 'Tea House Lodges', distance: '3.5 km', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/lodge+Namche+Bazaar+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Tengboche Bakery Café', type: 'Bakery & Hot Drinks', distance: '0.1 km', rating: 4.4, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/cafe+Tengboche+Nepal' },
    ],
  },
  // ── NOVEMBER ─────────────────────────────────────────────────────────────
  {
    id: 'tihar',
    name: 'Tihar (Festival of Lights)',
    month: 10, year: 2026, startDay: 8, endDay: 12,
    location: 'Nationwide & Newar Households', isNationwide: true,
    category: 'Festival of Lights & Mha Puja',
    description: 'A 5-day festival of lights honoring crows, dogs, cows, Laxmi (goddess of wealth), and self-reverence (Mha Puja). Every home is illuminated with glowing Diyo oil lamps and floral Rangoli mandalas.',
    history: 'Tihar is Nepal\'s Diwali, celebrated with uniquely Nepali elements. Dogs are honored with flower garlands and tika (Kukur Tihar). Newar communities observe Mha Puja — a ritual of self-worship and inner purification.',
    whatHappens: [
      'Kukur Tihar (Day 2): Dogs are garlanded with marigold flowers and offered treats to honor their loyalty.',
      'Laxmi Puja (Day 3): Homes and temples are illuminated with oil lamps (Diyo) and Rangoli mandalas to invite Goddess Laxmi.',
      'Mha Puja (Day 4): Newar families draw intricate rice mandalas to worship their own body and spirit.',
      'Deusi-Bhailo: Youth groups sing festive door-to-door songs across illuminated neighborhoods.',
    ],
    experience: 'Walking through Kathmandu or Pokhara during Tihar — every temple outlined in golden string lights, step lit with oil lamps, and marigold garlands everywhere — is magical.',
    imageUrl: '/festivals/page_20_img_1.jpeg',
    photos: [
      '/festivals/page_20_img_1.jpeg',
      '/festivals/page_20_img_2.jpeg',
      '/festivals/page_20.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Yak & Yeti', type: 'Luxury Hotel', distance: 'Central Kathmandu', rating: 4.6, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/luxury+hotels+Kathmandu+Tihar' },
      { name: 'Kathmandu Guest House', type: 'Classic Hotel', distance: 'Thamel', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Kathmandu+Guest+House' },
    ],
    nearbyRestaurants: [
      { name: 'Bhojan Griha', type: 'Traditional Newari', distance: '0.5 km from Thamel', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Bhojan+Griha+Kathmandu' },
    ],
  },
  {
    id: 'chhath',
    name: 'Chhath Puja',
    month: 10, year: 2026, startDay: 14,
    location: 'Riverbanks of Terai & Bagmati', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Bagmati+River+Kathmandu+Nepal',
    category: 'River-Side Sun Worship',
    description: 'Devotees fast for 36 hours and offer prayers to the setting and rising sun, standing waist-deep in rivers at dusk and dawn in a deeply moving act of sun worship.',
    history: 'Chhath Puja is an ancient Vedic festival dedicated to Surya (the Sun God) and Chhathi Maiya, observed primarily in the Terai/Mithila region and riverbanks of Nepal. It is unique for worshipping both setting and rising suns.',
    whatHappens: [
      'Devotees observe a strict 36-hour fast without water.',
      'At dusk (Sandhya Arghya), thousands of women in bright red/orange saris stand in river water offering fruits and lit diyas to the setting sun.',
      'Before dawn (Usha Arghya), worshippers return to the riverbank to greet the rising sun with prayers and offerings.',
    ],
    experience: 'Standing at a riverbank at sunrise — watching sari-clad women silhouetted in golden light with hands raised in prayer — is a deeply serene experience.',
    imageUrl: '/festivals/page_22_img_1.jpeg',
    photos: [
      '/festivals/page_22_img_1.jpeg',
      '/festivals/page_21_img_1.jpeg',
      '/festivals/page_22.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Bagmati', type: 'Budget Hotel', distance: '0.5 km from Bagmati Ghat', rating: 3.8, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Bagmati+River+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: 'Terai Bhojnalaya', type: 'Traditional Madheshi', distance: 'Near ghats', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurants+Terai+Nepal' },
    ],
  },
  // ── DECEMBER ─────────────────────────────────────────────────────────────
  {
    id: 'tamu-losar',
    name: 'Tamu Losar',
    month: 11, year: 2026, startDay: 30,
    location: 'Gurung Heartland (Annapurna & Pokhara)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Pokhara+Nepal',
    category: 'Gurung New Year (Annapurna)',
    description: 'The New Year of the Gurung (Tamu) people — native to the Annapurna mountain region. Features traditional Ghatu and Chudka dances, gold coin jewelry, and cultural gatherings under snow peaks.',
    history: 'Tamu Losar falls around Dec 30 and marks the Gurung solar new year. As the Annapurna region is the Gurung heartland, this festival is deeply tied to mountain village life and Himalayan heritage.',
    whatHappens: [
      'Gurung men and women dress in traditional velvet saris, headpieces, and gold coin necklaces.',
      'The ancient Ghatu narrative dance is performed in open village squares with Annapurna peaks in view.',
      'Village elders bless younger members with Tika, and traditional songs (Chudka) echo through mountain villages.',
    ],
    experience: 'Joining a Tamu Losar celebration in an Annapurna stone village — watching traditional dancers with white mountain peaks behind them — is an authentic Himalayan cultural treasure.',
    imageUrl: '/festivals/page_23_img_1.png',
    photos: [
      '/festivals/page_23_img_1.png',
      '/festivals/page_24_img_1.jpeg',
      '/festivals/page_25_img_1.png',
      '/festivals/page_23.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Pokhara Grande', type: 'Luxury Hotel', distance: 'Pokhara Lakeside', rating: 4.5, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/hotels+Pokhara+Lakeside+Nepal' },
      { name: 'Fish Tail Lodge', type: 'Resort', distance: 'Phewa Lake, Pokhara', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Fish+Tail+Lodge+Pokhara' },
    ],
    nearbyRestaurants: [
      { name: 'Moondance Restaurant', type: 'Continental & Nepali', distance: 'Pokhara Lakeside', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Moondance+Restaurant+Pokhara' },
    ],
  },
  // ── JANUARY ──────────────────────────────────────────────────────────────
  {
    id: 'maghe-sankranti',
    name: 'Maghe Sankranti / Maghi',
    month: 0, year: 2027, startDay: 14,
    location: 'Devghat, Pashupatinath & Tharu Regions', isNationwide: true,
    category: 'Winter Solstice & Tharu New Year',
    description: 'Marks the end of winter solstice. Devotees take holy baths at river confluences (Devghat & Bagmati), while the Tharu community celebrates Maghi with energetic traditional stick dances.',
    history: 'Maghe Sankranti marks the sun\'s entry into Makar rashi (Capricorn). Devghat river confluence near Chitwan is the primary pilgrimage site. For the Tharu people of Terai, Maghi is their biggest New Year event.',
    whatHappens: [
      'Devotees take ritual dawn dips at Devghat and river ghats across Nepal.',
      'Families share winter warmth foods: til ko laddu (sesame sweets), chaku (molasses), sweet potato (tarul), and ghee.',
      'Tharu communities perform energetic Stick Dances (Lathi Nach) around evening bonfires.',
    ],
    experience: 'Watching the Tharu stick dancers perform around a crackling bonfire in Chitwan on a cold January night is electrifying.',
    imageUrl: '/festivals/page_26_img_1.jpeg',
    photos: [
      '/festivals/page_26_img_1.jpeg',
      '/festivals/page_26_img_2.jpeg',
      '/festivals/page_27_img_1.jpeg',
      '/festivals/page_27.png'
    ],
    nearbyHotels: [
      { name: 'Chitwan Jungle Lodge', type: 'Eco Lodge', distance: 'Chitwan NP', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/lodge+Chitwan+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Tharu Cultural House', type: 'Traditional Tharu', distance: 'Sauraha, Chitwan', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Tharu+cultural+restaurant+Chitwan' },
    ],
  },
  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    month: 1, year: 2027, startDay: 26,
    location: 'Pashupatinath Temple (Heritage Site)', isNationwide: true,
    category: 'Night of Shiva (Pashupatinath)',
    description: 'The Great Night of Lord Shiva at Pashupatinath temple (a UNESCO World Heritage site). Over a million pilgrims, ash-smeared Sadhus, and holy bonfires fill the illuminated complex all night.',
    history: 'Maha Shivaratri commemorates the night Lord Shiva performed his cosmic dance (Tandava). Pashupatinath is one of the holiest Shiva shrines in existence, drawing Sadhus from across South Asia.',
    whatHappens: [
      'Hundreds of ash-covered Sadhus with matted hair camp around Pashupatinath bonfires.',
      'Pashupatinath main temple is bathed in golden lights as non-stop pujas run through 4 watches of the night.',
      'Sacred dhuni smoke and Om Namah Shivaya chants create a transcendent spiritual atmosphere.',
    ],
    experience: 'Walking through the illuminated Pashupatinath temple at midnight on Shivaratri — ash-smeared Sadhus sitting by fires amidst sacred smoke — is pure magic.',
    imageUrl: '/festivals/page_28_img_1.jpeg',
    photos: [
      '/festivals/page_28_img_1.jpeg',
      '/festivals/page_28_img_2.jpeg',
      '/festivals/page_29_img_1.jpeg',
      '/festivals/page_28.png'
    ],
    nearbyHotels: [
      { name: 'Hyatt Regency Kathmandu', type: 'Luxury Hotel', distance: '0.3 km', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Hyatt+Regency+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: "The Dwarika\'s Restaurant", type: 'Heritage Dining', distance: '1 km', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
    ],
  },
  // ── MARCH ────────────────────────────────────────────────────────────────
  {
    id: 'holi',
    name: 'Holi (Fagu Purnima)',
    month: 2, year: 2027, startDay: 3,
    location: 'Nationwide (Kathmandu & Terai)', isNationwide: true,
    category: 'Festival of Colors',
    description: 'The famous festival of colors welcoming spring. Basantapur Durbar Square and street squares become a joyous explosion of bright pink, yellow, blue, and purple gulal powder and water.',
    history: 'Holi celebrates the victory of devotion over evil (legend of Prahlad and Holika) and the playful colors of spring.',
    whatHappens: [
      'Basantapur Durbar Square fills with thousands of revelers celebrating with music and color powder.',
      'Water balloons and gulal powders drench participants in every vibrant shade of the rainbow.',
      'Music blares from rooftops and streets in a day of uninhibited celebration.',
    ],
    experience: 'Basantapur Durbar Square on Holi morning — packed crowds drenching each other in brilliant colors against 500-year-old wooden temples — is pure joy.',
    imageUrl: '/festivals/page_30_img_1.jpeg',
    photos: [
      '/festivals/page_30_img_1.jpeg',
      '/festivals/page_31_img_1.png',
      '/festivals/page_32_img_1.png',
      '/festivals/page_30.png'
    ],
    nearbyHotels: [
      { name: 'Hotel Shanker', type: 'Heritage Hotel', distance: '1 km from Basantapur', rating: 4.5, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Shanker+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: 'Bhojan Griha', type: 'Traditional Newari', distance: '0.5 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Bhojan+Griha+Kathmandu' },
    ],
  },
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['S','M','T','W','T','F','S'];
const INITIAL_MONTH = 8;
const INITIAL_YEAR = 2026;

const MONTH_QUICK_FILTERS = [
  { label: 'April', sub: 'Bisket Jatra', month: 3 },
  { label: 'May', sub: 'Buddha Jayanti', month: 4 },
  { label: 'Jul-Aug', sub: 'Janai Purnima', month: 6 },
  { label: 'August', sub: 'Teej & Gai Jatra', month: 7 },
  { label: 'September', sub: 'Indra Jatra', month: 8 },
  { label: 'Sept-Oct', sub: 'Bada Dashain', month: 9 },
  { label: 'October', sub: 'Mani Rimdu', month: 9 },
  { label: 'November', sub: 'Tihar & Chhath', month: 10 },
  { label: 'December', sub: 'Tamu Losar', month: 11 },
  { label: 'January', sub: 'Maghe Sankranti', month: 0 },
  { label: 'February', sub: 'Shivaratri', month: 1 },
  { label: 'March', sub: 'Holi', month: 2 },
];

function getDaysInMonth(month: number, year: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(month: number, year: number) { return new Date(year, month, 1).getDay(); }
function getFestivalsForDay(month: number, year: number, day: number): Festival[] {
  return FESTIVALS.filter(f => {
    if (f.month !== month || f.year !== year) return false;
    return f.endDay ? day >= f.startDay && day <= f.endDay : f.startDay === day;
  });
}
function getFestivalsForMonth(month: number, year: number): Festival[] {
  return FESTIVALS.filter(f => f.month === month && f.year === year);
}
const FESTIVALS_SORTED = [...FESTIVALS].sort((a, b) => {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.startDay - b.startDay;
});

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-xs ${i <= Math.round(rating) ? 'text-amber-400' : 'text-slate-600'}`}>★</span>
      ))}
      <span className="font-sans-body text-[10px] text-slate-400 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(INITIAL_MONTH);
  const [currentYear, setCurrentYear] = useState(INITIAL_YEAR);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(FESTIVALS[0]);
  const [selectedDay, setSelectedDay] = useState<number | null>(FESTIVALS[0].startDay);
  const [activeTab, setActiveDetailTab] = useState<'about' | 'events' | 'nearby'>('about');
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

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
    if (fests.length > 0) { setSelectedDay(day); setSelectedFestival(fests[0]); setActiveDetailTab('about'); setActiveImage(null); }
    else { setSelectedDay(null); setSelectedFestival(null); }
  };
  const selectFestival = (f: Festival) => {
    setCurrentMonth(f.month); setCurrentYear(f.year);
    setSelectedDay(f.startDay); setSelectedFestival(f); setActiveDetailTab('about'); setActiveImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const selectMonthFilter = (m: number) => {
    setCurrentMonth(m);
    const fests = FESTIVALS.filter(f => f.month === m);
    if (fests.length > 0) {
      setSelectedFestival(fests[0]);
      setSelectedDay(fests[0].startDay);
    } else {
      setSelectedFestival(null);
      setSelectedDay(null);
    }
  };

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-10 min-h-screen text-slate-100">

      {/* Header */}
      <header className="mb-6">
        <span className="inline-block font-sans-body text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Living Traditions of Nepal</span>
        <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-3">Cultural Calendar &amp; Festival Gallery</h1>
        <p className="font-sans-body text-sm text-slate-300 max-w-2xl">
          Explore Nepal\'s major ancient festivals month by month. Click any date or month shortcut below to inspect full visual details, history, rituals, and nearby stays.
        </p>
      </header>

      {/* Month Shortcuts Filter Bar */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          <span className="font-sans-body text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">Filter Month:</span>
          {MONTH_QUICK_FILTERS.map((mf, idx) => {
            const isActive = currentMonth === mf.month;
            return (
              <button
                key={idx}
                onClick={() => selectMonthFilter(mf.month)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer text-left border flex flex-col ${
                  isActive
                    ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'glass border-white/10 text-slate-300 hover:border-amber-400/40 hover:text-white'
                }`}
              >
                <span className="font-sans-body text-xs font-bold leading-tight">{mf.label}</span>
                <span className="font-sans-body text-[9px] text-slate-400 opacity-80">{mf.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: small calendar left, big detail right */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── Compact Calendar ──────────────────────────────────────────── */}
        <div className="lg:w-72 xl:w-80 shrink-0">
          <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-xl sticky top-20">

            {/* Month Nav */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={prevMonth} className="glass p-1.5 rounded-lg border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <div className="text-center">
                <p className="font-serif-headline text-base font-bold text-white">{MONTH_NAMES[currentMonth]}</p>
                <p className="font-sans-body text-[10px] text-cyan-400 font-bold">{currentYear}</p>
              </div>
              <button onClick={nextMonth} className="glass p-1.5 rounded-lg border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_NAMES.map((d, i) => (
                <div key={i} className="text-center font-sans-body text-[10px] font-bold text-slate-500 py-1">{d}</div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarCells.map((day, idx) => {
                if (!day) return <div key={`e-${idx}`} className="h-8" />;
                const fests = getFestivalsForDay(currentMonth, currentYear, day);
                const hasFest = fests.length > 0;
                const isSel = selectedDay === day;
                return (
                  <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`h-8 flex flex-col items-center justify-center rounded-lg transition-all relative
                      ${hasFest ? 'cursor-pointer' : 'cursor-default'}
                      ${isSel ? 'bg-amber-500/30 border border-amber-400/70 shadow-md' : hasFest ? 'bg-amber-500/10 border border-amber-400/25 hover:bg-amber-500/20 hover:border-amber-400/50' : 'border border-transparent'}`}
                  >
                    <span className={`font-sans-body text-xs font-bold leading-none ${isSel ? 'text-amber-300' : hasFest ? 'text-amber-200' : 'text-slate-400'}`}>{day}</span>
                    {hasFest && <span className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-0.5" />}
                  </div>
                );
              })}
            </div>

            {/* This month legend */}
            {monthFestivals.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="font-sans-body text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">This Month's Festivals</p>
                <div className="flex flex-col gap-1.5">
                  {monthFestivals.map(f => (
                    <button key={f.id} onClick={() => selectFestival(f)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${selectedFestival?.id === f.id ? 'bg-amber-500/20 border border-amber-400/50' : 'glass border border-white/10 hover:border-amber-400/30'}`}>
                      <span className="material-symbols-outlined text-xs text-amber-400">celebration</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans-body text-[11px] font-bold text-white truncate">{f.name}</p>
                        <p className="font-sans-body text-[9px] text-slate-400">{MONTH_NAMES[f.month].slice(0,3)} {f.startDay}{f.endDay ? `–${f.endDay}` : ''}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {monthFestivals.length === 0 && (
              <p className="text-center font-sans-body text-[11px] text-slate-500 mt-3 pt-3 border-t border-white/10">No festivals this month</p>
            )}
          </div>
        </div>

        {/* ── Detail Panel ──────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {selectedFestival ? (
            <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

              {/* Hero Image — prominent preview with click-to-zoom modal */}
              <div className="relative h-80 md:h-96 w-full overflow-hidden group cursor-pointer" onClick={() => setModalImage(activeImage || selectedFestival.imageUrl)}>
                <img
                  src={activeImage || selectedFestival.imageUrl}
                  alt={selectedFestival.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white font-sans-body text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">zoom_in</span> Click to Enlarge
                </div>
                <div className="absolute bottom-5 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                  <div>
                    <span className="font-sans-body text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-400/30 inline-block mb-1">
                      {selectedFestival.category}
                    </span>
                    <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">{selectedFestival.name}</h2>
                  </div>
                </div>
              </div>

              {/* Photo strip — click to swap main hero image */}
              <div className="px-6 py-3 border-b border-white/10 bg-black/20">
                <p className="font-sans-body text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-amber-400">photo_library</span> Festival Gallery (Click thumbnail to view)
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
                  {selectedFestival.photos.map((url, i) => {
                    const isCurrent = (activeImage || selectedFestival.imageUrl) === url;
                    return (
                      <div
                        key={i}
                        onClick={() => setActiveImage(url)}
                        className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
                          isCurrent ? 'border-amber-400 opacity-100 scale-105 shadow-lg shadow-amber-400/20' : 'border-transparent opacity-60 hover:opacity-90 hover:border-amber-400/50'
                        }`}
                        title={`View photo ${i + 1}`}
                      >
                        <img
                          src={url}
                          alt={`${selectedFestival.name} ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Meta row */}
              <div className="px-6 py-3.5 flex flex-wrap items-center gap-3 border-b border-white/10 bg-white/5">
                <span className="flex items-center gap-1.5 font-sans-body text-xs text-slate-200 bg-white/10 px-3 py-1 rounded-xl">
                  <span className="material-symbols-outlined text-sm text-cyan-400">calendar_today</span>
                  {selectedFestival.endDay
                    ? `${MONTH_NAMES[selectedFestival.month]} ${selectedFestival.startDay}–${selectedFestival.endDay}, ${selectedFestival.year}`
                    : `${MONTH_NAMES[selectedFestival.month]} ${selectedFestival.startDay}, ${selectedFestival.year}`}
                </span>
                <span className="flex items-center gap-1.5 font-sans-body text-xs text-slate-200 bg-white/10 px-3 py-1 rounded-xl flex-1 min-w-0">
                  <span className="material-symbols-outlined text-sm text-cyan-400">location_on</span>
                  <span className="truncate">{selectedFestival.isNationwide ? 'Celebrated all over Nepal' : selectedFestival.location}</span>
                </span>
                {selectedFestival.mapUrl && (
                  <a href={selectedFestival.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 glass px-3 py-1 rounded-xl border border-cyan-400/30 hover:border-cyan-400/70 text-cyan-400 hover:text-cyan-300 font-sans-body text-xs font-bold transition-all">
                    <span className="material-symbols-outlined text-xs">map</span>View on Google Maps
                  </a>
                )}
                {selectedFestival.isNationwide
                  ? <span className="shrink-0 bg-cyan-500/15 text-cyan-300 px-3 py-1 rounded-full font-sans-body text-xs font-bold border border-cyan-400/30">🇳🇵 Nationwide</span>
                  : <span className="shrink-0 bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full font-sans-body text-xs font-bold border border-amber-400/30">📍 Specific Location</span>
                }
              </div>

              {/* Detail Tabs */}
              <div className="px-6 pt-4 flex gap-2 border-b border-white/10">
                {(['about', 'events', 'nearby'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveDetailTab(tab)}
                    className={`px-5 py-2.5 rounded-t-xl font-sans-body text-xs font-bold transition-all cursor-pointer capitalize flex items-center gap-1.5
                      ${activeTab === tab ? 'bg-amber-500/20 border border-amber-400/40 border-b-0 text-amber-300 shadow-md' : 'text-slate-400 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-sm">
                      {tab === 'about' ? 'info' : tab === 'events' ? 'event_note' : 'near_me'}
                    </span>
                    {tab === 'about' ? 'About & History' : tab === 'events' ? 'What Happens' : 'Nearby Stays & Dining'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 space-y-6">

                {activeTab === 'about' && (
                  <>
                    <div>
                      <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">description</span> Overview
                      </p>
                      <p className="font-sans-body text-base text-slate-200 leading-relaxed">{selectedFestival.description}</p>
                    </div>
                    <div className="carved-line opacity-20" />
                    <div>
                      <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">history_edu</span> History &amp; Cultural Origins
                      </p>
                      <p className="font-sans-body text-sm text-slate-300 leading-relaxed">{selectedFestival.history}</p>
                    </div>
                    <div className="glass rounded-2xl p-5 border border-amber-400/30 bg-amber-500/5">
                      <p className="font-sans-body text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">star</span> Tourist &amp; Visitor Experience
                      </p>
                      <p className="font-sans-body text-sm text-slate-200 leading-relaxed">{selectedFestival.experience}</p>
                    </div>
                  </>
                )}

                {activeTab === 'events' && (
                  <div>
                    <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">checklist</span> Key Highlights &amp; Ritual Sequence
                    </p>
                    <div className="space-y-3">
                      {selectedFestival.whatHappens.map((event, i) => (
                        <div key={i} className="flex items-start gap-3.5 glass rounded-2xl p-4 border border-white/10 hover:border-amber-400/30 transition-all">
                          <span className="shrink-0 w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-sans-body text-xs font-bold text-amber-300">{i + 1}</span>
                          <p className="font-sans-body text-sm text-slate-200 leading-relaxed">{event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'nearby' && (
                  <div className="space-y-6">
                    {/* Hotels */}
                    <div>
                      <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">hotel</span>Recommended Nearby Hotels &amp; Lodges
                      </p>
                      <div className="space-y-2.5">
                        {selectedFestival.nearbyHotels.map((h, i) => (
                          <a key={i} href={h.mapUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3.5 glass rounded-2xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all group">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-lg text-cyan-400">hotel</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-sans-body text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{h.name}</p>
                                <span className="font-sans-body text-[10px] text-slate-300 glass px-2 py-0.5 rounded-md border border-white/10">{h.priceRange}</span>
                              </div>
                              <p className="font-sans-body text-xs text-slate-400 mb-1">{h.type} · {h.distance}</p>
                              <StarRating rating={h.rating} />
                            </div>
                            <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0">open_in_new</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="carved-line opacity-20" />

                    {/* Restaurants */}
                    <div>
                      <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">restaurant</span>Nearby Traditional Restaurants &amp; Dining
                      </p>
                      <div className="space-y-2.5">
                        {selectedFestival.nearbyRestaurants.map((r, i) => (
                          <a key={i} href={r.mapUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3.5 glass rounded-2xl p-4 border border-white/10 hover:border-amber-400/40 transition-all group">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-lg text-amber-400">restaurant</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-sans-body text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{r.name}</p>
                                <span className="font-sans-body text-[10px] text-slate-300 glass px-2 py-0.5 rounded-md border border-white/10">{r.priceRange}</span>
                              </div>
                              <p className="font-sans-body text-xs text-slate-400 mb-1">{r.type} · {r.distance}</p>
                              <StarRating rating={r.rating} />
                            </div>
                            <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-amber-400 transition-colors shrink-0">open_in_new</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl p-10 flex flex-col items-center justify-center text-center min-h-[400px] gap-4">
              <span className="material-symbols-outlined text-6xl text-slate-600">calendar_month</span>
              <h3 className="font-serif-headline text-2xl font-bold text-white">Select a Festival Date</h3>
              <p className="font-sans-body text-sm text-slate-400 max-w-sm">
                Click any highlighted date on the calendar, or pick an event from the list below to explore its history, what happens, and where to stay nearby.
              </p>
              {monthFestivals.length === 0 && (
                <p className="font-sans-body text-xs text-cyan-400 font-bold mt-2">← Use the month shortcuts above to jump to active festival months</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* All Festivals Grid */}
      <section className="mt-14">
        <div className="text-center mb-8">
          <span className="font-sans-body text-xs font-bold uppercase tracking-widest text-amber-400">Complete Directory</span>
          <h2 className="font-serif-headline text-3xl font-bold text-white mt-1">All Major Festivals of Nepal</h2>
          <p className="font-sans-body text-sm text-slate-400 mt-1">Click any card below to view detailed image galleries and festival guides.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {FESTIVALS_SORTED.map(f => (
            <button key={f.id} onClick={() => selectFestival(f)}
              className="glass-card glass-card-hover rounded-2xl p-4 border border-white/10 text-left flex items-center gap-3.5 cursor-pointer transition-all hover:border-amber-400/50 group">
              <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10 relative">
                <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute bottom-1 right-1 font-serif-headline text-xs font-bold text-amber-300 drop-shadow">
                  {MONTH_NAMES[f.month].slice(0,3)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans-body text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">{f.name}</p>
                <p className="font-sans-body text-[11px] text-amber-400 font-semibold mb-0.5 truncate">{f.category}</p>
                <p className="font-sans-body text-[11px] text-slate-400 flex items-center gap-1 truncate">
                  <span className="material-symbols-outlined text-xs text-slate-500">location_on</span>
                  {f.isNationwide ? '🇳🇵 Nationwide' : f.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Full Screen Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setModalImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={modalImage} alt="Enlarged view" className="w-full h-full object-contain max-h-[85vh]" />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black p-2 rounded-full text-white border border-white/20 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
