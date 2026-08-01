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
  month: number;
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
    description: 'Massive wooden chariots carrying Bhairava and Bhadrakali are pulled through the narrow cobbled streets of Bhaktapur, marking the Newar New Year with incredible energy and devotion.',
    history: 'Bisket Jatra dates back over 1,600 years to the reign of the Malla kings. The word "Bisket" is believed to derive from "Bi" (snake) and "syaku" (slain) — referring to the legend of a prince who defeated two serpents hiding in a princess\'s hair. The festival marks the Nepali solar new year and has been continuously celebrated in Bhaktapur, making it one of the oldest surviving urban festivals in South Asia.',
    whatHappens: [
      'A massive wooden chariot (rath) is constructed fresh each year using ancient carpentry techniques, sometimes reaching over 10 meters tall.',
      'Two teams from the east and west sides of Bhaktapur engage in a dramatic tug-of-war to pull the chariot through the streets.',
      'A towering pole (Yosin) decorated with cloth streamers is raised in Taumadhi Square — its falling direction predicts fortune for the city.',
      'The chariot procession carries images of Bhairava and Bhadrakali through the ancient city lanes over eight days.',
      'On the final day the pole is brought down and the festival concludes with offerings and music.',
    ],
    experience: 'Watch the dramatic tug-of-war between east and west Bhaktapur. The raising and falling of the Yosin pole is a sight unlike anything else in the world.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bisket_Jatra_2018.jpg/640px-Bisket_Jatra_2018.jpg',
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
    history: 'Ubhauli is one of the two great seasonal festivals of the Kirat people (the other being Udhauli in winter). Rooted in the ancient animistic religion of Kirat Mundhum, the festival is tied to the agricultural calendar — marking the time when people and livestock move to higher pastures. It has been practiced for thousands of years and predates Hinduism and Buddhism in Nepal.',
    whatHappens: [
      'Communities gather at a communal ground (chautari) in the village for collective worship.',
      'Shamans (Bijuwa or Mangpa) perform rituals and offerings to nature deities Sumnima and Paruhang.',
      'The Sakela dance is performed in large circles — men and women moving together in synchronized steps that mimic nature (birds, planting, harvesting).',
      'Traditional Kirat food and chhyang (millet beer) are shared among the community.',
      'Elders narrate oral Mundhum texts that carry the history and cosmology of the Kirat people.',
    ],
    experience: 'Joining the Sakela circle dance — hundreds of people moving in unison to the beat of the dhol drum — is a rare, joyful cultural immersion.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sakela_dance.jpg/640px-Sakela_dance.jpg',
    nearbyHotels: [
      { name: 'Hotel Khumbu', type: 'Mountain Lodge', distance: '2 km', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Khotang+Nepal' },
      { name: 'Rai Community Homestay', type: 'Homestay', distance: '0.5 km', rating: 4.4, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/homestay+Khotang+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Kirat Bhojanalaya', type: 'Traditional Kirat', distance: '0.3 km', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+Khotang+Nepal' },
      { name: 'Himalayan Tea House', type: 'Nepali & Tibetan', distance: '1 km', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/tea+house+Solukhumbu+Nepal' },
    ],
  },
  {
    id: 'ram-navami',
    name: 'Ram Navami',
    month: 3, year: 2027, startDay: 6,
    location: 'Janaki Mandir (Janakpur) & Nationwide', isNationwide: true,
    category: 'Birth of Lord Ram',
    description: 'Celebrates the birth of Lord Ram, the seventh avatar of Vishnu. Janakpur — the birthplace of Sita — is the spiritual center, with processions, bhajan singing, and grand temple decorations.',
    history: 'Ram Navami has been celebrated for thousands of years across the Hindu world. In Nepal, it holds special significance because Janakpur is the birthplace of Sita and the site of her marriage to Ram. The Janaki Mandir — built in 1911 in Mughal-Rajput architectural style — is the focal point. The festival falls on the ninth day (Navami) of the bright half of Chaitra month.',
    whatHappens: [
      'The Janaki Mandir is adorned with thousands of flowers and electric lights from the night before.',
      'Devotees take ritual baths in the sacred Ganga Sagar pond at dawn before visiting the temple.',
      'Grand processions carrying Ram and Sita idols on decorated palanquins travel through Janakpur.',
      'Bhajan and kirtan (devotional singing) continues non-stop for 24 hours in temple courtyards.',
      'A massive fair (mela) with vendors, food stalls, and cultural performances fills the city.',
    ],
    experience: 'The Janaki Mandir lit up at dawn with thousands of lamps and flowers while bhajan singers fill the air is one of the most beautiful religious mornings in Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Janaki_Mandir_Janakpur.jpg/640px-Janaki_Mandir_Janakpur.jpg',
    nearbyHotels: [
      { name: 'Hotel Welcome Janakpur', type: 'Mid-range Hotel', distance: '0.4 km', rating: 4.1, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Janaki+Mandir+Janakpur' },
      { name: 'Sita Guest House', type: 'Budget Guesthouse', distance: '0.6 km', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+Janakpur+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Maithili Kitchen', type: 'Traditional Maithili', distance: '0.2 km', rating: 4.3, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+near+Janaki+Temple+Janakpur' },
      { name: 'Janakpur Bhojnalaya', type: 'Nepali & Indian', distance: '0.5 km', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/Janakpur+restaurant' },
    ],
  },
  // ── MAY ──────────────────────────────────────────────────────────────────
  {
    id: 'buddha-jayanti',
    name: 'Buddha Jayanti',
    month: 4, year: 2027, startDay: 23,
    location: 'Lumbini, Swayambhunath, Boudhanath', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Lumbini+Nepal',
    category: 'Birth of the Buddha',
    description: 'Celebrating the birth, enlightenment, and passing of Siddhartha Gautama. Thousands of pilgrims from across the world gather at Lumbini, Boudhanath, and Swayambhunath.',
    history: 'Buddha Jayanti (also called Vesak) commemorates three key events in Siddhartha Gautama\'s life — his birth (563 BCE), enlightenment, and death — all said to have occurred on the same full moon day. Lumbini in Nepal\'s Terai is the verified birthplace of the Buddha, recognized by UNESCO. The festival has been observed by Buddhists globally for over 2,500 years.',
    whatHappens: [
      'At Lumbini, monks from Buddhist nations worldwide gather for prayers and the lighting of thousands of butter lamps at Maya Devi Temple.',
      'The sacred Bodhi tree at Lumbini is decorated with prayer flags and offerings.',
      'At Boudhanath stupa in Kathmandu, thousands of devotees walk clockwise (kora) around the stupa all night spinning prayer wheels.',
      'At Swayambhunath, the hilltop stupa is illuminated and elaborate puja rituals are performed by monks.',
      'Buddhist processions with monks in saffron robes carrying relics pass through Kathmandu.',
    ],
    experience: 'The butter lamp lighting at Boudhanath at dusk — thousands of flames reflecting off the great golden spire while monks chant — is one of the most peaceful and powerful sights in Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Boudhanath_stupa.jpg/640px-Boudhanath_stupa.jpg',
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
  {
    id: 'rato-machhindranath',
    name: 'Rato Machhindranath Jatra',
    month: 4, year: 2027, startDay: 1, endDay: 30,
    location: 'Patan (Lalitpur)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Patan+Durbar+Square+Lalitpur+Nepal',
    category: 'Longest Chariot Festival',
    description: "The world's longest chariot festival. A towering chariot built from wood and bamboo is slowly pulled through Patan's streets over months to honor Rato Machhindranath, the God of Harvest and Rain.",
    history: 'Dating back to the 10th century, this festival originated when Kathmandu Valley faced a catastrophic drought. The farmer-god Machhindranath (also revered as Bunga Dyo) was brought to Patan from Assam to bring rain. The annual chariot festival re-enacts this journey. The chariot is constructed fresh each year by skilled Newar craftsmen using traditional techniques passed down for generations.',
    whatHappens: [
      'Master craftsmen spend weeks building the massive chariot entirely from bamboo, wood, and cloth using no nails.',
      'The chariot — often 15+ meters tall — is slowly towed by hand through Patan\'s narrow streets over 4-6 weeks.',
      'Thousands of devotees pull the ropes attached to the chariot as an act of devotion and blessing.',
      'The grand finale is Bhoto Jatra — the public display of a jewelled vest (bhoto) said to belong to a serpent king.',
      'The head of state traditionally presides over the Bhoto Jatra ceremony, making it a rare intersection of religion and government.',
    ],
    experience: 'Standing beside the chariot as it creaks and sways through Patan\'s medieval streets — pressed in with thousands of devotees — is one of the most visceral living-heritage experiences in the world.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rato_Machhindranath_chariot_festival.jpg/640px-Rato_Machhindranath_chariot_festival.jpg',
    nearbyHotels: [
      { name: 'Inn Patan', type: 'Boutique Heritage Hotel', distance: '0.4 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Patan+Durbar+Square' },
      { name: 'Hotel Himalaya Patan', type: 'Mid-range Hotel', distance: '1.2 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Himalaya+Patan+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Café de Patan', type: 'Newari Fusion', distance: '0.1 km', rating: 4.5, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/cafe+near+Patan+Durbar+Square' },
      { name: 'Newari Kitchen', type: 'Traditional Newari', distance: '0.3 km', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Newari+restaurant+Patan+Nepal' },
      { name: 'Bakery Cafe Patan', type: 'Café & Bakery', distance: '0.5 km', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/bakery+cafe+Patan+Nepal' },
    ],
  },
  // ── JULY ─────────────────────────────────────────────────────────────────
  {
    id: 'dumji',
    name: 'Dumji',
    month: 6, year: 2026, startDay: 15,
    location: 'Khumbu (Everest Region), Sherpa Villages', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Tengboche+Monastery+Nepal',
    category: 'Sherpa Monastery Festival',
    description: 'A sacred Sherpa festival held at monasteries in the Khumbu valley. Monks perform elaborate Cham masked dances to ward off evil spirits and bring blessings to the community.',
    history: 'Dumji was established by the founder of Tengboche Monastery, Lama Gulu, in the early 20th century. It is celebrated at the most important monasteries in the Khumbu region including Tengboche, Thame, and Khumjung. The festival is rooted in the Nyingma tradition of Tibetan Buddhism and follows the lunar calendar, falling in the 5th or 6th month.',
    whatHappens: [
      'Monks prepare for weeks, crafting elaborate masks representing deities and demons.',
      'The Cham masked dance is performed in the monastery courtyard — a sacred ritual dance that enacts the defeat of evil and the protection of the Buddhist dharma.',
      'Monasteries are decorated with prayer flags, butter sculptures, and ritual offerings (torma).',
      'The community gathers for communal feasts, singing, and traditional Sherpa dances.',
      'The festival culminates with the burning of a ritual effigy representing evil forces.',
    ],
    experience: 'Watching the magnificent Cham dances at Tengboche Monastery with Ama Dablam and Everest visible in the background is a truly bucket-list moment.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tengboche_monastery.jpg/640px-Tengboche_monastery.jpg',
    nearbyHotels: [
      { name: 'Tengboche Monastery Guesthouse', type: 'Monastery Lodge', distance: '0.1 km', rating: 4.4, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+Tengboche+Nepal' },
      { name: 'Namche Bazaar Tea Houses', type: 'Tea House', distance: '3.5 km', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Namche+Bazaar+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Tengboche Bakery', type: 'Bakery & Hot Drinks', distance: '0.1 km', rating: 4.3, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/bakery+Tengboche+Nepal' },
      { name: 'Namche Bazaar Restaurants', type: 'Multi-cuisine', distance: '3.5 km', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurants+Namche+Bazaar+Nepal' },
    ],
  },
  {
    id: 'janai-purnima',
    name: 'Janai Purnima (Raksha Bandhan)',
    month: 7, year: 2026, startDay: 9,
    location: 'Pashupatinath, Gosaikunda, Nationwide', isNationwide: true,
    category: 'Sacred Thread Festival',
    description: 'Hindu men change their sacred thread (janai) on this full moon day. Thousands of pilgrims trek to the high-altitude Gosaikunda Lake, while sisters tie protective threads on brothers\' wrists.',
    history: 'Janai Purnima falls on the full moon of Shrawan (July-August). The janai (sacred thread) is worn by high-caste Hindu men and must be ritually changed once a year. The Gosaikunda pilgrimage tradition is ancient — the glacial lake at 4,380m is believed to have been created by Lord Shiva\'s trident. Raksha Bandhan, observed on the same day, pre-dates written records and represents the bond of protection between siblings.',
    whatHappens: [
      'Brahmin priests change the janai (sacred thread) of Hindu men at temples and river ghats across Nepal.',
      'Thousands of pilgrims trek 3-4 days through the Langtang range to reach Gosaikunda Lake for a sacred dip.',
      'Sisters tie a colorful rakhi thread on their brothers\' wrists as a symbol of protection and love.',
      'Brothers give gifts in return, and families gather for special meals.',
      'At Pashupatinath, priests perform elaborate rituals and the temple sees its highest footfall of the year.',
    ],
    experience: 'The Gosaikunda pilgrimage is one of Nepal\'s great spiritual hikes — trekking through rhododendron forests, passing high-altitude lakes, and arriving at a sacred glacial lake ringed by snow peaks.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gosaikunda_Lake.jpg/640px-Gosaikunda_Lake.jpg',
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
    id: 'gai-jatra',
    name: 'Gai Jatra (Saparu)',
    month: 7, year: 2026, startDay: 24,
    location: 'Kathmandu, Bhaktapur, Patan', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Kathmandu+Durbar+Square+Nepal',
    category: 'Festival of Cows & Remembrance',
    description: 'Families who lost a member in the past year lead a cow through the streets to help guide the departed soul to heaven, alongside legendary satirical street performances.',
    history: 'Gai Jatra was established by the 17th century Malla king Pratap Malla to console his queen after the death of their son. When no procession could make her smile, the king invited all bereaved families to parade through Kathmandu — the sight of the grieving city united in humor and solidarity finally brought relief. The satirical tradition grew from this: citizens were invited to mock the king and government without fear of punishment. This tradition of political satire continues to this day.',
    whatHappens: [
      'Families who lost a member in the past year dress a young boy as a cow (or lead a real cow) through the city to escort the soul to heaven.',
      'Participants dress in wildly creative costumes — clowns, politicians, demons, cross-dressers — for the satirical procession.',
      'Newspapers and media publish special editions mocking politicians and current events.',
      'Street performers put on dark comedy acts and political satire shows.',
      'In Bhaktapur, the processions are especially dramatic and last the entire day through the medieval city.',
    ],
    experience: 'The satirical processions of Bhaktapur are legendary — a deeply unique mix of grief, humor, and social commentary that reveals Nepal\'s cultural depth.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Gai_Jatra_parade.jpg/640px-Gai_Jatra_parade.jpg',
    nearbyHotels: [
      { name: 'Hotel Yak & Yeti', type: 'Luxury Hotel', distance: '1.5 km from Kathmandu Durbar Sq', rating: 4.6, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Yak+Yeti+Kathmandu' },
      { name: 'Thamel House Hotel', type: 'Boutique Hotel', distance: '1 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Kathmandu+Durbar+Square' },
      { name: 'Bhaktapur Heritage Hotel', type: 'Heritage Hotel', distance: '0.3 km from Bhaktapur', rating: 4.5, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+Bhaktapur+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Thamel restaurants', type: 'Multi-cuisine hub', distance: '1 km', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/restaurants+Thamel+Kathmandu' },
      { name: 'Café Soma', type: 'Newari & Fusion', distance: '0.3 km from Durbar Square', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/cafe+near+Kathmandu+Durbar+Square' },
    ],
  },
  {
    id: 'teej',
    name: 'Teej',
    month: 7, year: 2026, startDay: 27,
    location: 'Pashupatinath Temple & Nationwide', isNationwide: true,
    category: "Women's Festival of Devotion",
    description: 'Women dress in vibrant red, fast for their husbands\' longevity, and dance joyfully. Pashupatinath becomes a sea of red-clad women singing and swaying together.',
    history: 'Teej is rooted in the legend of Goddess Parvati, who fasted and prayed for Lord Shiva to accept her as his bride. Observed on the third day (Teej) of the bright fortnight of Bhadra, the festival is one of the most important for Hindu women in Nepal and northern India. It blends religious devotion with social celebration — a rare space where women sing openly, dance publicly, and express joy without restriction.',
    whatHappens: [
      'The evening before (Dar Khane Din) women feast on rich foods before beginning their fast.',
      'On Teej day, women dress in bright red saris and green or gold bangles and gather at Pashupatinath from before dawn.',
      'Thousands of women sing Teej songs (often humorous, about husbands and marriage), dance in groups, and pray at the temple.',
      'Women fast completely — some without even water — for the full day as an act of devotion.',
      'The festival is also a time of social reunion: women visit their maternal home, and mother-daughter bonds are celebrated.',
    ],
    experience: 'The sight of thousands of red saris gathered at Pashupatinath — singing, laughing, and swaying together in the early morning light — is one of Nepal\'s most joyful and colorful spectacles.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Teej_festival_Nepal.jpg/640px-Teej_festival_Nepal.jpg',
    nearbyHotels: [
      { name: 'Hotel Ganesha Himal', type: 'Mid-range Hotel', distance: '0.5 km from Pashupatinath', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Pashupatinath+Temple+Kathmandu' },
      { name: 'Hyatt Regency Kathmandu', type: 'Luxury Hotel', distance: '0.3 km', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Hyatt+Regency+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: 'Pashupati Area Dhabas', type: 'Traditional Nepali', distance: '0.2 km', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+near+Pashupatinath+Kathmandu' },
      { name: 'The Dwarika\'s Restaurant', type: 'Heritage Dining', distance: '1 km', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
    ],
  },
  {
    id: 'krishna-janmashtami',
    name: 'Krishna Janmashtami (Ashtimki)',
    month: 7, year: 2026, startDay: 16,
    location: 'Krishna Mandir, Patan & Nationwide', isNationwide: true,
    mapUrl: 'https://www.google.com/maps/search/Krishna+Mandir+Patan+Nepal',
    category: 'Birth of Lord Krishna',
    description: 'Celebrating the birth of Lord Krishna at midnight. The Krishna Temple in Patan becomes the epicenter, surrounded by oil lamps and devotional singing through the entire night.',
    history: 'Krishna Janmashtami celebrates the birth of Lord Krishna — the eighth avatar of Vishnu — which occurred at midnight. The Krishna Mandir in Patan\'s Durbar Square, built in 1637 AD by King Siddhi Narsingh Malla, is one of the finest examples of shikhara architecture in Nepal. Its stone reliefs depicting scenes from the Mahabharata and Ramayana make it a UNESCO World Heritage Site. The midnight birth celebration has been observed here continuously for nearly 400 years.',
    whatHappens: [
      'The Krishna Mandir is decorated with flowers, oil lamps, and brass diyas in the days leading up to the festival.',
      'Devotees throng the temple from the afternoon, with the crowd peaking at midnight — the birth hour of Krishna.',
      'Priests perform a grand abhishek (ritual bathing) of the Krishna idol at midnight to the sound of conches and bells.',
      'Bhajan groups sing devotional songs throughout the night in a relay that never pauses.',
      'Street food vendors and flower sellers crowd Patan Durbar Square, creating a festive atmosphere.',
    ],
    experience: 'The Krishna Mandir illuminated by hundreds of oil lamps at midnight, with the sound of conches and bells ringing out across Patan\'s silent medieval square, is a magical and intimate experience.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Krishna_Mandir_Patan.jpg/640px-Krishna_Mandir_Patan.jpg',
    nearbyHotels: [
      { name: 'Inn Patan', type: 'Boutique Heritage Hotel', distance: '0.3 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Inn+Patan+Hotel' },
      { name: 'Summit Hotel Patan', type: 'Mid-range Hotel', distance: '1.5 km', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Summit+Hotel+Patan+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Café de Patan', type: 'Newari Fusion', distance: '0.1 km', rating: 4.5, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/cafe+near+Patan+Durbar+Square' },
      { name: 'Newa Lahana', type: 'Traditional Newari', distance: '0.2 km', rating: 4.6, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Newari+restaurant+Patan' },
    ],
  },
  // ── SEPTEMBER ────────────────────────────────────────────────────────────
  {
    id: 'indra-jatra',
    name: 'Indra Jatra (Yenya)',
    month: 8, year: 2026, startDay: 28,
    location: 'Kathmandu Durbar Square', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Kathmandu+Durbar+Square+Nepal',
    category: 'Living Goddess Chariot Procession',
    description: 'The largest street festival in Kathmandu. Features the public chariot procession of the Living Goddess Kumari, masked Lakhey dancers, and sacred oil lamps lit across the old city.',
    history: 'Indra Jatra is believed to date back over 1,500 years, though the tradition in its current form was established by King Jayaprakash Malla in 1768 CE. The festival honors Indra, the king of gods, who was once caught stealing flowers from Kathmandu and was released after his mother came looking for him. The addition of the Kumari chariot procession came from the same king, who sought the Living Goddess\'s blessing to legitimize his rule — a tradition that continues with Nepal\'s president today.',
    whatHappens: [
      'A large linga (pole) of Indra is raised at Hanuman Dhoka, inaugurating the eight-day festival.',
      'Masked Lakhey dancers (representing a demon who protected children) perform in the streets of old Kathmandu.',
      'The Living Goddess Kumari — a young girl chosen through an ancient selection process — appears publicly in her golden chariot for the first time of the year.',
      'The president of Nepal and other dignitaries receive tika from the Kumari.',
      'Sacred oil lamps (diya) are lit on rooftops and windows throughout the old city at dusk.',
      'On the final night, effigies of Indra are paraded and a chariot procession of the Kumari, Ganesh, and Bhairava ends the festival.',
    ],
    experience: 'Standing in Kathmandu Durbar Square as the Kumari\'s golden chariot is pulled past — the Living Goddess offering a glimpse from behind the latticed window — is an experience that marks you forever.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kumari_chariot_Indra_Jatra.jpg/640px-Kumari_chariot_Indra_Jatra.jpg',
    nearbyHotels: [
      { name: 'Hotel Shanker', type: 'Heritage Palace Hotel', distance: '1 km', rating: 4.5, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Shanker+Kathmandu' },
      { name: 'Thamel House Hotel', type: 'Boutique Hotel', distance: '0.8 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Kathmandu+Durbar+Square' },
      { name: 'Kathmandu Guest House', type: 'Classic Hotel', distance: '1.2 km', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Kathmandu+Guest+House+Thamel' },
    ],
    nearbyRestaurants: [
      { name: 'Bhojan Griha', type: 'Traditional Newari Fine Dining', distance: '0.5 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Bhojan+Griha+Kathmandu' },
      { name: 'Ason Bazaar Stalls', type: 'Street Food', distance: '0.3 km', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/Asan+Bazaar+Kathmandu' },
      { name: 'Kaiser Café', type: 'Heritage Café', distance: '0.4 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Kaiser+Cafe+Kathmandu' },
    ],
  },
  // ── OCTOBER ──────────────────────────────────────────────────────────────
  {
    id: 'dashain',
    name: 'Bada Dashain',
    month: 9, year: 2026, startDay: 18, endDay: 28,
    location: 'Nationwide', isNationwide: true,
    category: 'Victory of Good over Evil',
    description: 'Nepal\'s grandest 15-day festival. Families reunite from across the world, elders give tika and jamara blessings, bamboo swings are erected in every village, and kites fill the sky.',
    history: 'Dashain (also called Vijaya Dashami) celebrates the victory of the goddess Durga over the demon Mahishasura. It is the longest national holiday in Nepal, lasting 15 days from the new moon to the full moon of Ashwin (Sept-Oct). Rooted in ancient Vedic tradition, Dashain has been the most important festival in the Hindu calendar of Nepal for at least a thousand years. The Malla and Shah kings historically used Dashain to display royal power — a tradition of the state blessing the military continues at Tundikhel.',
    whatHappens: [
      'Fulpati (Day 7): Sacred flowers and plants are brought from the royal palace in Gorkha to Kathmandu in a state procession.',
      'Maha Ashtami (Day 8): The most auspicious night for goddess worship. Overnight pujas at Taleju and Durga temples.',
      'Maha Navami (Day 9): Large-scale animal sacrifices at Hanuman Dhoka and Kot Chowk. The army displays weapons.',
      'Vijaya Dashami (Day 10): Elders place tika (red rice and yogurt mark) and jamara (yellow grass) on younger family members\' foreheads. Daughters visit their parents\' homes.',
      'Kojagrat Purnima (Day 15, full moon): The final night. Women perform Laxmi puja by moonlight.',
      'Throughout: Bamboo swings (Linge Ping) are erected in village centers. Children and adults fly kites (changa) from rooftops.',
    ],
    experience: 'Receiving tika and jamara from grandparents surrounded by three generations of family — with the smell of incense and the sound of temple bells — is the emotional heart of Nepali life.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dashain_festival.jpg/640px-Dashain_festival.jpg',
    nearbyHotels: [
      { name: 'Hotel Yak & Yeti', type: 'Luxury', distance: 'Central Kathmandu', rating: 4.6, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/luxury+hotels+Kathmandu' },
      { name: 'Gokarna Forest Resort', type: 'Resort', distance: '8 km from city center', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Gokarna+Forest+Resort+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: 'Thamel Restaurants', type: 'All cuisines', distance: 'Thamel area', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/restaurants+Thamel+Kathmandu' },
      { name: 'The Dwarika\'s Restaurant', type: 'Heritage Nepali', distance: 'Dwarika\'s Hotel', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
    ],
  },
  {
    id: 'jitiya',
    name: 'Jitiya (Jivitputrika)',
    month: 9, year: 2026, startDay: 6,
    location: 'Terai (Madhesh Province)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Madhesh+Province+Nepal',
    category: "Mother's Fast for Children",
    description: 'A major Terai festival where mothers fast for three days without water, praying for the long life of their children. Observed by Maithili and Bhojpuri communities.',
    history: 'Jitiya (Jivitputrika Vrat) is based on the story of Jivitputrika — a creature in Hindu mythology who protected children. The festival is rooted in the Maithili and Bhojpuri traditions of the Terai/Madhesh plains and has been observed for centuries. The three-day fast (without food or water on the middle day) is considered one of the most demanding and devoted acts a mother can perform for her children.',
    whatHappens: [
      'On the first day (Nahai Khai), mothers take a ritual bath and eat their last meal before the fast.',
      'On the main day, mothers fast completely without food or water and visit riverside ghats for worship.',
      'Offerings of fruits, sweets, and Jitiya leaves (a specific local plant) are made to the river.',
      'Stories of Jivitputrika and eagle-and-crow legends are told to children.',
      'On the third day the fast is broken with puri and other traditional Maithili foods.',
    ],
    experience: 'Witnessing hundreds of mothers gathered at a Terai riverbank at dawn — fasting, praying, and making offerings for their children — is a profound display of maternal devotion unlike anything in tourist Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chhath_Puja_Ghat.jpg/640px-Chhath_Puja_Ghat.jpg',
    nearbyHotels: [
      { name: 'Hotel Janakpur', type: 'Mid-range Hotel', distance: 'Janakpur center', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Janakpur+Nepal' },
      { name: 'Birgunj Hotels', type: 'Various', distance: 'Birgunj city', rating: 3.8, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Birgunj+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Maithili Bhojnalaya', type: 'Traditional Maithili', distance: 'Janakpur', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurants+Madhesh+Nepal' },
    ],
  },
  {
    id: 'mani-rimdu-oct',
    name: 'Mani Rimdu',
    month: 10, year: 2026, startDay: 25,
    location: 'Tengboche Monastery, Khumbu', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Tengboche+Monastery+Khumbu+Nepal',
    category: 'Sherpa Monastery Masked Dance',
    description: 'A three-day Sherpa Buddhist festival at Tengboche Monastery (3,867m) featuring Cham masked dances, fire pujas, and the distribution of sacred pills for blessings.',
    history: 'Mani Rimdu was introduced to the Khumbu region in the early 20th century by Lama Gulu Rinpoche, who founded Tengboche Monastery in 1916. The festival draws on ancient Tibetan Buddhist tantric traditions and is a form of religious drama — the Cham dances enact the defeat of evil forces and the protection of the Buddhist faith. It falls on the full moon of the 9th Tibetan lunar month.',
    whatHappens: [
      'Day 1: An elaborate fire puja (offering ceremony) is performed by the head lama, with prayers for the welfare of all sentient beings.',
      'Day 2: The main day — Cham masked dances are performed in the monastery courtyard. Monks in elaborate costumes representing various deities and demons enact cosmic dramas.',
      'Sacred pills (Mani Rimdu) blessed by the Rinpoche are distributed to all attendees for health and good fortune.',
      'Day 3: Monks perform clown dances, and the festival concludes with communal celebration.',
      'Hundreds of trekkers time their Everest Base Camp trek to coincide with this festival.',
    ],
    experience: 'Watching the Cham dances at Tengboche with Ama Dablam (6,812m) rising dramatically behind the monastery is one of the most visually spectacular experiences in all of Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tengboche_monastery_mani_rimdu.jpg/640px-Tengboche_monastery_mani_rimdu.jpg',
    nearbyHotels: [
      { name: 'Tengboche Guesthouse', type: 'Monastery Lodge', distance: '0.1 km', rating: 4.3, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+Tengboche+Nepal' },
      { name: 'Namche Bazaar Lodges', type: 'Tea House Lodges', distance: '3.5 km', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/lodge+Namche+Bazaar+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Tengboche Bakery Café', type: 'Bakery & Hot Drinks', distance: '0.1 km', rating: 4.4, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/cafe+Tengboche+Nepal' },
      { name: 'Namche Bazaar Eateries', type: 'Multi-cuisine', distance: '3.5 km', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurants+Namche+Bazaar' },
    ],
  },
  // ── NOVEMBER ─────────────────────────────────────────────────────────────
  {
    id: 'tihar',
    name: 'Tihar & Mha Puja',
    month: 10, year: 2026, startDay: 8, endDay: 12,
    location: 'Nationwide & Newar Households', isNationwide: true,
    category: 'Festival of Lights',
    description: 'A 5-day festival of lights honoring crows, dogs, cows, and Laxmi. The Newari Mha Puja (self-reverence ritual) and colorful Rangoli mandalas make this festival unique in the world.',
    history: 'Tihar is Nepal\'s second greatest festival and corresponds to the Hindu Diwali observed across South Asia, but with unique Nepali features. Each of the five days honors a different being — crow (messenger of death), dog (guard of the afterlife), cow (sacred vehicle of Laxmi), ox (agricultural partner), and finally humans themselves (Mha Puja). The Mha Puja — self-worship — is exclusively Newari and has no parallel elsewhere in the Hindu world. Deusi-Bhailo, the festival singing tradition, is also unique to Nepal.',
    whatHappens: [
      'Day 1 (Kaag Tihar): Crows are fed sweets and offerings at dawn.',
      'Day 2 (Kukur Tihar): Dogs are garlanded with marigolds, given tikka, and fed special food.',
      'Day 3 (Gai/Laxmi Tihar): Cows are worshipped. At night, every household lights oil lamps and candles to welcome Laxmi. Girls sing Bhailo songs door-to-door.',
      'Day 4 (Mha Puja): In Newar households, an elaborate self-worship mandala is drawn and each family member worships their own soul with precise rituals.',
      'Day 4 (Gobardhan/Goru Tihar): Boys sing Deusi songs door-to-door, receiving sweets and money.',
      'Day 5 (Bhai Tika): Sisters place a seven-color tika and five-color mandala on brothers\' foreheads for protection and longevity.',
    ],
    experience: 'Kathmandu Valley at night during Tihar — every building outlined in lights, every doorstep lit with butter lamps, the air full of marigold scent and Deusi-Bhailo songs — is the most magical few days in Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tihar_festival_Nepal_lights.jpg/640px-Tihar_festival_Nepal_lights.jpg',
    nearbyHotels: [
      { name: 'Hotel Yak & Yeti', type: 'Luxury Hotel', distance: 'Central Kathmandu', rating: 4.6, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/luxury+hotels+Kathmandu+Tihar' },
      { name: 'Kathmandu Guest House', type: 'Classic Hotel', distance: 'Thamel', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Kathmandu+Guest+House' },
    ],
    nearbyRestaurants: [
      { name: 'Bhojan Griha', type: 'Traditional Newari', distance: '0.5 km from Thamel', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Bhojan+Griha+Kathmandu' },
      { name: 'Thamel Restaurant Hub', type: 'All cuisines', distance: 'Thamel area', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/restaurants+Thamel' },
    ],
  },
  {
    id: 'chhath',
    name: 'Chhath Puja',
    month: 10, year: 2026, startDay: 14,
    location: 'Riverbanks of Terai (Bagmati, Koshi, etc.)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Bagmati+River+Kathmandu+Nepal',
    category: 'Sun Worship Festival',
    description: 'Devotees fast for 36 hours and offer prayers to the setting and rising sun, standing in rivers at dusk and dawn in a profoundly powerful act of devotion.',
    history: 'Chhath Puja is one of the oldest Vedic festivals, dedicated to the Sun God (Surya) and his sister Chhathi Maiya. It is observed six days after Dashain, on the sixth day of the bright half of Kartik. The festival originated in the Terai/Mithila region of Nepal and Bihar (India) and is unique in Hinduism for worshipping the setting sun (not just the rising). Its precise rituals — standing in water, offering arghya to the sun — have been preserved unchanged for thousands of years.',
    whatHappens: [
      'Day 1 (Nahay Khay): Devotees take a holy bath, eat simple vegetarian food, and begin physical and mental purification.',
      'Day 2 (Kharna): Complete fast without water all day. At evening, a ritual meal of kheer (rice pudding) is eaten.',
      'Day 3 (Sandhya Arghya): The main evening. Thousands of devotees stand waist-deep in rivers at dusk and offer arghya (water offerings) to the setting sun with cupped hands.',
      'Day 4 (Usha Arghya): Before dawn, devotees return to the river to offer arghya to the rising sun, completing the 36-hour fast.',
    ],
    experience: 'Standing at a Terai river at 5am — watching thousands of sari-clad women silhouetted against the rising sun, hands raised in prayer, in absolute silence broken only by devotional songs — is one of the most moving sights in Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chhath_Puja_Ghat.jpg/640px-Chhath_Puja_Ghat.jpg',
    nearbyHotels: [
      { name: 'Hotel Bagmati', type: 'Budget Hotel', distance: '0.5 km from Bagmati Ghat', rating: 3.8, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Bagmati+River+Kathmandu' },
      { name: 'Janakpur Hotels', type: 'Various', distance: 'Terai hub', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Janakpur+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Terai Bhojnalaya', type: 'Traditional Madheshi', distance: 'Near ghats', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurants+Terai+Nepal' },
    ],
  },
  {
    id: 'sama-chakeva',
    name: 'Sama Chakeva',
    month: 10, year: 2026, startDay: 10, endDay: 15,
    location: 'Mithila region, Terai', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Janakpur+Madhesh+Nepal',
    category: 'Maithili Bird Festival',
    description: 'A unique Maithili festival celebrating the bond between siblings. Women craft beautiful clay birds and sing folk songs for days before ritually immersing them in a river.',
    history: 'Sama Chakeva is rooted in a legend from the Mahabharata era about Sama, daughter of Lord Krishna, who was falsely accused and cursed to become a bird. Her brother Chakradhar (Chakeva) searched the earth to lift the curse. The festival celebrates their reunion and the sibling bond. It is observed exclusively in the Mithila region of Nepal and Bihar — one of the most geographically specific folk festivals in South Asia.',
    whatHappens: [
      'Girls and women craft sets of clay birds (Sama and Chakeva) and their companions over several days, painting them with traditional Mithila art motifs.',
      'Each evening, women and girls take their bird sets to a communal gathering ground for singing — specific Sama Chakeva folk songs are sung in call-and-response format.',
      'Brothers playfully "steal" their sisters\' bird figures — a ritual teasing that re-enacts the legend.',
      'On the final night, all clay birds are immersed in a river or pond, symbolizing Sama\'s return to heaven.',
    ],
    experience: 'The evening singing circles of Sama Chakeva — women of all ages gathered under the open sky, singing ancient Maithili folk songs and displaying intricate clay birds — is a rare window into a living folk art tradition.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Janaki_Mandir_Janakpur.jpg/640px-Janaki_Mandir_Janakpur.jpg',
    nearbyHotels: [
      { name: 'Hotel Rama Janakpur', type: 'Mid-range Hotel', distance: 'Janakpur center', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Janakpur+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Mithila Kitchen', type: 'Traditional Maithili', distance: 'Janakpur', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/Maithili+restaurant+Janakpur' },
    ],
  },
  {
    id: 'vivah-panchami',
    name: 'Vivah Panchami',
    month: 10, year: 2026, startDay: 26,
    location: 'Janaki Mandir, Janakpur', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Janaki+Temple+Janakpur+Nepal',
    category: 'Divine Wedding of Ram & Sita',
    description: 'Commemorates the divine wedding of Lord Ram and Sita at the ornate Janaki Mandir. A grand re-enactment procession with decorated elephants draws hundreds of thousands.',
    history: 'Vivah Panchami falls on the fifth day of the bright fortnight of Margashirsha and celebrates the wedding of Ram and Sita at Janakpur (the city of Sita\'s father, King Janak). The ceremony has been re-enacted annually for centuries. The Janaki Mandir, completed in 1911, was built on the site believed to be the actual wedding pavilion. The festival draws pilgrims from Nepal, India, and the global Hindu diaspora — making it one of the largest religious gatherings in Nepal\'s Terai.',
    whatHappens: [
      'A grand wedding procession arrives from Ayodhya (India) symbolizing Ram\'s marriage party (baraat).',
      'Decorated elephants, horses, and devotees carry images of Ram in a baraat procession through Janakpur.',
      'A formal wedding ceremony is performed between the idols of Ram and Sita in the Janaki Mandir.',
      'Religious plays (Ramlila) enacting scenes from the Ramayana are performed on outdoor stages.',
      'A massive fair fills Janakpur with food, crafts, and cultural performances for several days.',
    ],
    experience: 'Watching the grand baraat procession through Janakpur with decorated elephants and thousands of devotees is one of the most theatrical and joyous religious spectacles in South Asia.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Janaki_Mandir_Janakpur.jpg/640px-Janaki_Mandir_Janakpur.jpg',
    nearbyHotels: [
      { name: 'Hotel Welcome Janakpur', type: 'Mid-range Hotel', distance: '0.4 km', rating: 4.1, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Janaki+Temple+Janakpur' },
      { name: 'Janaki Guest House', type: 'Budget', distance: '0.6 km', rating: 3.8, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+Janakpur+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Maithili Kitchen', type: 'Traditional Maithili', distance: '0.2 km', rating: 4.3, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+Janakpur+Nepal' },
      { name: 'Ram Sita Bhojnalaya', type: 'Nepali & North Indian', distance: '0.5 km', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+near+Janaki+Mandir' },
    ],
  },
  {
    id: 'udhauli',
    name: 'Udhauli',
    month: 10, year: 2026, startDay: 30,
    location: 'Kirat communities, Hills & Terai', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Khotang+Nepal',
    category: 'Kirat Downward Migration Festival',
    description: 'The companion festival to Ubhauli. Udhauli marks the downward migration from hills to the warmer Terai for winter, celebrated with Sakela dances and offerings to nature deities.',
    history: 'Udhauli is the winter counterpart to Ubhauli (spring), and together they mark the two great seasonal migrations of the Kirat people. Rooted in the ancient Mundhum (Kirat oral scripture), Udhauli gives thanks for the harvest, honors ancestors, and prepares the community for the winter. The festival is celebrated by all Kirat sub-groups (Rai, Limbu, Sunuwar) and is recognized as an Intangible Cultural Heritage of Nepal.',
    whatHappens: [
      'Community worship is held at the village chautari (communal platform) with offerings to Sumnima and Paruhang.',
      'Shamans (Bijuwa) perform healing and blessing rituals.',
      'The Sakela dance is performed — the same rhythmic circle dance as Ubhauli but with slightly different seasonal movements.',
      'Traditional Kirat foods and fermented millet drinks are shared.',
      'The festival is an occasion for the Kirat diaspora in Kathmandu and abroad to return to their ancestral villages.',
    ],
    experience: 'Joining the Sakela circle dance in an eastern hill village at dusk — drumbeats, traditional costumes, and a sea of moving people under the autumn sky — is a deeply grounding cultural experience.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sakela_dance.jpg/640px-Sakela_dance.jpg',
    nearbyHotels: [
      { name: 'Dharan Hotels', type: 'Various', distance: 'Dharan city hub', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Dharan+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Kirat Bhojnalaya', type: 'Traditional Kirat', distance: 'Eastern hills', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+Dharan+Nepal' },
    ],
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
    history: 'Tamu Losar (Gurung New Year) falls on the 15th of Poush (around December 30) and is the most important celebration for the Gurung people. The Gurung are an indigenous people of the high Annapurna region, closely connected to the Tibetan Buddhist cultural sphere. Losar (New Year) celebrations in the Himalayan world date back to pre-Buddhist Bon religious traditions. The Gurung Ghatu dance is one of Nepal\'s most ancient and complex narrative dance traditions.',
    whatHappens: [
      'Gurung communities gather in their villages and in Pokhara for communal worship and feasting.',
      'The Ghatu dance is performed — a complex narrative dance performed by young women in which performers enter trance states to tell mythological stories.',
      'Traditional Gurung instruments (murchunga jaw harp, madal drum) provide the musical backdrop.',
      'Offerings are made to Tamu ancestors and nature deities at sacred sites.',
      'Young Gurung from Kathmandu and abroad return to their home villages, making this a major reunion event.',
    ],
    experience: 'Watching the Ghatu dance in a Gurung village of the Annapurna circuit — especially when the performer enters a trance state — is one of Nepal\'s most otherworldly and unique cultural experiences.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Gurung_dance_Nepal.jpg/640px-Gurung_dance_Nepal.jpg',
    nearbyHotels: [
      { name: 'Hotel Pokhara Grande', type: 'Luxury Hotel', distance: 'Pokhara Lakeside', rating: 4.5, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/hotels+Pokhara+Lakeside+Nepal' },
      { name: 'Fish Tail Lodge', type: 'Resort', distance: 'Phewa Lake, Pokhara', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Fish+Tail+Lodge+Pokhara' },
      { name: 'Lakeside Budget Guesthouses', type: 'Budget', distance: 'Pokhara Lakeside', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/guesthouse+Pokhara+Lakeside' },
    ],
    nearbyRestaurants: [
      { name: 'Lakeside Restaurants Strip', type: 'Multi-cuisine', distance: 'Pokhara Lakeside', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/restaurants+Pokhara+Lakeside' },
      { name: 'Moondance Restaurant', type: 'Continental & Nepali', distance: 'Pokhara Lakeside', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Moondance+Restaurant+Pokhara' },
    ],
  },
  // ── JANUARY ──────────────────────────────────────────────────────────────
  {
    id: 'maghe-sankranti',
    name: 'Maghe Sankranti',
    month: 0, year: 2027, startDay: 14,
    location: 'Devghat, Triveni & Nationwide', isNationwide: true,
    category: 'Winter Solstice Harvest Festival',
    description: 'Marks the end of the inauspicious Poush month. People take holy dips at river confluences, eat sesame sweets, sweet potatoes, and ghee. Devghat near Chitwan is the holiest site.',
    history: 'Maghe Sankranti (also called Makar Sankranti) marks the sun\'s entry into Capricorn (Makar rashi) and the end of the winter solstice. It is one of the few Hindu festivals tied to the solar calendar. In Nepal, Devghat — the confluence of the Trishuli and Kali Gandaki rivers near Chitwan — is the holiest pilgrimage site for this festival, drawing thousands of sadhus and devotees. The tradition of eating specific foods (til, ghee, sweet potato) on this day is tied to ancient Ayurvedic beliefs about winter nutrition.',
    whatHappens: [
      'Pilgrims take a ritual bath at river confluences (sangam) at dawn — especially at Devghat, Triveni (Narayanghat), and Prayag (Kathmandu).',
      'Hundreds of sadhus and holy men gather at Devghat, some living there year-round.',
      'Families eat traditional foods: til ko laddu (sesame balls), chaku (molasses), sweet potato (tarul), ghee, and spinach.',
      'In the Tharu community, this day is also celebrated as Maghi (Tharu New Year) — see separate entry.',
      'Kite flying is common in parts of Nepal on this day.',
    ],
    experience: 'A dawn bath at the sacred Devghat confluence in the winter mist — surrounded by ash-smeared sadhus, bells ringing, and the smell of incense — is a profoundly atmospheric spiritual experience.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Devghat_confluence.jpg/640px-Devghat_confluence.jpg',
    nearbyHotels: [
      { name: 'Chitwan Hotels', type: 'Various', distance: 'Near Chitwan NP', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+Chitwan+Nepal' },
      { name: 'Tiger Tops Jungle Lodge', type: 'Luxury Resort', distance: 'Chitwan NP', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Tiger+Tops+Jungle+Lodge+Chitwan' },
    ],
    nearbyRestaurants: [
      { name: 'Sauraha Restaurants', type: 'Nepali & Continental', distance: 'Sauraha, Chitwan', rating: 4.0, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/restaurants+Sauraha+Chitwan' },
    ],
  },
  {
    id: 'maghi',
    name: 'Maghi (Tharu New Year)',
    month: 0, year: 2027, startDay: 14,
    location: 'Terai (Tharu communities)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Chitwan+Bardiya+Nepal',
    category: 'Tharu New Year',
    description: 'The most important festival for the Tharu people of the Terai. Maghi marks their new year with community feasts, traditional stick dances, and the election of new village leaders.',
    history: 'Maghi is the Tharu New Year and falls on the same day as Maghe Sankranti (January 14). The Tharu are one of the oldest indigenous peoples of the Terai and were the primary inhabitants of the malarial lowlands for centuries. Maghi is deeply tied to the agrarian cycle — it marks the end of the harvest season and the signing of labor contracts (kamara) between landlords and workers, a practice now largely abolished but historically central to Tharu life.',
    whatHappens: [
      'Village headmen (Barghars) are elected or re-confirmed for the coming year.',
      'Community feasts are held with traditional Tharu foods — rice, lentils, fish, and rice wine (jand).',
      'The Stick Dance (Lathi Nach) is performed around bonfires — an energetic, rhythmic dance using decorated bamboo sticks.',
      'Young men perform the Danda Nach (stick performance), which can last several hours.',
      'Families welcome the new year by cleaning and decorating their homes with traditional Tharu wall paintings (bhitti chitra).',
    ],
    experience: 'The Tharu Stick Dance around a bonfire on a cold January night in Chitwan or Bardiya — with drums beating and sparks flying — is one of Nepal\'s most electrifying and rarely-seen traditional performances.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Devghat_confluence.jpg/640px-Devghat_confluence.jpg',
    nearbyHotels: [
      { name: 'Chitwan Jungle Lodge', type: 'Eco Lodge', distance: 'Chitwan NP', rating: 4.4, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/lodge+Chitwan+Nepal' },
      { name: 'Bardiya Hotels', type: 'Various', distance: 'Bardiya NP area', rating: 4.0, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/hotels+Bardiya+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Tharu Cultural House', type: 'Traditional Tharu', distance: 'Sauraha, Chitwan', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/Tharu+cultural+restaurant+Chitwan' },
    ],
  },
  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  {
    id: 'sonam-losar',
    name: 'Sonam Losar (Tamang New Year)',
    month: 1, year: 2027, startDay: 7,
    location: 'Tamang communities, Kathmandu & hills', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Langtang+Valley+Nepal',
    category: 'Tamang New Year',
    description: 'The Tamang New Year celebrated with Damphu drum dances, traditional songs, and offerings to sky deities. The Tamang people\'s culture comes alive in villages around the Langtang region.',
    history: 'Sonam Losar is the New Year of the Tamang people, one of Nepal\'s largest ethnic groups. The date varies each year as it follows the Tibetan lunar calendar. The Tamang are of Tibetan origin and their culture blends Tibetan Buddhist traditions with indigenous animistic practices. The Damphu — a round, one-sided frame drum — is the defining instrument of Tamang culture and its rhythms are central to all Tamang celebrations.',
    whatHappens: [
      'Early morning prayers are performed at monasteries and in homes.',
      'Community gatherings are held in public spaces — especially large ones in Kathmandu at Tundikhel and in Tamang village centers.',
      'The Damphu dance is performed — men and women dance in pairs and circles to the beat of the distinctive round frame drum.',
      'Traditional Tamang songs (Tamang Selo) are sung and played on the damphu and tongba.',
      'Special foods are prepared including sel roti (fried bread ring) and fermented drinks.',
    ],
    experience: 'The Damphu dance in Kathmandu on Sonam Losar — hundreds of Tamang people in traditional dress dancing to the hypnotic damphu beat in a public square — is one of the most visually striking cultural celebrations in the city.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tamang_damphu_dance.jpg/640px-Tamang_damphu_dance.jpg',
    nearbyHotels: [
      { name: 'Kathmandu Thamel Hotels', type: 'Various', distance: 'Thamel, Kathmandu', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+Thamel+Kathmandu' },
      { name: 'Langtang Valley Lodges', type: 'Tea House', distance: 'Langtang region', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/lodges+Langtang+Valley+Nepal' },
    ],
    nearbyRestaurants: [
      { name: 'Tamang Restaurant Kathmandu', type: 'Traditional Tamang', distance: 'Kathmandu', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/Tamang+restaurant+Kathmandu' },
      { name: 'Thamel Dining', type: 'Multi-cuisine', distance: 'Thamel', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/restaurants+Thamel+Kathmandu' },
    ],
  },
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    month: 1, year: 2027, startDay: 26,
    location: 'Pashupatinath Temple, Nationwide', isNationwide: true,
    category: 'Great Night of Shiva',
    description: 'One of the holiest nights in Hinduism. Over a million devotees descend on Pashupatinath. Ash-covered Sadhus from across the subcontinent gather, bonfires burn all night.',
    history: 'Maha Shivaratri ("The Great Night of Shiva") falls on the 14th night of the dark fortnight of Phalgun. It commemorates the night when Shiva performed the Tandava (cosmic dance) and also the night of his marriage to Parvati. Pashupatinath in Kathmandu is one of the holiest Shiva temples in the world — a UNESCO World Heritage Site — and the Maha Shivaratri gathering here is one of the largest Hindu religious gatherings in South Asia, drawing pilgrims from Nepal, India, and beyond.',
    whatHappens: [
      'Thousands of Sadhus (Hindu holy men) arrive weeks early, camping in the grounds of Pashupatinath.',
      'Devotees fast through the day and perform night-long worship — staying awake is considered meritorious.',
      'Four special pujas are performed during the four watches (prahar) of the night in the main Pashupatinath sanctum.',
      'Bonfires (holi) are lit across the Pashupatinath complex and throughout the country.',
      'The smell of dhuni (sacred smoke) and the sound of Om Namah Shivaya chants fills the entire Bagmati riverbank area.',
      'Marijuana (cannabis) is legally and openly consumed by Sadhus in the Pashupatinath complex on this one night.',
    ],
    experience: 'Walking through the Pashupatinath complex at midnight on Shivaratri — ash-covered Sadhus with matted dreadlocks sitting by fires, the air thick with incense and chanting — is one of the most intense and unforgettable experiences in Nepal.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pashupatinath_Shivaratri.jpg/640px-Pashupatinath_Shivaratri.jpg',
    nearbyHotels: [
      { name: 'Hyatt Regency Kathmandu', type: 'Luxury Hotel', distance: '0.3 km', rating: 4.7, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Hyatt+Regency+Kathmandu' },
      { name: 'Hotel Ganesha Himal', type: 'Mid-range Hotel', distance: '0.5 km', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Pashupatinath+Temple' },
    ],
    nearbyRestaurants: [
      { name: 'Pashupati Café', type: 'Nepali', distance: '0.2 km', rating: 3.9, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+near+Pashupatinath+Kathmandu' },
      { name: 'The Dwarika\'s Restaurant', type: 'Heritage Dining', distance: '1 km', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
    ],
  },
  // ── MARCH ────────────────────────────────────────────────────────────────
  {
    id: 'holi',
    name: 'Holi (Fagu Purnima)',
    month: 2, year: 2027, startDay: 3,
    location: 'Nationwide (Kathmandu & Terai lead)', isNationwide: true,
    category: 'Festival of Colors',
    description: 'The famous festival of colors celebrating the arrival of spring. Streets become a riot of colored powder and water, with Kathmandu celebrating a day before the Terai.',
    history: 'Holi is one of the most ancient Hindu festivals, with references dating back to the Puranas. It celebrates the legend of Prahlad — a devotee of Vishnu — who was saved from his evil aunt Holika who tried to burn him alive. The burning of Holika effigy (Holika Dahan) the night before Holi symbolizes the victory of devotion over evil. The color-throwing tradition is also linked to the playful activities of young Krishna with the gopis. In Nepal, Kathmandu celebrates Holi a day before the Terai, following the Newar tradition.',
    whatHappens: [
      'The night before (Holika Dahan): A large bonfire is lit in public squares (especially Basantapur) symbolizing the burning of evil.',
      'On Holi day, people drench each other with colored powder (gulal) and water from morning through afternoon.',
      'Water balloons and water guns are used liberally — everyone participates regardless of age.',
      'Music blares from rooftops and streets, with dancing and celebration throughout the day.',
      'Special Holi foods are prepared: thandai (spiced milk), gujiya sweets, and malpua.',
    ],
    experience: 'Basantapur Durbar Square on Holi morning — a packed crowd of locals and tourists drenching each other in every color of the rainbow against the backdrop of 500-year-old temples — is pure, joyful, unforgettable chaos.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Holi_festival_Nepal.jpg/640px-Holi_festival_Nepal.jpg',
    nearbyHotels: [
      { name: 'Hotel Shanker', type: 'Heritage Hotel', distance: '1 km from Basantapur', rating: 4.5, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Shanker+Kathmandu' },
      { name: 'Thamel Hotels', type: 'Various', distance: 'Thamel area', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+Thamel+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: 'Bhojan Griha', type: 'Traditional Newari', distance: '0.5 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Bhojan+Griha+Kathmandu' },
      { name: 'Thamel Restaurant Hub', type: 'Multi-cuisine', distance: 'Thamel', rating: 4.2, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/restaurants+Thamel+Kathmandu' },
    ],
  },
  {
    id: 'sherpa-losar',
    name: 'Sherpa Losar',
    month: 2, year: 2027, startDay: 5,
    location: 'Sherpa communities, Khumbu & Kathmandu', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Namche+Bazaar+Khumbu+Nepal',
    category: 'Sherpa New Year',
    description: 'The Sherpa New Year celebrated with monastery prayers, traditional feasts, music, and community gatherings. A genuine window into Himalayan Buddhist culture.',
    history: 'Sherpa Losar is the Sherpa New Year, following the Tibetan Buddhist lunar calendar. The Sherpa people migrated from the Kham region of Tibet about 500 years ago and settled in the Khumbu region of Nepal. Their cultural heritage blends Tibetan Buddhism with ancient Bon shamanic traditions. Losar (literally "new year" in Tibetan) is the most important annual celebration in the Tibetan Buddhist world and has been observed by Sherpas continuously for centuries.',
    whatHappens: [
      'Special prayers (puja) are performed at monasteries including Tengboche, Khumjung, and Thame.',
      'Houses are cleaned and decorated with prayer flags (lungtar) and juniper incense smoke.',
      'Traditional Losar foods are prepared: khabse (deep-fried bread), khapse (dough sculptures), and chang (barley beer).',
      'Community dances and games are organized, with traditional Sherpa music played on dranyen lutes.',
      'Offerings are made to protector deities of the household and community.',
    ],
    experience: 'Celebrating Sherpa Losar in a Khumbu village — butter tea in hand, monastery prayers in the background, snow peaks visible — is an intimate cultural experience that most trekkers miss entirely.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tengboche_monastery.jpg/640px-Tengboche_monastery.jpg',
    nearbyHotels: [
      { name: 'Hotel Everest View', type: 'Altitude Hotel', distance: 'Syangboche (3,880m)', rating: 4.4, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Hotel+Everest+View+Khumbu+Nepal' },
      { name: 'Namche Bazaar Tea Houses', type: 'Tea House Lodges', distance: 'Namche Bazaar', rating: 4.2, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/tea+house+Namche+Bazaar' },
    ],
    nearbyRestaurants: [
      { name: 'Namche Bakery', type: 'Bakery & Café', distance: 'Namche Bazaar', rating: 4.5, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/bakery+Namche+Bazaar+Nepal' },
      { name: 'Khumbu Dining Hall', type: 'Nepali & Continental', distance: 'Namche Bazaar', rating: 4.1, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/restaurant+Namche+Bazaar+Nepal' },
    ],
  },
  {
    id: 'seto-machhindranath',
    name: 'Seto Machhindranath Jatra',
    month: 2, year: 2027, startDay: 15,
    location: 'Old Kathmandu (Asan to Jana Bahal)', isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Jana+Bahal+Kathmandu+Nepal',
    category: 'White Machhindranath Chariot',
    description: 'The chariot festival of White (Seto) Machhindranath in old Kathmandu. A tall chariot is pulled through the historic lanes over several days, drawing massive crowds.',
    history: 'Seto (White) Machhindranath is the patron deity of Kathmandu, distinct from Rato (Red) Machhindranath of Patan. The festival is one of the oldest in the Kathmandu Valley, predating the Malla period. Seto Machhindranath is revered by both Hindus and Buddhists — Hindus worship him as the god of rain and harvest, while Buddhists identify him with the bodhisattva Avalokitesvara. The chariot is built fresh each year and pulled through the lanes of old Kathmandu over three to four days.',
    whatHappens: [
      'The chariot is constructed at Jana Bahal (White Machhindranath temple) over several weeks.',
      'On the first day, priests perform elaborate rituals to invite the deity into the chariot.',
      'The chariot is pulled by hundreds of devotees using thick ropes through the narrow medieval lanes of Kathmandu.',
      'Specific "pulling days" are designated as the chariot inches through the old city over 3-4 days.',
      'Devotees press forward to touch the chariot wheels — believed to grant blessings and wash away sins.',
      'The festival ends with the return of the deity image to Jana Bahal.',
    ],
    experience: 'Following the Seto Machhindranath chariot through the narrow lanes of old Kathmandu — the creaking of wood, the press of devotees, the smell of incense — is an immersion into a living medieval city that has barely changed in centuries.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Seto_Machhindranath_chariot.jpg/640px-Seto_Machhindranath_chariot.jpg',
    nearbyHotels: [
      { name: 'Thamel House Hotel', type: 'Boutique Hotel', distance: '0.6 km', rating: 4.3, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+Asan+Kathmandu' },
      { name: 'Hotel Ganesh Himal', type: 'Mid-range Hotel', distance: '0.8 km', rating: 4.1, priceRange: '$$', mapUrl: 'https://www.google.com/maps/search/hotels+near+old+Kathmandu' },
    ],
    nearbyRestaurants: [
      { name: 'Asan Tole Street Food', type: 'Street Food', distance: '0.2 km', rating: 4.3, priceRange: '$', mapUrl: 'https://www.google.com/maps/search/street+food+Asan+Kathmandu' },
      { name: 'Bhojan Griha', type: 'Traditional Newari', distance: '0.5 km', rating: 4.7, priceRange: '$$$', mapUrl: 'https://www.google.com/maps/search/Bhojan+Griha+Kathmandu' },
    ],
  },
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['S','M','T','W','T','F','S'];
const INITIAL_MONTH = 8;
const INITIAL_YEAR = 2026;

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
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeTab, setActiveDetailTab] = useState<'about' | 'events' | 'nearby'>('about');

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
    if (fests.length > 0) { setSelectedDay(day); setSelectedFestival(fests[0]); setActiveDetailTab('about'); }
    else { setSelectedDay(null); setSelectedFestival(null); }
  };
  const selectFestival = (f: Festival) => {
    setCurrentMonth(f.month); setCurrentYear(f.year);
    setSelectedDay(f.startDay); setSelectedFestival(f); setActiveDetailTab('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  return (
    <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto py-10 min-h-screen text-slate-100">

      {/* Header */}
      <header className="mb-8">
        <span className="inline-block font-sans-body text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Living Traditions</span>
        <h1 className="font-serif-headline text-4xl md:text-5xl font-bold text-white mb-3">Cultural Calendar &amp; Festivals</h1>
        <p className="font-sans-body text-sm text-slate-300 max-w-2xl">
          Plan your visit around Nepal's ancient living festivals. Click any highlighted date to explore the event in depth.
        </p>
      </header>

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
                <p className="font-sans-body text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">This Month</p>
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

              {/* Hero Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <img src={selectedFestival.imageUrl} alt={selectedFestival.name} className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Boudhanath_stupa.jpg/640px-Boudhanath_stupa.jpg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="font-sans-body text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{selectedFestival.category}</span>
                  <h2 className="font-serif-headline text-2xl md:text-3xl font-bold text-white leading-tight">{selectedFestival.name}</h2>
                </div>
              </div>

              {/* Meta row */}
              <div className="px-6 py-3 flex flex-wrap items-center gap-3 border-b border-white/10">
                <span className="flex items-center gap-1.5 font-sans-body text-xs text-slate-300">
                  <span className="material-symbols-outlined text-sm text-cyan-400">calendar_today</span>
                  {selectedFestival.endDay
                    ? `${MONTH_NAMES[selectedFestival.month]} ${selectedFestival.startDay}–${selectedFestival.endDay}, ${selectedFestival.year}`
                    : `${MONTH_NAMES[selectedFestival.month]} ${selectedFestival.startDay}, ${selectedFestival.year}`}
                </span>
                <span className="flex items-center gap-1.5 font-sans-body text-xs text-slate-300 flex-1 min-w-0">
                  <span className="material-symbols-outlined text-sm text-cyan-400">location_on</span>
                  <span className="truncate">{selectedFestival.isNationwide ? 'Celebrated all over Nepal' : selectedFestival.location}</span>
                </span>
                {selectedFestival.mapUrl && (
                  <a href={selectedFestival.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 glass px-2.5 py-1 rounded-lg border border-cyan-400/30 hover:border-cyan-400/70 text-cyan-400 hover:text-cyan-300 font-sans-body text-[10px] font-bold transition-all">
                    <span className="material-symbols-outlined text-xs">map</span>View on Map
                  </a>
                )}
                {selectedFestival.isNationwide
                  ? <span className="shrink-0 bg-cyan-500/15 text-cyan-300 px-2.5 py-0.5 rounded-full font-sans-body text-[10px] font-bold border border-cyan-400/30">🇳🇵 Nationwide</span>
                  : <span className="shrink-0 bg-amber-500/15 text-amber-300 px-2.5 py-0.5 rounded-full font-sans-body text-[10px] font-bold border border-amber-400/30">📍 Specific Location</span>
                }
              </div>

              {/* Tabs */}
              <div className="px-6 pt-4 flex gap-1 border-b border-white/10">
                {(['about', 'events', 'nearby'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveDetailTab(tab)}
                    className={`px-4 py-2 rounded-t-xl font-sans-body text-xs font-bold transition-all cursor-pointer capitalize
                      ${activeTab === tab ? 'bg-amber-500/20 border border-amber-400/40 border-b-0 text-amber-300' : 'text-slate-400 hover:text-white'}`}>
                    {tab === 'about' ? 'About' : tab === 'events' ? 'What Happens' : 'Nearby'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 space-y-5">

                {activeTab === 'about' && (
                  <>
                    <div>
                      <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Overview</p>
                      <p className="font-sans-body text-sm text-slate-300 leading-relaxed">{selectedFestival.description}</p>
                    </div>
                    <div className="carved-line opacity-20" />
                    <div>
                      <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">History & Origins</p>
                      <p className="font-sans-body text-sm text-slate-300 leading-relaxed">{selectedFestival.history}</p>
                    </div>
                    <div className="glass rounded-2xl p-4 border border-amber-400/20">
                      <p className="font-sans-body text-xs font-bold text-amber-400 mb-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">star</span>Tourist Experience
                      </p>
                      <p className="font-sans-body text-sm text-slate-300 leading-relaxed">{selectedFestival.experience}</p>
                    </div>
                  </>
                )}

                {activeTab === 'events' && (
                  <div>
                    <p className="font-sans-body text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">What Happens During This Festival</p>
                    <div className="space-y-3">
                      {selectedFestival.whatHappens.map((event, i) => (
                        <div key={i} className="flex items-start gap-3 glass rounded-xl p-3.5 border border-white/10">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-sans-body text-xs font-bold text-amber-300">{i + 1}</span>
                          <p className="font-sans-body text-sm text-slate-300 leading-relaxed">{event}</p>
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
                        <span className="material-symbols-outlined text-sm">hotel</span>Nearby Hotels
                      </p>
                      <div className="space-y-2.5">
                        {selectedFestival.nearbyHotels.map((h, i) => (
                          <a key={i} href={h.mapUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 glass rounded-xl p-3.5 border border-white/10 hover:border-cyan-400/40 transition-all group">
                            <div className="shrink-0 w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-base text-cyan-400">hotel</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-sans-body text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{h.name}</p>
                                <span className="font-sans-body text-[10px] text-slate-400 glass px-1.5 py-0.5 rounded-md border border-white/10">{h.priceRange}</span>
                              </div>
                              <p className="font-sans-body text-[11px] text-slate-400 mb-1">{h.type} · {h.distance}</p>
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
                        <span className="material-symbols-outlined text-sm">restaurant</span>Nearby Restaurants
                      </p>
                      <div className="space-y-2.5">
                        {selectedFestival.nearbyRestaurants.map((r, i) => (
                          <a key={i} href={r.mapUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 glass rounded-xl p-3.5 border border-white/10 hover:border-amber-400/40 transition-all group">
                            <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-base text-amber-400">restaurant</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-sans-body text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{r.name}</p>
                                <span className="font-sans-body text-[10px] text-slate-400 glass px-1.5 py-0.5 rounded-md border border-white/10">{r.priceRange}</span>
                              </div>
                              <p className="font-sans-body text-[11px] text-slate-400 mb-1">{r.type} · {r.distance}</p>
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
                <p className="font-sans-body text-xs text-cyan-400 font-bold mt-2">← Navigate the months to find upcoming festivals</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* All Festivals List */}
      <section className="mt-14">
        <h2 className="font-serif-headline text-2xl font-bold text-white mb-2 text-center">All Upcoming Festivals (2026–2027)</h2>
        <p className="font-sans-body text-sm text-slate-400 text-center mb-7">Click any card to explore the full details.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {FESTIVALS_SORTED.map(f => (
            <button key={f.id} onClick={() => selectFestival(f)}
              className="glass-card glass-card-hover rounded-2xl p-3.5 border border-white/10 text-left flex items-start gap-3 cursor-pointer transition-all hover:border-amber-400/40 group">
              <div className="shrink-0 w-11 h-11 glass rounded-xl flex flex-col items-center justify-center border border-amber-400/30 group-hover:border-amber-400/60 transition-all">
                <span className="font-serif-headline text-sm font-bold text-amber-300 leading-none">{f.startDay}</span>
                <span className="font-sans-body text-[9px] text-slate-400 uppercase">{MONTH_NAMES[f.month].slice(0,3)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans-body text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">{f.name}</p>
                <p className="font-sans-body text-[10px] text-cyan-400 font-semibold mb-0.5">{f.category}</p>
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
