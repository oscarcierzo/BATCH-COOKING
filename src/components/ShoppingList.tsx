import React, { useState } from 'react';
import { ShoppingItem, Tanda } from '../types';
import { 
  ShoppingCart, 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ShoppingListProps {
  tandas: Tanda[];
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ tandas }) => {
  // Generate grocery items from active tandas
  const generateDefaultItems = (): ShoppingItem[] => {
    const items: ShoppingItem[] = [];
    let counter = 1;

    tandas.forEach((t) => {
      // Collect level 4 ingredients (mainly fresh vegetables)
      t.niveles.vaporera_arriba.ingredients.forEach((ing) => {
        items.push({
          id: `item-${counter++}`,
          nombre: ing,
          cantidad: 'Según receta',
          categoria: 'verduras',
          comprado: false,
          tandaTitulo: t.titulo,
        });
      });

      // Collect level 3 ingredients (meat, fish, heavy proteins)
      t.niveles.vaporera_abajo.ingredients.forEach((ing) => {
        items.push({
          id: `item-${counter++}`,
          nombre: ing,
          cantidad: 'Según receta',
          categoria: 'carnes_pescados',
          comprado: false,
          tandaTitulo: t.titulo,
        });
      });

      // Collect level 2 ingredients (grains, eggs, legumes)
      t.niveles.cestillo.ingredients.forEach((ing) => {
        const isEggOrDairy = ing.toLowerCase().includes('huevo') || ing.toLowerCase().includes('leche');
        items.push({
          id: `item-${counter++}`,
          nombre: ing,
          cantidad: 'Según receta',
          categoria: isEggOrDairy ? 'refrigerados' : 'despensa',
          comprado: false,
          tandaTitulo: t.titulo,
        });
      });

      // Collect level 1 ingredients (vegetables, liquids, aromatics)
      t.niveles.jarra.ingredients.forEach((ing) => {
        const lower = ing.toLowerCase();
        let cat: 'verduras' | 'carnes_pescados' | 'despensa' | 'refrigerados' = 'verduras';
        if (lower.includes('caldo') || lower.includes('arroz') || lower.includes('lentejas') || lower.includes('especias') || lower.includes('aceite') || lower.includes('pimentón') || lower.includes('curry')) {
          cat = 'despensa';
        } else if (lower.includes('pescado') || lower.includes('pollo') || lower.includes('carne')) {
          cat = 'carnes_pescados';
        } else if (lower.includes('queso') || lower.includes('leche') || lower.includes('mantequilla')) {
          cat = 'refrigerados';
        }
        items.push({
          id: `item-${counter++}`,
          nombre: ing,
          cantidad: 'Según receta',
          categoria: cat,
          comprado: false,
          tandaTitulo: t.titulo,
        });
      });
    });

    return items;
  };

  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('mambo_shopping_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return generateDefaultItems();
      }
    }
    return generateDefaultItems();
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'verduras' | 'carnes_pescados' | 'despensa' | 'refrigerados'>('verduras');
  const [copied, setCopied] = useState(false);

  const saveItems = (updated: ShoppingItem[]) => {
    setItems(updated);
    localStorage.setItem('mambo_shopping_list', JSON.stringify(updated));
  };

  const toggleItem = (id: string) => {
    const updated = items.map((it) => (it.id === id ? { ...it, comprado: !it.comprado } : it));
    saveItems(updated);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    saveItems(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: ShoppingItem = {
      id: `custom-item-${Date.now()}`,
      nombre: newItemName.trim(),
      cantidad: '1',
      categoria: newItemCategory,
      comprado: false,
    };
    saveItems([newItem, ...items]);
    setNewItemName('');
  };

  const handleReset = () => {
    if (confirm('¿Regenerar la lista de la compra a partir de todas las recetas actuales?')) {
      const regenerated = generateDefaultItems();
      saveItems(regenerated);
    }
  };

  const handleCopy = () => {
    const categoriesLabels = {
      verduras: '🥬 FRUTERÍA Y VERDURAS',
      carnes_pescados: '🥩 CARNICERÍA Y PESCADERÍA',
      despensa: '🌾 DESPENSA Y CEREALES',
      refrigerados: '🧀 REFRIGERADOS Y HUEVOS',
    };

    let text = '🛒 LISTA DE LA COMPRA - MAMBO BATCH COOKING\n\n';
    (['verduras', 'carnes_pescados', 'despensa', 'refrigerados'] as const).forEach((cat) => {
      const catItems = items.filter((it) => it.categoria === cat);
      if (catItems.length > 0) {
        text += `${categoriesLabels[cat]}:\n`;
        catItems.forEach((it) => {
          text += `  [${it.comprado ? 'X' : ' '}] ${it.nombre}\n`;
        });
        text += '\n';
      }
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const categories = [
    { id: 'verduras', label: '🥬 Frutería y Verduras', color: 'emerald' },
    { id: 'carnes_pescados', label: '🥩 Carnicería y Pescadería', color: 'rose' },
    { id: 'despensa', label: '🌾 Despensa, Arroces y Especias', color: 'amber' },
    { id: 'refrigerados', label: '🧀 Refrigerados y Huevos', color: 'blue' },
  ] as const;

  const totalCount = items.length;
  const purchasedCount = items.filter((it) => it.comprado).length;

  return (
    <div className="bg-white border border-[#E2D7CB] rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header and Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D7CB]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A4B26]/10 border border-[#7A4B26]/20 text-[#7A4B26] text-xs font-semibold mb-2">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Lista de la Compra Semanal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2E241B] font-['Outfit',sans-serif]">
            Ingredientes Consolidados por Sección
          </h2>
          <p className="text-xs text-[#6D5E50] mt-1">
            Organizada por pasillos para hacer la compra en 15 minutos sin olvidar ningún nivel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#2E241B] border border-[#E2D7CB] text-xs font-semibold transition-colors shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-[#4B6846]" /> : <Copy className="w-4 h-4 text-[#7A4B26]" />}
            <span>{copied ? '¡Copiada!' : 'Copiar Texto'}</span>
          </button>
          <button
            onClick={handleReset}
            title="Regenerar lista con recetas"
            className="p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#827364] hover:text-[#2E241B] border border-[#E2D7CB] transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5 bg-[#FAF7F2] p-3 rounded-xl border border-[#E2D7CB]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#827364] font-medium">Progreso de compra:</span>
          <span className="text-[#2E241B] font-bold font-mono">
            {purchasedCount} de {totalCount} artículos ({totalCount ? Math.round((purchasedCount / totalCount) * 100) : 0}%)
          </span>
        </div>
        <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E2D7CB]">
          <div
            className="h-full bg-[#7A4B26] transition-all duration-300"
            style={{ width: `${totalCount ? (purchasedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Añadir ingrediente adicional..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 bg-[#FAF7F2] border border-[#D4C4B2] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2E241B] placeholder-[#8F8171] focus:outline-none focus:border-[#7A4B26]"
        />
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as any)}
          className="bg-[#FAF7F2] border border-[#D4C4B2] rounded-xl px-3 py-2.5 text-xs text-[#2E241B] focus:outline-none focus:border-[#7A4B26]"
        >
          <option value="verduras">🥬 Frutería / Verdura</option>
          <option value="carnes_pescados">🥩 Carne / Pescado</option>
          <option value="despensa">🌾 Despensa / Cereales</option>
          <option value="refrigerados">🧀 Refrigerados / Lácteos</option>
        </select>
        <button
          type="submit"
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#7A4B26] hover:bg-[#663D1F] text-white text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir</span>
        </button>
      </form>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const categoryItems = items.filter((it) => it.categoria === cat.id);

          return (
            <div key={cat.id} className="bg-[#FAF7F2] border border-[#E2D7CB] rounded-xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2D7CB] pb-2">
                <span className="text-xs font-bold text-[#2E241B] uppercase tracking-wider">
                  {cat.label}
                </span>
                <span className="text-[11px] text-[#827364] font-mono">
                  {categoryItems.filter((i) => i.comprado).length}/{categoryItems.length}
                </span>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                      item.comprado
                        ? 'bg-[#EAE4DC]/60 border-transparent text-[#827364] line-through'
                        : 'bg-white border-[#E2D7CB] text-[#2E241B] hover:border-[#7A4B26]/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {item.comprado ? (
                        <CheckSquare className="w-4 h-4 text-[#4B6846] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#827364] shrink-0" />
                      )}
                      <span className="truncate">{item.nombre}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="p-1 rounded text-[#827364] hover:text-[#A85A32] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {categoryItems.length === 0 && (
                  <p className="text-xs text-[#827364] italic py-2">No hay artículos en esta categoría.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
