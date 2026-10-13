import React, { useEffect, useState } from 'react';
import { ACTIVE_OFFERS } from '../data/mockData';
import { ProviderOffer } from '../types';

interface OffersScreenProps {
  onAcceptOffer: (offer: ProviderOffer) => void;
  onBack: () => void;
}

export const OffersScreen: React.FC<OffersScreenProps> = ({ onAcceptOffer }) => {
  const [offers, setOffers] = useState<ProviderOffer[]>(ACTIVE_OFFERS);
  const [secondsLeft, setSecondsLeft] = useState(99);
  const [selectedOffer, setSelectedOffer] = useState<ProviderOffer | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandedNotice, setExpandedNotice] = useState(false);

  // Countdown timer
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

  const handleDismiss = (offerId: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== offerId));
  };

  const handleAccept = (offer: ProviderOffer) => {
    setSelectedOffer(offer);
    setTimeout(() => {
      onAcceptOffer(offer);
    }, 1400);
  };

  const handleExpandRadio = () => {
    setIsExpanding(true);
    setTimeout(() => {
      setIsExpanding(false);
      setExpandedNotice(true);
      setTimeout(() => setExpandedNotice(false), 3500);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      {/* Live Radar & Matching Broadcast Hub */}
      <section className="relative overflow-hidden rounded-2xl bg-[#102B33] p-4 border border-[#11DDB5]/20 shadow-xl mb-4">
        {/* Glow */}
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-[#11DDB5]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#173B46] mb-2 border border-[#11DDB5]/20">
              <span className="w-2 h-2 rounded-full bg-[#11DDB5] animate-ping"></span>
              <span className="w-2 h-2 -ml-3 rounded-full bg-[#11DDB5]"></span>
              <span className="text-[10px] font-bold text-[#11DDB5] uppercase tracking-wider">
                Matching en vivo
              </span>
            </div>
            <h2 className="text-base font-extrabold text-[#F2F7F7] tracking-tight">
              {offers.length} ofertas disponibles
            </h2>
            <p className="text-xs text-[#8EA6AC] mt-0.5">Plomería técnica urgente</p>
          </div>

          {/* Radar Animation & Countdown */}
          <div className="flex flex-col items-end shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center bg-[#081317] rounded-full shadow-inner border border-[#11DDB5]/20">
              <svg
                className="absolute inset-0 w-full h-full text-[#11DDB5]/20 animate-spin"
                fill="none"
                viewBox="0 0 48 48"
                style={{ animationDuration: '6s' }}
              >
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
                <path d="M24 4 A20 20 0 0 1 44 24" stroke="#11DDB5" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="material-symbols-outlined text-[#11DDB5] text-[20px]">radar</span>
            </div>

            <div className="flex items-center gap-1 mt-1.5">
              <span className="material-symbols-outlined text-[13px] text-[#526B72]">timer</span>
              <span className="text-xs text-[#ABF244] font-mono font-bold">
                {formatTimer(secondsLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Pills */}
        <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 bg-[#081317]/60 rounded-xl p-2.5 relative z-10 border border-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#173B46] flex items-center justify-center text-[#11DDB5] shrink-0">
              <span className="material-symbols-outlined text-[15px]">near_me</span>
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] text-[#526B72]">Radio cobertura</span>
              <span className="text-xs font-bold text-[#F2F7F7]">
                {expandedNotice ? '5.0 km ampliados' : '3.5 km activos'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#173B46] flex items-center justify-center text-[#ABF244] shrink-0">
              <span className="material-symbols-outlined text-[15px]">payments</span>
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] text-[#526B72]">Tu oferta inicial</span>
              <span className="text-xs font-bold text-[#ABF244]">S/ 85.00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Feed */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-[#526B72] uppercase tracking-wider">
            Propuestas recibidas
          </span>
          <span className="text-[11px] text-[#11DDB5] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">tune</span> Prioridad por cercanía
          </span>
        </div>

        {offers.map((offer) => {
          const isDirect = !offer.isCounterOffer && offer.type !== 'empresa';
          const isCounter = offer.isCounterOffer;
          const isCompany = offer.type === 'empresa';

          return (
            <article
              key={offer.id}
              className={`relative p-4 rounded-2xl bg-[#102B33] border transition-all duration-300 shadow-lg ${
                isDirect ? 'border-[#11DDB5]/40' : 'border-white/5'
              }`}
            >
              {isDirect && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#11DDB5] rounded-l-2xl"></div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative shrink-0">
                    {isCompany ? (
                      <div className="w-12 h-12 rounded-xl bg-[#173B46] flex items-center justify-center text-[#11DDB5] shadow-md">
                        <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
                      </div>
                    ) : (
                      <img
                        src={offer.avatar}
                        alt={offer.providerName}
                        className="w-12 h-12 rounded-xl object-cover shadow-md"
                      />
                    )}
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#081317] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#11DDB5] text-[14px]">verified</span>
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#F2F7F7] truncate">{offer.providerName}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className="text-[11px] font-bold text-[#FFAA2C] flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">star</span>
                        {offer.rating}
                      </span>
                      <span className="text-[11px] text-[#8EA6AC]">({offer.servicesCount} servicios)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#173B46] text-[#ABF244] font-semibold">
                        {offer.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quoted Price */}
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-[#8EA6AC] block">
                    {isCounter ? (
                      <span className="text-[#FFAA2C] font-semibold">Contraoferta</span>
                    ) : isDirect ? (
                      'Aceptó tu oferta'
                    ) : (
                      'Oferta enviada'
                    )}
                  </span>
                  <span className="text-lg font-extrabold text-[#ABF244]">
                    S/ {offer.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Justification note if counter-offer */}
              {offer.note && (
                <div className="mt-3 p-2.5 rounded-xl bg-[#173B46]/70 border border-[#11DDB5]/15 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#11DDB5] text-[16px] shrink-0 mt-0.5">
                    construction
                  </span>
                  <p className="text-[11px] text-[#F2F7F7] leading-snug">{offer.note}</p>
                </div>
              )}

              {/* Live Logistics Strip */}
              <div className="flex items-center justify-between mt-3 py-2 px-3 rounded-xl bg-[#081317]/80 text-[#8EA6AC]">
                <div className="flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-[#11DDB5] text-[15px]">location_on</span>
                  <span>{offer.distance}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#F2F7F7]">
                  <span className="material-symbols-outlined text-[#11DDB5] text-[15px]">electric_moped</span>
                  <span>{offer.eta}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3">
                {isDirect ? (
                  <button
                    onClick={() => handleAccept(offer)}
                    className="w-full h-12 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#11DDB5]/20 active:scale-[0.98] transition-all"
                  >
                    <span>Aceptar oferta directa</span>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  </button>
                ) : isCounter ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDismiss(offer.id)}
                      className="h-11 rounded-full bg-[#173B46] text-[#8EA6AC] hover:text-[#F2F7F7] font-semibold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                      <span>Descartar</span>
                    </button>
                    <button
                      onClick={() => handleAccept(offer)}
                      className="h-11 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">handshake</span>
                      <span>Aceptar S/ {offer.price}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAccept(offer)}
                    className="w-full h-11 rounded-full bg-[#173B46] hover:bg-[#2a3c42] text-[#F2F7F7] font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
                  >
                    <span>Ver detalles y aceptar</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* Security Guarantee Toast */}
      <section className="mt-4 p-3 rounded-2xl bg-[#081317]/90 border border-white/5 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#11DDB5]/15 flex items-center justify-center text-[#11DDB5] shrink-0">
          <span className="material-symbols-outlined text-[16px]">shield</span>
        </div>
        <p className="text-[11px] text-[#8EA6AC] leading-tight">
          El código de seguridad se generará una vez aceptada la oferta. El técnico no iniciará sin tu validación KYC.
        </p>
      </section>

      {/* Bottom Floating Control Pod */}
      <section className="mt-5 flex flex-col gap-2">
        <button
          onClick={handleExpandRadio}
          disabled={isExpanding}
          className="w-full h-12 rounded-full bg-[#102B33] hover:bg-[#173B46] border border-[#11DDB5]/20 text-[#F2F7F7] font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
        >
          {isExpanding ? (
            <>
              <span className="material-symbols-outlined text-[#11DDB5] text-[18px] animate-spin">sync</span>
              <span>Ampliando a 5.0 km (Miraflores & San Isidro)...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">hourglass_top</span>
              <span>Esperar más ofertas (ampliar radio)</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            if (confirm('¿Deseas cancelar la búsqueda? No se aplicará ningún cobro.')) {
              window.history.back();
            }
          }}
          className="w-full py-2 text-center text-xs text-[#526B72] hover:text-[#FF4D4D] transition-colors"
        >
          Cancelar solicitud de servicio
        </button>
      </section>

      {/* Selection Feedback Banner */}
      {selectedOffer && (
        <div className="fixed inset-x-4 bottom-6 z-50 p-4 rounded-2xl bg-[#173B46] border border-[#11DDB5] shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#11DDB5] flex items-center justify-center text-[#081317] shrink-0 font-bold">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-[#ABF244]">¡Proveedor seleccionado!</span>
              <span className="text-[11px] text-[#F2F7F7] truncate block">
                {selectedOffer.providerName} • S/ {selectedOffer.price.toFixed(2)}
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#11DDB5] text-[22px] animate-spin">
            progress_activity
          </span>
        </div>
      )}
    </div>
  );
};
