import React, { useState, useEffect, useRef } from 'react';
import { Tanda } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Flame, 
  CheckCircle, 
  AlertTriangle, 
  Layers, 
  Volume2, 
  VolumeX, 
  Clock,
  ChefHat
} from 'lucide-react';

interface ActiveCookTimerProps {
  tanda: Tanda | null;
  onClose: () => void;
}

export const ActiveCookTimer: React.FC<ActiveCookTimerProps> = ({ tanda, onClose }) => {
  if (!tanda) return null;

  const totalSeconds = tanda.mamboParams.tiempoMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<any>(null);

  // Play a clean synthesized tone with Web Audio API
  const playBeep = (frequency = 880, duration = 0.3) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio context unavailable', e);
    }
  };

  useEffect(() => {
    setSecondsRemaining(tanda.mamboParams.tiempoMinutes * 60);
    setIsRunning(false);
  }, [tanda]);

  useEffect(() => {
    if (isRunning && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playBeep(1046, 0.8); // High finish chime
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, secondsRemaining]);

  const togglePlay = () => {
    if (!isRunning) playBeep(523, 0.15);
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(tanda.mamboParams.tiempoMinutes * 60);
  };

  const addMinute = (min: number) => {
    setSecondsRemaining((prev) => Math.max(0, prev + min * 60));
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const progressPercent = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;

  return (
    <div className="bg-white border border-[#E0DBCF] rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E0DBCF]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#5A634D]/15 text-[#5A634D] border border-[#5A634D]/25">
              Asistente de Cocinado en Vivo
            </span>
            <span className="text-xs text-[#8A8475]">
              Mambo 10090
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3D3D3D] font-['Outfit',sans-serif]">
            {tanda.titulo}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-[#F5F2EB] hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] transition-colors"
            title={soundEnabled ? 'Silenciar avisos' : 'Activar sonido'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#5A634D]" /> : <VolumeX className="w-4 h-4 text-[#8A8475]" />}
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-[#F5F2EB] hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-semibold transition-colors shadow-xs"
          >
            Volver a Recetas
          </button>
        </div>
      </div>

      {/* Main Timer Display (Styled like Mambo Screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Digital Robot Panel */}
        <div className="lg:col-span-2 bg-[#F5F2EB] border-2 border-[#5A634D]/40 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm">
          <div className="text-[11px] font-mono text-[#8A8475] uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-[#5A634D] animate-ping' : 'bg-[#8A8475]'}`}></span>
            <span>PANTALLA DIGITAL MAMBO 10090</span>
          </div>

          {/* Time Countdown */}
          <div className="font-mono text-6xl sm:text-7xl font-extrabold text-[#3D3D3D] tracking-wider my-3 drop-shadow-xs">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto h-2.5 bg-white rounded-full overflow-hidden my-4 border border-[#E0DBCF]">
            <div
              className="h-full bg-[#5A634D] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Mambo Preset parameters */}
          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto mt-4 p-3 rounded-xl bg-white border border-[#E0DBCF] text-xs font-mono shadow-xs">
            <div>
              <span className="text-[#8A8475] text-[10px] block">TEMPERATURA</span>
              <span className="text-[#9E7326] font-bold text-sm">{tanda.mamboParams.temperatura} ºC</span>
            </div>
            <div>
              <span className="text-[#8A8475] text-[10px] block">POTENCIA</span>
              <span className="text-[#A35D39] font-bold text-sm">P{tanda.mamboParams.potencia}</span>
            </div>
            <div>
              <span className="text-[#8A8475] text-[10px] block">VELOCIDAD</span>
              <span className="text-[#5A634D] font-bold text-sm">V{tanda.mamboParams.velocidad}</span>
            </div>
            <div>
              <span className="text-[#8A8475] text-[10px] block">ACCESORIO</span>
              <span className="text-[#7B866B] font-bold text-xs uppercase truncate block">
                {tanda.mamboParams.accesorio === 'sin_accesorio' ? 'Sin acc.' : tanda.mamboParams.accesorio}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => addMinute(-1)}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-mono font-bold shadow-xs transition-colors"
            >
              -1 min
            </button>
            <button
              onClick={togglePlay}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 ${
                isRunning
                  ? 'bg-[#C49746] hover:bg-[#9E7326] text-white'
                  : 'bg-[#5A634D] hover:bg-[#49513E] text-white'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isRunning ? 'Pausar' : 'Iniciar Cocción'}</span>
            </button>
            <button
              onClick={() => addMinute(1)}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#EDE9DE] text-[#3D3D3D] border border-[#E0DBCF] text-xs font-mono font-bold shadow-xs transition-colors"
            >
              +1 min
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-white hover:bg-[#EDE9DE] text-[#8A8475] hover:text-[#3D3D3D] border border-[#E0DBCF] transition-colors shadow-xs"
              title="Reiniciar temporizador"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Levels Checklist during active cooking */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-[#5A634D] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>Estado de los 4 Niveles</span>
          </h3>

          {/* Level 4 */}
          <div className="p-3 rounded-xl bg-white border border-[#E0DBCF] text-xs space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#5A634D]">N4: Vaporera Superior</span>
              <span className="text-[10px] text-[#8A8475] font-mono">
                {tanda.niveles.vaporera_arriba.recommendedTimeMinutes}m
              </span>
            </div>
            <p className="text-[#3D3D3D] font-medium truncate">{tanda.niveles.vaporera_arriba.food}</p>
            <p className="text-[11px] text-[#8A8475]">Tapa puesta · Comprobar punto al dente</p>
          </div>

          {/* Level 3 */}
          <div className="p-3 rounded-xl bg-white border border-[#E0DBCF] text-xs space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#7B866B]">N3: Vaporera Inferior</span>
              <span className="text-[10px] text-[#8A8475] font-mono">
                {tanda.niveles.vaporera_abajo.recommendedTimeMinutes}m
              </span>
            </div>
            <p className="text-[#3D3D3D] font-medium truncate">{tanda.niveles.vaporera_abajo.food}</p>
            <p className="text-[11px] text-[#8A8475]">Cocción directa · Los jugos caen al fondo</p>
          </div>

          {/* Level 2 */}
          <div className="p-3 rounded-xl bg-white border border-[#E0DBCF] text-xs space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#9E7326]">N2: Cestillo Interior</span>
              <span className="text-[10px] text-[#8A8475] font-mono">
                {tanda.niveles.cestillo.recommendedTimeMinutes}m
              </span>
            </div>
            <p className="text-[#3D3D3D] font-medium truncate">{tanda.niveles.cestillo.food}</p>
            <p className="text-[11px] text-[#8A8475]">Extraer con la muesca de la espátula</p>
          </div>

          {/* Level 1 */}
          <div className="p-3 rounded-xl bg-white border border-[#E0DBCF] text-xs space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#A35D39]">N1: Jarra {tanda.mamboParams.jarraType === 'habana' ? 'Habana' : 'Inox'}</span>
              <span className="text-[10px] text-[#8A8475] font-mono">
                {tanda.niveles.jarra.recommendedTimeMinutes}m
              </span>
            </div>
            <p className="text-[#3D3D3D] font-medium truncate">{tanda.niveles.jarra.food}</p>
            <p className="text-[11px] text-[#8A8475]">Base generadora de vapor continuo</p>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3.5 rounded-xl bg-[#EDE9DE] border border-[#D1CCBF] flex items-center gap-2.5 text-xs text-[#3D3D3D]">
        <AlertTriangle className="w-4 h-4 shrink-0 text-[#C49746]" />
        <span>
          <strong>Seguridad Mambo:</strong> Al sonar el pitido, retira la tapa de la vaporera hacia el lado opuesto a tu
          cara para evitar el golpe de vapor. Usa la espátula para extraer el cestillo sin tocar el metal caliente.
        </span>
      </div>
    </div>
  );
};
