import React, { useEffect, useState } from 'react';
import { ACTIVE_OFFERS } from '../data/mockData';
import { ProviderOffer, QuoteRequest } from '../types';

interface OffersScreenProps {
  quoteRequest: QuoteRequest | null;
  onAcceptOffer: (offer: ProviderOffer) => void;
  onBack: () => void;
}

export const OffersScreen: React.FC<OffersScreenProps> = ({ quoteRequest, onAcceptOffer, onBack }) => {
  const [offers, setOffers] = useState<ProviderOffer[]>(ACTIVE_OFFERS);
  const [secondsLeft, setSecondsLeft] = useState(99);
  const [selectedOffer, setSelectedOffer] = useState<ProviderOffer | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleAccept = (offer: ProviderOffer) => {
    setSelectedOffer(offer);
    setTimeout(() => onAcceptOffer(offer), 800);
  };

  const handleDismiss = (offerId: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== offerId));
  };

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      <section className="relative overflow-hidden rounded-2xl bg-[#102B33] p-4 border border-[#11DDB5]/20 shadow-xl mb-4">
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#173B46] mb-2 border border-[#11DDB5]/20">
              <span className="w-2 h-2 rounded-full bg-[#11DDB5] animate-ping"></span>
              <span className="text-[10px] font-bold text-[#11DDB5] uppercase tracking-wider">Matching en vivo</span>
            </div>
            <h2 className="text-base font-extrabold text-[#F2F7F7] tracking-tight">{offers.length} ofertas disponibles</h2>
            <p className="text-xs text-[#8EA6AC] mt-0.5">
              {quoteRequest
                ? `${quoteRequest.categoryName} · ${quoteRequest.mode} · S/ ${quoteRequest.price.toFixed(2)}`
                : 'Buscando técnicos cercanos'}
            </p>
          </div>
          <div className="text-[#11DDB5] font-mono text-sm font-bold">{formatTimer(secondsLeft)}</div>
        </div>
      </section>

      <div className="flex flex-col gap-3">
        {offers.map((offer) => (
          <div key={offer.id} className={`p-4 rounded-2xl bg-[#102B33] border ${selectedOffer?.id === offer.id ? 'border-[#11DDB5]' : 'border-[#11DDB5]/10'} shadow-lg`}>
            <div className="flex items-center gap-3 mb-3">
              {offer.avatar ? (
                <img src={offer.avatar} alt={offer.providerName} className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[#173B46] flex items-center justify-center text-[#11DDB5]">
                  <span className="material-symbols-outlined">apartment</span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-[#F2F7F7] truncate">{offer.providerName}</h3>
                <p className="text-[11px] text-[#8EA6AC]">{offer.badge} · {offer.distance} · {offer.eta}</p>
                <p className="text-[11px] text-[#ABF244]">★ {offer.rating} · {offer.servicesCount} servicios</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-[#ABF244]">S/ {offer.price.toFixed(2)}</div>
              </div>
            </div>
            {offer.note && <p className="text-[11px] text-[#8EA6AC] mb-3">{offer.note}</p>}
            <div className="flex gap-2">
              <button type="button" onClick={() => handleDismiss(offer.id)} className="flex-1 py-2 rounded-full bg-[#1b2c33] text-[#8EA6AC] text-xs font-semibold">Descartar</button>
              <button type="button" onClick={() => handleAccept(offer)} className="flex-1 py-2 rounded-full bg-[#11DDB5] text-[#081317] text-xs font-bold">Aceptar oferta</button>
            </div>
          </div>
        ))}
        {offers.length === 0 && (
          <div className="p-6 text-center text-sm text-[#8EA6AC]">No hay ofertas. Amplía el radio o vuelve a cotizar.</div>
        )}
      </div>
    </div>
  );
};
