import React, { useState } from 'react';
import { Tanda } from '../types';
import { 
  Flame, 
  Clock, 
  Sparkles, 
  Layers, 
  Play, 
  Copy, 
  Trash2, 
  Edit3, 
  Search, 
  AlertCircle,
  X,
  Heart,
  Sparkle
} from 'lucide-react';

interface TandasGridProps {
  tandas: Tanda[];
  onSelectTanda: (tanda: Tanda) => void;
  onEditTanda: (tanda: Tanda) => void;
  onDuplicateTanda: (tanda: Tanda) => void;
  onDeleteTanda: (id: string) => void;
  onStartTimer: (tanda: Tanda) => void;
  onOpenNewTanda: () => void;
  onOpenAITemplate: () => void;
}

export const TandasGrid: React.FC<TandasGridProps> = ({
  tandas,
  onSelectTanda,
  onEditTanda,
  onDuplicateTanda,
  onDeleteTanda,
  onStartTimer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showKitchenNote, setShowKitchenNote] = useState<boolean>(true);

  const categories = [
    { id: 'todos', label: 'Todas las Tandas' },
    { id: 'clasico', label: 'Tradicional (Inox)' },
    { id: 'fitness', label: 'Fitness & Pescado' },
    { id: 'legumbres', label: 'Legumbres & Confort' },
    { id: 'mediterraneo', label: 'Mediterráneo (Habana)' },
    { id: 'asiatico', label: 'Curry & Oriental' },
    { id: 'custom', label: 'Mis Recetas' },
  ];

  const quickIngredients = ['Pollo', 'Salmón', 'Calabacín', 'Calabaza', 'Quinoa', 'Arroz', 'Lentejas', 'Brócoli'];

  const filteredTandas = tandas.filter((tanda) => {
    const matchesCategory =
      selectedCategory === 'todos'
        ? true
        : selectedCategory === 'custom'
        ? tanda.isCustom
        : tanda.categoria === selectedCategory;

    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesCategory;

    const matchesSearch =
      tanda.titulo.toLowerCase().includes(term) ||
      tanda.subtitulo.toLowerCase().includes(term) ||
      tanda.niveles.jarra.food.toLowerCase().includes(term) ||
      tanda.niveles.cestillo.food.toLowerCase().includes(term) ||
      tanda.niveles.vaporera_abajo.food.toLowerCase().includes(term) ||
      tanda.niveles.vaporera_arriba.food.toLowerCase().includes(term) ||
      tanda.niveles.jarra.ingredients.some((ing) => ing.toLowerCase().includes(term)) ||
      tanda.niveles.cestillo.ingredients.some((ing) => ing.toLowerCase().includes(term)) ||
      tanda.niveles.vaporera_abajo.ingredients.some((ing) => ing.toLowerCase().includes(term)) ||
      tanda.niveles.vaporera_arriba.ingredients.some((ing) => ing.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Intro hero card with Warm Wood Kitchen Theme & Integrated Search Bar */}
      <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E2D7CB] shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          {/* Header text */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A4B26]/10 border border-[#7A4B26]/20 text-[#7A4B26] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#7A4B26]" />
              <span>Metodología Cocina por Niveles Simultáneos</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2E241B] font-['Outfit',sans-serif]">
              Cocina 4 platos a la vez en 25–35 minutos
            </h2>
            <p className="text-[#6D5E50] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              En cada tanda preparas un <strong className="text-[#A85A32]">fondo o crema en la jarra</strong>, un{' '}
              <strong className="text-[#C07D2C]">hidrato o huevos en el cestillo</strong>, una{' '}
              <strong className="text-[#824D28]">proteína jugosa en la vaporera inferior</strong> y{' '}
              <strong className="text-[#4B6846]">verduras al dente en la bandeja superior</strong>.
            </p>
          </div>

          {/* BUSCADOR DE INGREDIENTE O PLATO (Sustituye a Nueva Tanda y Plantilla IA) */}
          <div className="w-full lg:w-[390px] shrink-0 bg-white/95 p-3.5 rounded-2xl border border-[#DCD0C0] shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-[#7A4B26] uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#7A4B26]" />
                <span>¿Qué tienes en la nevera?</span>
              </label>
              <span className="text-[10px] text-[#827364]">Filtro rápido</span>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A4B26] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Busca ingrediente o plato (pollo, salmón...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D4C4B2] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-[#2E241B] placeholder-[#8F8171] focus:outline-none focus:border-[#7A4B26] focus:bg-white transition-all font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8F8171] hover:text-[#2E241B] p-0.5"
                  title="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick 1-touch chips for tablet */}
            <div className="flex items-center gap-1 mt-2.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-[#8F8171] font-semibold shrink-0 mr-1">Rápido:</span>
              {quickIngredients.map((tag) => {
                const isSelected = searchTerm.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(isSelected ? '' : tag.toLowerCase())}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#7A4B26] text-white font-bold shadow-xs'
                        : 'bg-[#FAF7F2] border border-[#E2D7CB] text-[#6D5E50] hover:bg-[#F3ECE2]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Levels Visual Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-[#E2D7CB]">
          <div className="bg-white border border-[#E2D7CB] p-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-[#4B6846] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              4
            </span>
            <div className="min-w-0">
              <span className="text-[10px] text-[#827364] block uppercase tracking-wider font-semibold">
                Vaporera Sup.
              </span>
              <span className="text-xs text-[#4B6846] font-bold truncate block">Verduras al dente</span>
            </div>
          </div>
          <div className="bg-white border border-[#E2D7CB] p-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-[#824D28] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              3
            </span>
            <div className="min-w-0">
              <span className="text-[10px] text-[#827364] block uppercase tracking-wider font-semibold">
                Vaporera Inf.
              </span>
              <span className="text-xs text-[#824D28] font-bold truncate block">Pollo / Salmón / Carne</span>
            </div>
          </div>
          <div className="bg-white border border-[#E2D7CB] p-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-[#C07D2C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              2
            </span>
            <div className="min-w-0">
              <span className="text-[10px] text-[#827364] block uppercase tracking-wider font-semibold">
                Cestillo
              </span>
              <span className="text-xs text-[#A0641E] font-bold truncate block">Arroz / Patatas / Huevos</span>
            </div>
          </div>
          <div className="bg-white border border-[#E2D7CB] p-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
            <span className="w-7 h-7 rounded-lg bg-[#A85A32] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              1
            </span>
            <div className="min-w-0">
              <span className="text-[10px] text-[#827364] block uppercase tracking-wider font-semibold">
                Jarra Inox/Habana
              </span>
              <span className="text-xs text-[#A85A32] font-bold truncate block">Cremas / Caldos / Salsas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ventajas para convencer en casa (Encimera de madera y cero desorden) */}
      {showKitchenNote && (
        <div className="bg-[#F7EFE4] border border-[#DFCDBA] rounded-xl p-3.5 sm:p-4 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-[#5A4B3E]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7A4B26]/15 text-[#7A4B26] flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 text-[#7A4B26]" />
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-[#2E241B]">
                ¿Por qué os va a encantar cocinar con este sistema?
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#6D5E50]">
                <span>🧼 <strong>Cero sartenes</strong>: jarra y vaporera van directas al lavavajillas.</span>
                <span>✨ <strong>Encimera de madera impoluta</strong>: cero salpicaduras de aceite o grasa.</span>
                <span>⏱️ <strong>30 minutos</strong> = cena de hoy + comida de 3 días lista.</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowKitchenNote(false)}
            className="text-[11px] text-[#8F8171] hover:text-[#2E241B] self-end md:self-center font-medium shrink-0"
          >
            Ocultar
          </button>
        </div>
      )}

      {/* Categories Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#7A4B26] text-white shadow-xs font-semibold'
                  : 'bg-[#FAF7F2] text-[#6D5E50] hover:text-[#2E241B] hover:bg-[#F3ECE2] border border-[#E2D7CB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {searchTerm && (
          <div className="text-xs text-[#827364] shrink-0">
            Filtrando por: <strong className="text-[#7A4B26] font-semibold">"{searchTerm}"</strong>
          </div>
        )}
      </div>

      {/* Tandas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTandas.map((tanda, index) => {
          const jarraBadge =
            tanda.mamboParams.jarraType === 'habana'
              ? 'bg-[#A85A32]/10 text-[#A85A32] border-[#A85A32]/30'
              : 'bg-[#EAE4DC] text-[#2E241B] border-[#D4C4B2]';

          return (
            <div
              key={tanda.id}
              className="bg-white border border-[#E2D7CB] hover:border-[#7A4B26]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-[#E2D7CB] bg-[#FAF7F2]/80">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#7A4B26]/15 text-[#7A4B26] border border-[#7A4B26]/25">
                      Tanda {index + 1}
                    </span>
                    {tanda.isCustom ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#824D28]/15 text-[#824D28] border border-[#824D28]/30 font-medium">
                        Personalizada
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white text-[#827364] border border-[#E2D7CB] font-medium capitalize">
                        {tanda.categoria}
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${jarraBadge}`}>
                      Jarra {tanda.mamboParams.jarraType === 'habana' ? 'Habana (Cerámica)' : 'Inox'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDuplicateTanda(tanda)}
                      title="Duplicar receta"
                      className="p-1.5 rounded-lg text-[#827364] hover:text-[#2E241B] hover:bg-[#F3ECE2] transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {tanda.isCustom && (
                      <>
                        <button
                          onClick={() => onEditTanda(tanda)}
                          title="Editar receta"
                          className="p-1.5 rounded-lg text-[#827364] hover:text-[#2E241B] hover:bg-[#F3ECE2] transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTanda(tanda.id)}
                          title="Eliminar receta"
                          className="p-1.5 rounded-lg text-[#827364] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#2E241B] group-hover:text-[#7A4B26] transition-colors">
                  {tanda.titulo}
                </h3>
                <p className="text-xs text-[#6D5E50] mt-1 line-clamp-2">
                  {tanda.subtitulo}
                </p>

                {/* Mambo Parameters Quick Box */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-white border border-[#E2D7CB] font-mono text-xs text-[#2E241B] flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7A4B26]" />
                    <span className="font-bold text-[#2E241B]">{tanda.mamboParams.tiempoMinutes} min</span>
                  </div>
                  <span className="text-[#D4C4B2]">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#C07D2C]">🌡️</span>
                    <span>{tanda.mamboParams.temperatura}ºC</span>
                  </div>
                  <span className="text-[#D4C4B2]">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#A85A32]">⚡</span>
                    <span className="font-semibold text-[#2E241B]">P{tanda.mamboParams.potencia}</span>
                  </div>
                  <span className="text-[#D4C4B2]">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[#824D28]">🔄</span>
                    <span>V{tanda.mamboParams.velocidad}</span>
                  </div>
                </div>
              </div>

              {/* 4 Levels Visual Stacking */}
              <div className="p-4 sm:p-5 flex-1 space-y-2.5 bg-white">
                <div className="text-[11px] font-semibold text-[#827364] flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-[#7A4B26]" />
                  <span>Distribución en los 4 Niveles</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {/* Level 4 */}
                  <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E2D7CB] flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#4B6846] text-white font-bold text-[10px] shrink-0 mt-0.5">
                      V4
                    </span>
                    <div className="min-w-0">
                      <span className="text-[#827364] text-[10px] block font-medium">Vaporera Superior:</span>
                      <p className="text-[#2E241B] font-semibold truncate">{tanda.niveles.vaporera_arriba.food}</p>
                    </div>
                  </div>

                  {/* Level 3 */}
                  <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E2D7CB] flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#824D28] text-white font-bold text-[10px] shrink-0 mt-0.5">
                      V3
                    </span>
                    <div className="min-w-0">
                      <span className="text-[#827364] text-[10px] block font-medium">Vaporera Inferior:</span>
                      <p className="text-[#2E241B] font-semibold truncate">{tanda.niveles.vaporera_abajo.food}</p>
                    </div>
                  </div>

                  {/* Level 2 */}
                  <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E2D7CB] flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#C07D2C] text-white font-bold text-[10px] shrink-0 mt-0.5">
                      C2
                    </span>
                    <div className="min-w-0">
                      <span className="text-[#827364] text-[10px] block font-medium">Cestillo Interior:</span>
                      <p className="text-[#2E241B] font-semibold truncate">{tanda.niveles.cestillo.food}</p>
                    </div>
                  </div>

                  {/* Level 1 */}
                  <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#E2D7CB] flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#A85A32] text-white font-bold text-[10px] shrink-0 mt-0.5">
                      J1
                    </span>
                    <div className="min-w-0">
                      <span className="text-[#827364] text-[10px] block font-medium">Jarra Mambo:</span>
                      <p className="text-[#2E241B] font-semibold truncate">{tanda.niveles.jarra.food}</p>
                    </div>
                  </div>
                </div>

                {/* Platos que genera */}
                <div className="pt-2 border-t border-[#E2D7CB]">
                  <span className="text-[11px] text-[#827364] font-medium block mb-1">
                    Platos para la semana:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tanda.platosGenerados.slice(0, 2).map((plato, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#7A4B26] border border-[#E2D7CB] font-medium truncate max-w-[200px]"
                      >
                        {plato.split(':')[0]}
                      </span>
                    ))}
                    {tanda.platosGenerados.length > 2 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[#827364] border border-[#E2D7CB]">
                        +{tanda.platosGenerados.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Buttons with Tablet Ergonomics */}
              <div className="p-3 sm:p-4 bg-[#FAF7F2]/80 border-t border-[#E2D7CB] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectTanda(tanda)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-[#F3ECE2] text-[#2E241B] border border-[#E2D7CB] text-xs font-semibold transition-colors text-center shadow-xs min-h-[44px]"
                >
                  Ver Pasos & Receta
                </button>
                <button
                  onClick={() => onStartTimer(tanda)}
                  className="flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#7A4B26] hover:bg-[#663D1F] text-white text-xs font-bold transition-all shadow-xs active:scale-95 shrink-0 min-h-[44px]"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Cocinar en Mambo</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTandas.length === 0 && (
        <div className="text-center py-12 bg-white border border-[#E2D7CB] rounded-2xl p-6 shadow-xs">
          <AlertCircle className="w-10 h-10 text-[#827364] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#2E241B]">No se encontraron tandas con "{searchTerm}"</h3>
          <p className="text-xs text-[#827364] mt-1 max-w-md mx-auto">
            Prueba a buscar otro ingrediente común (como pollo, arroz, verduras) o pulsa para limpiar el filtro.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7A4B26] hover:bg-[#663D1F] text-white text-xs font-semibold shadow-xs"
          >
            <span>Mostrar Todas las Tandas</span>
          </button>
        </div>
      )}
    </div>
  );
};
