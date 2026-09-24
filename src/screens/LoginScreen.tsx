import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Stethoscope } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: () => void;
  onCreateAccount: () => void;
  onSelectRole: (role: UserRole) => void;
  onOpenAccessibility: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onCreateAccount,
  onSelectRole,
  onOpenAccessibility,
}) => {
  const [email, setEmail] = useState('maria.silva@email.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-6 pt-3 pb-4 overflow-y-auto no-scrollbar bg-[#090D0E] text-white">
      {/* Brand Header */}
      <section className="flex flex-col items-center text-center mt-2 mb-3">
        <div className="flex items-center justify-center leading-none tracking-tight font-black italic">
          <span className="text-4xl tracking-tighter text-white">60</span>
          <span className="text-[#74D700] text-3xl font-black -mt-4 mx-0.5">+</span>
          <span className="text-4xl font-black tracking-tight text-[#74D700]">FIT</span>
        </div>
        <p className="text-[10px] tracking-[0.22em] text-gray-300 font-semibold uppercase mt-1">
          Musculação e Funcionalidade
        </p>
      </section>

      {/* Welcome Message */}
      <section className="text-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-0.5">Bem-vindo!</h1>
        <p className="text-xs text-gray-300 font-normal">Faça seu login para continuar</p>
      </section>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        {/* Email */}
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-gray-400 pointer-events-none">
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className="w-full h-12 bg-white text-gray-900 placeholder-gray-400 pl-11 pr-4 rounded-xl text-sm font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-[#74D700]"
          />
        </div>

        {/* Senha */}
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-gray-400 pointer-events-none">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className="w-full h-12 bg-white text-gray-900 placeholder-gray-400 pl-11 pr-11 rounded-xl text-sm font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-[#74D700]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Alternar visibilidade da senha"
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Forgot password */}
        <div className="text-center pt-0.5 pb-1">
          <button
            type="button"
            onClick={() => alert('Instruções de redefinição de senha enviadas para seu e-mail cadastrado.')}
            className="text-xs text-gray-300 hover:text-white underline font-medium"
          >
            Esqueceu a senha?
          </button>
        </div>

        {/* Action Button: ENTRAR */}
        <button
          type="submit"
          className="w-full h-12 bg-[#74D700] hover:bg-[#65bc00] active:scale-[0.99] transition duration-150 rounded-full text-black font-extrabold text-sm tracking-wider flex items-center justify-center shadow-lg uppercase cursor-pointer"
        >
          ENTRAR
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center my-1.5">
          <span className="text-xs text-gray-400 font-medium">ou</span>
        </div>

        {/* Button: CRIAR MINHA CONTA */}
        <button
          type="button"
          onClick={onCreateAccount}
          className="w-full h-12 bg-transparent hover:bg-white/5 active:scale-[0.99] transition duration-150 border-2 border-white rounded-full text-white font-extrabold text-sm tracking-wide flex items-center justify-center cursor-pointer"
        >
          CRIAR MINHA CONTA
        </button>
      </form>

      {/* Role Quick Selector */}
      <section className="grid grid-cols-2 gap-3 mt-4">
        {/* Aluno 60+ */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('student');
            onSelectRole('student');
          }}
          className={`bg-white text-gray-900 rounded-xl p-2.5 flex flex-col items-center text-center shadow transition active:scale-95 border-2 ${
            selectedRole === 'student' ? 'border-[#74D700]' : 'border-transparent'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1 text-gray-800">
            <User className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs leading-tight text-gray-900">Aluno 60+</span>
          <span className="text-[9px] text-gray-600 leading-tight mt-0.5">
            Quero treinar e cuidar da minha saúde
          </span>
        </button>

        {/* Profissional */}
        <button
          type="button"
          onClick={() => {
            setSelectedRole('professional');
            onSelectRole('professional');
          }}
          className={`bg-white text-gray-900 rounded-xl p-2.5 flex flex-col items-center text-center shadow transition active:scale-95 border-2 ${
            selectedRole === 'professional' ? 'border-[#74D700]' : 'border-transparent'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1 text-gray-800">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs leading-tight text-gray-900">Profissional</span>
          <span className="text-[9px] text-gray-600 leading-tight mt-0.5">
            Sou profissional e quero atender meus alunos
          </span>
        </button>
      </section>

      {/* Accessibility Link */}
      <footer className="w-full pb-2 pt-3 flex flex-col items-center justify-center">
        <button
          onClick={onOpenAccessibility}
          type="button"
          aria-label="Recursos de Acessibilidade"
          className="inline-flex items-center space-x-2 py-1 px-3 rounded-full hover:bg-white/10 transition active:scale-95 text-white"
        >
          <span className="w-5 h-5 rounded-full border border-[#74D700] flex items-center justify-center text-[#74D700]">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="4" r="2"></circle>
              <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.4-.44-.98-.74-1.64-.74-.68 0-1.26.3-1.64.71L9.07 9.14C8.09 10.25 6.54 11.02 5 11v2c1.9-.02 3.82-.93 5-2.22V15l-3.3 4.4 1.6 1.2 3.7-4.93V22h2v-6.33l3.7 4.93 1.6-1.2-3.3-4.4v-4.22c1.18 1.29 3.1 2.2 5 2.22z"></path>
            </svg>
          </span>
          <span className="text-xs font-semibold text-gray-200">Acessibilidade</span>
        </button>
      </footer>
    </div>
  );
};
