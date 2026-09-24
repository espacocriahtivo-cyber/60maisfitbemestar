import React, { useState } from 'react';
import { ArrowLeft, Camera, Calendar, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  onSaveProfile: (updates: Partial<UserProfile>) => void;
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onSaveProfile,
  onBack,
}) => {
  const [fullName, setFullName] = useState(user.name);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [weight, setWeight] = useState(user.weight);
  const [height, setHeight] = useState(user.height);
  const [goal, setGoal] = useState(user.goal);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: fullName,
      birthDate,
      weight,
      height,
      goal,
      avatarUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAvatarChange = () => {
    const newUrl = prompt('Insira o link direto para a nova foto de perfil:', avatarUrl);
    if (newUrl && newUrl.trim()) {
      setAvatarUrl(newUrl.trim());
    }
  };

  return (
    <div className="w-full h-full bg-[#0c1817] text-slate-900 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Navigation Bar */}
      <nav aria-label="Navegação superior" className="w-full px-5 pt-2 pb-2 flex items-center text-white relative z-10">
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="p-1 -ml-1 text-white hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="text-base font-semibold tracking-wide ml-3">Meu perfil</h1>
      </nav>

      {/* Main Content White Sheet */}
      <main className="flex-1 bg-white rounded-t-[32px] mt-1 px-5 pt-4 pb-4 flex flex-col justify-between overflow-y-auto no-scrollbar">
        <div>
          {/* Avatar with Camera badge */}
          <section className="flex flex-col items-center mb-3">
            <div className="relative w-24 h-24">
              <img
                src={avatarUrl}
                alt="Foto de perfil de Maria Silva"
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 shadow-sm"
              />
              <button
                type="button"
                onClick={handleAvatarChange}
                aria-label="Alterar foto de perfil"
                title="Clique para alterar a foto com link direto"
                className="absolute bottom-0 right-0 bg-[#0c1817] hover:bg-slate-800 text-white p-2 rounded-full border-2 border-white shadow transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* Form */}
          <form id="profile-form" onSubmit={handleSave} className="space-y-3">
            {/* Nome Completo */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="fullName">
                Nome completo
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#7DE006] focus:border-transparent focus:bg-white outline-none transition"
              />
            </div>

            {/* Data de Nascimento */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="birthDate">
                Data de nascimento
              </label>
              <div className="relative">
                <input
                  id="birthDate"
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full h-11 px-3.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#7DE006] focus:border-transparent focus:bg-white outline-none transition"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <Calendar className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Peso (kg) */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="weight">
                Peso (kg)
              </label>
              <input
                id="weight"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#7DE006] focus:border-transparent focus:bg-white outline-none transition"
              />
            </div>

            {/* Altura (m) */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="height">
                Altura (m)
              </label>
              <input
                id="height"
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#7DE006] focus:border-transparent focus:bg-white outline-none transition"
              />
            </div>

            {/* Objetivo Principal */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="goal">
                Objetivo principal
              </label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#7DE006] focus:border-transparent focus:bg-white outline-none transition cursor-pointer"
              >
                <option value="Ganhar força e independência">Ganhar força e independência</option>
                <option value="Melhorar mobilidade articular">Melhorar mobilidade articular</option>
                <option value="Prevenção de quedas e equilíbrio">Prevenção de quedas e equilíbrio</option>
                <option value="Condicionamento geral e longevidade">Condicionamento geral e longevidade</option>
              </select>
            </div>
          </form>
        </div>

        {/* Action Button */}
        <footer className="pt-3 pb-1">
          {savedSuccess && (
            <div className="mb-2 text-center text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Perfil atualizado com sucesso!
            </div>
          )}
          <button
            form="profile-form"
            type="submit"
            className="w-full h-12 bg-[#7DE006] hover:bg-[#6ec904] active:scale-[0.99] text-slate-900 font-bold text-sm tracking-wider uppercase rounded-full shadow-md transition-all flex items-center justify-center cursor-pointer"
          >
            SALVAR
          </button>
        </footer>
      </main>
    </div>
  );
};
