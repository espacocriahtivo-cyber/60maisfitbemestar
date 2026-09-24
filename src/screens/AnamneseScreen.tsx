import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { AnamneseData } from '../types';

interface AnamneseScreenProps {
  initialData: AnamneseData;
  onNext: (data: AnamneseData) => void;
  onBack: () => void;
}

export const AnamneseScreen: React.FC<AnamneseScreenProps> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<AnamneseData>(initialData);

  const toggleCondition = (key: keyof Omit<AnamneseData, 'observacoes'>) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-2 pb-3 bg-[#0D1410] text-slate-100 select-none overflow-y-auto no-scrollbar">
      <div className="flex flex-col flex-1">
        {/* Navigation Bar */}
        <nav className="relative flex items-center justify-center py-2 mb-2">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="absolute left-0 p-1 text-white hover:text-[#7AE000] active:scale-95 transition-all"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="text-white text-lg font-bold tracking-normal">Anamnese</h1>
        </nav>

        {/* Section Title */}
        <section className="space-y-4">
          <div>
            <h2 className="text-white text-base font-bold tracking-tight">Condições de saúde</h2>
            <p className="text-xs text-gray-300 font-normal mt-0.5">
              (Selecione as opções que se aplicam)
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5">
            {/* Hipertensão */}
            <label
              onClick={() => toggleCondition('hipertensao')}
              className="flex items-center space-x-3 cursor-pointer group py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-sm ${
                    formData.hipertensao ? 'bg-[#7AE000]' : 'bg-white border border-gray-400'
                  }`}
                >
                  {formData.hipertensao && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#7AE000] transition-colors">
                Hipertensão
              </span>
            </label>

            {/* Diabetes */}
            <label
              onClick={() => toggleCondition('diabetes')}
              className="flex items-center space-x-3 cursor-pointer group py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-sm ${
                    formData.diabetes ? 'bg-[#7AE000]' : 'bg-white border border-gray-400'
                  }`}
                >
                  {formData.diabetes && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#7AE000] transition-colors">
                Diabetes
              </span>
            </label>

            {/* Problemas cardíacos */}
            <label
              onClick={() => toggleCondition('cardiacos')}
              className="flex items-center space-x-3 cursor-pointer group py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-sm ${
                    formData.cardiacos ? 'bg-[#7AE000]' : 'bg-white border border-gray-400'
                  }`}
                >
                  {formData.cardiacos && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#7AE000] transition-colors">
                Problemas cardíacos
              </span>
            </label>

            {/* Artrose / Artrite */}
            <label
              onClick={() => toggleCondition('artrose')}
              className="flex items-center space-x-3 cursor-pointer group py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-sm ${
                    formData.artrose ? 'bg-[#7AE000]' : 'bg-white border border-gray-400'
                  }`}
                >
                  {formData.artrose && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#7AE000] transition-colors">
                Artrose / Artrite
              </span>
            </label>

            {/* Osteoporose */}
            <label
              onClick={() => toggleCondition('osteoporose')}
              className="flex items-center space-x-3 cursor-pointer group py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-sm ${
                    formData.osteoporose ? 'bg-[#7AE000]' : 'bg-white border border-gray-400'
                  }`}
                >
                  {formData.osteoporose && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#7AE000] transition-colors">
                Osteoporose
              </span>
            </label>

            {/* Obesidade */}
            <label
              onClick={() => toggleCondition('obesidade')}
              className="flex items-center space-x-3 cursor-pointer group py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-sm ${
                    formData.obesidade ? 'bg-[#7AE000]' : 'bg-white border border-gray-400'
                  }`}
                >
                  {formData.obesidade && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#7AE000] transition-colors">
                Obesidade
              </span>
            </label>

            {/* Outras */}
            <label
              onClick={() => toggleCondition('outras')}
              className="flex items-center space-x-3 cursor-pointer group py-0.5"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-sm ${
                    formData.outras ? 'bg-[#7AE000]' : 'bg-white border border-gray-400'
                  }`}
                >
                  {formData.outras && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#7AE000] transition-colors">
                Outras
              </span>
            </label>
          </div>

          {/* Notes Section */}
          <div className="pt-2">
            <label htmlFor="observacoes-input" className="block text-white text-sm font-bold mb-1.5">
              Observações
            </label>
            <div className="relative rounded-2xl bg-white shadow-inner p-1">
              <textarea
                id="observacoes-input"
                rows={3}
                value={formData.observacoes}
                onChange={(e) => setFormData((prev) => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Digite aqui..."
                className="w-full bg-transparent border-0 resize-none text-slate-800 placeholder-gray-400 text-sm p-2 leading-snug outline-none font-normal"
              ></textarea>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Button */}
      <footer className="pt-3 pb-1">
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-[#7AE000] hover:bg-[#6ed200] active:scale-[0.98] text-black font-extrabold text-sm rounded-full tracking-wider shadow-lg transition-transform text-center uppercase cursor-pointer"
        >
          PRÓXIMO
        </button>
      </footer>
    </div>
  );
};
