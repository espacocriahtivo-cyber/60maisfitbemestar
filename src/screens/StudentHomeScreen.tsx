import React from 'react';
import { UserProfile, ScreenType } from '../types';
import { Dumbbell, BarChart3, Heart, Play, Activity, PersonStanding, Footprints, ShieldAlert } from 'lucide-react';

interface StudentHomeScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onSelectProgram: (programName: string) => void;
}

export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({
  user,
  onNavigate,
  onSelectProgram,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-start px-5 pt-2 pb-3 overflow-y-auto no-scrollbar bg-[#0f1713] text-white select-none">
      {/* User Greeting Section */}
      <section className="flex items-center space-x-3.5 mb-4 mt-1">
        {/* User Avatar with Green Ring */}
        <div className="relative flex-shrink-0 cursor-pointer" onClick={() => onNavigate('profile')}>
          <div className="w-[62px] h-[62px] rounded-full p-0.5 bg-gradient-to-tr from-[#74d812] to-emerald-400 shadow-md">
            <img
              src={user.avatarUrl}
              alt={`Foto de ${user.name}`}
              className="w-full h-full object-cover rounded-full bg-slate-200"
            />
          </div>
        </div>

        {/* Greeting Texts */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-white tracking-wide leading-tight">
            Olá, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-[12px] text-gray-300 leading-snug font-medium mt-0.5">
            Que bom te ver por aqui!<br />
            <span className="text-gray-400">Vamos cuidar da sua saúde hoje?</span>
          </p>
        </div>
      </section>

      {/* 2x2 Quick Actions Grid */}
      <section aria-label="Ações Rápidas" className="grid grid-cols-2 gap-3 mb-4">
        {/* Card 1: Começar treino */}
        <button
          type="button"
          onClick={() => onNavigate('workout')}
          className="bg-[#dcf3c8] text-left rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md active:scale-98 transition-transform min-h-[116px] cursor-pointer hover:brightness-105"
        >
          <div className="w-10 h-10 flex items-center justify-center mb-1 text-[#1c3311]">
            <Dumbbell className="w-8 h-8 stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold text-[#14230d] leading-tight">
            Começar<br />treino
          </span>
        </button>

        {/* Card 2: Meu progresso */}
        <button
          type="button"
          onClick={() => onNavigate('evolution')}
          className="bg-[#dcf0fc] text-left rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md active:scale-98 transition-transform min-h-[116px] cursor-pointer hover:brightness-105"
        >
          <div className="w-10 h-10 flex items-center justify-center mb-1 text-[#175c87]">
            <BarChart3 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold text-[#0c3148] leading-tight">
            Meu<br />progresso
          </span>
        </button>

        {/* Card 3: Minha saúde */}
        <button
          type="button"
          onClick={() => onNavigate('health')}
          className="bg-[#fce5e8] text-left rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md active:scale-98 transition-transform min-h-[116px] cursor-pointer hover:brightness-105"
        >
          <div className="w-10 h-10 flex items-center justify-center mb-1 text-[#e11d48]">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <span className="text-sm font-bold text-[#4c0519] leading-tight">
            Minha<br />saúde
          </span>
        </button>

        {/* Card 4: Exercícios */}
        <button
          type="button"
          onClick={() => onNavigate('workout')}
          className="bg-[#fef3c7] text-left rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md active:scale-98 transition-transform min-h-[116px] cursor-pointer hover:brightness-105"
        >
          <div className="w-10 h-10 flex items-center justify-center mb-1 text-[#192219]">
            <div className="w-9 h-9 rounded-full bg-[#18231c] flex items-center justify-center text-white pl-0.5 shadow-sm">
              <Play className="w-4 h-4 fill-white" />
            </div>
          </div>
          <span className="text-sm font-bold text-[#302102] leading-tight">
            Exercícios
          </span>
        </button>
      </section>

      {/* Programas 60+ Section */}
      <section className="mt-1 flex flex-col justify-start">
        <h2 className="text-base font-bold text-white mb-2.5 tracking-tight">Programas 60+</h2>
        <div className="grid grid-cols-4 gap-2">
          {/* Força */}
          <button
            type="button"
            onClick={() => {
              onSelectProgram('Força');
              onNavigate('workout');
            }}
            className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
          >
            <div className="w-[70px] h-[52px] bg-[#e0f4ff] rounded-xl flex items-center justify-center shadow-sm group-hover:brightness-105">
              <Dumbbell className="w-6 h-6 text-[#0284c7] stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-200 mt-1.5 text-center">Força</span>
          </button>

          {/* Equilíbrio */}
          <button
            type="button"
            onClick={() => {
              onSelectProgram('Equilíbrio');
              onNavigate('workout');
            }}
            className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
          >
            <div className="w-[70px] h-[52px] bg-[#daf3d6] rounded-xl flex items-center justify-center shadow-sm group-hover:brightness-105">
              <PersonStanding className="w-6 h-6 text-[#16a34a] stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-200 mt-1.5 text-center">Equilíbrio</span>
          </button>

          {/* Mobilidade */}
          <button
            type="button"
            onClick={() => {
              onSelectProgram('Mobilidade');
              onNavigate('workout');
            }}
            className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
          >
            <div className="w-[70px] h-[52px] bg-[#fef5d8] rounded-xl flex items-center justify-center shadow-sm group-hover:brightness-105">
              <Footprints className="w-6 h-6 text-[#d97706] stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-200 mt-1.5 text-center">Mobilidade</span>
          </button>

          {/* Prevenção de quedas */}
          <button
            type="button"
            onClick={() => {
              onSelectProgram('Prevenção de quedas');
              onNavigate('workout');
            }}
            className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
          >
            <div className="w-[70px] h-[52px] bg-[#eedfff] rounded-xl flex items-center justify-center shadow-sm group-hover:brightness-105">
              <Activity className="w-6 h-6 text-[#7c3aed] stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-semibold text-gray-200 mt-1.5 text-center leading-tight">
              Prevenção<br />de quedas
            </span>
          </button>
        </div>
      </section>

      {/* Motivational Senior Reminder Banner */}
      <section className="mt-4 p-3 bg-[#13231a] border border-[#1e3c2b] rounded-2xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#7ce000]/15 flex items-center justify-center text-[#7ce000] shrink-0">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-white">Lembrete do dia: Hidrate-se!</p>
          <p className="text-[10.5px] text-gray-400">Beba 1 copo de água antes e depois do seu treino.</p>
        </div>
        <button
          onClick={() => onNavigate('reminders')}
          className="text-[11px] text-[#7ce000] font-bold underline"
        >
          Ver todos
        </button>
      </section>
    </div>
  );
};
