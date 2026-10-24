import React, { useState } from 'react';
import { ServiceCategory } from '../types';

interface QuoteScreenProps {
  category: ServiceCategory | null;
  onLaunchRequest: (offerData: { price: number; mode: string; payment: string }) => void;
  onBack: () => void;
}

export const QuoteScreen: React.FC<QuoteScreenProps> = ({ category, onLaunchRequest, onBack }) => {
  const [selectedMode, setSelectedMode] = useState<'urgente' | 'ahora' | 'programar'>('ahora');
  const [currentPrice, setCurrentPrice] = useState(80.0);
  const [activePayment, setActivePayment] = useState<'yape' | 'visa'>('yape');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLaunch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onLaunchRequest({
        price: currentPrice,
        mode: selectedMode,
        payment: activePayment === 'yape' ? 'Yape Express' : 'Visa Debito',
      });
    }, 600);
  };

  return (
    <div className="w-full flex flex-col pb-28 pt-20 px-4 max-w-md mx-auto">
      <div className="bg-[#1b2c33] rounded-2xl p-3.5 border border-[#11DDB5]/20 flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#173B46] flex items-center justify-center text-[#11DDB5]">
          <span className="material-symbols-outlined">{category?.icon || 'home_repair_service'}</span>
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-[#11DDB5] uppercase">Categoria activa</span>
          <h2 className="text-sm font-bold text-[#F2F7F7] truncate">
            {category ? `${category.name} — ${category.description}` : 'Servicio solicitado'}
          </h2>
        </div>
      </div>
      <label className="text-sm font-bold text-[#F2F7F7] mb-2">Modalidad</label>
      <div className="flex flex-col gap-2 mb-6">
        {(['urgente', 'ahora', 'programar'] as const).map((m) => (
          <button key={m} type="button" onClick={() => setSelectedMode(m)}
            className={`p-3.5 rounded-2xl border text-left text-sm font-semibold capitalize ${selectedMode === m ? 'bg-[#173B46] border-[#11DDB5]' : 'bg-[#102B33] border-transparent'}`}>
            {m}
          </button>
        ))}
      </div>
      <label className="text-sm font-bold text-[#F2F7F7] mb-2">Tu oferta (S/)</label>
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={() => setCurrentPrice((p) => Math.max(76, p - 1))} className="w-10 h-10 rounded-full bg-[#173B46] text-[#11DDB5]">-</button>
        <span className="text-2xl font-extrabold text-[#ABF244]">S/ {currentPrice.toFixed(2)}</span>
        <button type="button" onClick={() => setCurrentPrice((p) => p + 1)} className="w-10 h-10 rounded-full bg-[#173B46] text-[#11DDB5]">+</button>
      </div>
      <div className="flex gap-2 mb-6">
        <button type="button" onClick={() => setActivePayment('yape')} className={`flex-1 py-2.5 rounded-full text-xs font-bold ${activePayment === 'yape' ? 'bg-[#11DDB5] text-[#081317]' : 'bg-[#102B33] text-[#8EA6AC]'}`}>Yape</button>
        <button type="button" onClick={() => setActivePayment('visa')} className={`flex-1 py-2.5 rounded-full text-xs font-bold ${activePayment === 'visa' ? 'bg-[#11DDB5] text-[#081317]' : 'bg-[#102B33] text-[#8EA6AC]'}`}>Visa</button>
      </div>
      <button type="button" disabled={isSubmitting} onClick={handleLaunch} className="w-full py-3 rounded-full bg-[#11DDB5] text-[#081317] font-bold text-sm disabled:opacity-60">
        {isSubmitting ? 'Enviando...' : 'Lanzar solicitud'}
      </button>
      <button type="button" onClick={onBack} className="mt-3 text-xs text-[#8EA6AC] text-center">Volver</button>
    </div>
  );
};
