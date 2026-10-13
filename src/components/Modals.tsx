import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';
import { ChatMessage } from '../types';

/* 1. CHAT CIFRADO IN-APP (RB-04) */
interface ChatModalProps {
  onClose: () => void;
  technicianName?: string;
  technicianAvatar?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  onClose,
  technicianName = 'Carlos Mendoza',
  technicianAvatar = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated technician response
    setTimeout(() => {
      const techMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'provider',
        text: 'Entendido Rodrigo, estoy a 3 cuadras. Te aviso apenas toque el intercomunicador 402.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
      };
      setMessages((prev) => [...prev, techMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#04161b]/85 backdrop-blur-md">
      <div className="w-full max-w-md h-[85vh] bg-[#102B33] border border-[#11DDB5]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Chat Header */}
        <div className="p-3.5 bg-[#173B46] border-b border-[#11DDB5]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img src={technicianAvatar} alt={technicianName} className="w-10 h-10 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#11DDB5] border border-[#081317]"></span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-[#F2F7F7] truncate">{technicianName}</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#11DDB5]/20 text-[#11DDB5] font-semibold">
                  KYC Verificado
                </span>
              </div>
              <p className="text-[10px] text-[#11DDB5] flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">lock</span>
                Canal seguro RB-04 • En línea
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#081317]/50">
          {messages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="p-2.5 rounded-xl bg-[#0c1e24] border border-[#11DDB5]/20 text-center">
                  <p className="text-[10px] text-[#8EA6AC] leading-snug">{msg.text}</p>
                </div>
              );
            }

            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#11DDB5] text-[#081317] font-semibold rounded-br-none shadow-md'
                      : 'bg-[#173B46] text-[#F2F7F7] rounded-bl-none border border-white/5 shadow-md'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-[#526B72] mt-1 px-1">{msg.time}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-[#102B33] border-t border-white/10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Adjuntar evidencia fotográfica encriptada')}
            className="w-9 h-9 rounded-full bg-[#173B46] text-[#8EA6AC] hover:text-[#11DDB5] flex items-center justify-center shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe un mensaje seguro..."
            className="flex-1 py-2 px-3.5 rounded-full bg-[#0c1e24] text-[#F2F7F7] placeholder-[#526B72] text-xs outline-none focus:ring-1 focus:ring-[#11DDB5]"
          />

          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center shrink-0 shadow-md hover:brightness-110 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

/* 2. LLAMADA VOIP IN-APP */
interface VoipModalProps {
  onClose: () => void;
  technicianName?: string;
}

export const VoipModal: React.FC<VoipModalProps> = ({
  onClose,
  technicianName = 'Carlos Mendoza',
}) => {
  const [callDuration, setCallDuration] = useState(12);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCallDuration((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSecs = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04161b]/90 backdrop-blur-xl">
      <div className="w-full max-w-sm rounded-3xl bg-[#102B33] border border-[#11DDB5]/40 p-6 flex flex-col items-center gap-6 shadow-2xl text-center">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173B46] text-[#11DDB5] text-[10px] font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[13px]">lock</span>
          Llamada VoIP Cifrada (RB-04)
        </div>

        {/* Technician Avatar Pulsing */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#11DDB5] to-[#ABF244] animate-pulse flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
              alt={technicianName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#ABF244] border-2 border-[#102B33]"></span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#F2F7F7]">{technicianName}</h3>
          <p className="text-xs text-[#11DDB5] font-mono mt-0.5">Voz HD Encriptada • {formatSecs(callDuration)}</p>
          <p className="text-[10px] text-[#8EA6AC] mt-1">Tu número móvil se mantiene 100% privado</p>
        </div>

        {/* Audio Wave Simulation */}
        <div className="flex items-center justify-center gap-1 h-8">
          {[40, 75, 55, 90, 60, 85, 45, 95, 65, 50].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-[#11DDB5] rounded-full animate-pulse"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            ></div>
          ))}
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-4 w-full pt-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-[#FF4D4D] text-white' : 'bg-[#173B46] text-[#F2F7F7]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-[#FF4D4D] text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,77,77,0.5)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[28px]">call_end</span>
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isSpeaker ? 'bg-[#11DDB5] text-[#081317]' : 'bg-[#173B46] text-[#F2F7F7]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSpeaker ? 'volume_up' : 'volume_down'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* 3. MODAL DE EMERGENCIA SOS (M15) */
interface SosModalProps {
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [alertDispatched, setAlertDispatched] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setAlertDispatched(true);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FF4D4D]/15 backdrop-blur-2xl">
      <div className="w-full max-w-sm rounded-3xl bg-[#102B33] border-2 border-[#FF4D4D] p-6 flex flex-col items-center gap-5 shadow-[0_0_50px_rgba(255,77,77,0.5)] text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-[#FF4D4D]/20 text-[#FF4D4D] flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-[36px]">e911_emergency</span>
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-[#FF4D4D] uppercase tracking-wider">
            Protocolo de Emergencia DOMU Safe (M15)
          </span>
          <h2 className="text-xl font-black text-[#F2F7F7] mt-1">Alerta SOS Activada</h2>
        </div>

        {alertDispatched ? (
          <div className="p-3.5 rounded-2xl bg-[#FF4D4D]/15 border border-[#FF4D4D]/40 text-left w-full space-y-2">
            <div className="flex items-center gap-2 text-[#FF4D4D] font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF4D4D] animate-ping"></span>
              <span>Central DOMU Safe en contacto</span>
            </div>
            <p className="text-xs text-[#F2F7F7]">
              Se ha emitido tu ubicación georreferenciada (San Isidro) y los datos biométricos del técnico asignado a la central de serenazgo y monitoreo de emergencias.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-[#FF4D4D] font-mono">{countdown}</span>
            <p className="text-xs text-[#8EA6AC] mt-1">
              Transmitiendo geolocalización a central y contactos de seguridad...
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 w-full pt-1">
          <button
            onClick={() => alert('Conectando inmediatamente con la central telefónica de emergencias DOMU Safe...')}
            className="w-full py-3.5 rounded-full bg-[#FF4D4D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Llamar a Central de Emergencias 105 / Serenazgo</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#173B46] text-[#d2e6ee] hover:text-white text-xs font-semibold"
          >
            Cancelar alerta falsa alarma
          </button>
        </div>
      </div>
    </div>
  );
};

/* 4. MODAL DE REVALIDACIÓN BIOMÉTRICA CON DNI */
interface BiometricModalProps {
  onClose: () => void;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'scanning' | 'matched'>('scanning');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('matched');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04161b]/85 backdrop-blur-xl">
      <div className="w-full max-w-sm rounded-3xl bg-[#102B33] border border-[#11DDB5]/40 p-6 flex flex-col items-center gap-4 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="self-end -mt-2 -mr-2 w-8 h-8 rounded-full bg-[#1b2c33] text-[#8EA6AC] hover:text-[#F2F7F7] flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Biometric Visual Scan Area */}
        <div className="relative w-36 h-36 rounded-full border-2 border-dashed border-[#11DDB5] p-2 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="Rodrigo Mendoza"
            className="w-full h-full rounded-full object-cover filter contrast-125"
          />
          {step === 'scanning' ? (
            <div className="absolute inset-x-2 top-0 h-1 bg-[#11DDB5] shadow-[0_0_15px_#11DDB5] animate-bounce"></div>
          ) : (
            <div className="absolute inset-0 rounded-full bg-[#11DDB5]/20 flex items-center justify-center border-2 border-[#ABF244]">
              <span className="material-symbols-outlined text-[44px] text-[#ABF244]">verified</span>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-[#F2F7F7]">
            {step === 'scanning' ? 'Cotejando con Base Reniec' : '¡Identidad 100% Validada!'}
          </h3>
          <p className="text-xs text-[#8EA6AC] mt-1">
            {step === 'scanning'
              ? 'Analizando puntos biométricos faciales y registro DNI...'
              : 'Rodrigo Mendoza Silva • DNI Vigente con certificación biométrica actualizada.'}
          </p>
        </div>

        {step === 'matched' && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-xs active:scale-95 transition-all shadow-md mt-2"
          >
            Finalizar y Guardar Certificado
          </button>
        )}
      </div>
    </div>
  );
};

/* 5. MODAL DE SOPORTE Y MEDIACIÓN (M14) */
interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04161b]/85 backdrop-blur-xl">
      <div className="w-full max-w-sm rounded-3xl bg-[#102B33] border border-[#11DDB5]/30 p-5 flex flex-col gap-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#11DDB5]/20 text-[#11DDB5] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F2F7F7]">Centro de Soporte (M14)</h3>
              <p className="text-[10px] text-[#11DDB5]">Mediación de Garantías & Resoluciones</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b2c33] text-[#8EA6AC] hover:text-[#F2F7F7] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => alert('Abriendo ticket de revisión de cobro con retención en Escrow RB-05.')}
            className="w-full p-3 rounded-xl bg-[#0c1e24] hover:bg-[#173B46] border border-white/5 text-left flex items-center justify-between text-xs text-[#F2F7F7] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">receipt</span>
              <span>Reclamar cobro o tarifa de servicio</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8EA6AC]">chevron_right</span>
          </button>

          <button
            onClick={() => alert('Activando garantía técnica oficial de 30 días para re-visita sin costo.')}
            className="w-full p-3 rounded-xl bg-[#0c1e24] hover:bg-[#173B46] border border-white/5 text-left flex items-center justify-between text-xs text-[#F2F7F7] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ABF244] text-[18px]">verified_user</span>
              <span>Hacer valer garantía de 30 días</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8EA6AC]">chevron_right</span>
          </button>

          <button
            onClick={() => alert('Conectando con un mediador humano del equipo legal DOMU en vivo...')}
            className="w-full p-3 rounded-xl bg-[#0c1e24] hover:bg-[#173B46] border border-white/5 text-left flex items-center justify-between text-xs text-[#F2F7F7] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">chat</span>
              <span>Chat con mediador DOMU en vivo</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8EA6AC]">chevron_right</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#173B46] text-[#F2F7F7] text-xs font-semibold"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
