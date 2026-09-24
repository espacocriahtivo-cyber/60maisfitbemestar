import React from 'react';
import { ArrowLeft, Dumbbell, Play, ChevronRight } from 'lucide-react';
import { ExerciseItem } from '../types';

interface WorkoutScreenProps {
  exercises: ExerciseItem[];
  onSelectExercise: (exercise: ExerciseItem) => void;
  onStartWorkout: () => void;
  onBack: () => void;
}

export const WorkoutScreen: React.FC<WorkoutScreenProps> = ({
  exercises,
  onSelectExercise,
  onStartWorkout,
  onBack,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-2 pb-3 overflow-y-auto no-scrollbar bg-[#09130d] text-white select-none">
      {/* Top Bar */}
      <div>
        <nav className="relative flex items-center justify-between py-2">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-white/10 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="text-lg font-bold text-white tracking-wide">Treino de hoje</h1>
          <div className="w-9 h-9"></div>
        </nav>

        {/* Workout Header Card */}
        <section className="mt-1 mb-3.5 bg-[#112017] border border-[#1a3324] rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#86ef3c]/15 border border-[#86ef3c]/30 flex items-center justify-center flex-shrink-0 text-[#86ef3c]">
            <Dumbbell className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-snug tracking-tight">Treino A</h2>
            <p className="text-xs text-[#a2bbaa] font-medium mt-0.5">Força e funcionalidade</p>
          </div>
        </section>

        {/* Exercise List */}
        <section aria-label="Lista de Exercícios" className="space-y-2.5">
          {exercises.map((exercise) => (
            <article
              key={exercise.id}
              onClick={() => onSelectExercise(exercise)}
              className="bg-[#121c15] border border-[#1d2d23] hover:border-[#86ef3c]/50 active:scale-[0.99] rounded-xl p-2.5 flex items-center space-x-3 transition cursor-pointer group"
            >
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-[#1a2d21]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white tracking-tight truncate group-hover:text-[#86ef3c] transition-colors">
                  {exercise.name}
                </h3>
                <p className="text-xs text-[#8da696] mt-0.5 font-medium">{exercise.repetitions}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8da696] group-hover:text-[#86ef3c] group-hover:translate-x-0.5 transition" />
            </article>
          ))}
        </section>
      </div>

      {/* Primary CTA Button */}
      <div className="pt-4 pb-1 mt-auto">
        <button
          onClick={onStartWorkout}
          type="button"
          className="w-full bg-[#86ef3c] hover:bg-[#7ce433] active:scale-[0.98] text-[#061208] font-extrabold text-sm tracking-wider uppercase py-3.5 px-6 rounded-xl shadow-lg shadow-[#86ef3c]/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>INICIAR TREINO</span>
        </button>
      </div>
    </div>
  );
};
