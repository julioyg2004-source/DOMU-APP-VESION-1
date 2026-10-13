import React from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onTriggerSos: () => void;
  locationName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onTriggerSos,
  locationName = 'Calle Las Palmeras 38...',
}) => {
  // Screens with dedicated back-button headers
  const isDetailScreen = ['quote', 'offers', 'tracking', 'auth'].includes(currentScreen);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'quote':
        return 'Cotización De Servicio';
      case 'offers':
        return 'Ofertas De Proveedores';
      case 'tracking':
        return 'Validación Y Código De Seguridad';
      case 'auth':
        return 'Inicio De Sesión';
      default:
        return 'DOMU';
    }
  };

  const handleBack = () => {
    if (currentScreen === 'quote') onNavigate('services');
    else if (currentScreen === 'offers') onNavigate('quote');
    else if (currentScreen === 'tracking') onNavigate('offers');
    else if (currentScreen === 'auth') onNavigate('services');
    else onNavigate('services');
  };

  if (isDetailScreen) {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-[#102B33]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.35)] pt-safe">
        <div className="h-16 px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              aria-label="Volver"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#173B46]/70 text-[#F2F7F7] hover:text-[#11DDB5] transition-colors active:scale-95"
              onClick={handleBack}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>

            {/* Logo icon */}
            <div
              className="hidden sm:flex items-center gap-1 cursor-pointer"
              onClick={() => onNavigate('services')}
            >
              <div className="w-7 h-7 rounded-lg bg-[#11DDB5]/20 flex items-center justify-center text-[#11DDB5]">
                <span className="material-symbols-outlined text-[18px]">home</span>
              </div>
            </div>

            <h1 className="font-semibold text-[17px] text-[#F2F7F7] truncate tracking-tight">
              {getScreenTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onTriggerSos}
              title="Emergencia SOS"
              className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#173B46]/90 text-[#FF4D4D] shadow-[0_0_12px_rgba(255,77,77,0.25)] hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">emergency</span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D4D]"></span>
              </span>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              aria-label="Perfil de usuario"
              className="relative w-8 h-8 rounded-full bg-[#173B46] p-0.5 flex items-center justify-center focus:outline-none"
            >
              <img
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ABF244] shadow-[0_0_6px_rgba(171,242,68,0.8)] border border-[#04161b]"></span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Main Header for Home (Services), Historial, and Usuario
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#102B33]/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.35)] pt-safe">
      <div className="h-16 px-4 flex items-center justify-between gap-3">
        {/* Left: Brand or Location */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('services')}
          >
            {/* DOMU Stylized Icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#11DDB5]/20 to-[#ABF244]/20 border border-[#11DDB5]/30 flex items-center justify-center text-[#11DDB5] shadow-[0_0_15px_rgba(17,221,181,0.2)]">
              <span className="material-symbols-outlined text-[20px] text-[#11DDB5]">home_work</span>
            </div>
            <div className="flex flex-col min-w-0 justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[18px] text-[#F2F7F7] tracking-tight">DOMU</span>
                <span className="w-2 h-2 rounded-full bg-[#11DDB5] animate-pulse shadow-[0_0_8px_#11DDB5]"></span>
              </div>
              {currentScreen === 'services' ? (
                <div className="flex items-center gap-1 text-[11px] text-[#8EA6AC] hover:text-[#11DDB5] transition-colors cursor-pointer truncate max-w-[150px]">
                  <span className="material-symbols-outlined text-[13px] text-[#11DDB5]">location_on</span>
                  <span className="truncate">{locationName}</span>
                  <span className="material-symbols-outlined text-[13px]">expand_more</span>
                </div>
              ) : (
                <span className="text-[11px] text-[#8EA6AC] font-medium uppercase tracking-wider">
                  {currentScreen === 'history' ? 'Historial de Servicios' : 'Mi Perfil Seguro'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Emergency SOS Button */}
          <button
            onClick={onTriggerSos}
            aria-label="Emergencia SOS"
            title="Emergencia SOS (M15)"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#173B46]/90 text-[#FF4D4D] shadow-[0_0_12px_rgba(255,77,77,0.25)] hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">emergency</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4D4D]"></span>
            </span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => onNavigate('profile')}
            aria-label="Perfil de usuario"
            className="relative w-9 h-9 p-0.5 rounded-full bg-[#173B46] flex items-center justify-center focus:outline-none hover:ring-2 hover:ring-[#11DDB5]/40 transition-all active:scale-95"
          >
            <img
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ABF244] shadow-[0_0_6px_rgba(171,242,68,0.8)] border border-[#04161b]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
