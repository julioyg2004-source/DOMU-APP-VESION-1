import React, { useState } from 'react';
import { ScreenType } from '../types';

interface QuoteScreenProps {
  onLaunchRequest: (offerData: { price: number; mode: string; payment: string }) => void;
  onBack: () => void;
}

export const QuoteScreen: React.FC<QuoteScreenProps> = ({ onLaunchRequest }) => {
  const [selectedMode, setSelectedMode] = useState<'urgente' | 'ahora' | 'programar'>('ahora');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(80.0);
  const [activePayment, setActivePayment] = useState<'yape' | 'visa'>('yape');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseRefPrice = 80.0;
  const minAllowedPrice = 76.0; // Rule RB-06: Maximum -5% lower limit

  const adjustPrice = (delta: number) => {
    let next = currentPrice + delta;
    if (next < minAllowedPrice) next = minAllowedPrice;
    setCurrentPrice(Math.round(next * 100) / 100);
  };

  const getDeltaBadge = () => {
    if (currentPrice <= minAllowedPrice) {
      return { text: '-5% (Límite sugerido)', color: 'bg-[#FFAA2C]/20 text-[#FFAA2C]' };
    }
    if (currentPrice < baseRefPrice) {
      return { text: 'Bajo referencia', color: 'bg-[#FFAA2C]/15 text-[#FFAA2C]' };
    }
    if (currentPrice === baseRefPrice) {
      return { text: 'Precio estándar', color: 'bg-[#11DDB5]/15 text-[#11DDB5]' };
    }
    const pct = Math.round(((currentPrice - baseRefPrice) / baseRefPrice) * 100);
    return { text: `+${pct}% Más atractivo`, color: 'bg-[#ABF244]/20 text-[#ABF244]' };
  };

  const handleLaunch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onLaunchRequest({
        price: currentPrice,
        mode: selectedMode,
        payment: activePayment === 'yape' ? 'Yape Express' : 'Visa Débito •••• 4821',
      });
    }, 1000);
  };

  const deltaInfo = getDeltaBadge();

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      {/* Active Service Pill Header */}
      <div className="bg-[#1b2c33]/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#11DDB5]/20 shadow-md flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#173B46] flex items-center justify-center shrink-0 text-[#11DDB5] shadow-inner">
            <span className="material-symbols-outlined text-[22px]">plumbing</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#11DDB5] animate-pulse"></span>
              <span className="text-[10px] font-bold text-[#11DDB5] uppercase tracking-wider">
                Categoría Activa
              </span>
            </div>
            <h2 className="text-sm font-bold text-[#F2F7F7] truncate">
              Plomería — Fuga principal
            </h2>
          </div>
        </div>

        <div className="bg-[#173B46] px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 border border-[#11DDB5]/20">
          <span className="material-symbols-outlined text-[13px] text-[#ABF244]">verified</span>
          <span className="text-[11px] font-semibold text-[#d2e6ee]">KYC Top</span>
        </div>
      </div>

      {/* 1. Modalidad de atención */}
      <section className="flex flex-col gap-2 mb-6">
        <div className="flex items-baseline justify-between px-1">
          <label className="text-sm font-bold text-[#F2F7F7]">1. Modalidad de atención</label>
          <span className="text-[11px] text-[#8EA6AC]">Elige la prioridad</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Urgent */}
          <div
            onClick={() => setSelectedMode('urgente')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedMode === 'urgente'
                ? 'bg-[#173B46] border-[#FFAA2C] shadow-md'
                : 'bg-[#102B33] border-transparent hover:border-[#11DDB5]/20'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#FFAA2C]/20 text-[#FFAA2C] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#F2F7F7]">Servicio urgente</h3>
                    <span className="bg-[#FFAA2C]/20 text-[#FFAA2C] text-[10px] font-bold px-2 py-0.2 rounded-full">
                      Inmediato
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8EA6AC] mt-0.5">
                    Proveedor en camino ya. Recargo por alta prioridad.
                  </p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  selectedMode === 'urgente'
                    ? 'bg-[#FFAA2C] text-[#081317] border-[#FFAA2C]'
                    : 'border-[#526B72]'
                }`}
              >
                {selectedMode === 'urgente' && (
                  <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                )}
              </div>
            </div>
          </div>

          {/* Now (Recommended) */}
          <div
            onClick={() => setSelectedMode('ahora')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedMode === 'ahora'
                ? 'bg-[#173B46] border-[#11DDB5] shadow-md'
                : 'bg-[#102B33] border-transparent hover:border-[#11DDB5]/20'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#11DDB5]/20 text-[#11DDB5] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#11DDB5]">Servicio ahora</h3>
                    <span className="bg-[#11DDB5]/20 text-[#11DDB5] text-[10px] font-bold px-2 py-0.2 rounded-full">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-[11px] text-[#F2F7F7]/80 mt-0.5">
                    Llegada estándar (~20–40 min). Tarifa base de mercado.
                  </p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  selectedMode === 'ahora'
                    ? 'bg-[#11DDB5] text-[#081317] border-[#11DDB5]'
                    : 'border-[#526B72]'
                }`}
              >
                {selectedMode === 'ahora' && (
                  <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                )}
              </div>
            </div>
          </div>

          {/* Scheduled */}
          <div
            onClick={() => setSelectedMode('programar')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              selectedMode === 'programar'
                ? 'bg-[#173B46] border-[#ABF244] shadow-md'
                : 'bg-[#102B33] border-transparent hover:border-[#11DDB5]/20'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#ABF244]/20 text-[#ABF244] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#F2F7F7]">Programar servicio</h3>
                    <span className="bg-[#ABF244]/20 text-[#ABF244] text-[10px] font-bold px-2 py-0.2 rounded-full">
                      -10% dto.
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8EA6AC] mt-0.5">
                    Escoge el día y bloque horario que prefieras.
                  </p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  selectedMode === 'programar'
                    ? 'bg-[#ABF244] text-[#081317] border-[#ABF244]'
                    : 'border-[#526B72]'
                }`}
              >
                {selectedMode === 'programar' && (
                  <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Video diagnóstico */}
      <section className="flex flex-col gap-2 mb-6">
        <div className="flex items-baseline justify-between px-1">
          <label className="text-sm font-bold text-[#F2F7F7]">2. Video diagnóstico</label>
          <span className="text-[11px] text-[#11DDB5] flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">videocam</span> Requerido
          </span>
        </div>

        <div className="relative bg-[#081317] rounded-3xl overflow-hidden shadow-xl aspect-[16/10] flex flex-col justify-between p-3.5 border border-[#11DDB5]/20">
          {/* Diagnostic Video Mock Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-65"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#081317] via-[#081317]/30 to-[#081317]/70"></div>

          {/* Top Layer */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="bg-[#081317]/85 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D] animate-ping"></span>
              <span className="text-[11px] text-[#F2F7F7] font-bold">REC 00:08</span>
            </div>
            <div className="bg-[#173B46]/85 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[#11DDB5] text-[11px] font-semibold border border-[#11DDB5]/20">
              <span className="material-symbols-outlined text-[13px]">high_quality</span>
              <span>Audio ON</span>
            </div>
          </div>

          {/* Central Play/Pause Button */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center shadow-[0_4px_24px_rgba(17,221,181,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[32px] ml-0.5">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex items-center justify-between bg-[#102B33]/90 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[16px] text-[#11DDB5]">check_circle</span>
              <span className="text-xs text-[#F2F7F7] font-medium truncate">Fuga_tuberia_01.mp4</span>
            </div>
            <button
              onClick={() => alert('Grabando nuevo diagnóstico de 10 segundos con cámara web/móvil...')}
              className="flex items-center gap-1 text-[#ABF244] hover:text-white px-2 py-1 rounded-lg bg-[#173B46] text-[11px] font-semibold transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">replay</span>
              <span>Regrabar</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#8EA6AC] px-1 flex items-center gap-1.5 mt-1">
          <span className="material-symbols-outlined text-[14px] text-[#526B72]">info</span>
          Muestra la válvula de paso y la intensidad del goteo para agilizar la cotización.
        </p>
      </section>

      {/* 3. Oferta de precio (Modelo Libre - Regla RB-06) */}
      <section className="flex flex-col gap-2 mb-6">
        <div className="flex items-baseline justify-between px-1">
          <label className="text-sm font-bold text-[#F2F7F7]">3. Oferta de precio (Modelo Libre)</label>
          <span className="text-[11px] text-[#526B72] font-mono">Regla RB-06</span>
        </div>

        <div className="bg-[#102B33] rounded-3xl p-4 border border-[#11DDB5]/15 shadow-md flex flex-col gap-4">
          {/* Reference Price */}
          <div className="flex items-center justify-between bg-[#0c1e24] px-3.5 py-2.5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8EA6AC] text-[18px]">analytics</span>
              <span className="text-xs text-[#8EA6AC]">Tarifa referencial sugerida</span>
            </div>
            <span className="text-sm font-bold text-[#F2F7F7]">S/ {baseRefPrice.toFixed(2)}</span>
          </div>

          {/* Bid Counter */}
          <div className="flex flex-col items-center justify-center gap-1 py-1">
            <span className="text-[10px] font-bold text-[#8EA6AC] uppercase tracking-widest">
              Tu contraoferta
            </span>

            <div className="flex items-center justify-center gap-4 w-full mt-1">
              <button
                onClick={() => adjustPrice(-5)}
                disabled={currentPrice <= minAllowedPrice}
                className="w-12 h-12 rounded-2xl bg-[#173B46] hover:bg-[#2a3c42] disabled:opacity-40 disabled:cursor-not-allowed text-[#F2F7F7] flex items-center justify-center shadow-md active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined text-[24px]">remove</span>
              </button>

              <div className="min-w-[140px] text-center flex flex-col items-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-xl font-bold text-[#ABF244]">S/</span>
                  <span className="text-3xl font-extrabold text-[#ABF244] tracking-tight">
                    {currentPrice.toFixed(2)}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${deltaInfo.color}`}>
                  {deltaInfo.text}
                </span>
              </div>

              <button
                onClick={() => adjustPrice(5)}
                className="w-12 h-12 rounded-2xl bg-[#173B46] hover:bg-[#2a3c42] text-[#F2F7F7] flex items-center justify-center shadow-md active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined text-[24px]">add</span>
              </button>
            </div>
          </div>

          {/* RB-06 Warning Banner */}
          {currentPrice <= minAllowedPrice && (
            <div className="bg-[#FFAA2C]/15 border border-[#FFAA2C]/30 rounded-xl p-3 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#FFAA2C] text-[18px] shrink-0 mt-0.5">
                warning
              </span>
              <p className="text-[11px] text-[#FFAA2C] leading-snug">
                A precios más bajos tomará más tiempo encontrar un proveedor. Límite regulado: máx -5% (S/ {minAllowedPrice.toFixed(2)}).
              </p>
            </div>
          )}

          {/* Payment Method Quick Switcher */}
          <div className="bg-[#0c1e24] rounded-2xl p-3 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#173B46] flex items-center justify-center text-[#11DDB5] shrink-0 font-bold">
                <span className="material-symbols-outlined text-[20px]">
                  {activePayment === 'yape' ? 'payments' : 'credit_card'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#8EA6AC]">Método de pago</span>
                <span className="text-xs font-bold text-[#F2F7F7] truncate">
                  {activePayment === 'yape' ? 'Yape Express' : 'Visa Débito •••• 4821'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActivePayment(activePayment === 'yape' ? 'visa' : 'yape')}
              className="px-3 py-1.5 rounded-full bg-[#173B46] text-[#11DDB5] text-xs font-semibold hover:bg-[#2a3c42] active:scale-95 transition-all"
            >
              Cambiar
            </button>
          </div>
        </div>
      </section>

      {/* Dispatch Guarantees Mini-Trust Card */}
      <section className="bg-[#0c1e24]/80 rounded-2xl p-3.5 border border-white/5 flex items-center justify-around gap-2 text-center mb-6">
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-[18px] text-[#11DDB5] mb-1">security</span>
          <span className="text-[11px] font-bold text-[#F2F7F7]">Filtro KYC</span>
          <span className="text-[10px] text-[#8EA6AC]">Antecedentes 100%</span>
        </div>
        <div className="w-px h-7 bg-[#173B46]"></div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-[18px] text-[#ABF244] mb-1">lock</span>
          <span className="text-[11px] font-bold text-[#F2F7F7]">Código PIN</span>
          <span className="text-[10px] text-[#8EA6AC]">Validación M8</span>
        </div>
        <div className="w-px h-7 bg-[#173B46]"></div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-[18px] text-[#11DDB5] mb-1">speed</span>
          <span className="text-[11px] font-bold text-[#F2F7F7]">Respuesta</span>
          <span className="text-[10px] text-[#8EA6AC]">&lt; 3 minutos</span>
        </div>
      </section>

      {/* Main Action Button Pill CTA */}
      <div className="sticky bottom-4 z-30">
        <button
          onClick={handleLaunch}
          disabled={isSubmitting}
          className="w-full h-13 py-3.5 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(17,221,181,0.35)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Transmitiendo a 7 plomeros...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">radar</span>
              <span>Lanzar solicitud a proveedores</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
