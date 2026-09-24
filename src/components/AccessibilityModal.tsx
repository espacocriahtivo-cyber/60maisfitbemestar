import React from 'react';
import { AppAccessibilitySettings } from '../types';
import { X, Volume2, Eye, Type, Check, Sparkles } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppAccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AppAccessibilitySettings>) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const testSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        'Bem-vindo ao 60+ FIT! Acessibilidade ativada. Suas instruções de treino e saúde serão narradas com clareza.'
      );
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9; // Slightly slower for elderly comprehension
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Síntese de voz não suportada pelo seu navegador.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0b1713] border border-[#1b3a2a] w-full max-w-md rounded-3xl p-6 text-white shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1b3a2a]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#7ce000]/15 border border-[#7ce000]/40 flex items-center justify-center text-[#7ce000]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Acessibilidade 60+</h2>
              <p className="text-xs text-gray-400">Personalize para melhor leitura e conforto</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Font Size Selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-gray-200">
            <Type className="w-4 h-4 text-[#7ce000]" />
            Tamanho da Fonte / Textos
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onUpdateSettings({ fontSize: 'normal' })}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition ${
                settings.fontSize === 'normal'
                  ? 'bg-[#7ce000] text-black border-[#7ce000]'
                  : 'bg-[#122319] text-gray-300 border-[#1f3a2b] hover:bg-[#183123]'
              }`}
            >
              Normal (100%)
            </button>
            <button
              onClick={() => onUpdateSettings({ fontSize: 'large' })}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition ${
                settings.fontSize === 'large'
                  ? 'bg-[#7ce000] text-black border-[#7ce000]'
                  : 'bg-[#122319] text-gray-300 border-[#1f3a2b] hover:bg-[#183123]'
              }`}
            >
              Grande (115%)
            </button>
            <button
              onClick={() => onUpdateSettings({ fontSize: 'xlarge' })}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition ${
                settings.fontSize === 'xlarge'
                  ? 'bg-[#7ce000] text-black border-[#7ce000]'
                  : 'bg-[#122319] text-gray-300 border-[#1f3a2b] hover:bg-[#183123]'
              }`}
            >
              Extra (130%)
            </button>
          </div>
        </div>

        {/* High Contrast Mode Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-[#122319] border border-[#1f3a2b] rounded-2xl">
          <div>
            <h3 className="text-sm font-bold text-white">Modo Alto Contraste</h3>
            <p className="text-xs text-gray-400">Aumenta nitidez das cores e bordas</p>
          </div>
          <button
            onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
            className={`w-13 h-7 w-[52px] h-[30px] rounded-full p-1 transition-colors ${
              settings.highContrast ? 'bg-[#7ce000]' : 'bg-[#2a4436]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.highContrast ? 'translate-x-[22px]' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        {/* Audio Narration / TTS */}
        <div className="space-y-3 p-3.5 bg-[#122319] border border-[#1f3a2b] rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#7ce000]" />
                Instruções Faladas por Áudio
              </h3>
              <p className="text-xs text-gray-400">Leitor de voz para exercícios e telas</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ ttsEnabled: !settings.ttsEnabled })}
              className={`w-[52px] h-[30px] rounded-full p-1 transition-colors ${
                settings.ttsEnabled ? 'bg-[#7ce000]' : 'bg-[#2a4436]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.ttsEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <button
            onClick={testSpeech}
            className="w-full py-2 bg-[#1b3627] hover:bg-[#234733] text-[#a4f74d] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Volume2 className="w-4 h-4" />
            Testar voz de leitura agora
          </button>
        </div>

        {/* Save & Close */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#7ce000] hover:bg-[#70cc00] text-black font-extrabold text-sm tracking-wider uppercase rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          Concluir Ajustes
        </button>
      </div>
    </div>
  );
};
