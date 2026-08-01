export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'user';
  companyName?: string;
  licenseNumber?: string;
  phone?: string;
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

export interface ActivityItem {
  id: string;
  title: string;
  operator: string;
  status: 'Confirmed' | 'Pending Payment' | 'Cancelled';
  timeAgo: string;
  type: 'heritage' | 'trek' | 'alert';
}

export interface DashboardStats {
  metrics: {
    totalRevenueUSD: number;
    totalBookingsCount: number;
    commissionEarnedUSD: number;
    activeOperatorsCount: number;
    pendingApprovalsCount: number;
    activeClientGroups: number;
  };
  activities: ActivityItem[];
  recentBookings: Booking[];
}
