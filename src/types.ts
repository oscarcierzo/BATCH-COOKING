export type CookingLevelKey = 'jarra' | 'cestillo' | 'vaporera_abajo' | 'vaporera_arriba';

export interface LevelDetail {
  title: string;
  food: string;
  ingredients: string[];
  tips?: string;
  recommendedTimeMinutes: number;
}

export interface MamboParams {
  jarraType: 'inox' | 'habana';
  accesorio: 'cuchillas' | 'mambomix' | 'mariposa' | 'sin_accesorio';
  velocidad: number | string;
  tiempoMinutes: number;
  temperatura: number;
  potencia: number; // 1 to 10
}

export interface Tanda {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: 'clasico' | 'fitness' | 'mediterraneo' | 'legumbres' | 'asiatico' | 'custom';
  tiempoTotalMinutes: number;
  raciones: number;
  dificultad: 'Fácil' | 'Media' | 'Avanzada';
  mamboParams: MamboParams;
  niveles: {
    jarra: LevelDetail;
    cestillo: LevelDetail;
    vaporera_abajo: LevelDetail;
    vaporera_arriba: LevelDetail;
  };
  pasos: string[];
  consejosChef: string[];
  platosGenerados: string[];
  diasRecomendados: string[];
  isCustom?: boolean;
}

export interface WeeklyDayPlan {
  dia: string;
  almuerzo: string;
  cena: string;
  tandasUsadas: string[];
  consejoDia: string;
}

export interface ShoppingItem {
  id: string;
  nombre: string;
  cantidad: string;
  categoria: 'verduras' | 'carnes_pescados' | 'despensa' | 'refrigerados';
  comprado: boolean;
  tandaTitulo?: string;
}
