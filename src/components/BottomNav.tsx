import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenSupport: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenSupport,
}) => {
  // Hide bottom nav on splash or auth
  if (['splash', 'auth'].includes(currentScreen)) {
    return null;
  }

  const navItems: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'services', label: 'Servicios', icon: 'home_repair_service' },
    { id: 'history', label: 'Historial', icon: 'receipt_long' },
    { id: 'profile', label: 'Usuario', icon: 'person' },
    { id: 'support', label: 'Soporte', icon: 'chat_bubble' },
  ];

  return (
    <>
      {/* Floating Instant Support Quick Action Button */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-2 pointer-events-none">
        <button
          onClick={onOpenSupport}
          aria-label="Soporte instantáneo"
          title="Soporte y Mediación DOMU"
          className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-[#173B46]/95 text-[#11DDB5] backdrop-blur-xl shadow-[0_8px_24px_rgba(17,221,185,0.25)] hover:scale-105 active:scale-95 transition-transform border border-[#11DDB5]/20 group"
        >
          <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform">
            support_agent
          </span>
        </button>
      </div>

      {/* Floating Liquid Navigation Pill */}
      <nav className="fixed bottom-3 inset-x-4 z-50 pb-safe">
        <div className="mx-auto max-w-md h-16 px-2 rounded-full bg-[#102B33]/90 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.55)] border border-[#11DDB5]/15 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive =
              currentScreen === item.id ||
              (item.id === 'services' && ['quote', 'offers', 'tracking'].includes(currentScreen));

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'support') {
                    onOpenSupport();
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`relative flex flex-col items-center justify-center min-w-[56px] py-1.5 px-3 rounded-full transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#11DDB5]/20 to-[#ABF244]/20 text-[#11DDB5] shadow-[0_0_20px_rgba(17,221,185,0.25)] font-bold'
                    : 'text-[#8EA6AC] hover:text-[#F2F7F7]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-110 ${
                    isActive ? 'scale-105' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[11px] font-semibold mt-0.5 tracking-wide">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#11DDB5] shadow-[0_0_6px_#11DDB5]"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
