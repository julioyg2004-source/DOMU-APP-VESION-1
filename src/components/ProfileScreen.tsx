import React from 'react';
import { USER_PROFILE } from '../data/mockData';

interface ProfileScreenProps {
  sessionUser?: { name: string; phone: string; email: string } | null;
  onOpenBiometrics: () => void;
  onOpenSupport: () => void;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  sessionUser, onOpenBiometrics, onOpenSupport, onLogout,
}) => {
  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto items-center">
      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#11DDB5] to-[#ABF244] mb-3">
        <img src={USER_PROFILE.avatar} alt="" className="w-full h-full rounded-full object-cover" />
      </div>
      <h1 className="text-xl font-bold text-[#F2F7F7]">{sessionUser?.name || USER_PROFILE.name}</h1>
      <p className="text-xs text-[#8EA6AC] mt-0.5">{USER_PROFILE.role}</p>
      {(sessionUser?.phone || sessionUser?.email) && (
        <p className="text-[11px] text-[#11DDB5] mt-1">{sessionUser?.phone || sessionUser?.email}</p>
      )}
      <button type="button" onClick={onOpenBiometrics} className="mt-3 px-3 py-1.5 rounded-full bg-[#1b2c33] text-[#8EA6AC] text-[11px] font-semibold">Revalidar biometria</button>
      <button type="button" onClick={onOpenSupport} className="mt-2 text-xs text-[#11DDB5]">Soporte</button>
      {onLogout && (
        <button type="button" onClick={onLogout} className="mt-4 px-4 py-2 rounded-full border border-[#FF4D4D]/30 text-[#FF4D4D] text-xs font-semibold">Cerrar sesion</button>
      )}
    </div>
  );
};
