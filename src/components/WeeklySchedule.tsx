import React from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Utensils, 
  ShieldCheck,
  Layers,
  Heart,
  Droplets
} from 'lucide-react';

export const WeeklySchedule: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* CRONOGRAMA MAESTRO DE LA SESIÓN EN 90 MINUTOS */}
      <div className="bg-[#FAF7F2] border border-[#E2D7CB] rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E2D7CB]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A4B26]/10 border border-[#7A4B26]/20 text-[#7A4B26] text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5 text-[#7A4B26]" />
              <span>Estructura Lógica de Optimización Temporal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2E241B] font-['Outfit',sans-serif]">
              Sesión Maestra de Batch Cooking (90 minutos)
            </h2>
            <p className="text-xs sm:text-sm text-[#6D5E50] mt-1 max-w-3xl">
              Cómo organizar el fin de semana para cocinar comida para varios días en solo dos tandas consecutivas
              aprovechando la doble jarra (Inox + Habana) de tu Cecotec Mambo 10090.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E2D7CB] shadow-xs shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-[#827364] uppercase tracking-wider block font-semibold">
                Tiempo Activo en Cocina
              </span>
              <span className="text-base font-bold text-[#7A4B26]">Solo 35 minutos</span>
            </div>
            <span className="text-[#D4C4B2]">|</span>
            <div>
              <span className="text-[10px] text-[#827364] uppercase tracking-wider block font-semibold">
                Cocinado Robot Mambo
              </span>
              <span className="text-base font-bold text-[#A85A32]">55–65 min (Vapor)</span>
            </div>
          </div>
        </div>

        {/* Ventajas para la convivencia en la cocina */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#F4EDE2] border border-[#DFCDBA] flex items-center gap-3 text-xs text-[#5A4B3E]">
          <Heart className="w-4 h-4 text-[#7A4B26] shrink-0" />
          <p>
            <strong>La clave para no ensuciar:</strong> Se prepara todo en crudo, se coloca en las 4 alturas y mientras la Mambo cocina 30 minutos al vapor, la encimera de madera queda recogida y limpia.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-6">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-white border border-[#E2D7CB] flex flex-col justify-between relative group shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A4B26] font-mono">00:00 - 00:15</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7A4B26]/10 text-[#7A4B26] font-semibold">
                  Fase 1
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#2E241B]">Mise en Place Exprés</h4>
              <p className="text-[11px] text-[#6D5E50] leading-relaxed">
                Pesar ingredientes en la báscula integrada de la Mambo. Cortar verduras en trozos homogéneos y colocar
                las proteínas con un chorrito de aceite y especias.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E2D7CB] text-[10px] text-[#A0641E] font-medium">
              💡 Cortar el brócoli en ramilletes parejos
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-white border border-[#E2D7CB] flex flex-col justify-between relative group shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A4B26] font-mono">00:15 - 00:45</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7A4B26]/10 text-[#7A4B26] font-semibold">
                  Fase 2
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#2E241B]">Tanda 1 (4 Niveles)</h4>
              <p className="text-[11px] text-[#6D5E50] leading-relaxed">
                Montar Jarra Inox + Cestillo + Vaporera honda + Vaporera plana. 30 min · 120 ºC · P8 · V0.
                <strong> ¡30 minutos libres para desconectar mientras la Mambo cocina 4 platos!</strong>
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E2D7CB] text-[10px] text-[#4B6846] font-medium">
              ✨ Tiempo libre con cocina limpia
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-white border border-[#E2D7CB] flex flex-col justify-between relative group shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A4B26] font-mono">00:45 - 00:55</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7A4B26]/10 text-[#7A4B26] font-semibold">
                  Fase 3
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#2E241B]">Choque Térmico & Crema</h4>
              <p className="text-[11px] text-[#6D5E50] leading-relaxed">
                Retirar la vaporera. Pasar las verduras 30 seg por agua fría para fijar el verde. Extraer cestillo.
                Triturar la crema del fondo (V5 a V10 progresiva con un chorrito de AOVE).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E2D7CB] text-[10px] text-[#824D28] font-medium">
              🧊 El frío conserva vitaminas y color
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-white border border-[#E2D7CB] flex flex-col justify-between relative group shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A4B26] font-mono">00:55 - 01:25</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7A4B26]/10 text-[#7A4B26] font-semibold">
                  Fase 4
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#2E241B]">Tanda 2 (Jarra Habana)</h4>
              <p className="text-[11px] text-[#6D5E50] leading-relaxed">
                Colocar la Jarra Habana (cerámica) con cuchara MamboMix para preparar un pisto o guiso, o segunda
                tanda multinivel con salmón y verduras al vapor.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E2D7CB] text-[10px] text-[#A85A32] font-medium">
              🍳 Jarra Habana = Cero pegado
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl bg-white border border-[#E2D7CB] flex flex-col justify-between relative group shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7A4B26] font-mono">01:25 - 01:35</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7A4B26]/10 text-[#7A4B26] font-semibold">
                  Fase 5
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#2E241B]">Envasado Hermético</h4>
              <p className="text-[11px] text-[#6D5E50] leading-relaxed">
                Distribuir en tápers herméticos de cristal. Dejar enfriar antes de tapar y meter a la nevera.
                ¡Comida casera resuelta para toda la semana!
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E2D7CB] text-[10px] text-[#7A4B26] font-medium">
              🍱 Tápers de cristal = 4 a 6 días frescos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
