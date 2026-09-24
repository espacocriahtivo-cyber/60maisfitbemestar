import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, Smartphone, X, Check } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running inside installed standalone PWA, hide
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Action button in bar */}
      <button
        type="button"
        onClick={() => {
          if (isInstallable) {
            install();
          } else if (isIOS) {
            setShowIOSGuide(true);
          } else {
            // General guidance for browser
            setShowIOSGuide(true);
          }
        }}
        className="flex items-center gap-1.5 px-3 py-1 bg-[#1a402a] hover:bg-[#235538] text-[#86ef3c] font-bold rounded-md border border-[#306847] transition active:scale-95 text-xs shadow-sm cursor-pointer"
        title="Instalar como aplicativo no celular ou computador"
      >
        <Smartphone className="w-3.5 h-3.5 text-[#7ce000]" />
        <span>Instalar AppWeb</span>
      </button>

      {/* iOS / General PWA Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#091510] border border-[#1e3c2b] p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1b3a2a]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#7ce000]/20 flex items-center justify-center text-[#7ce000]">
                  <Download className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold">Instalar 60+ FIT no Celular</h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="p-3 bg-[#112319] border border-[#1e3d2c] rounded-2xl space-y-2">
                <strong className="text-white flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-[#7ce000]" /> No iPhone / iPad (Safari):
                </strong>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Toque no botão <strong>Compartilhar</strong> na barra do Safari (ícone com quadrado e seta para cima).</li>
                  <li>Role a lista para baixo e toque em <strong>&quot;Adicionar à Tela de Início&quot;</strong>.</li>
                  <li>Toque em <strong>Adicionar</strong> no canto superior direito.</li>
                </ol>
              </div>

              <div className="p-3 bg-[#112319] border border-[#1e3d2c] rounded-2xl space-y-2">
                <strong className="text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#7ce000]" /> No Android (Chrome):
                </strong>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Toque no menu de <strong>3 pontos</strong> no topo do Chrome.</li>
                  <li>Selecione <strong>&quot;Instalar aplicativo&quot;</strong> ou <strong>&quot;Adicionar à tela inicial&quot;</strong>.</li>
                </ol>
              </div>

              <p className="text-[11px] text-gray-400">
                O ícone do 60+ FIT ficará salvo na tela do celular como um aplicativo normal, funcionando em tela cheia sem barras do navegador!
              </p>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-3 bg-[#7ce000] hover:bg-[#6ec800] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
