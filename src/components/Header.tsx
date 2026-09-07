import React from 'react';
import { ChefHat, Flame, Plus, Sparkles, ShoppingCart, Info, Timer, Bot } from 'lucide-react';

interface HeaderProps {
  activeTab: 'tandas' | 'cronograma' | 'compra' | 'guia' | 'temporizador';
  setActiveTab: (tab: 'tandas' | 'cronograma' | 'compra' | 'guia' | 'temporizador') => void;
  onOpenNewTanda: () => void;
  onOpenAITemplate: () => void;
  tandasCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewTanda,
  onOpenAITemplate,
  tandasCount,
}) => {
  const navItems = [
    { id: 'tandas', label: 'Tandas Multinivel', icon: Flame, count: tandasCount },
    { id: 'cronograma', label: 'Sesión Paso a Paso', icon: Timer },
    { id: 'compra', label: 'Lista de la Compra', icon: ShoppingCart },
    { id: 'guia', label: 'Guía Mambo 10090', icon: Info },
  ] as const;

  return (
    <header className="border-b border-[#382112] bg-[#4A2E1B] text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-3.5 gap-2.5">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6B4226] border border-[#85532F] flex items-center justify-center shadow-inner">
                <ChefHat className="w-5 h-5 text-[#F5EFEB]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
                    Mambo 10090 <span className="opacity-80 font-light text-xs sm:text-sm md:text-base">| Batch Cooking</span>
                  </h1>
                  <span className="bg-[#6B4226] text-[#E6DFD5] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#85532F]">
                    Cecotec 4 Niveles
                  </span>
                </div>
                <p className="text-[11px] text-[#D4C4B2] hidden sm:block">
                  Jarra + Cestillo + Vaporera Doble: 4 elaboraciones limpias de una sola vez
                </p>
              </div>
            </div>

            {/* Quick mini-actions for tablet / mobile if ever needed */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={onOpenNewTanda}
                title="Crear nueva tanda"
                className="p-2 min-h-[40px] min-w-[40px] rounded-lg bg-[#6B4226] hover:bg-[#85532F] text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean secondary tools: discrete, not crowding the view */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onOpenNewTanda}
              id="btn-nueva-tanda"
              title="Añadir tanda personalizada"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B4226] hover:bg-[#7D4E2C] text-[#FAF7F2] text-xs font-semibold border border-[#85532F] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Tanda</span>
            </button>
            <button
              onClick={onOpenAITemplate}
              id="btn-plantilla-ia"
              title="Generar combinaciones con Inteligencia Artificial"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              <Bot className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px]">Plantilla IA</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-[#5E3B23]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap min-h-[38px] ${
                  isActive
                    ? 'bg-[#FAF7F2] text-[#4A2E1B] shadow-sm font-bold'
                    : 'text-[#E6DFD5] hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#7A4B26]' : 'text-[#D4C4B2]'}`} />
                <span>{item.label}</span>
                {'count' in item && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#7A4B26]/15 text-[#7A4B26]' : 'bg-[#6B4226] text-[#E6DFD5]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
