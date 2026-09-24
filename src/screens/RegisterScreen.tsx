import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, CreditCard, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../types';

interface RegisterScreenProps {
  onContinue: (userData: Partial<UserProfile>) => void;
  onGoToLogin: () => void;
  onBack: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onContinue,
  onGoToLogin,
  onBack,
}) => {
  const [name, setName] = useState('Maria Silva');
  const [birthDate, setBirthDate] = useState('15/03/1956');
  const [cpf, setCpf] = useState('123.456.789-00');
  const [email, setEmail] = useState('maria.silva@email.com');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Por favor, aceite os termos de uso para continuar.');
      return;
    }
    onContinue({
      name,
      birthDate,
      cpf,
      email,
      phone,
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-6 pt-2 pb-4 overflow-y-auto no-scrollbar bg-[#02130e] text-white">
      {/* Top Nav */}
      <nav className="w-full py-2 flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="p-1 -ml-2 rounded-full text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <div className="w-8"></div>
      </nav>

      {/* Header Titles */}
      <section className="text-center mb-4">
        <h1 className="text-[22px] sm:text-2xl font-bold tracking-tight text-white mb-1">
          Criar minha conta
        </h1>
        <p className="text-sm font-medium text-slate-300">
          Preencha seus dados para começar
        </p>
      </section>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3 flex-1">
        {/* Nome Completo */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 pointer-events-none">
            <User className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            required
            className="w-full bg-white text-slate-800 text-[15px] font-normal pl-12 pr-4 py-3 rounded-xl border border-transparent focus:border-[#7ce000] focus:ring-2 focus:ring-[#7ce000] outline-none shadow-sm"
          />
        </div>

        {/* Data de Nascimento */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 pointer-events-none">
            <Calendar className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Data de nascimento"
            required
            className="w-full bg-white text-slate-800 text-[15px] font-normal pl-12 pr-11 py-3 rounded-xl border border-transparent focus:border-[#7ce000] focus:ring-2 focus:ring-[#7ce000] outline-none shadow-sm"
          />
          <button
            type="button"
            aria-label="Selecionar data"
            className="absolute right-3.5 text-slate-600 hover:text-slate-800"
          >
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        {/* CPF */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 pointer-events-none">
            <CreditCard className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            required
            className="w-full bg-white text-slate-800 text-[15px] font-normal pl-12 pr-4 py-3 rounded-xl border border-transparent focus:border-[#7ce000] focus:ring-2 focus:ring-[#7ce000] outline-none shadow-sm"
          />
        </div>

        {/* E-mail */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 pointer-events-none">
            <Mail className="w-5 h-5" />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className="w-full bg-white text-slate-800 text-[15px] font-normal pl-12 pr-4 py-3 rounded-xl border border-transparent focus:border-[#7ce000] focus:ring-2 focus:ring-[#7ce000] outline-none shadow-sm"
          />
        </div>

        {/* Telefone */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 pointer-events-none">
            <Phone className="w-5 h-5" />
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
            required
            className="w-full bg-white text-slate-800 text-[15px] font-normal pl-12 pr-4 py-3 rounded-xl border border-transparent focus:border-[#7ce000] focus:ring-2 focus:ring-[#7ce000] outline-none shadow-sm"
          />
        </div>

        {/* Senha */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 pointer-events-none">
            <Lock className="w-5 h-5" />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className="w-full bg-white text-slate-800 text-[15px] font-normal pl-12 pr-11 py-3 rounded-xl border border-transparent focus:border-[#7ce000] focus:ring-2 focus:ring-[#7ce000] outline-none shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Alternar exibição de senha"
            className="absolute right-3.5 text-slate-600 hover:text-slate-800 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Checkbox: Termos */}
        <div className="flex items-start space-x-2.5 pt-1.5 px-0.5">
          <input
            type="checkbox"
            id="terms-check"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-400 bg-white text-[#7ce000] focus:ring-[#7ce000] cursor-pointer"
          />
          <label htmlFor="terms-check" className="text-xs text-slate-300 font-normal leading-tight cursor-pointer">
            Li e aceito os <span className="underline hover:text-white">Termos de Uso</span> e{' '}
            <span className="underline hover:text-white">Política de Privacidade</span>
          </label>
        </div>

        {/* Botão CONTINUAR */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full bg-[#7ce000] hover:bg-[#6fc900] active:scale-[0.98] text-[#03140e] font-extrabold text-[15px] py-3.5 px-4 rounded-full tracking-wider shadow-lg shadow-[#7ce000]/20 uppercase transition-all duration-150 cursor-pointer"
          >
            CONTINUAR
          </button>
        </div>
      </form>

      {/* Footer Link to Login */}
      <footer className="pt-3 pb-2 text-center mt-auto">
        <p className="text-sm font-medium text-slate-300">
          Já tem uma conta?{' '}
          <button
            onClick={onGoToLogin}
            type="button"
            className="font-bold text-white hover:text-[#7ce000] ml-1 underline transition-colors"
          >
            Entrar
          </button>
        </p>
      </footer>
    </div>
  );
};
