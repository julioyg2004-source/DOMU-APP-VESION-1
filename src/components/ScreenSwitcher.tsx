import React, { useState } from 'react';
import { ScreenType } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenType; label: string; badge: string; icon: string }[] = [
    { id: 'splash', label: '1. Splash Bienvenida', badge: 'M1', icon: 'auto_awesome' },
    { id: 'auth', label: '2. Login & Registro', badge: 'M2', icon: 'key' },
    { id: 'services', label: '3. Servicios (Home)', badge: 'M4', icon: 'home' },
    { id: 'quote', label: '4. Cotización & Video', badge: 'M5-M6', icon: 'videocam' },
    { id: 'offers', label: '5. Ofertas en Vivo', badge: 'M7', icon: 'radar' },
    { id: 'tracking', label: '6. Código & Tracking', badge: 'M8-M9', icon: 'pin' },
    { id: 'history', label: '7. Historial', badge: 'M10', icon: 'receipt_long' },
    { id: 'profile', label: '8. Perfil & KYC', badge: 'M12', icon: 'person' },
  ];

  const currentItem = screens.find((s) => s.id === currentScreen) || screens[2];

  return (
    <aside aria-label="Selector de pantallas de demostración" className="fixed top-2 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center">
      {/* Mini Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 rounded-full bg-[#081317]/90 text-[#d2e6ee] border border-[#11DDB5]/30 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs font-semibold hover:border-[#11DDB5] transition-all hover:scale-105 active:scale-95"
      >
        <span className="w-2 h-2 rounded-full bg-[#11DDB5] animate-pulse"></span>
        <span className="text-[#8EA6AC]">Vista:</span>
        <span className="text-[#F2F7F7]">{currentItem.badge} - {currentItem.label.split('.')[1]}</span>
        <span className="material-symbols-outlined text-[16px] text-[#11DDB5]">
          {isOpen ? 'expand_less' : 'tune'}
        </span>
      </button>

      {/* Expanded Screen List Drawer */}
      {isOpen && (
        <div className="mt-2 w-[340px] max-h-[75vh] overflow-y-auto rounded-2xl bg-[#102B33]/95 border border-[#11DDB5]/30 p-2.5 shadow-2xl backdrop-blur-2xl flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between px-2 py-1 border-b border-[#1b2c33] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#11DDB5]">
              Explorador de Pantallas DOMU
            </span>
            <span className="text-[10px] text-[#8EA6AC]">8 pantallas interactivas</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {screens.map((item) => {
              const isSelected = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-[#11DDB5] text-[#081317] font-bold shadow-md'
                      : 'hover:bg-[#173B46] text-[#d2e6ee]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[18px]">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                      isSelected
                        ? 'bg-[#081317] text-[#11DDB5]'
                        : 'bg-[#173B46] text-[#8EA6AC]'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-1 pt-1.5 border-t border-[#1b2c33] text-center">
            <span className="text-[10px] text-[#8EA6AC]">
              💡 Puedes usar este menú o navegar de forma natural con los botones y la barra inferior.
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
