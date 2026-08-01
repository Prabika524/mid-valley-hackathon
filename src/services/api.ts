import { User, HeritageSite, TrekkingRoute, Booking, OperatorApplication, DashboardStats, HiddenGem } from '../types';

const API_BASE = '/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('nh_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async register(userData: { name: string; email: string; password: string; role?: string; companyName?: string; licenseNumber?: string; phone?: string }): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  async applyOperator(appData: {
    companyName: string;
    licenseNumber: string;
    contactPerson: string;
    email: string;
    phone: string;
    officeAddress: string;
    documentName?: string;
  }): Promise<{ message: string; application: OperatorApplication }> {
    const res = await fetch(`${API_BASE}/auth/apply-operator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Application submission failed');
    return data;
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('nh_token');
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  // Sites & Treks
  async getSites(): Promise<HeritageSite[]> {
    const res = await fetch(`${API_BASE}/sites`);
    if (!res.ok) throw new Error('Failed to fetch sites');
    return res.json();
  },

  async getSiteById(id: string): Promise<HeritageSite> {
    const res = await fetch(`${API_BASE}/sites/${id}`);
    if (!res.ok) throw new Error('Site not found');
    return res.json();
  },

  async createSite(siteData: Partial<HeritageSite>): Promise<HeritageSite> {
    const res = await fetch(`${API_BASE}/sites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(siteData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create site');
    return data;
  },

  async updateSite(id: string, siteData: Partial<HeritageSite>): Promise<HeritageSite> {
    const res = await fetch(`${API_BASE}/sites/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(siteData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update site');
    return data;
  },

  async getTreks(): Promise<TrekkingRoute[]> {
    const res = await fetch(`${API_BASE}/treks`);
    if (!res.ok) throw new Error('Failed to fetch trekking routes');
    return res.json();
  },

  async getTrekById(id: string): Promise<TrekkingRoute> {
    const res = await fetch(`${API_BASE}/treks/${id}`);
    if (!res.ok) throw new Error('Trek not found');
    return res.json();
  },

  // Bookings
  async getBookings(params?: { site?: string; status?: string; date?: string }): Promise<Booking[]> {
    const query = new URLSearchParams();
    if (params?.site) query.append('site', params.site);
    if (params?.status) query.append('status', params.status);
    if (params?.date) query.append('date', params.date);

    const res = await fetch(`${API_BASE}/bookings?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  async getBookingById(id: string): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings/${id}`);
    if (!res.ok) throw new Error('Booking not found');
    return res.json();
  },

  async createBooking(bookingData: {
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
  }): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create booking');
    return data;
  },

  async updateBookingNotes(id: string, notes: string): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings/${id}/notes`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ notes }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update notes');
    return data;
  },

  async updateBookingStatus(id: string, status: 'Confirmed' | 'Pending' | 'Cancelled'): Promise<Booking> {
    const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update booking status');
    return data;
  },

  // Operator Applications & Stats
  async getOperatorApplications(): Promise<OperatorApplication[]> {
    const res = await fetch(`${API_BASE}/operators/applications`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch operator applications');
    return res.json();
  },

  async updateOperatorApplicationStatus(id: string, status: 'Approved' | 'Rejected'): Promise<{ message: string; application: OperatorApplication }> {
    const res = await fetch(`${API_BASE}/operators/applications/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update status');
    return data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/operators/dashboard-stats`);
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return res.json();
  },

  // Hidden Gems
  async getHiddenGems(): Promise<HiddenGem[]> {
    const res = await fetch(`${API_BASE}/gems`);
    if (!res.ok) throw new Error('Failed to fetch hidden gems');
    return res.json();
  },

  async getAllHiddenGems(): Promise<HiddenGem[]> {
    const res = await fetch(`${API_BASE}/gems/admin`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch hidden gems for admin');
    return res.json();
  },

  async submitHiddenGem(gemData: {
    name: string;
    subtitle?: string;
    description: string;
    location: string;
    highlight?: string;
    imageUrl?: string;
    submittedBy?: string;
    contactEmail?: string;
  }): Promise<{ message: string; gem: HiddenGem }> {
    const res = await fetch(`${API_BASE}/gems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gemData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit hidden gem');
    return data;
  },

  async updateHiddenGemStatus(id: string, status: 'Approved' | 'Rejected'): Promise<{ message: string; gem: HiddenGem }> {
    const res = await fetch(`${API_BASE}/gems/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update gem status');
    return data;
  },
};
