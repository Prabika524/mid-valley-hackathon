import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'operator' | 'user';
  companyName?: string;
  licenseNumber?: string;
  phone?: string;
  createdAt: string;
}

export interface HeritageSite {
  id: string;
  name: string;
  category: 'Heritage Site' | 'Trekking Route';
  managedBy: string;
  foreignFeeUSD: number;
  saarcFeeNPR: number;
  nepaliFee: string;
  operatingHours: string;
  description: string;
  imageUrl: string;
  region: string;
  tag?: string;
  gettingThere?: string;
  etiquetteDo?: string[];
  etiquetteDont?: string[];
}

export interface TrekkingRoute {
  id: string;
  name: string;
  difficulty: string;
  durationDays: number;
  acapFeeUSD: number;
  description: string;
  imageUrl: string;
  region: string;
  tag?: string;
  liveWeather?: {
    location: string;
    tempC: number;
    condition: string;
    windKmh: number;
    humidityPct: number;
    visibilityKm: number;
  };
}

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  passportNumber?: string;
  nationality?: string;
  siteId: string;
  siteName: string;
  visitDate: string;
  guests: number;
  totalPriceUSD: number;
  paymentMethod?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  entryGate?: string;
  ticketType?: string;
  commissionUSD?: number;
  operatorNotes?: string;
  createdAt: string;
}

export interface OperatorApplication {
  id: string;
  companyName: string;
  licenseNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  officeAddress: string;
  documentName?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  operator: string;
  status: 'Confirmed' | 'Pending Payment' | 'Cancelled';
  timeAgo: string;
  type: 'heritage' | 'trek' | 'alert';
}

export interface HiddenGem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  location: string;
  highlight: string;
  imageUrl: string;
  submittedBy?: string;
  contactEmail?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

interface DBData {
  users: User[];
  sites: HeritageSite[];
  treks: TrekkingRoute[];
  bookings: Booking[];
  operatorApplications: OperatorApplication[];
  activities: ActivityItem[];
  hiddenGems: HiddenGem[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

function initData(): DBData {
  const salt = bcrypt.genSaltSync(10);
  const adminHash = bcrypt.hashSync('admin123', salt);
  const operatorHash = bcrypt.hashSync('operator123', salt);
  const userHash = bcrypt.hashSync('user123', salt);

  return {
    users: [
      {
        id: 'usr_admin',
        name: 'Platform Administrator',
        email: 'admin@heritage.np',
        passwordHash: adminHash,
        role: 'admin',
        companyName: 'Nepal Heritage Trust',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_operator1',
        name: 'Pemba Sherpa',
        email: 'pemba@everesthightreks.np',
        passwordHash: operatorHash,
        role: 'operator',
        companyName: 'Everest High Treks',
        licenseNumber: '#NHT-2024-089',
        phone: '+977 9841234567',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_user1',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@example.com',
        passwordHash: userHash,
        role: 'user',
        createdAt: new Date().toISOString(),
      }
    ],
    sites: [
      {
        id: 'pashupatinath',
        name: 'Pashupatinath Temple',
        category: 'Heritage Site',
        managedBy: 'Pashupati Area Development Trust',
        foreignFeeUSD: 15,
        saarcFeeNPR: 1000,
        nepaliFee: 'Free',
        operatingHours: '04:00 - 21:00',
        description: 'One of the most sacred Hindu temples of Nepal, situated on the banks of the Bagmati River. A masterpiece of Hindu architecture and a center for pilgrimage.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9zDoHJ832MWuu6GOQo8OprehtIaUeEpfGWQo8xb6u4qQnLL2ngFYcjnQOy3_6QCqDLeerBFnkxbwMcNTt-EfiKRWvHPPwa9ucBkbJQNrFiZwTfm85TjQkAAAt0wzPO84H_IIjGWzVQ28Hn7ASmXJfyX2EwPrRZyW4YoOEqj8r9VUlhA98B6PprQXWYKyqDN3N9jHFZ4p_AaKw4kGmGigTJppZ-6nFEGlRnA3bkTCtj59bbgbFpNhKxKHnOEGUmZKGzJgxzjsPLII',
        region: 'Kathmandu Valley',
        tag: 'Must Visit',
        gettingThere: 'Located in Gaushala, 5km east of Kathmandu city center. Taxis and local buses run directly from Ratna Park.',
        etiquetteDo: [
          'Remove shoes and leather items before entering active temple courtyards',
          'Walk clockwise around shrines and lingams',
          'Respect funeral ghat rites taking place along the Bagmati River'
        ],
        etiquetteDont: [
          'Non-Hindus must not enter the main inner temple sanctuary',
          'Do not take close-up photos of cremation ceremonies without permission',
          'Avoid touching sacred relics or idols'
        ]
      },
      {
        id: 'bhaktapur',
        name: 'Bhaktapur Durbar Square',
        category: 'Heritage Site',
        managedBy: 'Bhaktapur Municipality',
        foreignFeeUSD: 15,
        saarcFeeNPR: 500,
        nepaliFee: 'Free',
        operatingHours: '07:00 - 18:00',
        description: 'A masterpiece of Newari architecture, this ancient city square preserves centuries of stone and timber craftsmanship in breathtaking detail including the 55-Window Palace.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoV1aBdlrFyPEn1NjXHrVmIuw-IHKelTKwpNf2SP9Siwl6jdF8qB9h-smIqZ_P9ecUMdj6Nx5-QvWERAJz4Fd4gpXKknvlUoLetcEc1pnS7Ia6YE8c_MXYjVIMwXNKrq2JFOmbLbfbJv6xCejf86K_jDLDt91b0MagBDe_sSoASMdqMDrF6z-zjuMJPF9ejDucyc91YAxMjnI8AriCcGxI7olBLphKLVn_4AcVBHjeVO7nHl5N4PeFkNjYPVTzexLjZjZzIYFAPYs',
        region: 'Kathmandu Valley',
        tag: 'UNESCO Heritage',
        gettingThere: 'Located about 13km east of Kathmandu, Bhaktapur is easily accessible by taxi or local bus from Ratna Park. Express microbuses depart every 10 mins.',
        etiquetteDo: [
          'Remove shoes before stepping into active temple premises',
          'Walk clockwise around stupas and religious monuments',
          'Support local potters at Pottery Square'
        ],
        etiquetteDont: [
          'Do not climb or sit on ancient brick structures or carved statues',
          'Avoid flash photography inside woodcarving museums',
          'Never buy unverified antique relics'
        ]
      },
      {
        id: 'patan',
        name: 'Patan Durbar Square',
        category: 'Heritage Site',
        managedBy: 'Lalitpur Metropolitan City',
        foreignFeeUSD: 10,
        saarcFeeNPR: 250,
        nepaliFee: 'Free',
        operatingHours: '08:00 - 18:00',
        description: 'Famous for the monolithic stone Krishna Mandir, Patan Durbar Square is a haven of metallic craftsmanship, traditional courtyard squares, and bronze museums.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfH7v-k_9tE-SFjN3GJo9zdYYmw93ms92CaoSAK5WAGwZCr_AiOVQ1PzeujJFsaM4uFPf5xVvR_YQ9wCLdzQiF3SCRurlUuGT7rhvhDxeAyQx6Xcv78Phr1IeoGD66j3bhayr0h2RMAwNlrXZfV5VXJRjGRkM7tCs8NVy5MQ4Rn9fYFbEKlV1V_KkD8d3xaypDjSxqbX4JoJz6fHlgILbIGxa6tEy8xFmM6Rh9nejhgZYaXMjq3oYJ1-Nxbfn0S9i02TpAZOQwzJc',
        region: 'Kathmandu Valley',
        tag: 'Fine Arts Hub',
        gettingThere: 'Situated across the Bagmati River in Lalitpur, a 15-minute taxi ride from Thamel or 20 minutes from Tribhuvan International Airport.',
        etiquetteDo: [
          'Visit Patan Museum to appreciate restored golden courtyard artifacts',
          'Maintain quiet decorum in monastic courtyards (Bahals)',
          'Hire licensed municipal guides with badges'
        ],
        etiquetteDont: [
          'Do not wear footwear inside active Buddhist monasteries',
          'Do not touch bronze oil lamps or prayer wheels aggressively'
        ]
      },
      {
        id: 'boudhanath',
        name: 'Boudhanath Stupa',
        category: 'Heritage Site',
        managedBy: 'Boudhanath Area Dev. Committee',
        foreignFeeUSD: 4,
        saarcFeeNPR: 100,
        nepaliFee: 'Free',
        operatingHours: '24 Hours',
        description: 'One of the largest spherical stupas in the world. Dominating the skyline, Boudhanath is the spiritual epicenter of Tibetan Buddhism in Nepal.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKBhNrDqEi0BphhRB7xRz4AA6obs6P9mMVy-ZLJDYF8Tev5IysD8SnkFIZZqMNEWYmY9TbR7J89E1HVFn-H-7RD45qaSA66yUq05MLwxfySESPfMCzv_cWQlFdujtrkHV64PxpIyyotKJT726NCUe3NLO9qJfIDGqMblIhuM4DfMIL8c29bfz1Z9NaRur0jdkJcp4dnmbBwVenq-Y8PI7Qja9CqfiErA8gBxU0uxsPEpDGKbvRMz6sYz6Mu-L7ufgI2z4OqI0EI0A',
        region: 'Kathmandu Valley',
        tag: 'Spiritual Center',
        gettingThere: 'Located in Boudha, 7km northeast of central Kathmandu. Reachable by taxi or local ring-road bus.',
        etiquetteDo: [
          'Always circumambulate the stupa clockwise (Kora)',
          'Spin prayer wheels in a clockwise direction',
          'Enjoy butter lamps at sunset'
        ],
        etiquetteDont: [
          'Do not walk counter-clockwise around the main stupa dome',
          'Do not step on Tibetan prayer flags lying on the ground'
        ]
      },
      {
        id: 'swayambhunath',
        name: 'Swayambhunath Stupa',
        category: 'Heritage Site',
        managedBy: 'Federation of Swayambhu Mgt.',
        foreignFeeUSD: 2,
        saarcFeeNPR: 50,
        nepaliFee: 'Free',
        operatingHours: '24 Hours',
        description: 'Perched atop a hill in the Kathmandu Valley, Swayambhunath (the Monkey Temple) offers panoramic valley views and ancient stupas crowned with the all-seeing eyes of Buddha.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV2m1my58FmfoOR7GuEW2AYXkZfmJE4_yxQ-tMy3efdDmZYxMlDwApvNpaX0QYsuzBjmW_5CAxJqilzE6qGTIIgXac3584MUAw9OCzStc2KNKkif_ZxziErE3uHatIyV60yt58TuwuPBcsSrvza_PFcRNoo032uF2S5AqDL_76Q0UyQ9cRf0SdiCfqUPxMfH1BklS6IqT10LwgLhKXAIs24UEod-R9DM_5NOV3SOuisqaK6sLeXYJdeDRw5kqmiLUSuReDFxBp1MQ',
        region: 'Kathmandu Valley',
        tag: 'Hilltop Panorama',
        gettingThere: 'West of Thamel, a 30-minute walk or a 10-minute taxi ride to the eastern stairways or Western driving gate.',
        etiquetteDo: [
          'Climb the 365 stone steps for traditional pilgrim entry',
          'Hold belongings securely to prevent curious monkeys from grabbing food'
        ],
        etiquetteDont: [
          'Do not feed or provoke the resident rhesus macaques',
          'Do not light fires near ancient wood structures'
        ]
      }
    ],
    treks: [
      {
        id: 'annapurna-circuit',
        name: 'Annapurna Circuit',
        difficulty: 'Expert',
        durationDays: 18,
        acapFeeUSD: 30,
        description: 'The classic circumambulation of the Annapurna massif, crossing the formidable Thorong La pass (5,416m). A true test of mountain endurance rewarded with Tibetan plateau high-desert landscapes.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAe0P79cKAxrJMR0Tpi6eVJIxsFpbSmEUaoZEcgJ3V-_FMQ2R6VHPGpXaNrMKVqnWYgI2Ke5MPa9VxmQq2MP_9XVYhTW8EJh63GG00_DMf8hNb3nMnr_fzUC3pkauH0hu0DdiKik7HdK_aQEmztBP8GV1CF_rGu9tDG2Sy4aYraBzmkvfWtBagH-PGcX7sG3BEVJLy8v5V9iwSn8xbznvWLItxqsJswxpWC1XGwqT7skqFw0GOkcrycZRQ51TRJXVeqWdvcj09tCc',
        region: 'Annapurna',
        tag: 'High Traffic',
        liveWeather: {
          location: 'Jomsom / Thorong La',
          tempC: 12,
          condition: 'Clear skies with afternoon ridge winds',
          windKmh: 15,
          humidityPct: 45,
          visibilityKm: 10
        }
      },
      {
        id: 'annapurna-base-camp',
        name: 'Annapurna Base Camp',
        difficulty: 'Strenuous',
        durationDays: 12,
        acapFeeUSD: 30,
        description: 'A legendary trek into the heart of the Annapurna sanctuary surrounded by 360-degree towering 7,000m+ Himalayan walls.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlWE9XTxdkfYbrSlaXwe_GTl-kGwSu4IhyKBOhoBsfeT0WHg4Wm9odLbLkQENqByLFKRb3TAXgyG2eWwTYwlwSUWt7csFJTgkTpiBRr3BFaUFYUjBGaRjtPl7CLGyRqkeIMeYGX_T7CFNC7aopn6ziIXLYJ4kwyGMwUVHetr9E58RFiY2qnd86I6XQlXH0Z1t7W1LGeflx0OZXkkoBkl2NAH8dr_62okNhwUbTNS8IL27t0FtNcxsjt_rnp8R2qANT6gJpe9PD04o',
        region: 'Annapurna',
        tag: 'Popular Classic'
      },
      {
        id: 'mardi-himal',
        name: 'Mardi Himal Trek',
        difficulty: 'Moderate',
        durationDays: 7,
        acapFeeUSD: 30,
        description: 'An off-the-beaten-path ridge trek offering close-up, dramatic views of Machapuchare (Fishtail). Less crowded, pristine rhododendron forests, and deeply rewarding.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrPsAfkzPw20rBTpg94bkCnyEYFxbaJhebsctYRGso8Ks99LA1G9csW8cBs0ys8JpxcRYPqjO9lm3_dF5nEuWqJc5vm_qaEn27N0y2y4Ugmv9WGsxnGn4UXho_gthQd4jLpoNagMz8Vq6uhvf3F0efUdXWwzaurr0kD05RL-ekqww820O4y8SR2V6gPl6Avz9zdxPsc8rht2IcWWLSGw-Eq6BrcYq3j2E2S4-4fSghVFn-_HIpCsHynrRnBo70ex66djy8xQjPsJs',
        region: 'Annapurna',
        tag: 'Hidden Gem'
      },
      {
        id: 'poon-hill',
        name: 'Poon Hill Sunrise Trek',
        difficulty: 'Moderate',
        durationDays: 5,
        acapFeeUSD: 30,
        description: 'Short Himalayan panorama trek famous for its sunrise viewpoint overlooking the Dhaulagiri and Annapurna mountain ranges in brilliant golden light.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLbd_gB7fQbUCu3PKGMMVLDCNDn3UqBxzwZZLWwW2NA-gn4WmbVG-wYEFV_tCqjI9lQaShK3I67mkUpFdMESuAKsGoEoarKX8CxGI7OvU8kNyXBf847Np9jDkm4xnQWADh5DF0lFNxT-O3qPk64e3h2CQrGCb_UaSENkup_d-zVZV6q-Wsl08VLIus2_KcnGEkay9urTfpIPbgvNozJjJ6UUMxcwvaILD2Eq-Z4W5aYj5pE8bj28giLHVg4nPBCWIAm2kuXBaF59k',
        region: 'Annapurna',
        tag: 'Recommended'
      }
    ],
    bookings: [
      {
        id: 'BK-8924',
        clientName: 'Sarah Jenkins Group',
        email: 'sarah.jenkins@example.com',
        phone: '+44 7700 900077',
        passportNumber: 'P193847562',
        nationality: 'United Kingdom',
        siteId: 'bhaktapur',
        siteName: 'Bhaktapur Durbar Square',
        visitDate: '2026-10-12',
        guests: 2,
        totalPriceUSD: 30,
        paymentMethod: 'Card',
        status: 'Confirmed',
        entryGate: 'Lion Gate (Main Entrance)',
        ticketType: 'Standard Adult (SAARC / Foreign)',
        commissionUSD: 4.5,
        operatorNotes: 'Primary guest requested morning English speaking guide at Lion Gate.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'BKG-8821',
        clientName: 'Elena Rostova',
        email: 'elena.rostova@example.org',
        phone: '+7 916 555 0192',
        passportNumber: 'N78941235',
        nationality: 'Spain',
        siteId: 'patan',
        siteName: 'Patan Durbar Square',
        visitDate: '2026-10-14',
        guests: 1,
        totalPriceUSD: 10,
        paymentMethod: 'eSewa',
        status: 'Confirmed',
        entryGate: 'Krishna Mandir Gate',
        ticketType: 'Foreign National',
        commissionUSD: 1.5,
        createdAt: new Date().toISOString()
      },
      {
        id: 'BKG-8822',
        clientName: 'Michael Chen',
        email: 'm.chen@example.com',
        siteId: 'boudhanath',
        siteName: 'Boudhanath Stupa',
        visitDate: '2026-10-15',
        guests: 2,
        totalPriceUSD: 8,
        paymentMethod: 'Khalti',
        status: 'Pending',
        commissionUSD: 1.2,
        createdAt: new Date().toISOString()
      },
      {
        id: 'BKG-9902-AC',
        clientName: 'Himalayan Ascents Trekkers',
        email: 'trek@himalayanascents.np',
        siteId: 'annapurna-circuit',
        siteName: 'Annapurna Circuit Expedition',
        visitDate: '2026-10-20',
        guests: 4,
        totalPriceUSD: 4800,
        paymentMethod: 'Card',
        status: 'Confirmed',
        entryGate: 'Besisahar Entry Post',
        ticketType: '14-Day Guided Trek',
        commissionUSD: 720,
        operatorNotes: 'ACAP & TIMS cards verified. Guide Pemba Sherpa assigned.',
        createdAt: new Date().toISOString()
      }
    ],
    operatorApplications: [
      {
        id: 'app_089',
        companyName: 'Everest High Treks',
        licenseNumber: '#NHT-2024-089',
        contactPerson: 'Pemba Sherpa',
        email: 'pemba@everesthightreks.np',
        phone: '+977 9841234567',
        officeAddress: 'Thamel-29, Kathmandu',
        documentName: 'everest_license_2024.pdf',
        status: 'Pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 'app_102',
        companyName: 'Heritage Walks Patan',
        licenseNumber: '#NHT-2024-102',
        contactPerson: 'Sita Maharjan',
        email: 'sita@heritagewalkspatan.np',
        phone: '+977 9801122334',
        officeAddress: 'Mangal Bazaar, Lalitpur',
        documentName: 'patan_walks_auth.pdf',
        status: 'Pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 'app_115',
        companyName: 'Mustang Mystique',
        licenseNumber: '#NHT-2024-115',
        contactPerson: 'Tenzin Gurung',
        email: 'tenzin@mustangmystique.np',
        phone: '+977 9856012345',
        officeAddress: 'Jomsom Bazar, Mustang',
        documentName: 'mustang_permit_doc.pdf',
        status: 'Pending',
        createdAt: new Date().toISOString()
      }
    ],
    activities: [
      {
        id: 'act_1',
        title: 'Patan Durbar Guided Tour',
        operator: 'Heritage Walks Nepal',
        status: 'Pending Payment',
        timeAgo: '2h ago',
        type: 'heritage'
      },
      {
        id: 'act_2',
        title: 'Langtang Valley Short Trek',
        operator: 'Yeti Adventures',
        status: 'Confirmed',
        timeAgo: '5h ago',
        type: 'trek'
      },
      {
        id: 'act_3',
        title: 'Bhaktapur Photography Walk',
        operator: 'Shutter Tours',
        status: 'Cancelled',
        timeAgo: '1d ago',
        type: 'alert'
      }
    ],
    hiddenGems: [
      {
        id: 'panauti',
        name: 'Panauti Historical Town',
        subtitle: 'Ancient Confluence & Newari Timber Craft',
        description: 'Nestled at the confluence of the Roshi and Punyamati rivers, Panauti features pristine wood-carved temples like Indreshwar Mahadev, remarkably preserved away from tourist crowds.',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
        location: 'Kavrepalanchok (2hrs from Kathmandu)',
        highlight: 'Community Homestays',
        status: 'Approved',
        createdAt: new Date().toISOString()
      },
      {
        id: 'changu-narayan',
        name: 'Changu Narayan Temple',
        subtitle: 'Nepal’s Oldest Inscribed Stone Pillar',
        description: 'Perched on a high ridge east of Kathmandu, Changu Narayan dates back to the 4th-century Licchavi dynasty and holds Nepal’s oldest verified stone inscription.',
        imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
        location: 'Bhaktapur Ridge',
        highlight: 'Licchavi Stone Sculptures',
        status: 'Approved',
        createdAt: new Date().toISOString()
      },
      {
        id: 'khokana',
        name: 'Khokana Heritage Village',
        subtitle: 'Living Museum of Mustard Oil Pressing',
        description: 'Famous for its traditional mustard oil extraction using massive wooden beam presses, Khokana maintains an unbroken agrarian Newari lifestyle.',
        imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=1200&auto=format&fit=crop',
        location: 'Lalitpur Valley',
        highlight: 'Traditional Oil Mills',
        status: 'Approved',
        createdAt: new Date().toISOString()
      },
      {
        id: 'tsum-valley',
        name: 'Tsum Valley Sacred Sanctuary',
        subtitle: 'The Hidden Valley of Happiness (Beyul)',
        description: 'A sacred Himalayan pilgrimage valley bordering Tibet where ancient Buddhist monasteries, mani walls, and non-violence traditions have been preserved for centuries.',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
        location: 'Manaslu Region',
        highlight: 'Sacred Non-Violence Valley',
        status: 'Approved',
        createdAt: new Date().toISOString()
      }
    ]
  };
}

class PersistentDB {
  private data: DBData;

  constructor() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        if (!this.data.hiddenGems || this.data.hiddenGems.length === 0) {
          const init = initData();
          this.data.hiddenGems = init.hiddenGems;
          this.save();
        }
      } catch {
        this.data = initData();
        this.save();
      }
    } else {
      this.data = initData();
      this.save();
    }
  }

  private save() {
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  // User methods
  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: 'usr_' + Date.now() + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  // Site & Trek methods
  getSites(): HeritageSite[] {
    return this.data.sites;
  }

  getSiteById(id: string): HeritageSite | undefined {
    return this.data.sites.find(s => s.id === id);
  }

  updateSite(id: string, update: Partial<HeritageSite>): HeritageSite | undefined {
    const site = this.getSiteById(id);
    if (!site) return undefined;
    Object.assign(site, update);
    this.save();
    return site;
  }

  createSite(siteData: Omit<HeritageSite, 'id'>): HeritageSite {
    const id = siteData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newSite: HeritageSite = { ...siteData, id };
    this.data.sites.push(newSite);
    this.save();
    return newSite;
  }

  getTreks(): TrekkingRoute[] {
    return this.data.treks;
  }

  getTrekById(id: string): TrekkingRoute | undefined {
    return this.data.treks.find(t => t.id === id);
  }

  // Booking methods
  getBookings(): Booking[] {
    return this.data.bookings;
  }

  getBookingById(id: string): Booking | undefined {
    return this.data.bookings.find(b => b.id === id);
  }

  createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const id = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.data.bookings.unshift(newBooking);

    // Also add to activity feed
    this.data.activities.unshift({
      id: 'act_' + Date.now(),
      title: `${newBooking.siteName} Visit`,
      operator: newBooking.clientName,
      status: newBooking.status === 'Confirmed' ? 'Confirmed' : 'Pending Payment',
      timeAgo: 'Just now',
      type: 'heritage'
    });

    this.save();
    return newBooking;
  }

  updateBookingNotes(id: string, notes: string): Booking | undefined {
    const booking = this.getBookingById(id);
    if (!booking) return undefined;
    booking.operatorNotes = notes;
    this.save();
    return booking;
  }

  updateBookingStatus(id: string, status: 'Confirmed' | 'Pending' | 'Cancelled'): Booking | undefined {
    const booking = this.getBookingById(id);
    if (!booking) return undefined;
    booking.status = status;
    this.save();
    return booking;
  }

  // Operator Applications
  getOperatorApplications(): OperatorApplication[] {
    return this.data.operatorApplications;
  }

  createOperatorApplication(appData: Omit<OperatorApplication, 'id' | 'status' | 'createdAt'>): OperatorApplication {
    const newApp: OperatorApplication = {
      ...appData,
      id: 'app_' + Math.floor(100 + Math.random() * 900),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    this.data.operatorApplications.unshift(newApp);
    this.save();
    return newApp;
  }

  updateOperatorApplicationStatus(id: string, status: 'Approved' | 'Rejected'): OperatorApplication | undefined {
    const app = this.data.operatorApplications.find(a => a.id === id);
    if (!app) return undefined;
    app.status = status;

    // If approved, create/promote operator user account
    if (status === 'Approved') {
      const existingUser = this.getUserByEmail(app.email);
      if (!existingUser) {
        const salt = bcrypt.genSaltSync(10);
        this.createUser({
          name: app.contactPerson,
          email: app.email,
          passwordHash: bcrypt.hashSync('operator123', salt),
          role: 'operator',
          companyName: app.companyName,
          licenseNumber: app.licenseNumber,
          phone: app.phone
        });
      }
    }

    this.save();
    return app;
  }

  // Activities & Metrics
  getActivities(): ActivityItem[] {
    return this.data.activities;
  }

  getDashboardMetrics() {
    const bookings = this.data.bookings;
    const pendingApps = this.data.operatorApplications.filter(a => a.status === 'Pending').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPriceUSD || 0), 0);
    const totalBookings = bookings.length;
    const totalCommission = bookings.reduce((sum, b) => sum + (b.commissionUSD || 0), 0);

    return {
      totalRevenueUSD: totalRevenue > 0 ? totalRevenue : 124500,
      totalBookingsCount: totalBookings > 0 ? totalBookings : 124,
      commissionEarnedUSD: totalCommission > 0 ? totalCommission : 4200,
      activeOperatorsCount: 1204,
      pendingApprovalsCount: pendingApps,
      activeClientGroups: 12
    };
  }

  // Hidden Gems
  getApprovedHiddenGems(): HiddenGem[] {
    return (this.data.hiddenGems || []).filter(g => g.status === 'Approved');
  }

  getAllHiddenGems(): HiddenGem[] {
    return this.data.hiddenGems || [];
  }

  createHiddenGem(gemData: Omit<HiddenGem, 'id' | 'status' | 'createdAt'>): HiddenGem {
    const id = 'gem_' + Date.now() + Math.random().toString(36).substring(2, 6);
    const newGem: HiddenGem = {
      ...gemData,
      id,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    if (!this.data.hiddenGems) this.data.hiddenGems = [];
    this.data.hiddenGems.unshift(newGem);
    this.save();
    return newGem;
  }

  updateHiddenGemStatus(id: string, status: 'Approved' | 'Rejected'): HiddenGem | undefined {
    if (!this.data.hiddenGems) return undefined;
    const gem = this.data.hiddenGems.find(g => g.id === id);
    if (!gem) return undefined;
    gem.status = status;
    this.save();
    return gem;
  }
}

export const db = new PersistentDB();
