import React from 'react';
import { ScreenType, UserRole } from '../types';
import { Home, Dumbbell, BarChart3, Heart, User, Users } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  userRole: UserRole;
  onOpenAccessibility?: () => void;
  onOpenJsonModal?: () => void;
  onOpenSqlModal?: () => void;
  onOpenHostingerModal?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  currentScreen,
  onNavigate,
}) => {
  // Screens where student bottom navigation is displayed
  const showStudentBottomNav = [
    'student-home',
    'workout',
    'evolution',
    'health',
    'profile',
  ].includes(currentScreen);

  // Screens where professional bottom navigation is displayed
  const showProfessionalBottomNav = ['professional'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#040806] flex items-center justify-center p-0 sm:p-4 text-white">
      {/* Main App Screen Container (Centered iPhone-like mobile frame on desktop, 100% full viewport on mobile) */}
      <div className="w-full max-w-[400px] h-[100dvh] sm:h-[844px] sm:max-h-[94vh] sm:rounded-[46px] border-0 sm:border-[8px] sm:border-[#1a2d22] bg-[#09130e] relative overflow-hidden flex flex-col justify-between shadow-2xl">
        {/* iOS Native Status Bar */}
        <header className="w-full pt-3 px-7 flex justify-between items-center text-xs font-semibold text-white tracking-tight z-40 select-none shrink-0">
          <span className="text-[14px] font-semibold">9:41</span>

          {/* Speaker / Notch simulator on desktop */}
          <div className="hidden sm:block w-24 h-4 bg-black/60 rounded-full absolute left-1/2 -translate-x-1/2 top-2"></div>

          <div className="flex items-center space-x-1.5 text-white">
            {/* Cellular signal */}
            <svg className="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
              <rect height="3.5" rx="0.7" width="2.5" x="0" y="8.5"></rect>
              <rect height="6" rx="0.7" width="2.5" x="4.5" y="6"></rect>
              <rect height="9" rx="0.7" width="2.5" x="9" y="3"></rect>
              <rect height="12" rx="0.7" width="2.5" x="13.5" y="0"></rect>
            </svg>
            {/* Wifi */}
            <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
              <path d="M8 2.8c2.8 0 5.4 1.1 7.3 2.9l1.4-1.4C14.4 2 11.4.7 8 .7S1.6 2 .2 4.3l1.4 1.4C3.6 3.9 6.2 2.8 8 2.8zm0 4c1.7 0 3.3.7 4.5 1.8l1.4-1.4C12.3 5.7 10.3 5 8 5S3.7 5.7 2.1 7.2l1.4 1.4C4.7 7.5 6.3 6.8 8 6.8zm0 4c.9 0 1.7.4 2.3 1L8 13.5 5.7 11.8c.6-.6 1.4-1 2.3-1z"></path>
            </svg>
            {/* Battery */}
            <div className="relative w-5 h-2.5 border border-white rounded-[3px] p-0.5 flex items-center">
              <div className="h-full w-full bg-white rounded-[1.5px]"></div>
              <div className="absolute -right-1 top-0.5 w-0.5 h-1.5 bg-white rounded-r-[1px]"></div>
            </div>
          </div>
        </header>

        {/* Screen Content Viewport */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col relative z-20">
          <div className="w-full flex-1 flex flex-col">
            {children}
          </div>
        </div>

        {/* Student Bottom Navigation (Início, Treino, Evolução, Saúde, Perfil) */}
        {showStudentBottomNav && (
          <nav aria-label="Navegação do Aluno" className="w-full bg-[#0a1510] border-t border-[#182b20] px-2 pt-2 pb-4 flex justify-around items-center z-30 select-none">
            <button
              onClick={() => onNavigate('student-home')}
              className={`flex flex-col items-center w-14 transition ${
                currentScreen === 'student-home' ? 'text-[#7ce000]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-semibold">Início</span>
            </button>

            <button
              onClick={() => onNavigate('workout')}
              className={`flex flex-col items-center w-14 transition ${
                currentScreen === 'workout' || currentScreen === 'exercise-detail'
                  ? 'text-[#7ce000]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Dumbbell className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-semibold">Treino</span>
            </button>

            <button
              onClick={() => onNavigate('evolution')}
              className={`flex flex-col items-center w-14 transition ${
                currentScreen === 'evolution' ? 'text-[#7ce000]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-semibold">Evolução</span>
            </button>

            <button
              onClick={() => onNavigate('health')}
              className={`flex flex-col items-center w-14 transition ${
                currentScreen === 'health' ? 'text-[#7ce000]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-semibold">Saúde</span>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className={`flex flex-col items-center w-14 transition ${
                currentScreen === 'profile' ? 'text-[#7ce000]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-semibold">Perfil</span>
            </button>
          </nav>
        )}

        {/* Professional Bottom Navigation (Início, Alunos, Relatórios, Perfil) */}
        {showProfessionalBottomNav && (
          <nav aria-label="Navegação do Profissional" className="w-full bg-[#032115] border-t border-[#0d422d] px-4 pt-2 pb-4 flex justify-between items-center z-30 select-none">
            <button
              onClick={() => onNavigate('student-home')}
              className="flex flex-col items-center text-gray-400 hover:text-white transition px-2"
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium">Início</span>
            </button>

            <button
              onClick={() => onNavigate('professional')}
              className="flex flex-col items-center text-[#74d327] transition px-2"
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-bold">Alunos</span>
            </button>

            <button
              onClick={() => onNavigate('evolution')}
              className="flex flex-col items-center text-gray-400 hover:text-white transition px-2"
            >
              <BarChart3 className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium">Relatórios</span>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center text-gray-400 hover:text-white transition px-2"
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-medium">Perfil</span>
            </button>
          </nav>
        )}

        {/* iOS Bottom Indicator Bar */}
        <div className="w-full pb-2 pt-1 flex justify-center items-center pointer-events-none select-none shrink-0 z-40 bg-transparent">
          <div className="w-32 h-1 bg-white/35 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
