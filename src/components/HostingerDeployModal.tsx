import React, { useState } from 'react';
import { X, Server, Check, Copy, ExternalLink, HardDrive, Database, Shield, Terminal } from 'lucide-react';

interface HostingerDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerDeployModal: React.FC<HostingerDeployModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'hpanel' | 'vps' | 'database' | 'htaccess'>('hpanel');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b1713] border border-[#1b3a2a] w-full max-w-3xl max-h-[92vh] rounded-3xl p-5 sm:p-6 text-white shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1b3a2a] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#673AB7]/20 border border-[#673AB7]/50 flex items-center justify-center text-[#9C27B0]">
              <Server className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Guia de Implantação na Hostinger</h2>
              <p className="text-xs text-gray-400">Passo a passo pronto para Hospedagem Web / Cloud / VPS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-[#1b3a2a] my-3 gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('hpanel')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'hpanel'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            1. Hospedagem Web (hPanel)
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'database'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            2. Banco MySQL (phpMyAdmin)
          </button>
          <button
            onClick={() => setActiveTab('htaccess')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'htaccess'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            3. Arquivo .htaccess
          </button>
          <button
            onClick={() => setActiveTab('vps')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'vps'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            4. VPS / Node.js (PM2)
          </button>
        </div>

        {/* Tab 1: hPanel */}
        {activeTab === 'hpanel' && (
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs text-gray-300">
            <div className="p-3.5 bg-[#122319] border border-[#1f3a2b] rounded-2xl space-y-2">
              <h3 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                <HardDrive className="w-4 h-4" />
                Como publicar na pasta public_html (Mais Fácil)
              </h3>
              <p>
                A Hostinger utiliza servidores de alta performance com LiteSpeed. O projeto está 100% configurado para rodar em produção.
              </p>
            </div>

            <ol className="space-y-2.5 list-decimal list-inside bg-[#0a1610] p-4 rounded-2xl border border-[#162e20]">
              <li className="leading-relaxed">
                <strong className="text-white">Gere o build de produção:</strong>
                <div className="my-1.5 flex items-center justify-between bg-[#050e09] p-2 rounded-lg font-mono text-[#a4f74d] text-[11px]">
                  <span>npm run build</span>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'cmd-build')}
                    className="p-1 hover:text-white"
                  >
                    {copiedText === 'cmd-build' ? <Check className="w-3.5 h-3.5 text-[#7ce000]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                Isso criará a pasta <code>dist/</code> com todos os arquivos compilados e o <code>.htaccess</code>.
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Compacte a pasta dist:</strong>
                <p className="text-gray-400 mt-0.5">
                  Entre na pasta <code>dist/</code> e compacte todos os arquivos diretamente em um arquivo <code>site.zip</code>.
                </p>
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Envie para o hPanel da Hostinger:</strong>
                <p className="text-gray-400 mt-0.5">
                  Acesse <em>hPanel &gt; Gerenciador de Arquivos &gt; pasta public_html</em>, faça o upload do <code>site.zip</code> e clique em <strong>Extrair</strong>.
                </p>
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Ative o SSL Grátis:</strong>
                <p className="text-gray-400 mt-0.5">
                  No hPanel, vá em <em>Segurança &gt; SSL</em> e clique em &quot;Instalar SSL&quot; (Let&apos;s Encrypt gratuito com renovação automática).
                </p>
              </li>
            </ol>
          </div>
        )}

        {/* Tab 2: MySQL Database */}
        {activeTab === 'database' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs text-gray-300">
            <div className="p-3.5 bg-[#122319] border border-[#1f3a2b] rounded-2xl space-y-1">
              <h3 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                <Database className="w-4 h-4" />
                Script SQL Pronto: database.sql
              </h3>
              <p>
                O arquivo <code>database.sql</code> já foi gerado na raiz do projeto com as 6 tabelas relacionais, índices e dados iniciais da Maria Silva.
              </p>
            </div>

            <div className="bg-[#0a1610] p-4 rounded-2xl border border-[#162e20] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Importação no phpMyAdmin da Hostinger:</span>
                <button
                  onClick={() => copyToClipboard('source database.sql', 'db-copy')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#152e20] hover:bg-[#1e422d] text-[#86ef3c] rounded-md text-[11px]"
                >
                  {copiedText === 'db-copy' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'db-copy' ? 'Copiado!' : 'Copiar comando'}</span>
                </button>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-gray-300">
                <li>No hPanel, clique em <strong>Bancos de Dados MySQL</strong> e crie um novo banco.</li>
                <li>Clique no botão <strong>Entrar no phpMyAdmin</strong>.</li>
                <li>Clique na aba superior <strong>Importar</strong> (Import).</li>
                <li>Selecione o arquivo <code>database.sql</code> deste projeto e clique em <strong>Executar</strong>.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 3: .htaccess */}
        {activeTab === 'htaccess' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs text-gray-300">
            <div className="flex justify-between items-center">
              <p className="text-gray-300">
                Arquivo <code>public/.htaccess</code> já configurado para evitar erro 404 em recarregamento de telas:
              </p>
              <button
                onClick={() => copyToClipboard(htaccessContent, 'htaccess-copy')}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#152e20] hover:bg-[#1e422d] text-[#86ef3c] rounded-md text-[11px]"
              >
                {copiedText === 'htaccess-copy' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedText === 'htaccess-copy' ? 'Copiado!' : 'Copiar .htaccess'}</span>
              </button>
            </div>
            <pre className="bg-[#08130e] p-3.5 rounded-xl font-mono text-[#a4f74d] text-[11px] overflow-x-auto border border-[#162e20] leading-relaxed">
              {htaccessContent}
            </pre>
          </div>
        )}

        {/* Tab 4: VPS / Node.js */}
        {activeTab === 'vps' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs text-gray-300">
            <div className="p-3.5 bg-[#122319] border border-[#1f3a2b] rounded-2xl space-y-1">
              <h3 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                Implantação em VPS Hostinger (Node.js + PM2)
              </h3>
              <p>
                Os arquivos <code>server.ts</code> e <code>ecosystem.config.cjs</code> já estão configurados no projeto.
              </p>
            </div>

            <pre className="bg-[#08130e] p-3.5 rounded-xl font-mono text-[#a4f74d] text-[11px] overflow-x-auto border border-[#162e20] leading-relaxed">
{`# 1. No terminal do VPS Hostinger:
cd /var/www/60plus-fit
npm install
npm run build

# 2. Iniciar processo permanente com PM2:
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup`}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-[#1b3a2a] flex justify-between items-center shrink-0">
          <span className="text-[11px] text-gray-400">
            Arquivo detalhado: <code>HOSTINGER_DEPLOY.md</code> na raiz do projeto.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#7ce000] hover:bg-[#6ec800] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
