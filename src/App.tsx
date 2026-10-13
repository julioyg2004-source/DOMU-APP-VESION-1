import { useState } from 'react';
import { ScreenType, ProviderOffer } from './types';
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

export default function App() {
  // Default to 'services' (or 'splash' for demo flow, let's start with 'services' while switcher allows quick jumping, or user can start with splash)
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('services');

  // Modals state
  const [showChatModal, setShowChatModal] = useState(false);
  const [showVoipModal, setShowVoipModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Navigation handlers
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = () => {
    setCurrentScreen('quote');
  };

  const handleLaunchQuote = () => {
    setCurrentScreen('offers');
  };

  const handleAcceptOffer = (_offer: ProviderOffer) => {
    setCurrentScreen('tracking');
  };

  const handleScheduleFavorite = (_techName: string) => {
    setCurrentScreen('quote');
  };

  return (
    <div className="min-h-screen bg-[#04161b] text-[#d2e6ee] font-sans relative selection:bg-[#11DDB5] selection:text-[#081317]">
      {/* Dev / Preview Screen Switcher */}
      <ScreenSwitcher currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Persistent App Header (except on Splash) */}
      {currentScreen !== 'splash' && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onTriggerSos={() => setShowSosModal(true)}
        />
      )}

      {/* Main Screen Router */}
      <main className="min-h-screen w-full flex flex-col">
        {currentScreen === 'splash' && (
          <SplashScreen onContinue={(nextScreen) => handleNavigate(nextScreen)} />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onSuccess={() => handleNavigate('services')}
            onBack={() => handleNavigate('services')}
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
            onLaunchRequest={handleLaunchQuote}
            onBack={() => handleNavigate('services')}
          />
        )}

        {currentScreen === 'offers' && (
          <OffersScreen
            onAcceptOffer={handleAcceptOffer}
            onBack={() => handleNavigate('quote')}
          />
        )}

        {currentScreen === 'tracking' && (
          <TrackingScreen
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
            onOpenBiometrics={() => setShowBiometricModal(true)}
            onOpenSupport={() => setShowSupportModal(true)}
          />
        )}
      </main>

      {/* Persistent Floating Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenSupport={() => setShowSupportModal(true)}
      />

      {/* Interactive Modals */}
      {showChatModal && <ChatModal onClose={() => setShowChatModal(false)} />}
      {showVoipModal && <VoipModal onClose={() => setShowVoipModal(false)} />}
      {showSosModal && <SosModal onClose={() => setShowSosModal(false)} />}
      {showBiometricModal && <BiometricModal onClose={() => setShowBiometricModal(false)} />}
      {showSupportModal && <SupportModal onClose={() => setShowSupportModal(false)} />}
    </div>
  );
}
