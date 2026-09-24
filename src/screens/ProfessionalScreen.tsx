import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  User,
  UserPlus,
  ClipboardList,
  FileText,
  Video,
  BarChart2,
  Bell,
  Settings,
  Database,
  CheckCircle2,
  X,
  Plus
} from 'lucide-react';
import { ScreenType, UserProfile } from '../types';

interface ProfessionalScreenProps {
  students: UserProfile[];
  onNavigate: (screen: ScreenType) => void;
  onOpenSqlModal: () => void;
  onBack: () => void;
}

export const ProfessionalScreen: React.FC<ProfessionalScreenProps> = ({
  students,
  onNavigate,
  onOpenSqlModal,
  onBack,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegisterNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName) return;
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setActiveModal(null);
      setNewStudentName('');
      setNewStudentEmail('');
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-[#032115] text-white flex flex-col justify-between overflow-y-auto no-scrollbar select-none relative">
      <div className="px-5 pt-2 pb-4">
        {/* Top Header */}
        <header className="flex items-center pt-2 pb-3 relative">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="p-1 -ml-1 text-white hover:text-[#74D327] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-white ml-3">Área do profissional</h1>
        </header>

        {/* Professional Menu List */}
        <main className="space-y-2.5">
          {/* Item 1: Meus alunos */}
          <button
            type="button"
            onClick={() => setActiveModal('students')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Meus alunos</span>
                <span className="text-xs text-[#8BA69B] leading-tight mt-0.5">Acompanhe a evolução</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item 2: Cadastrar aluno */}
          <button
            type="button"
            onClick={() => setActiveModal('new-student')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Cadastrar aluno</span>
                <span className="text-xs text-[#8BA69B] leading-tight mt-0.5">Novo cadastro</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item 3: Avaliações */}
          <button
            type="button"
            onClick={() => onNavigate('physical-assessment')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Avaliações</span>
                <span className="text-xs text-[#8BA69B] leading-tight mt-0.5">Física e funcional</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item 4: Prescrição de treinos */}
          <button
            type="button"
            onClick={() => onNavigate('workout')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Prescrição de treinos</span>
                <span className="text-xs text-[#8BA69B] leading-tight mt-0.5">Edite e personalize</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item 5: Meus vídeos */}
          <button
            type="button"
            onClick={() => setActiveModal('videos')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <Video className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Meus vídeos</span>
                <span className="text-xs text-[#8BA69B] leading-tight mt-0.5">Envie seus vídeos</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item 6: Relatórios */}
          <button
            type="button"
            onClick={() => onNavigate('evolution')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Relatórios</span>
                <span className="text-xs text-[#8BA69B] leading-tight mt-0.5">Resultados e gráficos</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item 7: Alertas e lembretes */}
          <button
            type="button"
            onClick={() => onNavigate('reminders')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Alertas e lembretes</span>
                <span className="text-xs text-[#8BA69B] leading-tight mt-0.5">Notificações</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item 8: Configurações */}
          <button
            type="button"
            onClick={() => onNavigate('plans')}
            className="w-full flex items-center justify-between p-3.5 bg-[#083322] hover:bg-[#0d422d] rounded-2xl transition border border-white/5 shadow-sm active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-black/25 flex items-center justify-center text-white">
                <Settings className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Configurações e Planos</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8BA69B]" />
          </button>

          {/* Item Especial: Arquitetura SQL */}
          <button
            type="button"
            onClick={onOpenSqlModal}
            className="w-full flex items-center justify-between p-3.5 bg-[#0c402b] hover:bg-[#115037] rounded-2xl transition border border-[#74d327]/30 shadow-md active:scale-[0.99] text-left cursor-pointer mt-4"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#74d327]/20 flex items-center justify-center text-[#74d327]">
                <Database className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#a4f74d] leading-tight">Arquitetura SQL & Cache</span>
                <span className="text-xs text-gray-300 leading-tight mt-0.5">Índices, Particionamento e Redis</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#74d327]" />
          </button>
        </main>
      </div>

      {/* Modal: Meus Alunos */}
      {activeModal === 'students' && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#083322] border border-[#165037] rounded-2xl p-5 w-full max-w-xs space-y-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">Alunos Ativos</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {students.map((student, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveModal(null);
                    onNavigate('student-home');
                  }}
                  className="p-3 bg-[#032115] rounded-xl flex items-center gap-3 cursor-pointer hover:border border-[#74D327]"
                >
                  <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-white">{student.name}</p>
                    <p className="text-[10px] text-gray-400">Meta: {student.targetWeight}kg | 18 treinos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cadastrar Novo Aluno */}
      {activeModal === 'new-student' && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#083322] border border-[#165037] rounded-2xl p-5 w-full max-w-xs space-y-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">Cadastrar Novo Aluno</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
            {registeredSuccess ? (
              <div className="p-4 bg-[#74d327]/20 border border-[#74d327] rounded-xl text-center text-xs font-bold text-[#74d327] flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Aluno cadastrado no banco SQL com sucesso!
              </div>
            ) : (
              <form onSubmit={handleRegisterNewStudent} className="space-y-3">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Eduardo"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full bg-[#032115] border border-[#1a4a34] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#74d327]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@email.com"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full bg-[#032115] border border-[#1a4a34] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#74d327]"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="flex-1 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#74d327] hover:bg-[#64bc21] text-black font-extrabold rounded-lg text-xs"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Meus Vídeos */}
      {activeModal === 'videos' && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#083322] border border-[#165037] rounded-2xl p-5 w-full max-w-xs space-y-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">Biblioteca de Vídeos</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-300">
              Faça upload ou vincule links diretos de vídeos MP4/CDN para seus exercícios prescritos.
            </p>
            <button
              onClick={() => {
                alert('Vídeo carregado e sincronizado com o banco de dados!');
                setActiveModal(null);
              }}
              className="w-full py-2.5 bg-[#74d327] hover:bg-[#64bc21] text-black font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Adicionar Novo Vídeo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
