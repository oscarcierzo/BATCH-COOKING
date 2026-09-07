import React, { useState, useEffect } from 'react';
import { Tanda } from './types';
import { DEFAULT_TANDAS } from './data/defaultTandas';
import { Header } from './components/Header';
import { TandasGrid } from './components/TandasGrid';
import { TandaDetailModal } from './components/TandaDetailModal';
import { TandaEditorModal } from './components/TandaEditorModal';
import { WeeklySchedule } from './components/WeeklySchedule';
import { ShoppingList } from './components/ShoppingList';
import { MamboGuide } from './components/MamboGuide';
import { ActiveCookTimer } from './components/ActiveCookTimer';
import { AITemplateModal } from './components/AITemplateModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tandas' | 'cronograma' | 'compra' | 'guia' | 'temporizador'>('tandas');

  // Load tandas with localStorage persistence & merge defaults
  const [tandas, setTandas] = useState<Tanda[]>(() => {
    const saved = localStorage.getItem('mambo_batch_tandas');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge in any new default tandas that are missing
          const existingIds = new Set(parsed.map((t: Tanda) => t.id));
          const missingDefaults = DEFAULT_TANDAS.filter((t) => !existingIds.has(t.id));
          if (missingDefaults.length > 0) {
            const combined = [...parsed, ...missingDefaults];
            localStorage.setItem('mambo_batch_tandas', JSON.stringify(combined));
            return combined;
          }
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing stored tandas', e);
      }
    }
    return DEFAULT_TANDAS;
  });

  const [selectedTanda, setSelectedTanda] = useState<Tanda | null>(null);
  const [editingTanda, setEditingTanda] = useState<Tanda | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAITemplateOpen, setIsAITemplateOpen] = useState(false);
  const [activeCookingTanda, setActiveCookingTanda] = useState<Tanda | null>(null);

  // Sync tandas to localStorage
  const saveTandas = (updated: Tanda[]) => {
    setTandas(updated);
    localStorage.setItem('mambo_batch_tandas', JSON.stringify(updated));
  };

  const handleImportTanda = (newTanda: Tanda) => {
    const updated = [newTanda, ...tandas];
    saveTandas(updated);
    setSelectedTanda(newTanda);
  };

  const handleSaveTanda = (tandaToSave: Tanda) => {
    const index = tandas.findIndex((t) => t.id === tandaToSave.id);
    let updated: Tanda[];
    if (index >= 0) {
      updated = [...tandas];
      updated[index] = tandaToSave;
    } else {
      updated = [tandaToSave, ...tandas];
    }
    saveTandas(updated);
    setIsEditorOpen(false);
    setEditingTanda(null);
  };

  const handleDeleteTanda = (id: string) => {
    if (confirm('¿Seguro que deseas eliminar esta tanda personalizada?')) {
      const updated = tandas.filter((t) => t.id !== id);
      saveTandas(updated);
    }
  };

  const handleDuplicateTanda = (tanda: Tanda) => {
    const duplicated: Tanda = {
      ...tanda,
      id: `tanda-custom-${Date.now()}`,
      titulo: `${tanda.titulo} (Copia)`,
      isCustom: true,
    };
    setEditingTanda(duplicated);
    setIsEditorOpen(true);
  };

  const handleOpenNewTanda = () => {
    setEditingTanda(null);
    setIsEditorOpen(true);
  };

  const handleStartTimer = (tanda: Tanda) => {
    setActiveCookingTanda(tanda);
    setActiveTab('temporizador');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2E241B] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTanda={handleOpenNewTanda}
        onOpenAITemplate={() => setIsAITemplateOpen(true)}
        tandasCount={tandas.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'tandas' && (
          <TandasGrid
            tandas={tandas}
            onSelectTanda={(t) => setSelectedTanda(t)}
            onEditTanda={(t) => {
              setEditingTanda(t);
              setIsEditorOpen(true);
            }}
            onDuplicateTanda={handleDuplicateTanda}
            onDeleteTanda={handleDeleteTanda}
            onStartTimer={handleStartTimer}
            onOpenNewTanda={handleOpenNewTanda}
            onOpenAITemplate={() => setIsAITemplateOpen(true)}
          />
        )}

        {activeTab === 'cronograma' && <WeeklySchedule />}

        {activeTab === 'compra' && <ShoppingList tandas={tandas} />}

        {activeTab === 'guia' && <MamboGuide />}

        {activeTab === 'temporizador' && (
          <ActiveCookTimer
            tanda={activeCookingTanda || tandas[0]}
            onClose={() => setActiveTab('tandas')}
          />
        )}
      </main>

      {/* Detail Modal */}
      {selectedTanda && (
        <TandaDetailModal
          tanda={selectedTanda}
          onClose={() => setSelectedTanda(null)}
          onStartTimer={handleStartTimer}
          onDuplicate={(t) => {
            setSelectedTanda(null);
            handleDuplicateTanda(t);
          }}
        />
      )}

      {/* Editor / Plantilla Vacía Modal */}
      <TandaEditorModal
        isOpen={isEditorOpen}
        initialTanda={editingTanda}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingTanda(null);
        }}
        onSave={handleSaveTanda}
      />

      {/* Modal Plantilla / Prompt para IA y Descarga */}
      <AITemplateModal
        isOpen={isAITemplateOpen}
        onClose={() => setIsAITemplateOpen(false)}
        onImportTanda={handleImportTanda}
      />

      {/* Footer */}
      <footer className="border-t border-[#E0DBCF] bg-[#F5F2EB] py-6 text-center text-xs text-[#8A8475]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Mambo Batch Cooking Planner · Optimizado para <strong className="text-[#3D3D3D]">Cecotec Mambo 10090</strong> (Jarra Inox, Jarra Habana y Vaporera de 2 niveles).
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#8A8475]">
            <span className="font-medium text-[#5A634D]">4 Niveles Sincronizados</span>
            <span>·</span>
            <span>120 ºC / Potencia P7-P8</span>
            <span>·</span>
            <span>Batch Cooking Semanal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
