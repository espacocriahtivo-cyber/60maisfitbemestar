import React, { useState } from 'react';
import { AppRemoteState, apiService } from '../services/apiService';
import { X, Code, Check, RefreshCw, Copy, Upload, ExternalLink } from 'lucide-react';

interface JsonDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  appData: AppRemoteState;
  onDataUpdated: () => void;
}

export const JsonDataModal: React.FC<JsonDataModalProps> = ({
  isOpen,
  onClose,
  appData,
  onDataUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'raw' | 'fetch-info'>('images');
  const [rawJson, setRawJson] = useState(() => JSON.stringify(appData, null, 2));
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable image fields
  const [splashBg, setSplashBg] = useState(appData.branding.splashBg);
  const [coupleHero, setCoupleHero] = useState(appData.branding.coupleHero);
  const [avatarUrl, setAvatarUrl] = useState(appData.user.avatarUrl);
  const [exerciseImages, setExerciseImages] = useState(
    appData.exercises.map((e) => ({ id: e.id, name: e.name, url: e.imageUrl }))
  );

  if (!isOpen) return null;

  const handleSaveImages = async () => {
    // Update local state
    appData.branding.splashBg = splashBg;
    appData.branding.coupleHero = coupleHero;
    await apiService.updateProfile({ avatarUrl });
    for (const ex of exerciseImages) {
      await apiService.updateExerciseImage(ex.id, ex.url);
    }
    setSaveSuccess(true);
    onDataUpdated();
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleApplyRawJson = () => {
    const success = apiService.importCustomJson(rawJson);
    if (success) {
      setSaveSuccess(true);
      onDataUpdated();
      setTimeout(() => setSaveSuccess(false), 2000);
    } else {
      alert('JSON inválido. Por favor, verifique a sintaxe.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetDefaults = () => {
    if (confirm('Tem certeza que deseja restaurar as imagens e dados padrão originais?')) {
      apiService.resetToDefaults();
      onDataUpdated();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b1713] border border-[#1b3a2a] w-full max-w-2xl max-h-[90vh] rounded-3xl p-5 sm:p-6 text-white shadow-2xl flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1b3a2a] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#7ce000]/15 border border-[#7ce000]/30 flex items-center justify-center text-[#7ce000]">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Gerenciador de JSON & Imagens Remotas</h2>
              <p className="text-xs text-gray-400">Carregamento dinâmico via API e links diretos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1b3a2a] my-3 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('images')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === 'images'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Links Diretos de Imagens
          </button>
          <button
            onClick={() => {
              setRawJson(JSON.stringify(appData, null, 2));
              setActiveTab('raw');
            }}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === 'raw'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            JSON Raw (API Payload)
          </button>
          <button
            onClick={() => setActiveTab('fetch-info')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === 'fetch-info'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Como Funciona o Fetch
          </button>
        </div>

        {/* Tab 1: Image URLs Editor */}
        {activeTab === 'images' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm">
            <div className="p-3 bg-[#112319] border border-[#1b3827] rounded-xl text-xs text-gray-300">
              <strong className="text-[#86ef3c]">Carregamento Dinâmico:</strong> Altere qualquer URL abaixo e clique em &quot;Salvar Alterações&quot;. O aplicativo atualiza as telas em tempo real sem necessidade de recompilação!
            </div>

            {/* Splash Image */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-300">1. Imagem Hero da Tela Splash (Senhora na academia)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={splashBg}
                  onChange={(e) => setSplashBg(e.target.value)}
                  className="flex-1 bg-[#122319] border border-[#1d3a2b] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none focus:border-[#7ce000]"
                />
                <img src={splashBg} alt="Preview Splash" className="w-9 h-9 rounded object-cover border border-[#1d3a2b]" />
              </div>
            </div>

            {/* Role Select Hero */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-300">2. Imagem Seleção de Papel (Casal Sênior)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupleHero}
                  onChange={(e) => setCoupleHero(e.target.value)}
                  className="flex-1 bg-[#122319] border border-[#1d3a2b] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none focus:border-[#7ce000]"
                />
                <img src={coupleHero} alt="Preview Casal" className="w-9 h-9 rounded object-cover border border-[#1d3a2b]" />
              </div>
            </div>

            {/* User Avatar */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-300">3. Avatar da Aluna Maria Silva</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="flex-1 bg-[#122319] border border-[#1d3a2b] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none focus:border-[#7ce000]"
                />
                <img src={avatarUrl} alt="Preview Avatar" className="w-9 h-9 rounded-full object-cover border border-[#1d3a2b]" />
              </div>
            </div>

            {/* Exercise Images */}
            <div className="pt-2 border-t border-[#1b3a2a] space-y-3">
              <h3 className="font-bold text-[#86ef3c]">Imagens dos Exercícios do Treino:</h3>
              {exerciseImages.map((ex, index) => (
                <div key={ex.id} className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">
                    {index + 1}. {ex.name}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ex.url}
                      onChange={(e) => {
                        const newUrl = e.target.value;
                        setExerciseImages((prev) =>
                          prev.map((item) => (item.id === ex.id ? { ...item, url: newUrl } : item))
                        );
                      }}
                      className="flex-1 bg-[#122319] border border-[#1d3a2b] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none focus:border-[#7ce000]"
                    />
                    <img src={ex.url} alt={ex.name} className="w-9 h-9 rounded object-cover border border-[#1d3a2b]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Raw JSON Editor */}
        {activeTab === 'raw' && (
          <div className="flex-1 flex flex-col overflow-hidden space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Edite diretamente o JSON do estado:</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#7ce000]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar JSON'}
              </button>
            </div>
            <textarea
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              className="flex-1 w-full bg-[#08130e] border border-[#1d3a2b] rounded-xl p-3 font-mono text-xs text-[#a4f74d] outline-none focus:border-[#7ce000] resize-none"
              spellCheck={false}
            ></textarea>
          </div>
        )}

        {/* Tab 3: Explanation of Fetch and Architecture */}
        {activeTab === 'fetch-info' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-gray-300 leading-relaxed">
            <div className="p-4 bg-[#122319] border border-[#1f3d2c] rounded-2xl space-y-2">
              <h4 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4" />
                Como o 60+ FIT consome dados remotos via fetch()?
              </h4>
              <p>
                As telas do aplicativo não fixam imagens ou dados no código fonte estático. Em vez disso, ao inicializar qualquer tela, é disparado:
              </p>
              <pre className="bg-[#08130e] p-3 rounded-lg font-mono text-[#a4f74d] text-[11px] overflow-x-auto">
{`// Exemplo de requisição no frontend React:
async function loadWorkoutData() {
  const response = await fetch('/api/workouts/today');
  const data = await response.json();
  setWorkout(data); // Contém imageUrls, repetições, instruções
}`}
              </pre>
              <p>
                Isso permite que um profissional ou nutricionista atualize vídeos e imagens no servidor (ou bucket Cloud Storage / S3 / CDN) e a nova mídia apareça instantaneamente no celular do aluno!
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#1b3a2a] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1b2f23] hover:bg-[#233d2e] text-gray-300 rounded-xl text-xs transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restaurar Padrão
          </button>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-[#86ef3c] text-xs font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Dados aplicados com sucesso!
              </span>
            )}

            {activeTab === 'images' && (
              <button
                onClick={handleSaveImages}
                className="px-5 py-2.5 bg-[#7ce000] hover:bg-[#6ec800] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow"
              >
                Salvar Imagens
              </button>
            )}

            {activeTab === 'raw' && (
              <button
                onClick={handleApplyRawJson}
                className="px-5 py-2.5 bg-[#7ce000] hover:bg-[#6ec800] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Aplicar JSON
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
