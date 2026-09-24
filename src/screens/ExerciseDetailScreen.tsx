import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Maximize2, Volume2, Timer, Repeat, CheckCircle2 } from 'lucide-react';
import { ExerciseItem } from '../types';

interface ExerciseDetailScreenProps {
  exercise: ExerciseItem;
  onComplete: () => void;
  onBack: () => void;
  ttsEnabled: boolean;
}

export const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({
  exercise,
  onComplete,
  onBack,
  ttsEnabled,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = exercise.videoDurationSeconds || 10;

  // Rest timer
  const [restCountdown, setRestCountdown] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedNotification, setCompletedNotification] = useState(false);

  // Video progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Rest countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (restCountdown !== null && restCountdown > 0) {
      timer = setInterval(() => {
        setRestCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [restCountdown]);

  // Audio instruction using browser SpeechSynthesis (TTS)
  const speakInstruction = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const textToSpeak = `${exercise.name}. ${exercise.instructionText}. Faça ${exercise.series} séries de ${exercise.repetitions}, com descanso de ${exercise.restSeconds} segundos.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRestTimer = () => {
    setRestCountdown(exercise.restSeconds);
    if ('speechSynthesis' in window && ttsEnabled) {
      const u = new SpeechSynthesisUtterance(`Descanso de ${exercise.restSeconds} segundos iniciado.`);
      u.lang = 'pt-BR';
      window.speechSynthesis.speak(u);
    }
  };

  const handleFinish = () => {
    setCompletedNotification(true);
    if ('speechSynthesis' in window && ttsEnabled) {
      const u = new SpeechSynthesisUtterance('Parabéns! Exercício concluído com sucesso!');
      u.lang = 'pt-BR';
      window.speechSynthesis.speak(u);
    }
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-2 pb-4 overflow-y-auto no-scrollbar bg-[#021814] text-white select-none">
      {/* Top Bar */}
      <div>
        <header className="flex items-center justify-between pb-2">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-white/90 hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="text-base font-bold text-center text-white tracking-tight flex-1 px-1 line-clamp-1">
            {exercise.name}
          </h1>
          <div className="w-8"></div>
        </header>

        {/* Video Player Card */}
        <section className="relative w-full rounded-2xl overflow-hidden bg-black/60 shadow-lg border border-emerald-950/60 aspect-[4/3] flex items-center justify-center group mb-3">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

          {/* Center Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            className="absolute z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-white" />
            ) : (
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            )}
          </button>

          {/* Player Bottom Scrubber Bar */}
          <div className="absolute bottom-0 inset-x-0 px-3.5 pb-2.5 pt-4 flex flex-col justify-end">
            <div className="w-full flex items-center space-x-2">
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setCurrentTime(Math.round(ratio * duration));
                }}
                className="h-1.5 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full bg-[#84e404] rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              <span className="text-[11px] font-semibold text-white/95 tracking-wide shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-between mt-1 text-white/90">
              <button
                onClick={() => setCurrentTime(0)}
                aria-label="Reiniciar vídeo"
                className="hover:text-[#84e404] transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert('Modo tela cheia ativado')}
                aria-label="Tela cheia"
                className="hover:text-[#84e404] transition"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Instruction Card with Audio TTS Button */}
        <section className="w-full bg-[#05231e] border border-[#0d3b32] rounded-2xl p-4 flex flex-col items-center text-center shadow-md mb-3">
          <button
            onClick={speakInstruction}
            type="button"
            className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors mb-2.5 active:scale-95 cursor-pointer ${
              isSpeaking
                ? 'bg-[#84e404] text-black animate-pulse font-bold'
                : 'bg-white/10 hover:bg-white/15 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeaking ? 'Falando instrução...' : 'Ouvir instrução'}</span>
          </button>
          <p className="text-sm leading-relaxed text-gray-200 font-medium">
            {exercise.instructionText}
          </p>
        </section>

        {/* Metrics Badges: Series & Rest */}
        <section className="grid grid-cols-2 gap-3 w-full">
          {/* Series badge */}
          <div className="bg-[#05231e] border border-[#0d3b32] rounded-2xl p-3 flex items-center space-x-3 shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#021814] border border-[#84e404]/40 flex items-center justify-center shrink-0">
              <Repeat className="w-5 h-5 text-[#84e404]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                {exercise.series} séries
              </span>
              <span className="text-[11px] text-gray-300 font-medium leading-tight mt-0.5">
                {exercise.repetitions}
              </span>
            </div>
          </div>

          {/* Rest Timer badge */}
          <button
            type="button"
            onClick={startRestTimer}
            className="bg-[#05231e] border border-[#0d3b32] hover:border-[#84e404]/40 active:scale-95 transition rounded-2xl p-3 flex items-center space-x-3 shadow-md cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-full bg-[#021814] border border-[#84e404]/40 flex items-center justify-center shrink-0">
              <Timer className="w-5 h-5 text-[#84e404]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                Descanso
              </span>
              <span className="text-[11px] text-[#84e404] font-bold leading-tight mt-0.5">
                {restCountdown !== null ? `${restCountdown}s restantes` : `${exercise.restSeconds} segundos`}
              </span>
            </div>
          </button>
        </section>
      </div>

      {/* Completion Toast & Bottom CTA */}
      <footer className="pt-4 pb-1">
        {completedNotification && (
          <div className="mb-2 p-2 bg-[#84e404]/20 border border-[#84e404] rounded-xl text-center text-xs font-bold text-[#84e404] flex items-center justify-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-4 h-4" /> Exercício concluído com sucesso!
          </div>
        )}
        <button
          onClick={handleFinish}
          type="button"
          className="w-full py-4 bg-[#84e404] hover:bg-[#74cc03] active:scale-[0.98] transition-all rounded-full text-black font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-[0_4px_20px_rgba(132,228,4,0.35)] flex items-center justify-center cursor-pointer"
        >
          CONCLUIR EXERCÍCIO
        </button>
      </footer>
    </div>
  );
};
