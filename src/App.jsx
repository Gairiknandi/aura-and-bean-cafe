import React, { useState, useEffect, useCallback } from 'react';
import { getLiveHoursStatus } from './data/hoursData';

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

// Modals
import ReservationReceiptModal from './components/modals/ReservationReceiptModal';
import EventInquiryModal from './components/modals/EventInquiryModal';
import PdfPreviewModal from './components/modals/PdfPreviewModal';

export default function App() {
  // Current view routing
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '');
    const validViews = ['home', 'menu', 'reservations', 'events', 'location'];
    return validViews.includes(hash) ? hash : 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [liveHours, setLiveHours] = useState(getLiveHoursStatus);
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
      const validViews = ['home', 'menu', 'reservations', 'events', 'location'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  return (
    <div className="app-root">
      {/* Top Announcement Bar */}
      <AnnouncementBar onNavigate={navigate} />

      {/* Sticky Site Header */}
      <Header currentView={currentView} onNavigate={navigate} liveHours={liveHours} />

      {/* MAIN VIEW CONTAINER */}
      <main id="mainContent">
        {currentView === 'home' && <HomeView onNavigate={navigate} liveHours={liveHours} />}
        {currentView === 'menu' && (
          <MenuView onNavigate={navigate} onOpenPdfModal={() => setPdfPreviewModalOpen(true)} />
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
      </main>

      {/* Site-Wide Footer */}
      <Footer onNavigate={navigate} showToast={showToast} liveHours={liveHours} />

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
