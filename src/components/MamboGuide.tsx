import React from 'react';
import { DEFAULT_CHEF_RULES } from '../data/defaultTandas';
import { 
  ChefHat, 
  Layers, 
  ShieldCheck, 
  Thermometer, 
  Gauge
} from 'lucide-react';

export const MamboGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#FAF7F2] border border-[#E2D7CB] rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#7A4B26]/10 border border-[#7A4B26]/25 text-[#7A4B26] flex items-center justify-center">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2E241B] font-['Outfit',sans-serif]">
              Manual Técnico del Chef · Cecotec Mambo 10090
            </h2>
            <p className="text-xs text-[#6D5E50]">
              Secretos culinarios y calibración precisa de niveles para evitar errores y obtener resultados profesionales.
            </p>
          </div>
        </div>

        {/* 4 Levels Anatomy Diagram */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-[#E2D7CB] space-y-4 shadow-xs">
          <h3 className="text-xs font-bold text-[#7A4B26] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#7A4B26]" />
            <span>Anatomía de los 4 Niveles Simultáneos</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {/* Level 4 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2D7CB] space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#4B6846] text-white font-bold text-[10px]">
                  NIVEL 4
                </span>
                <span className="text-[10px] text-[#827364]">Superior</span>
              </div>
              <h4 className="font-bold text-[#2E241B]">Vaporera Alta (Bandeja Plana)</h4>
              <p className="text-[#6D5E50] text-[11px] leading-relaxed">
                Vapor suave y rápido (20-22 min). Alimentos delicados que no deben romperse: brócoli,
                espárragos verdes, calabacín, judías verdes, setas o tortillas al vapor.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2D7CB] space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#824D28] text-white font-bold text-[10px]">
                  NIVEL 3
                </span>
                <span className="text-[10px] text-[#827364]">Inferior</span>
              </div>
              <h4 className="font-bold text-[#2E241B]">Vaporera Baja (Bandeja Honda)</h4>
              <p className="text-[#6D5E50] text-[11px] leading-relaxed">
                Vapor intenso y directo (25-30 min). Proteínas densas y tubérculos: pechugas marinadas, albóndigas al vapor,
                lomos de salmón en papillote, boniato o patata cascada.
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2D7CB] space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#C07D2C] text-white font-bold text-[10px]">
                  NIVEL 2
                </span>
                <span className="text-[10px] text-[#827364]">Interior</span>
              </div>
              <h4 className="font-bold text-[#2E241B]">Cestillo de Hervido / Vapor</h4>
              <p className="text-[#6D5E50] text-[11px] leading-relaxed">
                Dentro de la jarra, por encima del líquido. Ideal para arroz basmati (ultra suelto sin
                pegarse), 6 huevos duros perfectos, patatas baby o pasta corta.
              </p>
            </div>

            {/* Level 1 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2D7CB] space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#A85A32] text-white font-bold text-[10px]">
                  NIVEL 1
                </span>
                <span className="text-[10px] text-[#827364]">Base</span>
              </div>
              <h4 className="font-bold text-[#2E241B]">Jarra Inox o Jarra Habana</h4>
              <p className="text-[#6D5E50] text-[11px] leading-relaxed">
                Fondo líquido de mínimo 650ml que genera el vapor ascendente mientras cocina: cremas de verduras, fumets de
                pescado, guisos de legumbres o sofritos mediterráneos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Las 7 Reglas de Oro */}
      <div className="bg-white border border-[#E2D7CB] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#2E241B] font-['Outfit',sans-serif] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#7A4B26]" />
          <span>Las 7 Reglas de Oro del Robot Mambo 10090</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEFAULT_CHEF_RULES.map((rule) => (
            <div
              key={rule.numero}
              className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2D7CB] space-y-1.5 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7A4B26]/10 border border-[#7A4B26]/20 text-[#7A4B26] text-xs font-bold flex items-center justify-center shrink-0">
                  {rule.numero}
                </span>
                <h4 className="text-xs font-bold text-[#2E241B]">{rule.titulo}</h4>
              </div>
              <p className="text-xs text-[#6D5E50] pl-8 leading-relaxed">
                {rule.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla Comparativa: Jarra Inox vs Jarra Habana */}
      <div className="bg-white border border-[#E2D7CB] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#2E241B] font-['Outfit',sans-serif] flex items-center gap-2">
          <Gauge className="w-5 h-5 text-[#C07D2C]" />
          <span>Doble Jarra Mambo 10090: ¿Cuándo usar cada una?</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Inox */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2D7CB] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2D7CB] pb-2">
              <span className="font-bold text-[#2E241B] uppercase tracking-wider text-xs">
                Jarra Inox (Acero Inoxidable)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#827364] font-mono border border-[#E2D7CB]">
                Todoterreno
              </span>
            </div>
            <ul className="space-y-1.5 text-[#2E241B] list-disc pl-4">
              <li>
                <strong>Triturados de alta velocidad:</strong> Apta para triturar cremas y purés hirviendo a Velocidad 5 a
                10 con cuchillas.
              </li>
              <li>
                <strong>Grandes volúmenes de vapor:</strong> Soporta potencias altas (P8) con agua y caldo sin degradarse.
              </li>
              <li>
                <strong>Apta para lavavajillas:</strong> Fácil y rápida de limpiar tras la primera tanda.
              </li>
              <li>
                <strong>Accesorio preferente:</strong> Cuchillas de corte o Cestillo de hervir.
              </li>
            </ul>
          </div>

          {/* Habana */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2D7CB] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2D7CB] pb-2">
              <span className="font-bold text-[#A85A32] uppercase tracking-wider text-xs">
                Jarra Habana (Cerámica Antiadherente)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#A85A32]/10 text-[#A85A32] font-mono border border-[#A85A32]/25">
                Antiadherente
              </span>
            </div>
            <ul className="space-y-1.5 text-[#2E241B] list-disc pl-4">
              <li>
                <strong>Sofritos densos y tomate:</strong> Cero riesgo de que el tomate o la cebolla caramelizada se
                chamusque en el fondo.
              </li>
              <li>
                <strong>Uso exclusivo con MamboMix:</strong> Jamás utilices cuchillas ni utensilios metálicos que rayen el
                revestimiento cerámico.
              </li>
              <li>
                <strong>Potencia recomendada:</strong> Mantén la potencia calorífica en P5 o P6 a 120 ºC con Velocidad 1.
              </li>
              <li>
                <strong>Limpieza manual delicada:</strong> Limpiar siempre con esponja suave, nunca en lavavajillas.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cadena de Conservación */}
      <div className="bg-white border border-[#E2D7CB] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#2E241B] font-['Outfit',sans-serif] flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-[#7A4B26]" />
          <span>Guía de Conservación en Nevera (Batch Cooking Seguro)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF7F2] text-[#2E241B] font-semibold border-b border-[#E2D7CB]">
              <tr>
                <th className="p-3">Alimento preparado</th>
                <th className="p-3">Nivel del robot</th>
                <th className="p-3">Días en nevera (4 ºC)</th>
                <th className="p-3">¿Apto para congelar?</th>
                <th className="p-3">Modo de regeneración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7CB] text-[#2E241B]">
              <tr>
                <td className="p-3 font-medium text-[#2E241B]">Salmón / Pescado blanco al vapor</td>
                <td className="p-3 text-[#827364]">Vaporera Baja</td>
                <td className="p-3 text-[#A85A32] font-bold">2 días (consumir lun-mar)</td>
                <td className="p-3 text-[#827364]">No recomendado ya cocido</td>
                <td className="p-3 text-[#827364]">Templar suave en sartén con tapa 2 min</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#2E241B]">Pechugas de pollo / pavo maceradas</td>
                <td className="p-3 text-[#827364]">Vaporera Baja</td>
                <td className="p-3 text-[#C07D2C] font-bold">3 a 4 días</td>
                <td className="p-3 text-[#4B6846] font-semibold">Sí (hasta 2 meses)</td>
                <td className="p-3 text-[#827364]">Microondas 1 min o salteado rápido</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#2E241B]">Verduras al vapor (brócoli, judías)</td>
                <td className="p-3 text-[#827364]">Vaporera Alta</td>
                <td className="p-3 text-[#4B6846] font-bold">4 a 5 días</td>
                <td className="p-3 text-[#C07D2C]">Pierden textura crujiente</td>
                <td className="p-3 text-[#827364]">Consumir frías en ensalada o salteadas</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#2E241B]">Arroz basmati / Quinoa real</td>
                <td className="p-3 text-[#827364]">Cestillo</td>
                <td className="p-3 text-[#4B6846] font-bold">4 días</td>
                <td className="p-3 text-[#4B6846] font-semibold">Sí, en bolsa zip</td>
                <td className="p-3 text-[#827364]">Salpicada de agua y microondas tapado</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#2E241B]">Cremas de verduras y caldos</td>
                <td className="p-3 text-[#827364]">Jarra Inox</td>
                <td className="p-3 text-[#4B6846] font-bold">5 a 6 días</td>
                <td className="p-3 text-[#4B6846] font-semibold">Sí (excelente)</td>
                <td className="p-3 text-[#827364]">Hervor de 1 minuto en cazo o microondas</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#2E241B]">Huevos duros con cáscara intacta</td>
                <td className="p-3 text-[#827364]">Cestillo</td>
                <td className="p-3 text-[#4B6846] font-bold">7 días</td>
                <td className="p-3 text-[#A85A32]">No congelar</td>
                <td className="p-3 text-[#827364]">Consumir fríos o a temp. ambiente</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#2E241B]">Pisto / Fritada mediterránea</td>
                <td className="p-3 text-[#827364]">Jarra Habana</td>
                <td className="p-3 text-[#4B6846] font-bold">6 días</td>
                <td className="p-3 text-[#4B6846] font-semibold">Sí (hasta 3 meses)</td>
                <td className="p-3 text-[#827364]">Sartén o calentar en tarro</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
