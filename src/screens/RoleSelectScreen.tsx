import React from 'react';
import { ArrowLeft, ChevronRight, User } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectScreenProps {
  onSelectRole: (role: UserRole) => void;
  onBack: () => void;
  coupleHeroImage: string;
  trainerAvatarImage: string;
}

export const RoleSelectScreen: React.FC<RoleSelectScreenProps> = ({
  onSelectRole,
  onBack,
  coupleHeroImage,
  trainerAvatarImage,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#0c1813] text-white p-0 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-col w-full">
        <header className="relative flex items-center justify-center px-4 pt-3 pb-2">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="absolute left-4 p-1.5 text-white hover:opacity-80 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="text-[19px] font-bold tracking-normal text-white">Você é:</h1>
        </header>

        {/* Hero Senior Couple Banner */}
        <section className="w-full px-5 pt-2 pb-3">
          <div className="w-full h-44 rounded-2xl overflow-hidden shadow-md bg-[#18271e] relative">
            <img
              src={coupleHeroImage}
              alt="Casal sênior sorrindo e saudável"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </section>

        {/* Role Options */}
        <section className="w-full px-5 pt-2 flex flex-col gap-3.5">
          {/* Card 1: Aluno 60+ */}
          <button
            onClick={() => onSelectRole('student')}
            className="w-full bg-white rounded-2xl p-3.5 flex items-center justify-between text-left shadow-lg hover:bg-slate-50 active:scale-[0.99] transition duration-150 group cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1 pr-2">
              <div className="w-12 h-12 rounded-full bg-[#107038] flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                <User className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[#0d2217] text-[16px] font-extrabold leading-snug">Aluno 60+</h2>
                <p className="text-slate-600 text-[11.5px] font-medium leading-tight mt-0.5">
                  Quero treinar, cuidar da minha saúde e ter mais qualidade de vida.
                </p>
              </div>
            </div>
            <div className="text-[#107038] flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </div>
          </button>

          {/* Card 2: Profissional */}
          <button
            onClick={() => onSelectRole('professional')}
            className="w-full bg-white rounded-2xl p-3.5 flex items-center justify-between text-left shadow-lg hover:bg-slate-50 active:scale-[0.99] transition duration-150 group cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1 pr-2">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-emerald-600 shadow-inner bg-slate-200">
                <img
                  src={trainerAvatarImage}
                  alt="Profissional de Educação Física"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[#0d2217] text-[16px] font-extrabold leading-snug">Profissional</h2>
                <p className="text-slate-600 text-[11.5px] font-medium leading-tight mt-0.5">
                  Sou profissional de Educação Física ou Fisioterapeuta e quero acompanhar meus alunos.
                </p>
              </div>
            </div>
            <div className="text-[#107038] flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </div>
          </button>
        </section>
      </div>

      {/* Footer Brand Motto */}
      <footer className="w-full px-6 pb-6 pt-4 flex flex-col items-center justify-end text-center mt-auto">
        <p className="text-[13px] font-medium text-slate-200 tracking-normal mb-2 leading-snug">
          Juntos por um envelhecimento<br />mais ativo!
        </p>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline leading-none font-black italic tracking-tighter">
            <span className="text-white text-[32px] tracking-tight">60</span>
            <span className="text-[#6fc91d] text-[20px] font-extrabold mx-0.5 -translate-y-2">+</span>
            <span className="text-[#6fc91d] text-[34px] tracking-tight font-black italic">FIT</span>
          </div>
          <span className="text-white/85 text-[8.5px] font-bold tracking-[0.22em] mt-0.5 uppercase">
            Musculação e Funcionalidade
          </span>
        </div>
      </footer>
    </div>
  );
};
