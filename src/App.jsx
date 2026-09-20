import React, { useState, useEffect, useCallback } from 'react';
import { getLiveHoursStatus } from './data/hoursData';
import { MENU_ITEMS } from './data/menuData';
import { TESTIMONIALS } from './data/testimonialsData';

// Layout & Global Components
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ToastContainer from './components/common/ToastContainer';
import ScrollToTop from './components/common/ScrollToTop';

// Page Views
import HomeView from './components/pages/HomeView';
import MenuView from './components/pages/MenuView';
import ReservationsView from './components/pages/ReservationsView';
import EventsView from './components/pages/EventsView';
import LocationView from './components/pages/LocationView';
import AdminDashboard from './components/admin/AdminDashboard';

// Modals
import ReservationReceiptModal from './components/modals/ReservationReceiptModal';
import EventInquiryModal from './components/modals/EventInquiryModal';
import PdfPreviewModal from './components/modals/PdfPreviewModal';

export default function App() {
  // Current view routing
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '');
    const validViews = ['home', 'menu', 'reservations', 'events', 'location', 'admin'];
    return validViews.includes(hash) ? hash : 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [liveHours, setLiveHours] = useState(getLiveHoursStatus);
  const [customMenuItems, setCustomMenuItems] = useState([]);
  const [customTestimonials, setCustomTestimonials] = useState([]);
  const [customAnnouncement, setCustomAnnouncement] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [eventInquiryModalOpen, setEventInquiryModalOpen] = useState(false);
  const [eventTicketCode, setEventTicketCode] = useState('');
  const [pdfPreviewModalOpen, setPdfPreviewModalOpen] = useState(false);

  // Sync hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'menu', 'reservations', 'events', 'location', 'admin'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch dynamic data from PostgreSQL API
  const fetchDynamicData = useCallback(async () => {
    try {
      // Menu Items
      const menuRes = await fetch('/api/menu');
      if (menuRes.ok) {
        const dbItems = await menuRes.json();
        if (Array.isArray(dbItems) && dbItems.length > 0) {
          const mapped = dbItems.map((item) => {
            const catLower = (item.category || '').toLowerCase();
            let categorySlug = 'coffee';
            if (catLower.includes('tea')) categorySlug = 'tea';
            else if (catLower.includes('pastr') || catLower.includes('bake')) categorySlug = 'pastry';
            else if (catLower.includes('savor') || catLower.includes('brunch')) categorySlug = 'savory';
            else if (catLower.includes('dessert')) categorySlug = 'dessert';

            const dietary = [];
            if (item.is_vegan) dietary.push('v');
            if (item.is_gf) dietary.push('gf');
            if (item.is_dairy_free || item.is_organic) dietary.push('vg');

            return {
              id: item.id.toString(),
              title: item.name,
              category: categorySlug,
              price: `₹${parseFloat(item.price)}`,
              numericPrice: parseFloat(item.price) || 0,
              description: item.description,
              dietary,
              image: item.image,
              featured: !!item.badge,
              tag: item.badge || '',
              is_available: item.is_available !== false
            };
          });
          setCustomMenuItems(mapped);
        }
      }
    } catch (err) {
      console.warn('Could not load menu from API, using fallback data:', err);
    }

    try {
      // Reviews / Testimonials
      const revRes = await fetch('/api/testimonials');
      if (revRes.ok) {
        const dbReviews = await revRes.json();
        if (Array.isArray(dbReviews) && dbReviews.length > 0) {
          const mappedReviews = dbReviews.map((r) => ({
            name: r.name,
            title: r.role || 'Cafe Guest',
            avatar: r.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            stars: '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5)),
            quote: r.quote
          }));
          setCustomTestimonials(mappedReviews);
        }
      }
    } catch (err) {
      console.warn('Could not load testimonials from API, using fallback:', err);
    }

    try {
      // Store Settings
      const settingsRes = await fetch('/api/settings');
      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        if (settings.announcement_banner) {
          try {
            setCustomAnnouncement(JSON.parse(settings.announcement_banner.value));
          } catch (e) {
            setCustomAnnouncement({ text: settings.announcement_banner.value, enabled: true });
          }
        }
        if (settings.store_status) {
          const mode = settings.store_status.value;
          setLiveHours((prev) => {
            if (mode === 'force_open') {
              return { ...prev, isOpen: true, headerText: 'Open Now (Special)', bannerText: 'Open Now • Welcome In' };
            } else if (mode === 'force_closed') {
              return { ...prev, isOpen: false, headerText: 'Temporarily Closed', bannerText: 'Closed Today' };
            } else {
              return getLiveHoursStatus();
            }
          });
        }
      }
    } catch (err) {
      console.warn('Could not load settings from API:', err);
    }
  }, []);

  useEffect(() => {
    fetchDynamicData();
  }, [fetchDynamicData]);

  // Update live hours every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveHours(getLiveHoursStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Global Escape key to dismiss modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setReservationModalOpen(false);
        setEventInquiryModalOpen(false);
        setPdfPreviewModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handler
  const navigate = useCallback((view) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Toast notification dispatcher
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const isAdminView = currentView === 'admin';

  return (
    <div className="app-root">
      {/* Top Announcement Bar */}
      {!isAdminView && (
        <AnnouncementBar onNavigate={navigate} customAnnouncement={customAnnouncement} />
      )}

      {/* Sticky Site Header */}
      {!isAdminView && (
        <Header currentView={currentView} onNavigate={navigate} liveHours={liveHours} />
      )}

      {/* MAIN VIEW CONTAINER */}
      <main id="mainContent">
        {currentView === 'home' && (
          <HomeView
            onNavigate={navigate}
            liveHours={liveHours}
            customMenuItems={customMenuItems}
            customTestimonials={customTestimonials}
          />
        )}
        {currentView === 'menu' && (
          <MenuView
            onNavigate={navigate}
            onOpenPdfModal={() => setPdfPreviewModalOpen(true)}
            customMenuItems={customMenuItems}
          />
        )}
        {currentView === 'reservations' && (
          <ReservationsView
            onNavigate={navigate}
            onReservationConfirmed={(details) => {
              setReservationDetails(details);
              setReservationModalOpen(true);
            }}
            showToast={showToast}
          />
        )}
        {currentView === 'events' && (
          <EventsView
            onInquirySubmitted={(ticketId) => {
              setEventTicketCode(ticketId);
              setEventInquiryModalOpen(true);
            }}
            showToast={showToast}
          />
        )}
        {currentView === 'location' && <LocationView liveHours={liveHours} />}
        {currentView === 'admin' && <AdminDashboard onNavigate={navigate} />}
      </main>

      {/* Site-Wide Footer */}
      {!isAdminView && (
        <Footer onNavigate={navigate} showToast={showToast} liveHours={liveHours} />
      )}

      {/* Modals */}
      <ReservationReceiptModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        details={reservationDetails}
        showToast={showToast}
      />

      <EventInquiryModal
        isOpen={eventInquiryModalOpen}
        onClose={() => setEventInquiryModalOpen(false)}
        ticketCode={eventTicketCode}
      />

      <PdfPreviewModal
        isOpen={pdfPreviewModalOpen}
        onClose={() => setPdfPreviewModalOpen(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
