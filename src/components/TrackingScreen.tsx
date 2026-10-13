import React, { useState, useEffect, useRef } from 'react';

interface TrackingScreenProps {
  onOpenChat: () => void;
  onOpenVoip: () => void;
  onOpenSupport: () => void;
  onTriggerSos: () => void;
  onBack: () => void;
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({
  onOpenChat,
  onOpenVoip,
  onOpenSupport,
  onTriggerSos,
}) => {
  const [activeTab, setActiveTab] = useState<'m8' | 'm9'>('m8');
  const [etaMinutes, setEtaMinutes] = useState(4);
  const [activeSeconds, setActiveSeconds] = useState(1455); // 24m 15s
  const [sosProgress, setSosProgress] = useState(0);
  const [evidenceAfterUploaded, setEvidenceAfterUploaded] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Active time ticker in M9
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatActiveTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // SOS Hold interaction
  const startSosHold = () => {
    setSosProgress(0);
    let p = 0;
    holdIntervalRef.current = setInterval(() => {
      p += 12;
      setSosProgress(p);
      if (p >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        onTriggerSos();
      }
    }, 100);
  };

  const cancelSosHold = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setSosProgress(0);
  };

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      {/* Interactive State Switcher (M8 En Camino vs M9 En Curso) */}
      <div className="flex items-center justify-between bg-[#0c1e24] p-1 rounded-full mb-4 border border-[#11DDB5]/20 shadow-sm">
        <button
          onClick={() => setActiveTab('m8')}
          className={`flex-1 py-2 rounded-full text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'm8'
              ? 'bg-[#11DDB5] text-[#081317] shadow-md'
              : 'text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">near_me</span>
          <span>M8: En Camino</span>
        </button>

        <button
          onClick={() => setActiveTab('m9')}
          className={`flex-1 py-2 rounded-full text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'm9'
              ? 'bg-[#11DDB5] text-[#081317] shadow-md'
              : 'text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>M9: En Curso (Validado)</span>
        </button>
      </div>

      {/* RB-11: High Security 5-Digit Validation Card */}
      <section className="relative w-full rounded-2xl bg-[#102B33] border border-[#11DDB5]/30 p-5 shadow-2xl overflow-hidden flex flex-col items-center gap-3 text-center mb-5">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ABF244]/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#11DDB5]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-1.5 bg-[#081317]/80 px-3 py-1 rounded-full text-[#ABF244] border border-[#ABF244]/20">
          <span className="material-symbols-outlined text-[14px]">shield_person</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Protocolo de Identidad RB-11</span>
        </div>

        <div className="w-full flex flex-col items-center">
          <p className="text-xs text-[#8EA6AC]">Código de validación de acceso seguro</p>

          {/* 5-Digit PIN */}
          <div className="flex items-center justify-center gap-2 mt-1 py-1.5 px-6 bg-[#081317] border border-[#ABF244]/40 rounded-full shadow-inner">
            <span className="text-3xl font-extrabold text-[#ABF244] tracking-[0.25em] pl-[0.25em]">
              73914
            </span>
          </div>
        </div>

        <p className="text-[11px] text-[#8EA6AC] max-w-[280px] leading-snug">
          Muestra este código al técnico al tocar tu puerta para autorizar el ingreso al domicilio.
        </p>

        {/* Dynamic Status Badge */}
        {activeTab === 'm8' ? (
          <div className="flex items-center gap-2 bg-[#173B46] px-3.5 py-1 rounded-full text-[#11DDB5] border border-[#11DDB5]/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#11DDB5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#11DDB5]"></span>
            </span>
            <span className="text-xs font-semibold">Validación pendiente al arribo</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-[#11DDB5]/15 px-3.5 py-1 rounded-full text-[#11DDB5] border border-[#11DDB5]/30">
            <span className="material-symbols-outlined text-[16px] text-[#ABF244]">check_circle</span>
            <span className="text-xs font-bold text-[#ABF244]">Código verificado • 10:42 AM</span>
          </div>
        )}
      </section>

      {/* VIEW M8: EN CAMINO (Map + ETA + Live Tracking) */}
      {activeTab === 'm8' ? (
        <div className="flex flex-col w-full gap-4">
          {/* Proximity Alert */}
          <div className="flex items-center justify-between p-3.5 bg-[#173B46] border border-[#11DDB5]/30 rounded-2xl text-[#F2F7F7] shadow-lg">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#11DDB5]/20 text-[#11DDB5] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined animate-bounce text-[22px]">
                  notifications_active
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#F2F7F7] truncate">
                  Aviso: Proveedor a menos de 5 min
                </p>
                <p className="text-[11px] text-[#8EA6AC]">Prepárate en el acceso principal</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-[#11DDB5] text-[#081317] px-2.5 py-1 rounded-full shrink-0 shadow-sm">
              ETA {etaMinutes} min
            </span>
          </div>

          {/* Interactive Map Simulation */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl bg-[#0c1e24] border border-[#11DDB5]/20">
            {/* Map Background Image */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')",
              }}
            ></div>

            {/* Dark Overlay with Route Graphic */}
            <div className="absolute inset-0 bg-[#04161b]/65"></div>

            {/* SVG Trajectory Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#11DDB5" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ABF244" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glowRoute" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M 75 210 Q 140 150, 185 130 T 280 60"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="5"
                strokeDasharray="8 6"
                strokeLinecap="round"
                filter="url(#glowRoute)"
                className="animate-pulse"
              />
            </svg>

            {/* Customer Home Pin */}
            <div className="absolute top-10 right-12 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#ABF244] text-[#081317] flex items-center justify-center shadow-lg font-bold">
                <span className="material-symbols-outlined text-[18px]">home</span>
              </div>
              <span className="mt-1 text-[10px] font-bold bg-[#081317]/90 text-[#F2F7F7] px-2 py-0.5 rounded-full border border-white/10">
                Tu Hogar
              </span>
            </div>

            {/* Technician Moving Marker */}
            <div className="absolute bottom-12 left-10 flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#102B33] border-2 border-[#11DDB5] flex items-center justify-center text-[#11DDB5] shadow-xl">
                  <span className="material-symbols-outlined text-[20px]">person_pin_circle</span>
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#11DDB5] rounded-full animate-ping"></span>
              </div>
              <div className="bg-[#081317]/90 border border-[#11DDB5]/30 px-2.5 py-1 rounded-full text-left">
                <p className="text-[11px] font-bold text-[#11DDB5] leading-none">Carlos (1.1 km)</p>
                <p className="text-[9px] text-[#8EA6AC]">En camino</p>
              </div>
            </div>

            {/* Recenter button */}
            <button
              onClick={() => setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1))}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#102B33]/90 text-[#F2F7F7] hover:text-[#11DDB5] border border-white/10 flex items-center justify-center active:scale-95 shadow-lg"
              title="Centrar ubicación"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>
          </div>
        </div>
      ) : (
        /* VIEW M9: EN CURSO & EVIDENCIA OBLIGATORIA (RB-03) */
        <div className="flex flex-col w-full gap-4">
          {/* Diagnostic Header */}
          <div className="w-full bg-[#102B33] p-4 rounded-2xl border border-[#11DDB5]/20 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-[#081317] flex items-center justify-center text-[#11DDB5] border border-[#11DDB5]/30">
                <span className="material-symbols-outlined text-[22px] animate-spin" style={{ animationDuration: '8s' }}>
                  plumbing
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#11DDB5] uppercase tracking-wider">
                  Fase 2 de 3
                </span>
                <h2 className="text-sm font-bold text-[#F2F7F7]">Reparación en Ejecución</h2>
                <p className="text-xs text-[#8EA6AC]">
                  Tiempo activo:{' '}
                  <span className="font-mono text-[#ABF244] font-semibold">
                    {formatActiveTime(activeSeconds)}
                  </span>
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-[#ABF244]/15 text-[#ABF244] px-2.5 py-1 rounded-full border border-[#ABF244]/30">
              Activo
            </span>
          </div>

          {/* RB-03: Mandatory Evidence (Antes y Después) */}
          <div className="flex flex-col gap-2.5 bg-[#0c1e24] p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">photo_library</span>
                <h3 className="text-xs font-bold text-[#F2F7F7]">Evidencia Obligatoria (RB-03)</h3>
              </div>
              <span className="text-[10px] text-[#8EA6AC]">Auditoría en vivo</span>
            </div>
            <p className="text-[11px] text-[#8EA6AC]">
              Registro fotográfico previo y posterior con repuestos para garantía oficial.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-1">
              {/* Photo Before */}
              <div className="flex flex-col gap-1">
                <div className="relative w-full h-28 rounded-xl overflow-hidden bg-[#081317] shadow-md border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80"
                    alt="Antes"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#081317]/80 text-[#F2F7F7] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#11DDB5]">check</span>
                    Antes
                  </span>
                  <span className="absolute bottom-1 right-2 text-[10px] text-[#8EA6AC]">10:44 AM</span>
                </div>
                <span className="text-[11px] text-[#8EA6AC] truncate">Fuga primaria detectada</span>
              </div>

              {/* Photo After */}
              <div className="flex flex-col gap-1">
                {evidenceAfterUploaded ? (
                  <div className="relative w-full h-28 rounded-xl overflow-hidden bg-[#081317] shadow-md border border-[#ABF244]/40">
                    <img
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"
                      alt="Después"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-[#081317]/80 text-[#ABF244] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px] text-[#ABF244]">check</span>
                      Después
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => setEvidenceAfterUploaded(true)}
                    className="relative w-full h-28 rounded-xl bg-[#102B33] border border-dashed border-[#11DDB5]/40 flex flex-col items-center justify-center p-2 text-center text-[#8EA6AC] hover:border-[#11DDB5] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[26px] text-[#11DDB5]/70 mb-1">
                      add_a_photo
                    </span>
                    <span className="text-[11px] font-bold text-[#F2F7F7]">Tomar Foto Final</span>
                    <span className="text-[9px] text-[#8EA6AC]">Válvula + repuesto</span>
                  </button>
                )}
                <span className="text-[11px] text-[#8EA6AC] truncate">
                  {evidenceAfterUploaded ? 'Repuesto instalado ✓' : 'Pendiente de cierre'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assigned Technician Card (Carlos Mendoza) */}
      <section className="w-full bg-[#102B33] border border-[#11DDB5]/20 rounded-2xl p-4 shadow-xl flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
              alt="Carlos Mendoza"
              className="w-13 h-13 rounded-2xl object-cover border border-[#11DDB5]/30"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center shadow-md font-bold">
              <span className="material-symbols-outlined text-[13px]">verified</span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#F2F7F7] truncate">Carlos Mendoza</h3>
            <p className="text-xs text-[#11DDB5] font-semibold truncate">Plomero Certificado KYC</p>
            <div className="flex items-center gap-1.5 text-xs text-[#ABF244] mt-0.5">
              <span className="material-symbols-outlined text-[14px]">star</span>
              <span className="font-bold">4.9</span>
              <span className="text-[#8EA6AC] text-[11px]">(142 servicios realizados)</span>
            </div>
          </div>
        </div>

        {/* RB-04 Safe In-App Communication Channels */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onOpenVoip}
            className="h-11 rounded-full bg-[#173B46] hover:bg-[#2a3c42] text-[#F2F7F7] hover:text-[#11DDB5] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md text-xs font-bold"
          >
            <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">phone_in_talk</span>
            <span>Llamada VoIP</span>
          </button>

          <button
            onClick={onOpenChat}
            className="h-11 rounded-full bg-[#173B46] hover:bg-[#2a3c42] text-[#F2F7F7] hover:text-[#11DDB5] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md text-xs font-bold"
          >
            <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">lock</span>
            <span>Chat Cifrado</span>
          </button>
        </div>
      </section>

      {/* Safety Actions: Soporte M14 & Emergencia M15 */}
      <div className="w-full flex items-center gap-3 mt-4">
        {/* Support Button (M14) */}
        <button
          onClick={onOpenSupport}
          className="flex-1 h-12 rounded-full bg-[#102B33] hover:bg-[#173B46] border border-[#11DDB5]/20 text-[#F2F7F7] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg text-xs font-bold"
        >
          <span className="material-symbols-outlined text-[#8EA6AC] text-[20px]">support_agent</span>
          <span>Soporte (M14)</span>
        </button>

        {/* Emergencia SOS Button (M15) with Hold to activate */}
        <button
          onMouseDown={startSosHold}
          onMouseUp={cancelSosHold}
          onMouseLeave={cancelSosHold}
          onTouchStart={startSosHold}
          onTouchEnd={cancelSosHold}
          className="flex-1 h-12 rounded-full bg-[#FF4D4D] text-[#F2F7F7] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,77,77,0.4)] relative overflow-hidden text-xs font-extrabold uppercase tracking-wider select-none"
        >
          <span className="material-symbols-outlined text-[20px] animate-pulse">sos</span>
          <span>Emergencia (M15)</span>
          <div
            className="absolute inset-y-0 left-0 bg-[#081317]/40 pointer-events-none transition-all duration-75"
            style={{ width: `${sosProgress}%` }}
          ></div>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[#526B72] mt-3">
        <span className="material-symbols-outlined text-[14px]">encrypted</span>
        <span className="text-[11px]">Comunicaciones seguras bajo norma de privacidad RB-04</span>
      </div>
    </div>
  );
};
