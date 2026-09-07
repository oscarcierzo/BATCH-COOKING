import React from 'react';
import { Tanda } from '../types';
import { 
  X, 
  Clock, 
  Flame, 
  Layers, 
  CheckCircle, 
  Play, 
  Copy, 
  AlertTriangle, 
  Sparkles,
  UtensilsCrossed,
  ChefHat
} from 'lucide-react';

interface TandaDetailModalProps {
  tanda: Tanda | null;
  onClose: () => void;
  onStartTimer: (tanda: Tanda) => void;
  onDuplicate: (tanda: Tanda) => void;
}

export const TandaDetailModal: React.FC<TandaDetailModalProps> = ({
  tanda,
  onClose,
  onStartTimer,
  onDuplicate,
}) => {
  if (!tanda) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FDFCF8] border border-[#E0DBCF] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E0DBCF] bg-[#F5F2EB] flex items-start justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#5A634D]/15 text-[#5A634D] border border-[#5A634D]/25">
                Mambo 10090 · 4 Niveles
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-[#8A8475] border border-[#E0DBCF] capitalize font-medium">
                {tanda.categoria}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-[#8A8475] border border-[#E0DBCF]">
                {tanda.raciones} Raciones
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3D3D3D] font-['Outfit',sans-serif]">
              {tanda.titulo}
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8475] mt-1">
              {tanda.subtitulo}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-[#EDE9DE] text-[#8A8475] hover:text-[#3D3D3D] border border-[#E0DBCF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Mambo 10090 Config Strip */}
          <div className="bg-[#F5F2EB] border border-[#E0DBCF] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#5A634D] uppercase tracking-wider flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" />
                <span>Parámetros Exactos Robot Mambo 10090</span>
              </span>
              <span className="text-xs text-[#8A8475]">
                Jarra:{' '}
                <strong className="text-[#3D3D3D] capitalize font-semibold">
                  {tanda.mamboParams.jarraType === 'habana' ? 'Jarra Habana (Cerámica)' : 'Jarra Inox (Acero)'}
                </strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-white p-3 rounded-xl border border-[#E0DBCF] text-center shadow-xs">
                <span className="text-[11px] text-[#8A8475] block font-medium">Tiempo</span>
                <span className="text-lg font-extrabold text-[#3D3D3D] font-mono">
                  {tanda.mamboParams.tiempoMinutes} min
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E0DBCF] text-center shadow-xs">
                <span className="text-[11px] text-[#8A8475] block font-medium">Temperatura</span>
                <span className="text-lg font-extrabold text-[#9E7326] font-mono">
                  {tanda.mamboParams.temperatura} ºC
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E0DBCF] text-center shadow-xs">
                <span className="text-[11px] text-[#8A8475] block font-medium">Potencia Calorífica</span>
                <span className="text-lg font-extrabold text-[#A35D39] font-mono">
                  P{tanda.mamboParams.potencia}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E0DBCF] text-center shadow-xs">
                <span className="text-[11px] text-[#8A8475] block font-medium">Velocidad</span>
                <span className="text-lg font-extrabold text-[#5A634D] font-mono">
                  V{tanda.mamboParams.velocidad}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E0DBCF] text-center col-span-2 sm:col-span-1 shadow-xs">
                <span className="text-[11px] text-[#8A8475] block font-medium">Accesorio</span>
                <span className="text-xs font-extrabold text-[#7B866B] block mt-1 uppercase">
                  {tanda.mamboParams.accesorio === 'sin_accesorio' ? 'Sin Accesorio' : tanda.mamboParams.accesorio}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Levels Detailed Breakdown */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#3D3D3D] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5A634D]" />
              <span>Desglose Detallado por Nivel (Ingredientes & Tiempos)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Level 4: Vaporera Alta */}
              <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#5A634D] text-white font-bold text-xs">
                      NIVEL 4 · Vaporera Superior
                    </span>
                    <span className="text-xs font-mono text-[#8A8475]">
                      ⏱️ {tanda.niveles.vaporera_arriba.recommendedTimeMinutes} min
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#3D3D3D] mb-1.5">
                    {tanda.niveles.vaporera_arriba.food}
                  </h4>
                  <ul className="text-xs text-[#8A8475] space-y-1 mb-3 pl-3 list-disc">
                    {tanda.niveles.vaporera_arriba.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                {tanda.niveles.vaporera_arriba.tips && (
                  <p className="text-[11px] text-[#5A634D] bg-[#F5F2EB] p-2 rounded-lg border border-[#E0DBCF]">
                    💡 <strong>Tip nivel 4:</strong> {tanda.niveles.vaporera_arriba.tips}
                  </p>
                )}
              </div>

              {/* Level 3: Vaporera Baja */}
              <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#7B866B] text-white font-bold text-xs">
                      NIVEL 3 · Vaporera Inferior
                    </span>
                    <span className="text-xs font-mono text-[#8A8475]">
                      ⏱️ {tanda.niveles.vaporera_abajo.recommendedTimeMinutes} min
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#3D3D3D] mb-1.5">
                    {tanda.niveles.vaporera_abajo.food}
                  </h4>
                  <ul className="text-xs text-[#8A8475] space-y-1 mb-3 pl-3 list-disc">
                    {tanda.niveles.vaporera_abajo.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                {tanda.niveles.vaporera_abajo.tips && (
                  <p className="text-[11px] text-[#7B866B] bg-[#F5F2EB] p-2 rounded-lg border border-[#E0DBCF]">
                    💡 <strong>Tip nivel 3:</strong> {tanda.niveles.vaporera_abajo.tips}
                  </p>
                )}
              </div>

              {/* Level 2: Cestillo */}
              <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#C49746] text-white font-bold text-xs">
                      NIVEL 2 · Cestillo Interior
                    </span>
                    <span className="text-xs font-mono text-[#8A8475]">
                      ⏱️ {tanda.niveles.cestillo.recommendedTimeMinutes} min
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#3D3D3D] mb-1.5">
                    {tanda.niveles.cestillo.food}
                  </h4>
                  <ul className="text-xs text-[#8A8475] space-y-1 mb-3 pl-3 list-disc">
                    {tanda.niveles.cestillo.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                {tanda.niveles.cestillo.tips && (
                  <p className="text-[11px] text-[#9E7326] bg-[#F5F2EB] p-2 rounded-lg border border-[#E0DBCF]">
                    💡 <strong>Tip nivel 2:</strong> {tanda.niveles.cestillo.tips}
                  </p>
                )}
              </div>

              {/* Level 1: Jarra */}
              <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#A35D39] text-white font-bold text-xs">
                      NIVEL 1 · Jarra {tanda.mamboParams.jarraType === 'habana' ? 'Habana' : 'Inox'}
                    </span>
                    <span className="text-xs font-mono text-[#8A8475]">
                      ⏱️ {tanda.niveles.jarra.recommendedTimeMinutes} min
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#3D3D3D] mb-1.5">
                    {tanda.niveles.jarra.food}
                  </h4>
                  <ul className="text-xs text-[#8A8475] space-y-1 mb-3 pl-3 list-disc">
                    {tanda.niveles.jarra.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                {tanda.niveles.jarra.tips && (
                  <p className="text-[11px] text-[#A35D39] bg-[#F5F2EB] p-2 rounded-lg border border-[#E0DBCF]">
                    💡 <strong>Tip nivel 1:</strong> {tanda.niveles.jarra.tips}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pasos de Cocinado */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#3D3D3D] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#5A634D]" />
              <span>Instrucciones Paso a Paso en Mambo</span>
            </h3>
            <div className="space-y-2">
              {tanda.pasos.map((paso, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E0DBCF] flex items-start gap-3 shadow-xs"
                >
                  <span className="w-6 h-6 rounded-full bg-[#5A634D] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#3D3D3D] leading-relaxed">
                    {paso}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Platos que genera para el Menú Semanal */}
          <div className="bg-[#F5F2EB] border border-[#E0DBCF] rounded-xl p-4 sm:p-5">
            <h3 className="text-sm font-bold text-[#3D3D3D] flex items-center gap-2 mb-3">
              <UtensilsCrossed className="w-4 h-4 text-[#5A634D]" />
              <span>Combinaciones y Platos para la Semana</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tanda.platosGenerados.map((plato, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white border border-[#E0DBCF] text-xs text-[#3D3D3D]"
                >
                  🥗 {plato}
                </div>
              ))}
            </div>
          </div>

          {/* Consejos del Chef */}
          <div className="bg-[#EDE9DE] border border-[#D1CCBF] rounded-xl p-4">
            <h3 className="text-xs font-bold text-[#5A634D] uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trucos de Cocinero Profesional para Mambo 10090</span>
            </h3>
            <ul className="text-xs text-[#3D3D3D] space-y-1.5 pl-4 list-disc">
              {tanda.consejosChef.map((consejo, idx) => (
                <li key={idx}>{consejo}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#E0DBCF] bg-[#F5F2EB] flex items-center justify-between gap-3 sticky bottom-0 z-10">
          <button
            onClick={() => onDuplicate(tanda)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-medium transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Usar como Plantilla Base</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#EDE9DE] text-[#8A8475] hover:text-[#3D3D3D] border border-[#E0DBCF] text-xs font-medium transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onStartTimer(tanda);
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#5A634D] hover:bg-[#49513E] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Cocinar con Temporizador en Vivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
