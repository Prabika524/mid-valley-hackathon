import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { SearchModal } from './components/SearchModal';
import { AdminSidebar } from './components/AdminSidebar';

// Pages
import { HomePage } from './pages/HomePage';
import { SitesPage } from './pages/SitesPage';
import { SiteDetailPage } from './pages/SiteDetailPage';
import { TrekkingPage } from './pages/TrekkingPage';
import { HiddenGemsPage } from './pages/HiddenGemsPage';
import { CalendarPage } from './pages/CalendarPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Admin / Operator Pages
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminBookingsPage } from './pages/AdminBookingsPage';
import { AdminBookingDetailPage } from './pages/AdminBookingDetailPage';
import { AdminApprovalsPage } from './pages/AdminApprovalsPage';
import { AdminContentPage } from './pages/AdminContentPage';

import { HeritageSite, TrekkingRoute, Booking } from './types';
import { api } from './services/api';

function MainLayout() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'bookings' | 'approvals' | 'content' | 'booking-detail'>('dashboard');

  // Selected entities
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [selectedAdminBooking, setSelectedAdminBooking] = useState<Booking | null>(null);

  // Global State for Search and Currency
  const [currency, setCurrency] = useState<'USD' | 'NPR'>('USD');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [treks, setTreks] = useState<TrekkingRoute[]>([]);

  // Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalSite, setBookingModalSite] = useState<HeritageSite | null>(null);

  useEffect(() => {
    async function loadSearchData() {
      try {
        const [sitesData, treksData] = await Promise.all([
          api.getSites(),
          api.getTreks(),
        ]);
        setSites(sitesData);
        setTreks(treksData);
      } catch (err) {
        console.error('Failed to load search data:', err);
      }
    }
    loadSearchData();
  }, []);

  // Global keyboard shortcut for search (Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'NPR' : 'USD'));
  };

  const handleOpenBooking = (site: HeritageSite) => {
    setBookingModalSite(site);
    setIsBookingModalOpen(true);
  };

  const handleProceedToCheckout = (booking: Booking) => {
    setCurrentBooking(booking);
    setActiveTab('checkout');
  };

  const handleSelectSiteDetail = (site: HeritageSite) => {
    setSelectedSite(site);
    setActiveTab('site-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAdminBooking = (booking: Booking) => {
    setSelectedAdminBooking(booking);
    setAdminTab('booking-detail');
  };

  // If user is viewing Operator Portal
  const isOperatorPortal = activeTab === 'admin' && user && (user.role === 'admin' || user.role === 'operator');

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100 font-sans-body relative">
      <div className="mesh-bg" />
      {!isOperatorPortal && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          openBookingModal={() => {
            if (sites.length > 0) {
              handleOpenBooking(sites[0]); // Changu Narayan pilot site by default
            }
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          currency={currency}
          toggleCurrency={toggleCurrency}
        />
      )}

      {isOperatorPortal ? (
        <div className="flex-1 flex flex-col md:flex-row min-h-screen relative z-10">
          <AdminSidebar
            adminTab={adminTab}
            setAdminTab={(tab) => {
              setAdminTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            setActiveTab={setActiveTab}
            onAddNewListing={() => {
              setAdminTab('content');
            }}
          />

          <main className="flex-1 overflow-y-auto bg-transparent relative z-10">
            {adminTab === 'dashboard' && (
              <AdminDashboardPage
                setAdminTab={setAdminTab}
                onSelectBooking={handleSelectAdminBooking}
              />
            )}

            {adminTab === 'bookings' && (
              <AdminBookingsPage onSelectBooking={handleSelectAdminBooking} />
            )}

            {adminTab === 'booking-detail' && selectedAdminBooking && (
              <AdminBookingDetailPage
                booking={selectedAdminBooking}
                onBack={() => setAdminTab('bookings')}
                onUpdateBooking={(updated) => setSelectedAdminBooking(updated)}
              />
            )}

            {adminTab === 'approvals' && <AdminApprovalsPage />}

            {adminTab === 'content' && <AdminContentPage />}
          </main>
        </div>
      ) : (
        <main className="flex-1 relative z-10">
          {activeTab === 'home' && (
            <HomePage
              setActiveTab={setActiveTab}
              onSelectSite={handleSelectSiteDetail}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {activeTab === 'sites' && (
            <SitesPage
              onSelectSite={handleSelectSiteDetail}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {activeTab === 'site-detail' && selectedSite && (
            <SiteDetailPage
              site={selectedSite}
              onBack={() => setActiveTab('sites')}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {activeTab === 'trekking' && <TrekkingPage setActiveTab={setActiveTab} />}

          {activeTab === 'gems' && <HiddenGemsPage />}

          {activeTab === 'calendar' && <CalendarPage />}

          {activeTab === 'checkout' && (
            <CheckoutPage
              booking={currentBooking}
              onBackToHome={() => setActiveTab('sites')}
            />
          )}

          {activeTab === 'login' && (
            <LoginPage
              setActiveTab={setActiveTab}
              onLoginSuccess={() => setActiveTab('admin')}
            />
          )}

          {activeTab === 'register' && (
            <RegisterPage setActiveTab={setActiveTab} />
          )}
        </main>
      )}

      {!isOperatorPortal && <Footer setActiveTab={setActiveTab} />}

      {/* Global Booking Slide-over Drawer */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        site={bookingModalSite}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Global Command & Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        sites={sites}
        treks={treks}
        onSelectSite={handleSelectSiteDetail}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currency={currency}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

export default App;
