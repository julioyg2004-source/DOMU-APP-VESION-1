import React, { useState } from 'react';
import { ScreenType } from '../types';

interface AuthScreenProps {
  onSuccess: (screen: ScreenType) => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onBack }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('987 654 321');
  const [email, setEmail] = useState('rodrigo.m@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [otpChannel, setOtpChannel] = useState<'whatsapp' | 'sms'>('whatsapp');

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDestination, setOtpDestination] = useState('+51 987 654 321');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [biometricFeedback, setBiometricFeedback] = useState(false);

  const handleStartOtp = (destination: string) => {
    setOtpDestination(destination);
    setOtpValues(['', '', '', '', '', '']);
    setOtpVerified(false);
    setShowOtpModal(true);
  };

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    // Auto-advance to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-cell-${index + 1}`);
      nextInput?.focus();
    }

    // Check if 6 digits are complete
    if (newValues.every((digit) => digit !== '')) {
      setTimeout(() => {
        setOtpVerified(true);
        setTimeout(() => {
          setShowOtpModal(false);
          onSuccess('services');
        }, 1200);
      }, 500);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-cell-${index - 1}`);
      prevInput?.focus();
    }
  };

  const triggerBiometricScan = () => {
    setBiometricFeedback(true);
    setTimeout(() => {
      setBiometricFeedback(false);
      onSuccess('services');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#04161b] text-[#d2e6ee] flex flex-col pt-16 pb-12 px-5">
      {/* Top Header */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#04161b]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.1)]">
        <div className="h-16 px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#d2e6ee] hover:text-[#11DDB5] hover:bg-[#173B46]/40 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#11DDB5]/20 flex items-center justify-center text-[#11DDB5]">
              <span className="material-symbols-outlined text-[18px]">home</span>
            </div>
            <span className="font-bold text-[16px] text-[#F2F7F7]">Domu</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="h-1.5 w-6 rounded-full bg-[#11DDB5]"></div>
            <div className="h-1.5 w-6 rounded-full bg-[#173B46]"></div>
            <div className="h-1.5 w-6 rounded-full bg-[#173B46]"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-sm mx-auto items-center mt-4">
        {/* Subtle Glowing Aura */}
        <div className="relative w-full overflow-hidden flex flex-col items-center">
          <div className="absolute -top-12 w-48 h-48 bg-[#11DDB5]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Security Brand Capsule Badge */}
          <div className="mt-2 mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1b2c33] text-[#11DDB5] border border-[#11DDB5]/20 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span className="text-[11px] uppercase tracking-wider font-bold">Cifrado Militar DomuVault™</span>
          </div>

          {/* Headline and Subtitle */}
          <h2 className="text-[24px] font-extrabold text-[#F2F7F7] text-center tracking-tight">
            Confianza en Minutos
          </h2>
          <p className="text-[13px] text-[#8EA6AC] text-center max-w-[290px] mt-1 mb-5">
            Accede a servicios certificados del hogar con trazabilidad biométrica y técnica.
          </p>

          {/* Liquid Mode Switcher Tabs */}
          <div className="w-full p-1 rounded-full bg-[#102228] border border-[#11DDB5]/20 flex items-center relative shadow-inner">
            <button
              onClick={() => setAuthMode('login')}
              type="button"
              className={`flex-1 py-2.5 rounded-full text-xs transition-all duration-300 font-bold flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'bg-[#11DDB5] text-[#081317] shadow-md'
                  : 'text-[#8EA6AC] hover:text-[#F2F7F7]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>Iniciar Sesión</span>
            </button>
            <button
              onClick={() => setAuthMode('register')}
              type="button"
              className={`flex-1 py-2.5 rounded-full text-xs transition-all duration-300 font-bold flex items-center justify-center gap-1.5 ${
                authMode === 'register'
                  ? 'bg-[#11DDB5] text-[#081317] shadow-md'
                  : 'text-[#8EA6AC] hover:text-[#F2F7F7]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Registrarse</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: INICIAR SESIÓN */}
        {authMode === 'login' ? (
          <div className="w-full flex flex-col mt-5">
            <div className="p-5 rounded-2xl bg-[#102228] border border-[#11DDB5]/15 flex flex-col gap-4 shadow-xl">
              {/* Method Selector: Celular / Email */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F2F7F7] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">badge</span>
                  Método de Ingreso
                </span>
                <div className="inline-flex p-0.5 rounded-full bg-[#1b2c33]">
                  <button
                    onClick={() => setLoginMethod('phone')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      loginMethod === 'phone'
                        ? 'bg-[#11DDB5] text-[#081317]'
                        : 'text-[#8EA6AC]'
                    }`}
                  >
                    Celular
                  </button>
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      loginMethod === 'email'
                        ? 'bg-[#11DDB5] text-[#081317]'
                        : 'text-[#8EA6AC]'
                    }`}
                  >
                    Email
                  </button>
                </div>
              </div>

              {/* Phone or Email Input */}
              {loginMethod === 'phone' ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#526B72]">Teléfono Móvil</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-[#1b2c33] text-[#F2F7F7] text-xs font-semibold shrink-0">
                      <span>🇵🇪</span>
                      <span className="text-[#11DDB5]">+51</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="987 654 321"
                        className="w-full py-2.5 px-3.5 rounded-xl bg-[#1b2c33] text-[#F2F7F7] text-sm placeholder:text-[#526B72] outline-none focus:ring-1 focus:ring-[#11DDB5]"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#526B72] text-[18px]">
                        smartphone
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#526B72]">Correo Electrónico</label>
                  <div className="relative w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@ejemplo.com"
                      className="w-full py-2.5 pl-3.5 pr-10 rounded-xl bg-[#1b2c33] text-[#F2F7F7] text-sm placeholder:text-[#526B72] outline-none focus:ring-1 focus:ring-[#11DDB5]"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#526B72] text-[18px]">
                      mail
                    </span>
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] text-[#526B72]">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => alert('Se ha enviado un enlace de recuperación de clave a tu correo verificado.')}
                    className="text-[11px] text-[#11DDB5] hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full py-2.5 pl-3.5 pr-10 rounded-xl bg-[#1b2c33] text-[#F2F7F7] text-sm placeholder:text-[#526B72] outline-none focus:ring-1 focus:ring-[#11DDB5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2 w-8 h-8 rounded-lg flex items-center justify-center text-[#526B72] hover:text-[#F2F7F7]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Biometrics Scan Button */}
              <button
                type="button"
                onClick={triggerBiometricScan}
                className="w-full py-2.5 px-3 rounded-xl bg-[#173B46] hover:bg-[#2a3c42] text-[#F2F7F7] flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span className="material-symbols-outlined text-[#11DDB5] text-[20px]">fingerprint</span>
                <span className="text-xs font-semibold">Acceder con Huella / Face ID</span>
              </button>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={() => onSuccess('services')}
                className="w-full py-3 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-98 transition-all"
              >
                <span>Iniciar Sesión</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Google Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-[#1b2c33]"></div>
              <span className="px-3 text-[11px] text-[#526B72]">O ingresa con</span>
              <div className="flex-1 h-px bg-[#1b2c33]"></div>
            </div>

            <button
              type="button"
              onClick={() => onSuccess('services')}
              className="w-full py-2.5 px-4 rounded-full bg-[#102228] hover:bg-[#173B46] border border-[#1b2c33] text-[#F2F7F7] flex items-center justify-center gap-2.5 text-xs font-semibold transition-transform active:scale-98"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Continuar con Google</span>
            </button>
          </div>
        ) : (
          /* VIEW 2: REGISTRARSE */
          <div className="w-full flex flex-col mt-5">
            {/* Trust Shield Banner */}
            <div className="p-3.5 rounded-2xl bg-[#102228] border border-[#ABF244]/20 flex items-start gap-2.5 mb-3 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-[#ABF244]/10 text-[#ABF244] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">shield_person</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#F2F7F7]">Cuenta Blindada Domu</h3>
                <p className="text-[11px] text-[#8EA6AC] mt-0.5">
                  Crea tu perfil y accede a técnicos verificados en minutos con garantía institucional.
                </p>
              </div>
            </div>

            {/* Registration Options Container */}
            <div className="p-5 rounded-2xl bg-[#102228] border border-[#11DDB5]/15 flex flex-col gap-4 shadow-xl">
              <button
                type="button"
                onClick={() => handleStartOtp('correo rodrigo.m@gmail.com')}
                className="w-full py-3 px-3.5 rounded-xl bg-[#1b2c33] hover:bg-[#173B46] text-[#F2F7F7] flex items-center justify-between active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span className="text-xs font-semibold">Registrarse con Google</span>
                </div>
                <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">chevron_right</span>
              </button>

              <div className="flex items-center">
                <div className="flex-1 h-px bg-[#1b2c33]"></div>
                <span className="px-2 text-[10px] text-[#526B72]">O directo en tu móvil</span>
                <div className="flex-1 h-px bg-[#1b2c33]"></div>
              </div>

              {/* Mobile Registration */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-[#526B72]">Número Celular Personal</label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-[#1b2c33] text-[#F2F7F7] text-xs font-semibold shrink-0">
                    <span>🇵🇪</span>
                    <span className="text-[#11DDB5]">+51</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="987 654 321"
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#1b2c33] text-[#F2F7F7] text-sm outline-none focus:ring-1 focus:ring-[#11DDB5]"
                  />
                </div>

                {/* OTP Dispatch Channel */}
                <span className="text-[10px] text-[#526B72] mt-1">Canal de recepción del código OTP:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpChannel('whatsapp')}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all ${
                      otpChannel === 'whatsapp'
                        ? 'bg-[#173B46] border-[#ABF244]/40 text-[#ABF244]'
                        : 'bg-[#1b2c33] border-transparent text-[#8EA6AC]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span className="text-xs font-semibold">WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpChannel('sms')}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-all ${
                      otpChannel === 'sms'
                        ? 'bg-[#173B46] border-[#11DDB5]/40 text-[#11DDB5]'
                        : 'bg-[#1b2c33] border-transparent text-[#8EA6AC]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">sms</span>
                    <span className="text-xs font-semibold">SMS Rápido</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartOtp(`+51 ${phoneNumber} vía ${otpChannel.toUpperCase()}`)}
                  className="mt-2 w-full py-3 rounded-full bg-[#ABF244] text-[#081317] font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:brightness-105 active:scale-98 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">send_to_mobile</span>
                  <span>Solicitar Código de 6 Dígitos</span>
                </button>
              </div>

              {/* Protocol info */}
              <div className="p-2.5 rounded-xl bg-[#081317] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#11DDB5] text-[16px] shrink-0">lock</span>
                <p className="text-[10px] text-[#8EA6AC] leading-tight">
                  Tus datos se encriptan con protocolo <span className="text-[#11DDB5] font-semibold">RB-04</span> y están resguardados en bóveda segura.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Switcher */}
        <div className="w-full text-center mt-6">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-xs text-[#8EA6AC] hover:text-[#11DDB5] transition-colors"
          >
            {authMode === 'login' ? (
              <>
                ¿Aún no tienes cuenta?{' '}
                <span className="text-[#11DDB5] font-bold underline">Crea una en 1 minuto</span>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta Domu?{' '}
                <span className="text-[#11DDB5] font-bold underline">Inicia Sesión aquí</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Biometric Feedback Notification */}
      {biometricFeedback && (
        <div className="fixed bottom-24 inset-x-6 z-50 p-4 rounded-2xl bg-[#173B46] text-[#11DDB5] border border-[#11DDB5]/40 flex items-center gap-3 shadow-2xl animate-bounce">
          <span className="material-symbols-outlined text-[28px] animate-pulse">fingerprint</span>
          <div>
            <p className="text-xs font-bold text-[#F2F7F7]">Escaneando biometría KYC...</p>
            <p className="text-[11px] text-[#11DDB5]">¡Identidad Rodrigo Mendoza Silva confirmada!</p>
          </div>
        </div>
      )}

      {/* OTP MODAL OVERLAY */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04161b]/80 backdrop-blur-lg">
          <div className="w-full max-w-sm rounded-2xl bg-[#102228] border border-[#11DDB5]/30 p-5 flex flex-col items-center gap-4 shadow-2xl relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1b2c33] text-[#8EA6AC] hover:text-[#F2F7F7] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>

            <div className="w-14 h-14 rounded-full bg-[#ABF244]/15 text-[#ABF244] flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[28px]">key</span>
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-[#F2F7F7]">Verificación Segura</h3>
              <p className="text-xs text-[#8EA6AC] mt-1">
                Ingresa el código enviado a <br />
                <span className="text-[#11DDB5] font-semibold">{otpDestination}</span>
              </p>
            </div>

            {/* 6 Digit Cells */}
            <div className="flex items-center justify-between gap-1.5 w-full my-1">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-cell-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInput(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  autoFocus={index === 0}
                  className="w-11 h-13 py-2 text-center rounded-xl bg-[#1b2c33] text-[#ABF244] font-extrabold text-xl outline-none focus:ring-2 focus:ring-[#11DDB5] transition-all"
                />
              ))}
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 text-xs text-[#8EA6AC]">
              {otpVerified ? (
                <div className="flex items-center gap-1.5 text-[#ABF244] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>¡Código verificado con éxito! Redirigiendo...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#11DDB5]">
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>Esperando 6 dígitos (código demo: cualquiera)</span>
                </div>
              )}
            </div>

            {/* Resend button */}
            <div className="flex items-center justify-between w-full pt-1 text-xs">
              <span className="text-[#526B72]">¿No lo recibiste?</span>
              <button
                type="button"
                onClick={() => setOtpValues(['8', '4', '2', '1', '9', '0'])}
                className="text-[#11DDB5] font-semibold hover:underline"
              >
                Autocompletar demo
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setOtpVerified(true);
                setTimeout(() => {
                  setShowOtpModal(false);
                  onSuccess('services');
                }, 800);
              }}
              className="w-full py-3 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
            >
              <span>Validar y Entrar</span>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
