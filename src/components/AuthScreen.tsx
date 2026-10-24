import React, { useState, useRef, useEffect } from 'react';
import { SessionUser } from '../types';

interface AuthScreenProps {
  onSuccess: (user: SessionUser) => void;
  onBack: () => void;
}

const DEMO_OTP = '123456';

function buildUser(partial: { name?: string; phone?: string; email?: string }): SessionUser {
  return {
    id: `user-${Date.now()}`,
    name: partial.name || 'Cliente Domu',
    phone: partial.phone || '+51 987 654 321',
    email: partial.email || 'cliente@domu.app',
    loggedInAt: new Date().toISOString(),
  };
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onBack }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  useEffect(() => {
    if (showOtpModal) setTimeout(() => otpRefs.current[0]?.focus(), 100);
  }, [showOtpModal]);

  const finishAuth = (user: SessionUser) => {
    setLoading(false);
    setShowOtpModal(false);
    onSuccess(user);
  };

  const handleLogin = () => {
    setError('');
    if (cleanPhone.length < 9 && !email.includes('@')) {
      setError('Ingresa un celular (9 digitos) o un correo valido.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      finishAuth(buildUser({
        name: fullName.trim() || 'Rodrigo Mendoza',
        phone: cleanPhone ? `+51 ${cleanPhone}` : undefined,
        email: email.trim() || undefined,
      }));
    }, 500);
  };

  const handleStartRegister = () => {
    setError('');
    if (!fullName.trim() || fullName.trim().length < 3) {
      setError('Ingresa tu nombre completo.');
      return;
    }
    if (cleanPhone.length < 9) {
      setError('Ingresa un numero de 9 digitos.');
      return;
    }
    setOtpValues(['', '', '', '', '', '']);
    setOtpVerified(false);
    setOtpError('');
    setShowOtpModal(true);
  };

  const handleOtpInput = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newValues = [...otpValues];
    newValues[index] = digit;
    setOtpValues(newValues);
    setOtpError('');
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
    if (newValues.every((d) => d !== '')) {
      const code = newValues.join('');
      setTimeout(() => {
        if (code === DEMO_OTP || code.length === 6) {
          setOtpVerified(true);
          setTimeout(() => {
            finishAuth(buildUser({ name: fullName.trim(), phone: `+51 ${cleanPhone}` }));
          }, 700);
        } else {
          setOtpError('Codigo incorrecto. Demo: 123456');
          setOtpValues(['', '', '', '', '', '']);
          otpRefs.current[0]?.focus();
        }
      }, 300);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#04161b] text-[#d2e6ee] flex flex-col pt-16 pb-12 px-5">
      <div className="fixed top-0 inset-x-0 z-50 bg-[#04161b]/85 backdrop-blur-xl h-16 px-4 flex items-center justify-between">
        <button type="button" onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:text-[#11DDB5]">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="font-bold text-[#F2F7F7]">Domu</span>
        <div className="w-10" />
      </div>
      <div className="flex flex-col w-full max-w-sm mx-auto mt-6">
        <h2 className="text-2xl font-extrabold text-[#F2F7F7] text-center">Confianza en Minutos</h2>
        <p className="text-sm text-[#8EA6AC] text-center mt-1 mb-5">Accede a servicios certificados del hogar.</p>
        <div className="w-full p-1 rounded-full bg-[#102228] border border-[#11DDB5]/20 flex mb-4">
          <button type="button" onClick={() => { setAuthMode('login'); setError(''); }} className={`flex-1 py-2.5 rounded-full text-xs font-bold ${authMode === 'login' ? 'bg-[#11DDB5] text-[#081317]' : 'text-[#8EA6AC]'}`}>Iniciar Sesion</button>
          <button type="button" onClick={() => { setAuthMode('register'); setError(''); }} className={`flex-1 py-2.5 rounded-full text-xs font-bold ${authMode === 'register' ? 'bg-[#11DDB5] text-[#081317]' : 'text-[#8EA6AC]'}`}>Registrarse</button>
        </div>
        {error && <div className="mb-3 p-3 rounded-xl bg-[#FFAA2C]/10 border border-[#FFAA2C]/30 text-[#FFAA2C] text-xs">{error}</div>}
        {authMode === 'login' ? (
          <div className="p-5 rounded-2xl bg-[#102228] border border-[#11DDB5]/15 flex flex-col gap-3">
            <label className="text-[11px] text-[#526B72]">Celular</label>
            <div className="flex gap-2">
              <span className="px-3 py-2.5 rounded-xl bg-[#1b2c33] text-xs text-[#11DDB5]">+51</span>
              <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="987 654 321" className="flex-1 py-2.5 px-3 rounded-xl bg-[#1b2c33] text-sm outline-none" />
            </div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="py-2.5 px-3 rounded-xl bg-[#1b2c33] text-sm outline-none" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contrasena" className="py-2.5 px-3 rounded-xl bg-[#1b2c33] text-sm outline-none" />
            <button type="button" disabled={loading} onClick={handleLogin} className="w-full py-3 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-sm disabled:opacity-60">{loading ? 'Validando...' : 'Iniciar Sesion'}</button>
            <button type="button" onClick={() => finishAuth(buildUser({ name: 'Usuario Google', email: 'google@domu.app' }))} className="w-full py-2.5 rounded-full border border-[#1b2c33] text-xs font-semibold">Continuar con Google</button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-[#102228] border border-[#11DDB5]/15 flex flex-col gap-3">
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nombre completo" className="py-2.5 px-3 rounded-xl bg-[#1b2c33] text-sm outline-none" />
            <div className="flex gap-2">
              <span className="px-3 py-2.5 rounded-xl bg-[#1b2c33] text-xs text-[#11DDB5]">+51</span>
              <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="987 654 321" className="flex-1 py-2.5 px-3 rounded-xl bg-[#1b2c33] text-sm outline-none" />
            </div>
            <button type="button" onClick={handleStartRegister} className="w-full py-3 rounded-full bg-[#ABF244] text-[#081317] font-bold text-xs">Solicitar Codigo OTP</button>
            <p className="text-[10px] text-[#526B72] text-center">Demo: codigo <span className="text-[#11DDB5] font-bold">123456</span></p>
          </div>
        )}
      </div>
      {showOtpModal && (
        <div className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#102228] border border-[#11DDB5]/25 p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-[#F2F7F7]">Codigo de verificacion</h3>
              <button type="button" onClick={() => setShowOtpModal(false)} className="text-[#8EA6AC]"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="flex justify-between gap-2 mb-3">
              {otpValues.map((val, i) => (
                <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={val}
                  onChange={(e) => handleOtpInput(i, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-[#1b2c33] outline-none focus:ring-2 focus:ring-[#11DDB5]" />
              ))}
            </div>
            {otpError && <p className="text-xs text-[#FFAA2C]">{otpError}</p>}
            {otpVerified && <p className="text-xs text-[#ABF244]">Verificado. Entrando...</p>}
            <p className="text-[10px] text-[#526B72] text-center mt-2">Demo: <strong className="text-[#11DDB5]">123456</strong></p>
          </div>
        </div>
      )}
    </div>
  );
};
