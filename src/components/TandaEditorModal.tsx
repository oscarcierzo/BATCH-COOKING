import React, { useState } from 'react';
import { Tanda, CookingLevelKey } from '../types';
import { 
  X, 
  Save, 
  Sparkles, 
  Layers, 
  Plus, 
  Trash2, 
  RotateCcw,
  ChefHat,
  HelpCircle,
  FileCode
} from 'lucide-react';

interface TandaEditorModalProps {
  initialTanda?: Tanda | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (tanda: Tanda) => void;
}

const EMPTY_TEMPLATE: Tanda = {
  id: '',
  titulo: '',
  subtitulo: '',
  categoria: 'custom',
  tiempoTotalMinutes: 25,
  raciones: 4,
  dificultad: 'Fácil',
  mamboParams: {
    jarraType: 'inox',
    accesorio: 'cuchillas',
    velocidad: 0,
    tiempoMinutes: 25,
    temperatura: 120,
    potencia: 8,
  },
  niveles: {
    jarra: {
      title: 'Nivel 1: Jarra (Base / Caldo / Crema)',
      food: '',
      ingredients: ['700ml agua o caldo aromatizado', '1 cebolla cortada en trozos', 'Sal y especias'],
      recommendedTimeMinutes: 25,
      tips: 'Al terminar, puedes triturar a velocidad progresiva 5-10 para obtener una crema fina.',
    },
    cestillo: {
      title: 'Nivel 2: Cestillo Interior (Hidratos / Huevos)',
      food: '',
      ingredients: ['200g arroz basmati o legumbres precocidas', '1 diente de ajo'],
      recommendedTimeMinutes: 22,
      tips: 'Enjuagar el cereal para eliminar el almidón y asegurar granos sueltos.',
    },
    vaporera_abajo: {
      title: 'Nivel 3: Vaporera Inferior (Proteínas)',
      food: '',
      ingredients: ['500g pechuga de pollo marinada o lomos de pescado', 'Hierbas provenzales y AOVE'],
      recommendedTimeMinutes: 25,
      tips: 'Dejar orificios libres alrededor de la carne para que el vapor suba al nivel superior.',
    },
    vaporera_arriba: {
      title: 'Nivel 4: Vaporera Superior (Verduras al Dente)',
      food: '',
      ingredients: ['300g brócoli, calabacín o espárragos verdes'],
      recommendedTimeMinutes: 20,
      tips: 'Cortar en trozos homogéneos para una cocción uniforme.',
    },
  },
  pasos: [
    'Añadir los ingredientes de la base líquida a la jarra (mínimo 600ml).',
    'Insertar el cestillo con los hidratos/huevos dentro de la jarra.',
    'Cerrar la tapa sin el cubilete dosificador.',
    'Colocar la vaporera inferior con la proteína y montar encima la vaporera superior con las verduras.',
    'Programar tu Mambo 10090: 25 min · 120 ºC · Potencia 8 · Velocidad 0.',
    'Al sonar el pitido, retirar con cuidado la vaporera y separar cada preparación en recipientes herméticos.',
  ],
  consejosChef: [
    'Utiliza siempre Potencia 7 u 8 a 120 ºC para mantener la evaporación constante.',
    'El líquido residual de la jarra contiene todos los jugos caídos: consérvalo como salsa o caldo base.',
  ],
  platosGenerados: [
    'Lunes: Plato combinado de proteína con el hidrato y verduras al vapor.',
    'Martes: Ensalada templada con la base de hidratos y proteína desmenuzada.',
  ],
  diasRecomendados: ['Lunes', 'Martes', 'Miércoles'],
  isCustom: true,
};

export const TandaEditorModal: React.FC<TandaEditorModalProps> = ({
  initialTanda,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Tanda>(() => {
    if (initialTanda) {
      return { ...initialTanda, isCustom: true };
    }
    return {
      ...EMPTY_TEMPLATE,
      id: `tanda-custom-${Date.now()}`,
    };
  });

  const [activeLevelTab, setActiveLevelTab] = useState<CookingLevelKey>('jarra');

  if (!isOpen) return null;

  const handleLevelChange = (level: CookingLevelKey, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      niveles: {
        ...prev.niveles,
        [level]: {
          ...prev.niveles[level],
          [field]: value,
        },
      },
    }));
  };

  const handleIngredientsTextChange = (level: CookingLevelKey, text: string) => {
    const list = text.split('\n').filter((item) => item.trim().length > 0);
    handleLevelChange(level, 'ingredients', list);
  };

  const handlePasosTextChange = (text: string) => {
    const list = text.split('\n').filter((item) => item.trim().length > 0);
    setFormData((prev) => ({ ...prev, pasos: list }));
  };

  const handlePlatosTextChange = (text: string) => {
    const list = text.split('\n').filter((item) => item.trim().length > 0);
    setFormData((prev) => ({ ...prev, platosGenerados: list }));
  };

  const handleConsejosTextChange = (text: string) => {
    const list = text.split('\n').filter((item) => item.trim().length > 0);
    setFormData((prev) => ({ ...prev, consejosChef: list }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      alert('Por favor, indica un título para la tanda.');
      return;
    }
    onSave({
      ...formData,
      id: formData.id || `tanda-custom-${Date.now()}`,
      isCustom: true,
    });
  };

  const loadCleanTemplate = () => {
    setFormData({
      ...EMPTY_TEMPLATE,
      id: `tanda-custom-${Date.now()}`,
      titulo: 'Nueva Combinación 4 Niveles',
      subtitulo: 'Personalizada para batch cooking semanal',
      niveles: {
        jarra: { ...EMPTY_TEMPLATE.niveles.jarra, food: 'Crema / Caldo / Salsa casera' },
        cestillo: { ...EMPTY_TEMPLATE.niveles.cestillo, food: 'Arroz / Pasta / Huevos' },
        vaporera_abajo: { ...EMPTY_TEMPLATE.niveles.vaporera_abajo, food: 'Pollo / Salmón / Ternera / Boniato' },
        vaporera_arriba: { ...EMPTY_TEMPLATE.niveles.vaporera_arriba, food: 'Verduras verdes / Champiñones' },
      },
    });
  };

  const currentLevel = formData.niveles[activeLevelTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDFCF8] border border-[#E0DBCF] rounded-2xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E0DBCF] bg-[#F5F2EB] flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5A634D]/15 border border-[#5A634D]/30 text-[#5A634D] flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#3D3D3D] font-['Outfit',sans-serif]">
                {initialTanda ? 'Editar Tanda' : 'Plantilla Vacía · Nueva Tanda Multinivel'}
              </h2>
              <p className="text-xs text-[#8A8475]">
                Estructura de 4 niveles simultáneos para Mambo 10090
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadCleanTemplate}
              title="Restablecer plantilla en blanco"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-medium transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cargar Plantilla Limpia</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white hover:bg-[#EDE9DE] text-[#8A8475] hover:text-[#3D3D3D] border border-[#E0DBCF] transition-colors shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Bloque 1: Datos Generales */}
          <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold text-[#5A634D] uppercase tracking-wider flex items-center gap-1.5">
              <span>1. Identificación y Resumen de la Tanda</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Título de la Tanda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Pollo al Limón + Arroz + Dúo de Verduras + Crema de Calabacín"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-3 py-2 text-sm text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Subtítulo / Resumen de elaboraciones
                </label>
                <input
                  type="text"
                  placeholder="Ej: Menú base con proteínas magras e hidratos limpios"
                  value={formData.subtitulo}
                  onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-3 py-2 text-xs text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
                    className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D]"
                  >
                    <option value="custom">Personalizada</option>
                    <option value="clasico">Clásico</option>
                    <option value="fitness">Fitness</option>
                    <option value="legumbres">Legumbres</option>
                    <option value="mediterraneo">Mediterráneo</option>
                    <option value="asiatico">Asiático</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                    Raciones
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.raciones}
                    onChange={(e) => setFormData({ ...formData, raciones: Number(e.target.value) })}
                    className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                    Dificultad
                  </label>
                  <select
                    value={formData.dificultad}
                    onChange={(e) => setFormData({ ...formData, dificultad: e.target.value as any })}
                    className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D]"
                  >
                    <option value="Fácil">Fácil</option>
                    <option value="Media">Media</option>
                    <option value="Avanzada">Avanzada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 2: Parámetros del Robot Mambo 10090 */}
          <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#5A634D] uppercase tracking-wider flex items-center gap-1.5">
                <span>2. Parámetros Técnicos del Robot Mambo 10090</span>
              </h3>
              <span className="text-[11px] text-[#8A8475]">
                120 ºC / P7-P8 para vapor multinivel
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Jarra Cecotec
                </label>
                <select
                  value={formData.mamboParams.jarraType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mamboParams: { ...formData.mamboParams, jarraType: e.target.value as any },
                    })
                  }
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D]"
                >
                  <option value="inox">Jarra Inox (Acero)</option>
                  <option value="habana">Jarra Habana (Cerámica)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Accesorio
                </label>
                <select
                  value={formData.mamboParams.accesorio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mamboParams: { ...formData.mamboParams, accesorio: e.target.value as any },
                    })
                  }
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D]"
                >
                  <option value="cuchillas">Cuchillas</option>
                  <option value="mambomix">Cuchara MamboMix</option>
                  <option value="mariposa">Mariposa</option>
                  <option value="sin_accesorio">Sin Accesorio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Tiempo (min)
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={formData.mamboParams.tiempoMinutes}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      tiempoTotalMinutes: val,
                      mamboParams: { ...formData.mamboParams, tiempoMinutes: val },
                    });
                  }}
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D] font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Temperatura
                </label>
                <select
                  value={formData.mamboParams.temperatura}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mamboParams: { ...formData.mamboParams, temperatura: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D] font-mono"
                >
                  <option value="120">120 ºC (Vapor)</option>
                  <option value="110">110 ºC (Suave)</option>
                  <option value="100">100 ºC (Hervor)</option>
                  <option value="90">90 ºC (Pochado)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Potencia (P)
                </label>
                <select
                  value={formData.mamboParams.potencia}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mamboParams: { ...formData.mamboParams, potencia: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D] font-mono font-bold text-[#9E7326]"
                >
                  <option value="8">P8 (Recomendado vapor)</option>
                  <option value="7">P7 (Legumbres / Sofrito)</option>
                  <option value="6">P6 (Jarra Habana)</option>
                  <option value="5">P5 (Suave)</option>
                  <option value="9">P9 (Arranque rápido)</option>
                  <option value="10">P10 (Solo hervir agua)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Velocidad
                </label>
                <select
                  value={formData.mamboParams.velocidad}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mamboParams: { ...formData.mamboParams, velocidad: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl px-2 py-2 text-xs text-[#3D3D3D] focus:outline-none focus:border-[#5A634D] font-mono"
                >
                  <option value="0">V0 (Sin giro / reposo)</option>
                  <option value="1">V1 (Remover con MamboMix)</option>
                  <option value="2">V2 (Mezcla lenta)</option>
                  <option value="3">V3 (Remover salsa)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bloque 3: Los 4 Niveles de Cocción (Editor interactivo) */}
          <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#5A634D] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>3. Configuración de los 4 Niveles del Robot</span>
              </h3>
              <span className="text-xs text-[#8A8475]">Selecciona cada nivel para editar</span>
            </div>

            {/* Level Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveLevelTab('vaporera_arriba')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeLevelTab === 'vaporera_arriba'
                    ? 'bg-[#5A634D]/15 border-[#5A634D] text-[#5A634D] shadow-xs'
                    : 'bg-[#FDFCF8] border-[#E0DBCF] text-[#8A8475] hover:bg-[#F5F2EB]'
                }`}
              >
                <span className="text-[10px] font-bold block uppercase tracking-wider">Nivel 4</span>
                <span className="text-xs font-semibold block truncate">Vaporera Superior</span>
                <span className="text-[10px] text-[#8A8475] block truncate">
                  {formData.niveles.vaporera_arriba.food || 'Sin alimento'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveLevelTab('vaporera_abajo')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeLevelTab === 'vaporera_abajo'
                    ? 'bg-[#7B866B]/15 border-[#7B866B] text-[#7B866B] shadow-xs'
                    : 'bg-[#FDFCF8] border-[#E0DBCF] text-[#8A8475] hover:bg-[#F5F2EB]'
                }`}
              >
                <span className="text-[10px] font-bold block uppercase tracking-wider">Nivel 3</span>
                <span className="text-xs font-semibold block truncate">Vaporera Inferior</span>
                <span className="text-[10px] text-[#8A8475] block truncate">
                  {formData.niveles.vaporera_abajo.food || 'Sin alimento'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveLevelTab('cestillo')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeLevelTab === 'cestillo'
                    ? 'bg-[#9E7326]/15 border-[#9E7326] text-[#9E7326] shadow-xs'
                    : 'bg-[#FDFCF8] border-[#E0DBCF] text-[#8A8475] hover:bg-[#F5F2EB]'
                }`}
              >
                <span className="text-[10px] font-bold block uppercase tracking-wider">Nivel 2</span>
                <span className="text-xs font-semibold block truncate">Cestillo Interior</span>
                <span className="text-[10px] text-[#8A8475] block truncate">
                  {formData.niveles.cestillo.food || 'Sin alimento'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveLevelTab('jarra')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeLevelTab === 'jarra'
                    ? 'bg-[#A35D39]/15 border-[#A35D39] text-[#A35D39] shadow-xs'
                    : 'bg-[#FDFCF8] border-[#E0DBCF] text-[#8A8475] hover:bg-[#F5F2EB]'
                }`}
              >
                <span className="text-[10px] font-bold block uppercase tracking-wider">Nivel 1</span>
                <span className="text-xs font-semibold block truncate">Jarra Mambo</span>
                <span className="text-[10px] text-[#8A8475] block truncate">
                  {formData.niveles.jarra.food || 'Sin alimento'}
                </span>
              </button>
            </div>

            {/* Active Level Form */}
            <div className="p-4 rounded-xl bg-[#F5F2EB] border border-[#E0DBCF] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#3D3D3D] uppercase tracking-wider">
                  Configurando {currentLevel.title}
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#8A8475]">Tiempo de cocción en este nivel:</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={currentLevel.recommendedTimeMinutes}
                    onChange={(e) =>
                      handleLevelChange(activeLevelTab, 'recommendedTimeMinutes', Number(e.target.value))
                    }
                    className="w-16 bg-white border border-[#E0DBCF] rounded-lg px-2 py-1 text-xs text-[#3D3D3D] text-center font-mono font-bold"
                  />
                  <span className="text-xs text-[#8A8475]">min</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Elaboración / Alimento preparado en este nivel *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Lomos de salmón fresco con limón y eneldo"
                  value={currentLevel.food}
                  onChange={(e) => handleLevelChange(activeLevelTab, 'food', e.target.value)}
                  className="w-full bg-white border border-[#E0DBCF] rounded-xl px-3 py-2 text-xs text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Ingredientes detallados (uno por línea)
                </label>
                <textarea
                  rows={4}
                  placeholder="Ej:&#10;4 lomos de salmón (150g c/u)&#10;1 limón en rodajas&#10;Eneldo fresco picado&#10;Sal marina y pimienta negra"
                  value={currentLevel.ingredients.join('\n')}
                  onChange={(e) => handleIngredientsTextChange(activeLevelTab, e.target.value)}
                  className="w-full bg-white border border-[#E0DBCF] rounded-xl p-3 text-xs text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D] font-mono leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3D3D3D] mb-1">
                  Consejo específico de cocinero para este nivel
                </label>
                <input
                  type="text"
                  placeholder="Ej: Utilizar papel de horno perforado para recoger jugos y no alterar el caldo inferior."
                  value={currentLevel.tips || ''}
                  onChange={(e) => handleLevelChange(activeLevelTab, 'tips', e.target.value)}
                  className="w-full bg-white border border-[#E0DBCF] rounded-xl px-3 py-1.5 text-xs text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D]"
                />
              </div>
            </div>
          </div>

          {/* Bloque 4: Pasos secuenciales y Platos generados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pasos */}
            <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 space-y-2 shadow-xs">
              <label className="block text-xs font-bold text-[#5A634D] uppercase tracking-wider">
                4. Pasos Secuenciales en Mambo (uno por línea)
              </label>
              <textarea
                rows={5}
                value={formData.pasos.join('\n')}
                onChange={(e) => handlePasosTextChange(e.target.value)}
                className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl p-3 text-xs text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D] leading-relaxed"
              />
            </div>

            {/* Platos combinados */}
            <div className="bg-white border border-[#E0DBCF] rounded-xl p-4 space-y-2 shadow-xs">
              <label className="block text-xs font-bold text-[#5A634D] uppercase tracking-wider">
                5. Platos para el Menú Semanal (uno por línea)
              </label>
              <textarea
                rows={5}
                placeholder="Lunes Almuerzo: ...&#10;Martes Cena: ...&#10;Miércoles Almuerzo: ..."
                value={formData.platosGenerados.join('\n')}
                onChange={(e) => handlePlatosTextChange(e.target.value)}
                className="w-full bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl p-3 text-xs text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D] leading-relaxed"
              />
            </div>
          </div>
        </form>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E0DBCF] bg-[#F5F2EB] flex items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-medium transition-colors shadow-xs"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5A634D] hover:bg-[#49513E] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Guardar en mi Recetario Mambo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
