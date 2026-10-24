import React, { useMemo, useState } from 'react';
import { ScreenType, HomeFilter } from '../types';
import { SERVICE_CATEGORIES, NEARBY_PROVIDERS } from '../data/mockData';

interface HomeScreenProps {
  onSelectService: (serviceId: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

function parseDistanceKm(distance: string): number {
  const m = distance.match(/([\d.,]+)\s*(km|m)/i);
  if (!m) return 99;
  const n = parseFloat(m[1].replace(',', '.'));
  return m[2].toLowerCase() === 'm' ? n / 1000 : n;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<HomeFilter>('urgencias');
  const q = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!q) return SERVICE_CATEGORIES;
    return SERVICE_CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredProviders = useMemo(() => {
    let list = NEARBY_PROVIDERS.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
    if (activeFilter === 'kyc') list = list.filter((p) => p.verified);
    else if (activeFilter === 'cercanos') list = list.filter((p) => parseDistanceKm(p.distance) < 3);
    else if (activeFilter === 'urgencias') {
      list = [...list].sort((a, b) => parseInt(a.eta.replace(/\D/g, '') || '99', 10) - parseInt(b.eta.replace(/\D/g, '') || '99', 10));
    }
    return list;
  }, [q, activeFilter]);

  const handleSearchSubmit = () => {
    if (filteredCategories.length === 1) { onSelectService(filteredCategories[0].id); return; }
    if (filteredProviders.length === 1) { onSelectService(filteredProviders[0].category); return; }
    const exact = SERVICE_CATEGORIES.find((c) => c.name.toLowerCase() === q || c.id === q);
    if (exact) onSelectService(exact.id);
  };

  const noResults = q.length > 0 && filteredCategories.length === 0 && filteredProviders.length === 0;

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-3 material-symbols-outlined text-[#11DDB5] text-[20px]">search</span>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            placeholder="Que necesitas hoy?"
            className="w-full pl-10 pr-4 py-3 rounded-full bg-[#102B33] text-sm outline-none border border-[#11DDB5]/10" />
        </div>
        <button type="button" onClick={handleSearchSubmit} className="w-11 h-11 rounded-full bg-[#11DDB5] text-[#081317] flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
        {([
          { id: 'urgencias' as HomeFilter, label: 'Urgencias' },
          { id: 'kyc' as HomeFilter, label: 'KYC' },
          { id: 'cercanos' as HomeFilter, label: '< 3 km' },
          { id: 'all' as HomeFilter, label: 'Todos' },
        ]).map((chip) => (
          <button key={chip.id} type="button" onClick={() => setActiveFilter(chip.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${activeFilter === chip.id ? 'bg-[#173B46] text-[#11DDB5] border border-[#11DDB5]/40' : 'bg-[#102B33] text-[#8EA6AC]'}`}>
            {chip.label}
          </button>
        ))}
      </div>
      <h2 className="text-lg font-bold text-[#F2F7F7] mt-4 mb-3">Servicios</h2>
      {noResults ? (
        <div className="p-6 rounded-2xl bg-[#102B33] text-center text-sm text-[#8EA6AC]">
          Sin resultados
          <button type="button" onClick={() => setSearchQuery('')} className="block mx-auto mt-3 px-4 py-2 rounded-full bg-[#11DDB5] text-[#081317] text-xs font-bold">Limpiar</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredCategories.map((cat) => (
            <button key={cat.id} type="button" onClick={() => onSelectService(cat.id)}
              className="p-4 rounded-2xl bg-[#102B33] border border-[#11DDB5]/10 text-left">
              <span className="material-symbols-outlined text-[#11DDB5] text-[22px]">{cat.icon}</span>
              <h3 className="text-sm font-bold text-[#F2F7F7] mt-2">{cat.name}</h3>
              <p className="text-[11px] text-[#8EA6AC]">{cat.description}</p>
            </button>
          ))}
        </div>
      )}
      <h2 className="text-base font-bold text-[#F2F7F7] mt-7 mb-3">En tu zona</h2>
      <div className="flex flex-col gap-3">
        {filteredProviders.map((p) => (
          <button key={p.id} type="button" onClick={() => onSelectService(p.category)}
            className="p-3.5 rounded-2xl bg-[#102B33] border border-[#11DDB5]/10 flex items-center gap-3 text-left">
            <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold text-[#F2F7F7] truncate">{p.name}</h3>
              <p className="text-[11px] text-[#8EA6AC] truncate">{p.title}</p>
              <p className="text-[10px] text-[#11DDB5]">{p.eta} · {p.distance}</p>
            </div>
            <span className="text-sm font-extrabold text-[#ABF244]">S/ {p.basePrice.toFixed(0)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
