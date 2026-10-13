import React, { useState } from 'react';
import { HISTORY_ITEMS } from '../data/mockData';

interface HistoryScreenProps {
  onOpenChat: () => void;
  onOpenSupport: () => void;
  onScheduleFavorite: (technicianName: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onOpenChat,
  onOpenSupport,
  onScheduleFavorite,
}) => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'favoritos' | 'garantia' | 'reporte'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
    'hist-2': true,
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = HISTORY_ITEMS.filter((item) => {
    if (activeFilter === 'favoritos' && !favorites[item.id]) return false;
    if (activeFilter === 'garantia' && item.status !== 'en_garantia') return false;
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.folio.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      {/* Search and Date Filter Row */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#11DDB5]">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por folio, técnico o servicio..."
            className="w-full pl-10 pr-3.5 py-2.5 rounded-full bg-[#102B33] text-[#F2F7F7] placeholder-[#526B72] text-xs focus:outline-none focus:bg-[#173B46] border border-[#11DDB5]/15 transition-colors shadow-inner"
          />
        </div>

        {/* Month Selector Capsule */}
        <button
          onClick={() => alert('Mostrando filtro por meses: Septiembre 2026 activo.')}
          className="flex items-center gap-1 px-3 py-2.5 rounded-full bg-[#102B33] border border-[#11DDB5]/15 text-[#F2F7F7] hover:bg-[#173B46] active:scale-95 transition-all shrink-0 text-xs font-semibold"
        >
          <span className="material-symbols-outlined text-[16px] text-[#ABF244]">calendar_month</span>
          <span>Sep 2026</span>
          <span className="material-symbols-outlined text-[14px] text-[#8EA6AC]">expand_more</span>
        </button>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        <button
          onClick={() => setActiveFilter('todos')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'todos'
              ? 'bg-[#173B46] text-[#11DDB5] border border-[#11DDB5]/40 shadow-sm'
              : 'bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#11DDB5] animate-pulse"></span>
          <span>Todos (8)</span>
        </button>

        <button
          onClick={() => setActiveFilter('favoritos')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'favoritos'
              ? 'bg-[#173B46] text-[#ABF244] border border-[#ABF244]/40 shadow-sm'
              : 'bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="material-symbols-outlined text-[13px] text-[#ABF244]">star</span>
          <span>Favoritos (3)</span>
        </button>

        <button
          onClick={() => setActiveFilter('garantia')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'garantia'
              ? 'bg-[#173B46] text-[#11DDB5] border border-[#11DDB5]/40 shadow-sm'
              : 'bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="material-symbols-outlined text-[13px]">verified_user</span>
          <span>En garantía (2)</span>
        </button>

        <button
          onClick={() => setActiveFilter('reporte')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'reporte'
              ? 'bg-[#173B46] text-[#FFAA2C] border border-[#FFAA2C]/40 shadow-sm'
              : 'bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="material-symbols-outlined text-[13px] text-[#FFAA2C]">report_problem</span>
          <span>Con reporte (0)</span>
        </button>
      </div>

      {/* Activity Feed */}
      <div className="flex flex-col gap-4">
        {filteredItems.map((item) => {
          const isFav = favorites[item.id];
          return (
            <article
              key={item.id}
              className="w-full rounded-2xl bg-[#102B33] border border-[#11DDB5]/15 p-4 shadow-lg relative overflow-hidden flex flex-col gap-3 transition-all"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#11DDB5]/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Top Row: Status badge & Price */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.status === 'en_garantia' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#081317] text-[#11DDB5] text-[10px] font-bold border border-[#11DDB5]/20 shadow-sm">
                      <span className="material-symbols-outlined text-[12px]">shield</span>
                      Garantía activa • {item.warrantyDays} días
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#081317] text-[#ABF244] text-[10px] font-bold border border-[#ABF244]/20 shadow-sm">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      Calificado 5.0
                    </span>
                  )}
                  <span className="text-[10px] text-[#526B72] font-mono">{item.folio}</span>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="text-base font-extrabold text-[#ABF244] tracking-tight">
                    S/ {item.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-[#8EA6AC] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#11DDB5]"></span>
                    {item.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Service Title and Date */}
              <div>
                <div className="flex items-center gap-1.5 text-[#8EA6AC] text-[11px] mb-0.5">
                  <span>{item.date} • {item.time}</span>
                  <span>•</span>
                  <span className={item.status === 'en_garantia' ? 'text-[#11DDB5]' : 'text-[#8EA6AC]'}>
                    {item.status === 'en_garantia' ? 'Servicio completado' : 'Servicio finalizado'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#F2F7F7] leading-snug">{item.title}</h3>
              </div>

              {/* Media Snippet & Provider Row */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Video Diagnosis Thumbnail */}
                <div
                  onClick={() => alert(`Reproduciendo registro de auditoría ${item.videoTitle} (audio y video encriptados).`)}
                  className="relative w-full h-24 rounded-xl overflow-hidden bg-[#081317] group cursor-pointer shadow-inner border border-white/5"
                >
                  <img
                    src={item.videoThumb}
                    alt={item.videoTitle}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081317]/90 via-[#081317]/30 to-transparent flex flex-col justify-between p-2">
                    <div className="flex justify-between items-center">
                      <span className="px-1.5 py-0.2 rounded-full bg-[#081317]/80 text-[#F2F7F7] text-[9px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D] animate-ping"></span>
                        Video M6
                      </span>
                      <span className="text-[9px] text-[#8EA6AC] bg-[#102B33]/80 px-1 py-0.2 rounded">
                        {item.videoDuration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                      </div>
                      <span className="text-[10px] text-[#F2F7F7] truncate">{item.videoTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Provider Cardlet */}
                <div className="p-2 rounded-xl bg-[#1b2c33] border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative shrink-0">
                      <img
                        src={item.provider.avatar}
                        alt={item.provider.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[8px]">check</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#F2F7F7] truncate">{item.provider.name}</h4>
                      <div className="flex items-center gap-1 text-[#8EA6AC] text-[10px] mt-0.5">
                        <span className="material-symbols-outlined text-[11px] text-[#ABF244]">star</span>
                        <span className="text-[#F2F7F7] font-bold">{item.provider.rating}</span>
                        <span>({item.provider.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-white/5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#11DDB5]">lock</span>
                    <span className="text-[9px] text-[#8EA6AC] truncate">
                      {item.status === 'en_garantia' ? 'Regla RB-04: Cifrado in-app' : 'Disponible para visita directa'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                {item.status === 'en_garantia' ? (
                  <>
                    <button
                      onClick={onOpenChat}
                      className="flex-1 h-10 px-3 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>Mensaje in-app</span>
                    </button>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-all ${
                        isFav ? 'bg-[#173B46] text-[#ABF244]' : 'bg-[#173B46] text-[#8EA6AC]'
                      }`}
                      title="Marcar como favorito"
                    >
                      <span className="material-symbols-outlined text-[18px]">bookmark</span>
                    </button>

                    <button
                      onClick={() => alert(`El proveedor ${item.provider.name} ha sido bloqueado de futuras asignaciones automáticas.`)}
                      className="w-10 h-10 rounded-full bg-[#173B46] text-[#526B72] hover:text-[#FF4D4D] flex items-center justify-center shadow-sm active:scale-90 transition-all"
                      title="Bloquear proveedor"
                    >
                      <span className="material-symbols-outlined text-[18px]">block</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onScheduleFavorite(item.provider.name)}
                      className="flex-1 h-10 px-3 rounded-full bg-[#173B46] hover:bg-[#2a3c42] text-[#ABF244] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                      <span>Programar con Marco</span>
                    </button>

                    <button
                      onClick={onOpenChat}
                      className="w-10 h-10 rounded-full bg-[#102B33] text-[#11DDB5] border border-[#11DDB5]/20 flex items-center justify-center shadow-sm active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                    </button>

                    <button
                      onClick={() => alert(`Folio #${item.folio}: Descargando comprobante de pago electrónico Sunat y certificado de garantía 30 días.`)}
                      className="w-10 h-10 rounded-full bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7] flex items-center justify-center shadow-sm active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </>
                )}
              </div>

              {/* Support Banner for active guarantee item */}
              {item.status === 'en_garantia' && (
                <div className="rounded-xl bg-[#173B46]/70 border border-[#11DDB5]/15 p-2.5 flex items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#081317] text-[#11DDB5] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[15px]">headset_mic</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#F2F7F7] truncate">
                        ¿Problemas con el servicio o cobro?
                      </p>
                      <p className="text-[10px] text-[#8EA6AC] truncate">
                        Soporte Domu para Folio {item.folio}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenSupport}
                    className="px-3 py-1 rounded-full bg-[#102B33] hover:bg-[#081317] text-[#11DDB5] text-xs font-semibold shrink-0"
                  >
                    Llamada
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Informational Security Banner (Rule RB-04 & RB-05) */}
      <aside className="w-full mt-5 rounded-2xl bg-[#0c1e24] border border-[#11DDB5]/20 p-4 shadow-md flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#102B33] text-[#11DDB5] flex items-center justify-center shrink-0 mt-0.5 border border-[#11DDB5]/30">
          <span className="material-symbols-outlined text-[18px]">security</span>
        </div>
        <div className="flex flex-col gap-1 text-[#8EA6AC] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F2F7F7]">Garantía y Privacidad Domu</span>
            <span className="px-1.5 py-0.2 rounded bg-[#081317] text-[#11DDB5] text-[10px] font-mono">
              RB-04 / RB-05
            </span>
          </div>
          <p className="text-[11px] text-[#526B72] leading-relaxed">
            Tus chats y llamadas permanecen cifrados dentro de la plataforma. Para proteger tu garantía oficial de 30 días y cobertura contra siniestros, nunca compartas números personales o pagos directos en efectivo fuera de la aplicación.
          </p>
        </div>
      </aside>
    </div>
  );
};
