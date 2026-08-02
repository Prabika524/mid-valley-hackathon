import re

filepath = r'c:\Users\ASUS\Downloads\Mid-Valley-Hackathon-main\Mid-Valley-Hackathon-main\src\pages\CalendarPage.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_festivals_code = '''const FESTIVALS: Festival[] = [
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
    location: "Patan's Long Chariot Procession", isNationwide: false,
    mapUrl: 'https://www.google.com/maps/search/Patan+Durbar+Square+Lalitpur+Nepal',
    category: 'Longest Chariot Festival (Patan)',
    description: "The world's longest chariot festival. A towering chariot built from wood and leafy pine branches is slowly pulled through Patan's streets over months to honor Rato Machhindranath, the God of Harvest and Rain.",
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
    category: 'Women\'s Festival (Red Saris)',
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
      { name: 'The Dwarika\'s Restaurant', type: 'Heritage Dining', distance: '1 km', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
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
    history: 'Gai Jatra was established by 17th-century Malla king Pratap Malla to console his queen after their son died. When nothing made her smile, the king invited all bereaved families to parade through Kathmandu — the sight of the city united in humor and solidarity finally brought comfort. The tradition of lighthearted satire and political parody grew from this original act.',
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
    location: 'Nationwide (Nepal\'s Biggest Festival)', isNationwide: true,
    category: 'Nepal\'s Biggest Festival (Tika Ceremony)',
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
      { name: 'The Dwarika\'s Restaurant', type: 'Heritage Nepali', distance: 'Dwarika\'s Hotel', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
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
      { name: 'The Dwarika\'s Restaurant', type: 'Heritage Dining', distance: '1 km', rating: 4.8, priceRange: '$$$$', mapUrl: 'https://www.google.com/maps/search/Dwarikas+Hotel+Kathmandu' },
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
];'''

start_idx = content.find('const FESTIVALS: Festival[] = [')
end_idx = content.find('const MONTH_NAMES = [')

if start_idx != -1 and end_idx != -1:
    updated = content[:start_idx] + new_festivals_code + '\n\n' + content[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated)
    print('Updated CalendarPage.tsx successfully!')
else:
    print('Indices not found:', start_idx, end_idx)
