import React, { useState } from 'react';
import { ArrowLeft, Calendar, Droplet, Heart, ClipboardCheck, Stethoscope, Plus } from 'lucide-react';
import { ReminderItem } from '../types';

interface RemindersScreenProps {
  reminders: ReminderItem[];
  onToggleReminder: (id: string, enabled: boolean) => void;
  onAddReminder: (item: Omit<ReminderItem, 'id'>) => void;
  onBack: () => void;
}

export const RemindersScreen: React.FC<RemindersScreenProps> = ({
  reminders,
  onToggleReminder,
  onAddReminder,
  onBack,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');
  const [newIconType, setNewIconType] = useState<ReminderItem['iconType']>('calendar');

  const renderIcon = (type: ReminderItem['iconType']) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="w-6 h-6 text-[#80E832]" />;
      case 'water':
        return <Droplet className="w-6 h-6 text-[#80E832]" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-[#80E832] fill-current" />;
      case 'clipboard':
        return <ClipboardCheck className="w-6 h-6 text-[#80E832]" />;
      case 'medical':
        return <Stethoscope className="w-6 h-6 text-[#80E832]" />;
      default:
        return <Calendar className="w-6 h-6 text-[#80E832]" />;
    }
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddReminder({
      title: newTitle,
      timeOrDate: newTime,
      iconType: newIconType,
      enabled: true,
    });
    setNewTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-2 pb-4 overflow-y-auto no-scrollbar bg-[#0c1410] text-white select-none relative">
      {/* Header */}
      <div>
        <header className="relative flex items-center justify-between pb-3">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full active:bg-[#1a2c22] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white flex-1 text-center pr-8">
            Lembretes
          </h1>
        </header>

        {/* Reminders List */}
        <main className="space-y-3 pt-1">
          {reminders.map((rem) => (
            <div
              key={rem.id}
              className="flex items-center justify-between p-3.5 bg-[#142019] border border-[#21352a] rounded-2xl shadow-sm hover:border-[#2d4738] transition-colors"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#1d2f25] flex items-center justify-center">
                  {renderIcon(rem.iconType)}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white tracking-wide">{rem.title}</h2>
                  <p className="text-sm font-medium text-slate-400">{rem.timeOrDate}</p>
                </div>
              </div>

              {/* iOS Accessible Switch Toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={rem.enabled}
                onClick={() => onToggleReminder(rem.id, !rem.enabled)}
                className={`w-[52px] h-[30px] rounded-full p-[3px] transition-colors cursor-pointer relative ${
                  rem.enabled ? 'bg-[#80E832]' : 'bg-[#34463c]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white transition-transform ${
                    rem.enabled ? 'translate-x-[22px]' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </main>
      </div>

      {/* Bottom CTA */}
      <footer className="pt-4 pb-1">
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="w-full py-4 px-6 bg-[#80E832] hover:bg-[#72ce2c] text-black font-extrabold text-base rounded-full shadow-lg shadow-[#80E832]/20 active:scale-[0.98] transition-all tracking-wider uppercase text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>ADICIONAR LEMBRETE</span>
        </button>
      </footer>

      {/* Modal: Adicionar Lembrete */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#142019] border border-[#21352a] rounded-2xl p-5 w-full max-w-xs space-y-4">
            <h3 className="text-base font-bold text-white text-center">Novo Lembrete de Saúde</h3>
            <form onSubmit={handleCreateReminder} className="space-y-3">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Título do Lembrete</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Alongamento da tarde"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0a1510] border border-[#21352a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#80E832]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Horário ou Data</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 16:30 ou 20/10"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-[#0a1510] border border-[#21352a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#80E832]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Categoria</label>
                <select
                  value={newIconType}
                  onChange={(e) => setNewIconType(e.target.value as ReminderItem['iconType'])}
                  className="w-full bg-[#0a1510] border border-[#21352a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#80E832]"
                >
                  <option value="calendar">Treino / Calendário</option>
                  <option value="water">Água / Hidratação</option>
                  <option value="heart">Pressão / Cardíaco</option>
                  <option value="clipboard">Avaliação Física</option>
                  <option value="medical">Consulta Médica</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#80E832] hover:bg-[#72ce2c] text-black font-extrabold rounded-lg text-xs"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
