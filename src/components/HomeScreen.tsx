import React, { useState } from 'react';
import { ScreenType } from '../types';
import { SERVICE_CATEGORIES, NEARBY_PROVIDERS } from '../data/mockData';

interface HomeScreenProps {
  onSelectService: (serviceId: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('urgencias');

  const filteredProviders = NEARBY_PROVIDERS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#11DDB5]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿Qué necesitas hoy?"
            className="w-full pl-10 pr-10 py-3 rounded-full bg-[#102B33] text-[#F2F7F7] placeholder-[#526B72] text-sm focus:outline-none focus:bg-[#173B46] border border-[#11DDB5]/10 focus:border-[#11DDB5]/40 transition-colors shadow-inner"
          />
          <button
            aria-label="Filtros"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8EA6AC] hover:text-[#11DDB5]"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Action arrow button */}
        <button
          onClick={() => onSelectService('plomeria')}
          aria-label="Buscar servicio"
          className="w-11 h-11 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(17,221,181,0.3)] shrink-0"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
        </button>
      </div>

      {/* Quick Filter Badges */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setActiveFilter('urgencias')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'urgencias'
              ? 'bg-[#173B46] text-[#11DDB5] border border-[#11DDB5]/40 shadow-sm'
              : 'bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#11DDB5] animate-pulse"></span>
          <span>Urgencias hoy</span>
        </button>

        <button
          onClick={() => setActiveFilter('kyc')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'kyc'
              ? 'bg-[#173B46] text-[#ABF244] border border-[#ABF244]/40 shadow-sm'
              : 'bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px] text-[#ABF244]">verified</span>
          <span>KYC Certificado</span>
        </button>

        <button
          onClick={() => setActiveFilter('cercanos')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'cercanos'
              ? 'bg-[#173B46] text-[#11DDB5] border border-[#11DDB5]/40 shadow-sm'
              : 'bg-[#102B33] text-[#8EA6AC] hover:text-[#F2F7F7]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">near_me</span>
          <span>&lt; 3 km</span>
        </button>
      </div>

      {/* Institutional Protocol Banner */}
      <div className="relative mt-2 p-4 rounded-2xl bg-gradient-to-r from-[#102B33] to-[#0c1e24] border border-[#11DDB5]/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#11DDB5]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#173B46] border border-[#11DDB5]/30 flex items-center justify-center text-[#11DDB5] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">shield</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold text-[#11DDB5] uppercase tracking-wider">
                Protocolo de Confianza DOMU
              </span>
            </div>
            <h2 className="text-[16px] font-extrabold text-[#F2F7F7] leading-snug">
              "No cualquiera puede entrar a tu hogar. Elige bien, elige Domu."
            </h2>
            <p className="text-[11px] text-[#8EA6AC] mt-1.5 leading-relaxed">
              Proveedores 100% cotejados con antecedentes penales, identidad biométrica y garantía técnica activa.
            </p>
          </div>
        </div>
      </div>

      {/* Servicios Principales Header */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] font-bold text-[#F2F7F7] tracking-tight">Servicios Principales</h2>
          <span className="px-2 py-0.5 rounded-full bg-[#11DDB5]/10 text-[#11DDB5] text-[10px] font-bold">
            Inmediato
          </span>
        </div>
        <span className="text-[11px] text-[#8EA6AC]">Tarifa fijada</span>
      </div>

      {/* 2-Column Categories Grid */}
      <div className="grid grid-cols-2 gap-3">
        {SERVICE_CATEGORIES.map((cat) => {
          const isMore = cat.id === 'mas-opciones';
          return (
            <div
              key={cat.id}
              onClick={() => onSelectService(cat.id)}
              className={`group relative p-4 rounded-2xl bg-[#102B33] hover:bg-[#173B46] border border-[#11DDB5]/10 hover:border-[#11DDB5]/40 transition-all cursor-pointer shadow-md flex flex-col justify-between min-h-[125px] active:scale-[0.98] ${
                cat.id === 'plomeria' ? 'ring-1 ring-[#11DDB5]/40' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#173B46] group-hover:bg-[#102B33] text-[#11DDB5] flex items-center justify-center transition-colors shadow-inner">
                  <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                </div>
                {cat.activeBadge && (
                  <span className="w-2 h-2 rounded-full bg-[#11DDB5] shadow-[0_0_6px_#11DDB5]"></span>
                )}
                {isMore && (
                  <span className="material-symbols-outlined text-[16px] text-[#8EA6AC]">north_east</span>
                )}
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-bold text-[#F2F7F7] group-hover:text-[#11DDB5] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#8EA6AC] mt-0.5 line-clamp-1">{cat.description}</p>
                {isMore && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#081317] text-[#8EA6AC]">Barbería</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#081317] text-[#8EA6AC]">Limpieza</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Servicios en tu zona (San Isidro) */}
      <div className="flex items-center justify-between mt-7 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#11DDB5] animate-pulse"></span>
          <h2 className="text-[16px] font-bold text-[#F2F7F7]">Servicios en tu zona</h2>
        </div>
        <span className="text-[11px] text-[#11DDB5] font-semibold flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[13px]">location_on</span>
          San Isidro
        </span>
      </div>

      {/* Nearby Providers List */}
      <div className="flex flex-col gap-3">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="p-3.5 rounded-2xl bg-[#102B33] border border-[#11DDB5]/10 hover:border-[#11DDB5]/30 shadow-lg flex items-center justify-between gap-3 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs font-bold text-[#F2F7F7] truncate">{provider.name}</h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#11DDB5]/15 text-[#11DDB5] font-semibold">
                    100% Verificado
                  </span>
                </div>
                <p className="text-[11px] text-[#8EA6AC] truncate mt-0.5">{provider.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-[#8EA6AC] mt-1 flex-wrap">
                  <span className="text-[#ABF244] font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px] text-[#ABF244]">star</span>
                    {provider.rating}
                  </span>
                  <span>({provider.reviewCount})</span>
                  <span>•</span>
                  <span className="text-[#11DDB5] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[11px]">schedule</span>
                    Llega en {provider.eta}
                  </span>
                  <span>•</span>
                  <span>a {provider.distance}</span>
                </div>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex flex-col items-end shrink-0 gap-1.5">
              <div className="text-right">
                <div className="text-[10px] text-[#8EA6AC] leading-none">S/</div>
                <span className="text-base font-extrabold text-[#ABF244]">{provider.basePrice.toFixed(2)}</span>
                <span className="block text-[9px] text-[#526B72]">Tarifa base</span>
              </div>

              <button
                onClick={() => onSelectService(provider.category)}
                className="px-3 py-1.5 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-xs flex items-center gap-1 shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <span>Solicitar</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Protection Card */}
      <div className="mt-5 p-3.5 rounded-2xl bg-[#0c1e24] border border-[#11DDB5]/20 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#11DDB5]/15 text-[#11DDB5] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#F2F7F7]">Garantía DOMU Protección Activa</h4>
            <p className="text-[11px] text-[#8EA6AC]">Seguro de hasta S/ 10,000 en cada servicio</p>
          </div>
        </div>
        <button
          onClick={() => alert('Garantía oficial DOMU: Cubre hasta S/ 10,000 por siniestros o disconformidad técnica durante 30 días posteriores al trabajo.')}
          className="text-[#8EA6AC] hover:text-[#11DDB5] p-1"
        >
          <span className="material-symbols-outlined text-[18px]">info</span>
        </button>
      </div>
    </div>
  );
};
