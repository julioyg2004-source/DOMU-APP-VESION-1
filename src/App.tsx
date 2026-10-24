import { useState, useEffect, useCallback } from 'react';
import { ScreenType, ProviderOffer, SessionUser, QuoteRequest } from './types';
import { SERVICE_CATEGORIES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { QuoteScreen } from './components/QuoteScreen';
import { OffersScreen } from './components/OffersScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import {
  ChatModal,
  VoipModal,
  SosModal,
  BiometricModal,
  SupportModal,
} from './components/Modals';

const SESSION_KEY = 'domu_session_user';

function loadSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

function saveSession(user: SessionUser | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export default function App() {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(() => loadSession());
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() =>
    loadSession() ? 'services' : 'splash'
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest | null>(null);
  const [acceptedOffer, setAcceptedOffer] = useState<ProviderOffer | null>(null);

  const [showChatModal, setShowChatModal] = useState(false);
  const [showVoipModal, setShowVoipModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    saveSession(sessionUser);
  }, [sessionUser]);

  const handleNavigate = useCallback(
    (screen: ScreenType) => {
      const needsAuth = ['services', 'history', 'profile', 'quote', 'offers', 'tracking'].includes(
        screen
      );
      if (needsAuth && !sessionUser) {
        setCurrentScreen('auth');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [sessionUser]
  );

  const handleAuthSuccess = useCallback((user: SessionUser) => {
    setSessionUser(user);
    setCurrentScreen('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogout = useCallback(() => {
    setSessionUser(null);
    saveSession(null);
    setSelectedCategoryId(null);
    setQuoteRequest(null);
    setAcceptedOffer(null);
    setCurrentScreen('auth');
  }, []);

  const handleSelectCategory = useCallback((serviceId: string) => {
    if (serviceId === 'mas-opciones') return;
    setSelectedCategoryId(serviceId);
    setQuoteRequest(null);
    setAcceptedOffer(null);
    setCurrentScreen('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLaunchQuote = useCallback(
    (data: { price: number; mode: string; payment: string }) => {
      const cat =
        SERVICE_CATEGORIES.find((c) => c.id === selectedCategoryId) || SERVICE_CATEGORIES[0];
      setQuoteRequest({
        categoryId: cat.id,
        categoryName: cat.name,
        categoryIcon: cat.icon,
        price: data.price,
        mode: data.mode,
        payment: data.payment,
      });
      setAcceptedOffer(null);
      setCurrentScreen('offers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [selectedCategoryId]
  );

  const handleAcceptOffer = useCallback((offer: ProviderOffer) => {
    setAcceptedOffer(offer);
    setCurrentScreen('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleScheduleFavorite = useCallback((_techName: string) => {
    setCurrentScreen('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedCategory =
    SERVICE_CATEGORIES.find((c) => c.id === selectedCategoryId) || null;

  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-[#04161b] text-[#d2e6ee] font-sans relative selection:bg-[#11DDB5] selection:text-[#081317]">
      {isDev && (
        <ScreenSwitcher currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {currentScreen !== 'splash' && currentScreen !== 'auth' && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onTriggerSos={() => setShowSosModal(true)}
        />
      )}

      <main className="min-h-screen w-full flex flex-col">
        {currentScreen === 'splash' && (
          <SplashScreen
            onContinue={() => {
              handleNavigate(sessionUser ? 'services' : 'auth');
            }}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onSuccess={handleAuthSuccess}
            onBack={() => handleNavigate(sessionUser ? 'services' : 'splash')}
          />
        )}

        {currentScreen === 'services' && (
          <HomeScreen
            onSelectService={handleSelectCategory}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'quote' && (
          <QuoteScreen
            category={selectedCategory}
            onLaunchRequest={handleLaunchQuote}
            onBack={() => handleNavigate('services')}
          />
        )}

        {currentScreen === 'offers' && (
          <OffersScreen
            quoteRequest={quoteRequest}
            onAcceptOffer={handleAcceptOffer}
            onBack={() => handleNavigate('quote')}
          />
        )}

        {currentScreen === 'tracking' && (
          <TrackingScreen
            acceptedOffer={acceptedOffer}
            quoteRequest={quoteRequest}
            onOpenChat={() => setShowChatModal(true)}
            onOpenVoip={() => setShowVoipModal(true)}
            onOpenSupport={() => setShowSupportModal(true)}
            onTriggerSos={() => setShowSosModal(true)}
            onBack={() => handleNavigate('offers')}
          />
        )}

        {currentScreen === 'history' && (
          <HistoryScreen
            onOpenChat={() => setShowChatModal(true)}
            onOpenSupport={() => setShowSupportModal(true)}
            onScheduleFavorite={handleScheduleFavorite}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            sessionUser={sessionUser}
            onOpenBiometrics={() => setShowBiometricModal(true)}
            onOpenSupport={() => setShowSupportModal(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenSupport={() => setShowSupportModal(true)}
      />

      {showChatModal && <ChatModal onClose={() => setShowChatModal(false)} />}
      {showVoipModal && <VoipModal onClose={() => setShowVoipModal(false)} />}
      {showSosModal && <SosModal onClose={() => setShowSosModal(false)} />}
      {showBiometricModal && <BiometricModal onClose={() => setShowBiometricModal(false)} />}
      {showSupportModal && <SupportModal onClose={() => setShowSupportModal(false)} />}
    </div>
  );
}
