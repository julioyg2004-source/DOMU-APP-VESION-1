import React, { useState } from 'react';
import { USER_PROFILE } from '../data/mockData';

interface ProfileScreenProps {
  onOpenBiometrics: () => void;
  onOpenSupport: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenBiometrics }) => {
  const [profile, setProfile] = useState(USER_PROFILE);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneVal, setPhoneVal] = useState(profile.phone);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailVal, setEmailVal] = useState(profile.email);
  const [devicesList, setDevicesList] = useState(profile.devices);

  const handleRemoveDevice = (id: string) => {
    setDevicesList((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto space-y-5">
      {/* ENCABEZADO Y PERFIL PÚBLICO (KYC VALIDADO) */}
      <section className="flex flex-col items-center text-center pt-2">
        {/* Avatar con Anillo de Verificación Lumínica */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#11DDB5] via-[#4bfad0] to-[#ABF244] shadow-[0_0_24px_rgba(17,221,181,0.35)] flex items-center justify-center">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full rounded-full object-cover bg-[#081317]"
            />
          </div>

          {/* Badge Verificado KYC con DNI */}
          <div className="absolute -bottom-1 -right-1 bg-[#081317] p-1 rounded-full shadow-md">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#11DDB5] text-[#081317]">
              <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
            </div>
          </div>
        </div>

        {/* Botón Revalidación biométrica con DNI */}
        <button
          onClick={onOpenBiometrics}
          className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-[#1b2c33] text-[#8EA6AC] hover:text-[#11DDB5] border border-white/5 active:scale-95 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[15px] text-[#11DDB5]">face_unlock</span>
          <span className="text-[11px] font-semibold">Revalidar foto con DNI biométrico</span>
        </button>

        {/* Nombres y Estado de Miembro */}
        <h1 className="text-xl font-bold text-[#F2F7F7] tracking-tight">{profile.name}</h1>
        <p className="text-xs text-[#8EA6AC] mt-0.5">{profile.role}</p>

        {/* Reputación del Cliente */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b2c33] border border-white/5 shadow-inner">
            <span className="material-symbols-outlined text-[15px] text-[#ABF244]">star</span>
            <span className="text-xs font-bold text-[#F2F7F7]">{profile.rating}</span>
            <span className="text-[11px] text-[#526B72]">({profile.reviewsCount} reseñas)</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#ABF244]/10 text-[#ABF244] border border-[#ABF244]/20 shadow-[0_0_12px_rgba(171,242,68,0.15)]">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            <span className="text-[11px] font-bold">{profile.badge}</span>
          </div>
        </div>

        {/* Micro Reseñas de Técnicos Acreditados */}
        <div className="w-full mt-4 flex flex-col gap-2 text-left">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-[#526B72] uppercase tracking-wider">
              Reseñas de técnicos acreditados
            </span>
            <span className="text-[10px] text-[#11DDB5] font-semibold">Total 28</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {profile.technicianReviews.map((rev) => (
              <div
                key={rev.id}
                className="min-w-[260px] flex-1 bg-[#102B33] p-3 rounded-2xl border border-[#11DDB5]/15 shadow-md flex flex-col justify-between"
              >
                <p className="text-xs text-[#d2e6ee] italic line-clamp-2">
                  "{rev.comment}"
                </p>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5 bg-[#1b2c33]/50 rounded-xl px-2 py-1">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-[#F2F7F7] truncate">{rev.author}</span>
                    <span className="text-[9px] text-[#8EA6AC]">{rev.role}</span>
                  </div>
                  <div className="flex items-center text-[#ABF244] text-xs font-bold">
                    <span className="material-symbols-outlined text-[13px]">star</span>
                    <span className="ml-0.5">{rev.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: CONFIGURAR CUENTA */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">account_box</span>
          <h2 className="text-sm font-bold text-[#F2F7F7] tracking-tight">Configurar cuenta</h2>
        </div>

        {/* Bloque Datos Personales */}
        <div className="bg-[#102B33] rounded-2xl p-4 border border-[#11DDB5]/15 shadow-md space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#526B72]">Nombre legal según Reniec</span>
              <span className="text-sm font-bold text-[#F2F7F7]">{profile.name}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#11DDB5]/15 text-[#11DDB5] text-[10px] font-bold border border-[#11DDB5]/30">
              {profile.dniStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {/* Phone Row */}
            <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-[#0c1e24] border border-white/5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[18px] text-[#8EA6AC]">call</span>
                <div className="flex flex-col min-w-0">
                  {isEditingPhone ? (
                    <input
                      type="text"
                      value={phoneVal}
                      onChange={(e) => setPhoneVal(e.target.value)}
                      className="bg-[#173B46] text-[#F2F7F7] text-xs px-2 py-0.5 rounded outline-none"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#F2F7F7]">{phoneVal}</span>
                  )}
                  <span className="text-[10px] text-[#11DDB5]">{profile.phoneStatus}</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditingPhone(!isEditingPhone)}
                className="text-[#8EA6AC] hover:text-[#11DDB5] p-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isEditingPhone ? 'check' : 'edit'}
                </span>
              </button>
            </div>

            {/* Email Row */}
            <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-[#0c1e24] border border-white/5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[18px] text-[#8EA6AC]">alternate_email</span>
                <div className="flex flex-col min-w-0">
                  {isEditingEmail ? (
                    <input
                      type="text"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      className="bg-[#173B46] text-[#F2F7F7] text-xs px-2 py-0.5 rounded outline-none"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#F2F7F7] truncate">{emailVal}</span>
                  )}
                  <span className="text-[10px] text-[#11DDB5]">{profile.emailStatus}</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="text-[#8EA6AC] hover:text-[#11DDB5] p-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isEditingEmail ? 'check' : 'edit'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bloque Dirección Habitual */}
        <div className="bg-[#102B33] rounded-2xl p-4 border border-[#11DDB5]/15 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#526B72]">Dirección predeterminada (Hogar)</span>
            <button
              onClick={() => alert(`Ubicación georreferenciada: ${profile.address}, ${profile.district}. Validada por catastro municipal.`)}
              className="text-[#11DDB5] text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">map</span> Ver mapa
            </button>
          </div>

          <div className="flex items-start gap-3 bg-[#0c1e24] p-3 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#173B46] flex items-center justify-center text-[#11DDB5] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">home_pin</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold text-[#F2F7F7] truncate">{profile.address}</span>
              <span className="text-[11px] text-[#8EA6AC]">{profile.district}</span>
              <span className="text-[10px] text-[#526B72] mt-1">{profile.addressNotes}</span>
            </div>
            <button
              onClick={() => alert('Modificar dirección de residencia principal protegida por protocolo GPS.')}
              className="text-[#8EA6AC] hover:text-[#11DDB5] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
        </div>

        {/* Bloque Métodos de Pago */}
        <div className="bg-[#102B33] rounded-2xl p-4 border border-[#11DDB5]/15 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#526B72]">Billeteras y Tarjetas registradas</span>
            <span className="text-[10px] text-[#ABF244] bg-[#ABF244]/10 px-2 py-0.5 rounded-full border border-[#ABF244]/20 font-bold">
              Escrow RB-05 Activo
            </span>
          </div>

          {/* Card 1: VISA */}
          <div className="flex items-center justify-between p-3 bg-[#0c1e24] rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-[#173B46] flex items-center justify-center text-[#F2F7F7] font-bold text-[10px] tracking-wider shadow-inner">
                VISA
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#F2F7F7]">Débito BCP •••• 4821</span>
                  <span className="px-1.5 py-0.2 bg-[#11DDB5]/20 text-[#11DDB5] text-[9px] font-bold rounded">
                    Principal
                  </span>
                </div>
                <span className="text-[10px] text-[#526B72]">Vence 09/27</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#11DDB5] text-[20px]">check_circle</span>
          </div>

          {/* Card 2: YAPE */}
          <div className="flex items-center justify-between p-3 bg-[#0c1e24] rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-[#7A1E99] flex items-center justify-center text-white font-black text-[10px] shadow-inner">
                YAPE
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#F2F7F7]">Billetera Yape</span>
                <span className="text-[10px] text-[#526B72]">+51 987 *** 321</span>
              </div>
            </div>
            <button className="text-[#526B72] hover:text-[#FF4D4D] p-1">
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>
          </div>

          {/* Botón Afiliar Nuevo */}
          <button
            onClick={() => alert('Abriendo pasarela protegida para vincular Plin, Mastercard o cuenta bancaria.')}
            className="w-full py-2.5 px-3 rounded-full bg-[#173B46]/70 hover:bg-[#173B46] text-[#11DDB5] text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] border border-[#11DDB5]/20"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>+ Afiliar nuevo método (Plin / Tarjeta)</span>
          </button>
        </div>
      </section>

      {/* SECCIÓN 2: INICIO DE SESIÓN Y SEGURIDAD */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-[#ABF244] text-[18px]">lock_clock</span>
          <h2 className="text-sm font-bold text-[#F2F7F7] tracking-tight">Inicio de sesión y seguridad</h2>
        </div>

        <div className="bg-[#102B33] rounded-2xl p-4 border border-[#11DDB5]/15 shadow-md divide-y divide-white/5 space-y-3">
          {/* Contraseña */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#F2F7F7]">Contraseña de acceso</span>
              <span className="text-[10px] text-[#526B72]">Última actualización hace 3 meses</span>
            </div>
            <button
              onClick={() => alert('Se ha enviado un código de confirmación a tu celular registrado para cambiar tu contraseña.')}
              className="px-3 py-1 rounded-full bg-[#1b2c33] text-[#11DDB5] hover:bg-[#173B46] text-xs font-semibold transition-colors"
            >
              Modificar
            </button>
          </div>

          {/* Clave PIN KYC */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#F2F7F7]">Clave PIN de seguridad</span>
                <span className="material-symbols-outlined text-[14px] text-[#ABF244]">fingerprint</span>
              </div>
              <span className="text-[10px] text-[#8EA6AC]">
                PIN de 6 dígitos + FaceID para validar servicios
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ABF244]/15 text-[#ABF244] text-xs font-bold border border-[#ABF244]/30">
              Activo
            </span>
          </div>

          {/* Cuentas Vinculadas */}
          <div className="flex flex-col pt-3 gap-2">
            <span className="text-[11px] text-[#526B72]">Cuentas vinculadas federadas</span>
            <div className="flex items-center justify-between bg-[#0c1e24] p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#11DDB5]">hub</span>
                <span className="text-xs text-[#F2F7F7]">Google (rodrigo.m@gmail.com)</span>
              </div>
              <span className="text-[11px] text-[#11DDB5] font-semibold">Conectado</span>
            </div>

            <div className="flex items-center justify-between bg-[#0c1e24] p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#526B72]">mail</span>
                <span className="text-xs text-[#8EA6AC]">Microsoft / Hotmail</span>
              </div>
              <button
                onClick={() => alert('Iniciando vinculación federada con Microsoft Live ID.')}
                className="text-[11px] text-[#F2F7F7] hover:text-[#11DDB5] underline"
              >
                Vincular
              </button>
            </div>
          </div>

          {/* Dispositivos Activos */}
          <div className="flex flex-col pt-3 gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#526B72]">Dispositivos con sesión autorizada</span>
              <span className="text-[11px] text-[#11DDB5] font-mono">{devicesList.length} Activos</span>
            </div>

            {devicesList.map((dev) => (
              <div
                key={dev.id}
                className="flex items-center justify-between bg-[#0c1e24] p-2.5 rounded-xl border border-white/5"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[#11DDB5] text-[20px] mt-0.5">
                    {dev.isCurrent ? 'smartphone' : 'tablet_mac'}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#F2F7F7]">{dev.name}</span>
                      {dev.isCurrent && (
                        <span className="px-1.5 py-0.2 text-[9px] bg-[#11DDB5] text-[#081317] font-bold rounded">
                          Este equipo
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#526B72]">
                      {dev.location} • {dev.status}
                    </span>
                  </div>
                </div>

                {!dev.isCurrent && (
                  <button
                    onClick={() => handleRemoveDevice(dev.id)}
                    className="px-2.5 py-1 rounded-full bg-[#1b2c33] text-[#FF4D4D] hover:bg-[#FF4D4D]/20 text-[11px] font-semibold active:scale-95 transition-all"
                  >
                    Cerrar sesión
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desactivar Cuenta Temporal */}
          <div className="pt-3 flex items-center justify-between">
            <div className="flex flex-col pr-2">
              <span className="text-xs font-bold text-[#F2F7F7]">Desactivar cuenta temporalmente</span>
              <span className="text-[10px] text-[#526B72]">
                Pone en pausa tus solicitudes y perfil sin borrar el historial.
              </span>
            </div>
            <button
              onClick={() => alert('La cuenta se mantendrá en reposo seguro sin asignaciones.')}
              className="px-3 py-1 rounded-full bg-[#1b2c33] text-[#FFAA2C] hover:bg-[#173B46] text-xs font-semibold shrink-0"
            >
              Pausar
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: CONFIGURACIÓN DE LA APLICACIÓN */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">tune</span>
          <h2 className="text-sm font-bold text-[#F2F7F7] tracking-tight">Configuración de la aplicación</h2>
        </div>

        <div className="bg-[#102B33] rounded-2xl p-4 border border-[#11DDB5]/15 shadow-md space-y-3">
          {/* Push Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1b2c33] flex items-center justify-center text-[#11DDB5]">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#F2F7F7]">Notificaciones push y SMS</span>
                <span className="text-[10px] text-[#8EA6AC]">Alertas de llegada de técnicos y cotizaciones</span>
              </div>
            </div>

            <button
              onClick={() => setPushEnabled(!pushEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                pushEnabled ? 'bg-[#11DDB5]' : 'bg-[#1b2c33]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#081317] transition-transform absolute top-0.5 ${
                  pushEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1b2c33] flex items-center justify-center text-[#ABF244]">
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#F2F7F7]">Tema visual</span>
                <span className="text-[10px] text-[#8EA6AC]">Modo oscuro tecno-corporativo activo</span>
              </div>
            </div>

            <div className="flex bg-[#081317] p-1 rounded-full border border-white/5">
              <button
                onClick={() => setThemeMode('dark')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  themeMode === 'dark' ? 'bg-[#11DDB5] text-[#081317]' : 'text-[#8EA6AC]'
                }`}
              >
                Oscuro
              </button>
              <button
                onClick={() => setThemeMode('light')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  themeMode === 'light' ? 'bg-[#11DDB5] text-[#081317]' : 'text-[#8EA6AC]'
                }`}
              >
                Claro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: SEGURIDAD Y PRIVACIDAD (RB-04 / RB-05 / RB-10) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-[#11DDB5] text-[18px]">shield_person</span>
          <h2 className="text-sm font-bold text-[#F2F7F7] tracking-tight">Seguridad y privacidad</h2>
        </div>

        <div className="bg-[#102B33] rounded-2xl p-4 border border-[#11DDB5]/15 shadow-md divide-y divide-white/5 space-y-3">
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col pr-2">
              <span className="text-xs font-bold text-[#F2F7F7]">Confirmación de lectura en chat</span>
              <span className="text-[10px] text-[#8EA6AC]">
                Permite a los técnicos saber si leíste sus mensajes (Regla RB-04)
              </span>
            </div>
            <button
              onClick={() => setReadReceiptsEnabled(!readReceiptsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                readReceiptsEnabled ? 'bg-[#11DDB5]' : 'bg-[#1b2c33]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#081317] transition-transform absolute top-0.5 ${
                  readReceiptsEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1b2c33] flex items-center justify-center text-[#FFAA2C]">
                <span className="material-symbols-outlined text-[18px]">person_off</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#F2F7F7]">Técnicos bloqueados</span>
                <span className="text-[10px] text-[#8EA6AC]">1 técnico en lista negra de asignación</span>
              </div>
            </div>
            <button
              onClick={() => alert('Lista de técnicos bloqueados: 1 proveedor excluido de tus solicitudes.')}
              className="px-3 py-1 rounded-full bg-[#1b2c33] text-[#F2F7F7] hover:text-[#11DDB5] text-xs font-semibold"
            >
              Gestionar
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex flex-col pr-2">
              <span className="text-xs font-bold text-[#FF4D4D]">Eliminar cuenta permanentemente</span>
              <span className="text-[10px] text-[#526B72]">
                Acción irreversible. Borrado total de datos personales y reputación.
              </span>
            </div>
            <button
              onClick={() => {
                if (confirm('¿Confirmas el borrado total de tu cuenta DOMU bajo protocolo de derecho al olvido?')) {
                  alert('Proceso de eliminación iniciado.');
                }
              }}
              className="px-3 py-1 rounded-full bg-[#93000a]/40 text-[#ffb4ab] hover:bg-[#93000a] text-xs font-semibold shrink-0"
            >
              Eliminar
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: LEGAL Y CUMPLIMIENTO */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-[#8EA6AC] text-[18px]">policy</span>
          <h2 className="text-sm font-bold text-[#F2F7F7] tracking-tight">Legal y cumplimiento normativo</h2>
        </div>

        <div className="bg-[#102B33] rounded-2xl border border-[#11DDB5]/15 shadow-md flex flex-col divide-y divide-white/5">
          <button
            onClick={() => alert('DOMU Patentes y Propiedad Intelectual: Sistema de emparejamiento georreferenciado con protocolo de confianza blindada.')}
            className="flex items-center justify-between p-3.5 text-xs text-[#8EA6AC] hover:text-[#F2F7F7] text-left transition-colors"
          >
            <span>Derechos de propiedad intelectual y patentes DOMU</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <button
            onClick={() => alert('Términos y Condiciones del Servicio DOMU en territorio peruano.')}
            className="flex items-center justify-between p-3.5 text-xs text-[#8EA6AC] hover:text-[#F2F7F7] text-left transition-colors"
          >
            <span>Términos y condiciones de uso del servicio</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <button
            onClick={() => alert('Tratamiento de Datos Personales conforme a la Ley N° 29733 de la República del Perú.')}
            className="flex items-center justify-between p-3.5 text-xs text-[#8EA6AC] hover:text-[#F2F7F7] text-left transition-colors"
          >
            <span>Política de privacidad y tratamiento de datos personales</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <button
            onClick={() => alert('Protocolo de cifrado RB-04: Cifrado asimétrico in-app para comunicaciones técnicas sin filtración de números telefónicos.')}
            className="flex items-center justify-between p-3.5 text-xs text-[#8EA6AC] hover:text-[#F2F7F7] text-left transition-colors"
          >
            <span>Licencias de software de cifrado (Protocolo RB-04)</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <button
            onClick={() => alert('Jurisdicción aplicable: Lima Metropolitana, República del Perú.')}
            className="flex items-center justify-between p-3.5 text-xs text-[#8EA6AC] hover:text-[#F2F7F7] text-left transition-colors"
          >
            <div className="flex flex-col">
              <span>Normativa GPS y jurisdicción municipal</span>
              <span className="text-[10px] text-[#526B72]">Lima Metropolitana, República del Perú</span>
            </div>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="text-center pt-2 pb-4">
          <span className="text-[10px] text-[#526B72] font-mono tracking-wider">
            DOMU CORE OS v3.8.4 • ENCRYPTED KYC
          </span>
        </div>
      </section>
    </div>
  );
};
