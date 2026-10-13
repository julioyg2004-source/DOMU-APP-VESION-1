import React, { useEffect, useRef, useState } from 'react';
import { ScreenType } from '../types';

interface SplashScreenProps {
  onContinue: (screen: ScreenType) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(15);
  const [statusMessage, setStatusMessage] = useState('Verificando protocolos de seguridad KYC...');

  // 1. Particle Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 390);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 390;
      height = canvas.height = canvas.offsetHeight || 800;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.15,
      alpha: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.4 ? '#11DDB5' : '#ABF244',
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) p.y = height + 5;
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 2. Simulated Loading Protocol
  useEffect(() => {
    const statuses = [
      { at: 10, text: 'Verificando protocolos de seguridad KYC...' },
      { at: 35, text: 'Estableciendo handshake biométrico...' },
      { at: 65, text: 'Cifrando entorno y canal de confianza...' },
      { at: 90, text: 'Iniciando DOMU Core Engine v3.8.4...' },
      { at: 100, text: '¡Entorno blindado activo! Acceso seguro concedido.' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setStatusMessage(statuses[4].text);
          return 100;
        }
        const matched = [...statuses].reverse().find((s) => next >= s.at);
        if (matched) setStatusMessage(matched.text);
        return next;
      });
    }, 220);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#102228] text-[#d2e6ee] flex flex-col justify-between items-center px-5 py-6 overflow-hidden select-none">
      {/* Ambient Glow Gradients */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#11DDB5]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-[#ABF244]/12 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial from-[#173B46]/20 via-transparent to-[#081317]/85 pointer-events-none"></div>

      {/* Dynamic Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      ></canvas>

      {/* Top Institutional Trust Bar */}
      <header className="relative z-10 w-full flex items-center justify-between pt-safe mt-8">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#102B33]/80 border border-[#11DDB5]/20 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#11DDB5] animate-ping"></span>
          <span className="w-2 h-2 -ml-3 rounded-full bg-[#11DDB5]"></span>
          <span className="text-[11px] font-semibold text-[#11DDB5] tracking-wide ml-1">
            DOMU PROTOCOL ONLINE
          </span>
        </div>

        <button
          onClick={() => onContinue('auth')}
          className="px-3.5 py-1.5 rounded-full bg-[#1b2c33]/70 border border-white/10 backdrop-blur-md active:scale-95 transition-all text-[#8EA6AC] hover:text-[#11DDB5] text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>Saltar</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </header>

      {/* Central Brand Experience: House + D Motif */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-xs text-center py-6">
        {/* SVG Vector Logo with Animated Precision Strokes */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-4 group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#11DDB5]/20 via-[#ABF244]/15 to-transparent blur-xl scale-90 animate-pulse"></div>

          <svg
            className="relative z-10 w-28 h-28 overflow-visible"
            fill="none"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow-mint" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#11DDB5" floodOpacity="0.7" />
              </filter>
              <filter id="glow-lime" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ABF244" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Roof Finial Needle & Small Cap */}
            <line x1="60" y1="4" x2="60" y2="12" stroke="#11DDB5" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="60" cy="9" r="4" fill="#11DDB5" filter="url(#glow-mint)" />

            {/* House Outline (Mint) */}
            <path
              d="M60 14 L102 46 V102 H72 M60 14 L18 46 V102 H48"
              stroke="#11DDB5"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-mint)"
            />

            {/* Door Foundation Anchor */}
            <line x1="48" y1="102" x2="72" y2="102" stroke="#11DDB5" strokeWidth="4.5" strokeLinecap="round" opacity="0.4" />

            {/* Stylized Central 'D' (Electric Lime) */}
            <path
              d="M45 42 V84 H54 C72 84 79 74 79 63 C79 50 71 42 54 42 Z M45 61 L54 74"
              stroke="#ABF244"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow-lime)"
            />
          </svg>
        </div>

        {/* Wordmark & Tagline */}
        <h1 className="text-[36px] font-extrabold text-[#F2F7F7] tracking-tight flex items-center justify-center gap-1.5">
          <span>Domu</span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ABF244] shadow-[0_0_8px_#ABF244]"></span>
        </h1>

        <div className="mt-3 space-y-1.5">
          <p className="text-[17px] font-bold text-[#F2F7F7] tracking-tight">
            No cualquiera puede entrar a tu hogar.
          </p>
          <p className="text-[14px] text-[#11DDB5] font-semibold tracking-wide">
            Elige bien, elige Domu.
          </p>
        </div>
      </main>

      {/* Technical Loading Matrix & Bottom Certification Section */}
      <footer className="relative z-10 w-full max-w-sm flex flex-col items-center gap-4 mb-2">
        {/* Progress Bar Container */}
        <div className="w-full bg-[#081317]/80 rounded-2xl p-3.5 border border-[#11DDB5]/15 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#8EA6AC] text-[11px] truncate mr-2">{statusMessage}</span>
            <span className="font-mono text-[#ABF244] font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#102B33] overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#11DDB5] to-[#ABF244] transition-all duration-300 shadow-[0_0_10px_#11DDB5]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* CTA Button to proceed */}
        {progress >= 100 ? (
          <button
            onClick={() => onContinue('auth')}
            className="w-full h-12 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(17,221,181,0.4)] hover:brightness-110 active:scale-98 transition-all animate-bounce"
          >
            <span>Ingresar a la Plataforma</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={() => onContinue('auth')}
            className="text-xs text-[#8EA6AC] hover:text-[#11DDB5] transition-colors underline cursor-pointer"
          >
            Saltar verificación y entrar directo
          </button>
        )}

        {/* Certified Security Seal Details */}
        <div className="flex flex-col items-center text-center gap-1 mt-1">
          <div className="flex items-center gap-1.5 text-[#526B72]">
            <span className="material-symbols-outlined text-[15px] text-[#11DDB5]">verified_user</span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8EA6AC]">
              Confianza en minutos
            </span>
            <span className="text-[#526B72]">•</span>
            <span className="text-[11px] text-[#8EA6AC]">Cifrado de extremo a extremo</span>
          </div>
          <p className="text-[10px] text-[#526B72] font-mono">
            ID Servidor: DOMU-NODE-CL01 • Red Blindada
          </p>
        </div>
      </footer>
    </div>
  );
};
