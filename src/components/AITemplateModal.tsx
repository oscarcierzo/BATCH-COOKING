import React, { useState } from 'react';
import { 
  Bot, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Code, 
  Sparkles, 
  X, 
  ArrowRight, 
  Layers, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { Tanda } from '../types';

interface AITemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTanda: (tanda: Tanda) => void;
}

export const AITemplateModal: React.FC<AITemplateModalProps> = ({
  isOpen,
  onClose,
  onImportTanda,
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'json' | 'import'>('prompt');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isOpen) return null;

  // Prompt en formato Markdown listo para copiar a ChatGPT, Claude, Gemini, etc.
  const aiPromptMarkdown = `Actúa como un Chef profesional especializado en Batch Cooking saludable y en el robot de cocina Cecotec Mambo 10090.

Tu objetivo es generar combinaciones de cocina por niveles simultáneos (4 alturas a la vez) para optimizar tiempo y energía, preparando la base de comidas para toda la semana en tandas de 25 a 35 minutos.

### ESPECIFICACIONES TÉCNICAS OBLIGATORIAS (Mambo 10090):
1. **NIVEL 1 - JARRA (Inox o Habana):**
   - Debe contener mínimo 650 ml a 800 ml de líquido (crema de verduras, salsa, caldo o legumbre) para generar vapor continuo durante toda la cocción.
   - Temperatura: 120 ºC. Potencia calorífica: P7 o P8. Velocidad: V0 o V1 (con cuchillas o MamboMix).
2. **NIVEL 2 - CESTILLO INTERIOR:**
   - Hidratos o huevos al vapor (arroz basmati/integral, quinoa, patatas en dados, huevos duros).
3. **NIVEL 3 - VAPORERA INFERIOR (Bandeja honda):**
   - Proteínas o verduras densas que requieren vapor intenso (pechuga de pollo marinada, salmón o merluza en papillote, albóndigas magras, dados de pavo, boniato).
4. **NIVEL 4 - VAPORERA SUPERIOR (Bandeja plana):**
   - Verduras que se cocinan al dente con vapor suave (ramilletes de brócoli, judías verdes, rodajas de calabacín, espárragos, setas).

---

### FORMATO DE RESPUESTA REQUERIDO:
Genera una o varias tandas con la siguiente estructura JSON exacta (para poder importarla directamente a la app de Batch Cooking):

\`\`\`json
{
  "id": "tanda-ia-custom",
  "titulo": "Título descriptivo de los 4 platos",
  "subtitulo": "Resumen nutricional o temática (ej: Menú Alto en Proteína)",
  "categoria": "fitness",
  "tiempoTotalMinutes": 30,
  "raciones": 4,
  "dificultad": "Fácil",
  "mamboParams": {
    "jarraType": "inox",
    "accesorio": "cuchillas",
    "velocidad": 0,
    "tiempoMinutes": 30,
    "temperatura": 120,
    "potencia": 8
  },
  "niveles": {
    "jarra": {
      "title": "Nivel 1: Jarra Cecotec (Base Líquida)",
      "food": "Crema suave de calabacín y puerro",
      "ingredients": [
        "600g calabacín con piel",
        "1 puerro entero",
        "700ml caldo vegetal o agua",
        "20ml aceite de oliva virgen extra",
        "Sal y pimienta blanca"
      ],
      "recommendedTimeMinutes": 30,
      "tips": "Al terminar la tanda, retirar la vaporera y triturar 1 min a velocidad progresiva 5-10."
    },
    "cestillo": {
      "title": "Nivel 2: Cestillo de Hervido",
      "food": "Arroz basmati aromático",
      "ingredients": [
        "200g arroz basmati lavado",
        "1 diente de ajo entero",
        "1 hoja de laurel"
      ],
      "recommendedTimeMinutes": 25,
      "tips": "Lavar previamente el arroz bajo el grifo para retirar almidón."
    },
    "vaporera_abajo": {
      "title": "Nivel 3: Vaporera Inferior Honda",
      "food": "Pechugas de pollo al limón y hierbas provenzales",
      "ingredients": [
        "4 medios filetes de pechuga de pollo (500g)",
        "Zumo de 1 limón y su ralladura",
        "1 cucharada de orégano y tomillo",
        "Pizca de pimentón dulce"
      ],
      "recommendedTimeMinutes": 30,
      "tips": "Colocar separadas para que el vapor circule libremente por los orificios."
    },
    "vaporera_arriba": {
      "title": "Nivel 4: Vaporera Superior Plana",
      "food": "Brócoli y zanahorias baby al vapor",
      "ingredients": [
        "300g ramilletes de brócoli",
        "2 zanahorias en bastones finos",
        "Pizca de sal marina en escamas"
      ],
      "recommendedTimeMinutes": 22,
      "tips": "Si te gusta el brócoli muy al dente, puedes añadir la bandeja superior en los últimos 20 minutos."
    }
  },
  "pasos": [
    "Paso 1: Coloca las cuchillas en la jarra Inox. Añade los ingredientes de la jarra y el líquido mínimo de 700ml.",
    "Paso 2: Introduce el cestillo con el arroz y el laurel dentro de la jarra.",
    "Paso 3: Cierra la tapa sin cubilete y monta la vaporera de dos niveles encima.",
    "Paso 4: Coloca el pollo en la bandeja inferior y las verduras en la bandeja superior con la tapa de la vaporera bien sellada.",
    "Paso 5: Programa: 30 minutos, 120 ºC, Potencia de calor 8, Velocidad 0.",
    "Paso 6: Al terminar, retira las bandejas con cuidado del vapor, saca el cestillo con la espátula y tritura la crema de la jarra."
  ],
  "consejosChef": [
    "Usa guantes o paño para retirar la vaporera ya que el vapor condensado estará muy caliente.",
    "Guarda cada elaboración en tápers herméticos de cristal una vez templadas.",
    "El arroz y las verduras aguantan 4 días en nevera; el pollo 3-4 días."
  ],
  "platosGenerados": [
    "Lunes Almuerzo: Pechuga de pollo con arroz basmati y brócoli al vapor",
    "Lunes Cena: Crema de calabacín y puerro templada con semillas de calabaza",
    "Miércoles Almuerzo: Bowl de arroz basmati con dados de pollo salteados y zanahoria",
    "Jueves Cena: Crema de calabacín como primer plato + guarnición de verduras"
  ],
  "diasRecomendados": ["Lunes", "Miércoles", "Jueves"]
}
\`\`\`

Por favor, genera [INDICAR AQUÍ CUÁNTAS COMBINACIONES QUIERES, EJEMPLO: 3 nuevas combinaciones variadas (una de pescado, otra vegetariana/legumbres y otra mediterránea)].`;

  const rawJsonTemplate = {
    id: "tanda-ia-custom",
    titulo: "Título de la tanda generada",
    subtitulo: "Breve resumen de la preparación",
    categoria: "fitness",
    tiempoTotalMinutes: 30,
    raciones: 4,
    dificultad: "Fácil",
    mamboParams: {
      jarraType: "inox",
      accesorio: "cuchillas",
      velocidad: 0,
      tiempoMinutes: 30,
      temperatura: 120,
      potencia: 8
    },
    niveles: {
      jarra: {
        title: "Nivel 1: Jarra Cecotec (Base Líquida)",
        food: "Nombre del plato de la jarra (mínimo 650ml)",
        ingredients: ["Ingrediente 1", "Ingrediente 2", "700ml caldo o agua"],
        recommendedTimeMinutes: 30,
        tips: "Consejo para la jarra"
      },
      cestillo: {
        title: "Nivel 2: Cestillo de Hervido",
        food: "Nombre del hidrato o alimento del cestillo",
        ingredients: ["Arroz / Quinoa / Patata / Huevos"],
        recommendedTimeMinutes: 25,
        tips: "Consejo para el cestillo"
      },
      vaporera_abajo: {
        title: "Nivel 3: Vaporera Inferior Honda",
        food: "Nombre de la proteína / alimento denso",
        ingredients: ["Proteína / Pescado / Pollo / Boniato"],
        recommendedTimeMinutes: 30,
        tips: "Consejo vaporera inferior"
      },
      vaporera_arriba: {
        title: "Nivel 4: Vaporera Superior Plana",
        food: "Verduras al vapor",
        ingredients: ["Brócoli / Judías verdes / Calabacín"],
        recommendedTimeMinutes: 22,
        tips: "Consejo vaporera superior"
      }
    },
    pasos: [
      "Paso 1: Preparación de la jarra",
      "Paso 2: Colocación del cestillo",
      "Paso 3: Colocación de la vaporera doble",
      "Paso 4: Programación Mambo 10090 (30 min, 120ºC, P8, V0)",
      "Paso 5: Distribución y envasado en tápers"
    ],
    consejosChef: [
      "Consejo 1 de seguridad o conservación",
      "Consejo 2 de aprovechamiento de caldos"
    ],
    platosGenerados: [
      "Lunes: Plato combinado",
      "Martes: Crema + proteína",
      "Miércoles: Ensalada templada"
    ],
    diasRecomendados: ["Lunes", "Martes", "Miércoles"]
  };

  const handleCopy = () => {
    const textToCopy = activeTab === 'json' ? JSON.stringify(rawJsonTemplate, null, 2) : aiPromptMarkdown;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = (format: 'md' | 'json' | 'txt') => {
    let content = '';
    let filename = '';
    let type = 'text/plain';

    if (format === 'md') {
      content = aiPromptMarkdown;
      filename = 'plantilla-prompt-mambo-10090-batch-cooking.md';
      type = 'text/markdown';
    } else if (format === 'json') {
      content = JSON.stringify(rawJsonTemplate, null, 2);
      filename = 'esquema-tanda-mambo-10090.json';
      type = 'application/json';
    } else {
      content = aiPromptMarkdown;
      filename = 'plantilla-prompt-ia-mambo.txt';
      type = 'text/plain';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportError(null);
    setImportSuccess(false);

    if (!importText.trim()) {
      setImportError('Por favor pega el JSON generado por la IA en el área de texto.');
      return;
    }

    try {
      // Si la IA respondió con bloque markdown ```json ... ``` lo extraemos
      let cleaned = importText.trim();
      const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        cleaned = jsonMatch[1].trim();
      }

      const parsed = JSON.parse(cleaned);

      // Soportar array de tandas o una sola tanda
      const items = Array.isArray(parsed) ? parsed : [parsed];

      if (items.length === 0) {
        throw new Error('El JSON no contiene tandas válidas.');
      }

      items.forEach((tandaItem: any, index: number) => {
        if (!tandaItem.titulo || !tandaItem.niveles || !tandaItem.niveles.jarra) {
          throw new Error(`La tanda #${index + 1} no contiene los campos requeridos (titulo, niveles).`);
        }

        const importedTanda: Tanda = {
          ...tandaItem,
          id: tandaItem.id || `tanda-ia-${Date.now()}-${index}`,
          isCustom: true,
          categoria: tandaItem.categoria || 'custom',
          tiempoTotalMinutes: tandaItem.tiempoTotalMinutes || 30,
          raciones: tandaItem.raciones || 4,
          dificultad: tandaItem.dificultad || 'Fácil',
          mamboParams: tandaItem.mamboParams || {
            jarraType: 'inox',
            accesorio: 'cuchillas',
            velocidad: 0,
            tiempoMinutes: 30,
            temperatura: 120,
            potencia: 8,
          },
          niveles: {
            jarra: tandaItem.niveles.jarra || { title: 'Nivel 1: Jarra', food: 'Fondo de cocción', ingredients: [], recommendedTimeMinutes: 30 },
            cestillo: tandaItem.niveles.cestillo || { title: 'Nivel 2: Cestillo', food: 'Guarnición', ingredients: [], recommendedTimeMinutes: 25 },
            vaporera_abajo: tandaItem.niveles.vaporera_abajo || { title: 'Nivel 3: Vaporera Honda', food: 'Proteína', ingredients: [], recommendedTimeMinutes: 30 },
            vaporera_arriba: tandaItem.niveles.vaporera_arriba || { title: 'Nivel 4: Vaporera Plana', food: 'Verdura', ingredients: [], recommendedTimeMinutes: 20 },
          },
          pasos: Array.isArray(tandaItem.pasos) ? tandaItem.pasos : ['Cocinar en Mambo 10090 en 4 niveles.'],
          consejosChef: Array.isArray(tandaItem.consejosChef) ? tandaItem.consejosChef : ['Conservar en frío en tápers herméticos.'],
          platosGenerados: Array.isArray(tandaItem.platosGenerados) ? tandaItem.platosGenerados : ['Menú semanal'],
          diasRecomendados: Array.isArray(tandaItem.diasRecomendados) ? tandaItem.diasRecomendados : ['Lunes', 'Martes'],
        };

        onImportTanda(importedTanda);
      });

      setImportSuccess(true);
      setImportText('');
      setTimeout(() => {
        setImportSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      setImportError(`Error al procesar el JSON: ${err.message || 'Estructura no válida'}`);
    }
  };

  const handleLoadExampleToImport = () => {
    setImportText(JSON.stringify({
      id: "tanda-ejemplo-ia",
      titulo: "Merluza en Papillote + Quinoa + Judías Verdes + Crema de Zanahoria",
      subtitulo: "Menú digestivo y ligero rico en betacarotenos y omega-3",
      categoria: "fitness",
      tiempoTotalMinutes: 28,
      raciones: 4,
      dificultad: "Fácil",
      mamboParams: {
        jarraType: "inox",
        accesorio: "cuchillas",
        velocidad: 0,
        tiempoMinutes: 28,
        temperatura: 120,
        potencia: 8
      },
      niveles: {
        jarra: {
          title: "Nivel 1: Jarra Inox (Caldo y Crema)",
          food: "Crema de zanahoria, boniato y jengibre fresco",
          ingredients: [
            "500g zanahorias en rodajas",
            "1 boniato pequeño pelado",
            "1 trozo de jengibre (2cm)",
            "750ml caldo de verduras suave",
            "2 cucharadas de aceite de oliva virgen extra"
          ],
          recommendedTimeMinutes: 28,
          tips: "Triturar con cuchillas 1 minuto a velocidad progresiva 5-10 al acabar."
        },
        cestillo: {
          title: "Nivel 2: Cestillo Interior",
          food: "Quinoa real tricolor lavada",
          ingredients: [
            "200g quinoa tricolor",
            "1 rama de romero fresco"
          ],
          recommendedTimeMinutes: 20,
          tips: "Enjuagar bajo agua corriente para eliminar la saponina amarga."
        },
        vaporera_abajo: {
          title: "Nivel 3: Vaporera Honda",
          food: "Lomos de merluza en papillote con lima y eneldo",
          ingredients: [
            "4 lomos limpios de merluza (150g cada uno)",
            "1 lima en rodajas",
            "Eneldo fresco picado",
            "Pimienta blanca molida"
          ],
          recommendedTimeMinutes: 25,
          tips: "Envolver en papel vegetal perforado para mantenerlos ultra jugosos."
        },
        vaporera_arriba: {
          title: "Nivel 4: Vaporera Plana",
          food: "Judías verdes redondas y tomatitos cherry",
          ingredients: [
            "300g judías verdes redondas despuntadas",
            "150g tomates cherry enteros",
            "Sal en escamas"
          ],
          recommendedTimeMinutes: 22,
          tips: "Quedan tersas y con un color verde brillante."
        }
      },
      pasos: [
        "1. Añade a la jarra inox las zanahorias, el boniato, el jengibre y los 750ml de caldo.",
        "2. Coloca el cestillo con la quinoa dentro de la jarra.",
        "3. Cierra la tapa e instala la vaporera doble.",
        "4. Coloca los papillotes de merluza abajo y las judías verdes con cherrys arriba.",
        "5. Programa la Mambo: 28 minutos, 120 ºC, Potencia 8, Velocidad 0.",
        "6. Separa las elaboraciones y tritura la crema de la jarra."
      ],
      consejosChef: [
        "Consume la merluza entre lunes y martes para máxima frescura.",
        "La crema y la quinoa se conservan hasta 5 días en la nevera."
      ],
      platosGenerados: [
        "Lunes Almuerzo: Papillote de merluza con quinoa tricolor y judías al vapor",
        "Lunes Cena: Crema tibia de zanahoria y jengibre con semillas",
        "Martes Almuerzo: Ensalada templada de quinoa con tomatitos y merluza desmigada",
        "Miércoles Cena: Bol de crema de zanahoria con huevo poché"
      ],
      diasRecomendados: ["Lunes", "Martes", "Miércoles"]
    }, null, 2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDFCF8] border border-[#E0DBCF] rounded-2xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E0DBCF] bg-[#F5F2EB] flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5A634D]/15 border border-[#5A634D]/30 text-[#5A634D] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#3D3D3D] font-['Outfit',sans-serif]">
                  Plantilla para Inteligencia Artificial (IA)
                </h2>
                <span className="bg-[#5A634D]/15 text-[#5A634D] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Mambo 10090
                </span>
              </div>
              <p className="text-xs text-[#8A8475]">
                Copia el prompt o descarga la plantilla para que ChatGPT, Claude o Gemini te generen tandas ilimitadas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-[#EDE9DE] text-[#8A8475] hover:text-[#3D3D3D] border border-[#E0DBCF] transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-4 border-b border-[#E0DBCF] bg-white">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'prompt'
                ? 'border-[#5A634D] text-[#5A634D]'
                : 'border-transparent text-[#8A8475] hover:text-[#3D3D3D]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Prompt Completo para IA (.md / .txt)</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'json'
                ? 'border-[#5A634D] text-[#5A634D]'
                : 'border-transparent text-[#8A8475] hover:text-[#3D3D3D]'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Esquema Técnico JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'import'
                ? 'border-[#5A634D] text-[#5A634D]'
                : 'border-transparent text-[#8A8475] hover:text-[#3D3D3D]'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Importar Respuesta de la IA a la App</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div className="bg-[#F5F2EB] p-3.5 rounded-xl border border-[#E0DBCF] text-xs text-[#3D3D3D] space-y-1">
                <p className="font-semibold text-[#5A634D] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Instrucciones de uso:
                </p>
                <p className="text-[#8A8475]">
                  1. Descarga el archivo o copia el texto con el botón <strong>&quot;Copiar Prompt&quot;</strong>.<br />
                  2. Pégalo en tu IA favorita (ChatGPT, Claude, Gemini, Copilot o DeepSeek).<br />
                  3. Pídele las combinaciones que prefieras (ej: <em>&quot;Hazme 3 tandas vegetarianas&quot;</em> o <em>&quot;Hazme 2 tandas con pescado y legumbres&quot;</em>).<br />
                  4. Luego copia la respuesta de la IA y pégala en la pestaña <strong>&quot;Importar Respuesta&quot;</strong> para guardarla en tu recetario.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5A634D] hover:bg-[#49513E] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? '¡Prompt Copiado!' : 'Copiar Prompt al Portapapeles'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload('md')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F5F2EB] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-medium transition-colors shadow-xs"
                    title="Descargar archivo Markdown"
                  >
                    <Download className="w-3.5 h-3.5 text-[#5A634D]" />
                    <span>Descargar .md</span>
                  </button>
                  <button
                    onClick={() => handleDownload('txt')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F5F2EB] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-medium transition-colors shadow-xs"
                    title="Descargar archivo de texto plano"
                  >
                    <Download className="w-3.5 h-3.5 text-[#5A634D]" />
                    <span>Descargar .txt</span>
                  </button>
                </div>
              </div>

              {/* Code/Prompt Viewer */}
              <div className="relative rounded-xl border border-[#E0DBCF] bg-white p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs text-[#3D3D3D] font-mono whitespace-pre-wrap leading-relaxed">
                  {aiPromptMarkdown}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-[#8A8475]">
                  Estructura JSON exacta que la aplicación necesita para renderizar los 4 niveles simultáneos y los parámetros del robot Cecotec.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5A634D] hover:bg-[#49513E] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar JSON'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload('json')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F5F2EB] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-medium transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#5A634D]" />
                    <span>Descargar .json</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl border border-[#E0DBCF] bg-white p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs text-[#3D3D3D] font-mono whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(rawJsonTemplate, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="bg-[#F5F2EB] p-4 rounded-xl border border-[#E0DBCF] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#5A634D] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Importar Tanda Creada por la IA</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleLoadExampleToImport}
                    className="text-xs text-[#5A634D] hover:underline font-semibold"
                  >
                    Cargar ejemplo de prueba
                  </button>
                </div>
                <p className="text-xs text-[#8A8475] leading-relaxed">
                  Pega aquí directamente el bloque JSON generado por ChatGPT, Claude o Gemini. La app detectará los 4 niveles de cocción, tiempos, pasos e ingredientes y lo añadirá inmediatamente a tu recetario.
                </p>
              </div>

              {importError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{importError}</span>
                </div>
              )}

              {importSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>¡Tanda importada con éxito! Añadida a tus recetas.</span>
                </div>
              )}

              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Pega aquí el código JSON devuelto por la IA (incluyendo o no ```json)..."
                rows={10}
                className="w-full bg-white border border-[#E0DBCF] rounded-xl p-3 text-xs font-mono text-[#3D3D3D] placeholder-[#8A8475] focus:outline-none focus:border-[#5A634D] leading-relaxed"
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setImportText('')}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5F2EB] text-[#8A8475] border border-[#E0DBCF] text-xs font-medium transition-colors"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={handleImport}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5A634D] hover:bg-[#49513E] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Validar e Incorporar a mis Tandas</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E0DBCF] bg-[#F5F2EB] flex items-center justify-between gap-3 text-xs text-[#8A8475]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5A634D]" />
            <span>Formato 100% compatible con Cecotec Mambo 10090 (Jarra + Cestillo + Vaporera Doble)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] font-medium transition-colors shadow-xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
