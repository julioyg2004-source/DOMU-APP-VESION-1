import React, { useState, useEffect } from 'react';
import { ProviderOffer, QuoteRequest } from '../types';

interface TrackingScreenProps {
  acceptedOffer: ProviderOffer | null;
  quoteRequest: QuoteRequest | null;
  onOpenChat: () => void;
  onOpenVoip: () => void;
  onOpenSupport: () => void;
  onTriggerSos: () => void;
  onBack: () => void;
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({
  acceptedOffer, quoteRequest, onOpenChat, onOpenVoip, onOpenSupport, onTriggerSos, onBack,
}) => {
  const providerName = acceptedOffer?.providerName || 'Tecnico asignado';
  const offerPrice = acceptedOffer?.price;
  const serviceLabel = quoteRequest
    ? `${quoteRequest.categoryName} · S/ ${(offerPrice ?? quoteRequest.price).toFixed(2)}`
    : 'Servicio en curso';
  const [eta, setEta] = useState(4);
  useEffect(() => {
    const t = setInterval(() => setEta((e) => (e > 0 ? e - 1 : 0)), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      <div className="mb-3 px-3 py-2 rounded-xl bg-[#173B46]/80 border border-[#11DDB5]/20 text-xs flex items-center gap-2">
        <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">info</span>
        <span>{serviceLabel} · {providerName}</span>
      </div>
      <div className="p-4 rounded-2xl bg-[#102B33] border border-[#11DDB5]/20 mb-4">
        <p className="text-[10px] font-bold text-[#11DDB5] uppercase">En camino</p>
        <h2 className="text-xl font-extrabold text-[#F2F7F7] mt-1">ETA ~{eta} min</h2>
      </div>
      <div className="p-4 rounded-2xl bg-[#102B33] border border-[#11DDB5]/10 flex items-center gap-3 mb-4">
        {acceptedOffer?.avatar ? (
          <img src={acceptedOffer.avatar} alt={providerName} className="w-14 h-14 rounded-xl object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-[#173B46] flex items-center justify-center text-[#11DDB5]">
            <span className="material-symbols-outlined">person</span>
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-[#F2F7F7]">{providerName}</h3>
          <p className="text-[11px] text-[#8EA6AC]">★ {acceptedOffer?.rating ?? '-'} · {acceptedOffer?.badge || 'Verificado'}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button type="button" onClick={onOpenChat} className="py-3 rounded-xl bg-[#173B46] text-[#11DDB5] text-xs font-semibold flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">chat</span>Chat
        </button>
        <button type="button" onClick={onOpenVoip} className="py-3 rounded-xl bg-[#173B46] text-[#11DDB5] text-xs font-semibold flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">call</span>Llamar
        </button>
        <button type="button" onClick={onOpenSupport} className="py-3 rounded-xl bg-[#173B46] text-[#11DDB5] text-xs font-semibold flex flex-col items-center gap-1">
          <span className="material-symbols-outlined">support_agent</span>Soporte
        </button>
      </div>
      <button type="button" onClick={onTriggerSos} className="w-full py-3 rounded-full bg-[#FF4D4D]/20 border border-[#FF4D4D]/40 text-[#FF4D4D] font-bold text-sm">SOS Emergencia</button>
      <button type="button" onClick={onBack} className="mt-3 text-xs text-[#8EA6AC] text-center">Volver</button>
    </div>
  );
};
