import React, { useState } from 'react';
import { X, Database, Layers, Cpu, Server, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SqlArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SqlArchitectureModal: React.FC<SqlArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'scalability' | 'redis' | 'replicas'>('schema');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b1713] border border-[#1b3a2a] w-full max-w-3xl max-h-[92vh] rounded-3xl p-5 sm:p-6 text-white shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1b3a2a] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#7ce000]/15 border border-[#7ce000]/30 flex items-center justify-center text-[#7ce000]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Arquitetura de Banco de Dados SQL & Cache</h2>
              <p className="text-xs text-gray-400">Escalabilidade, Índices, Particionamento e Redis para o 60+ FIT</p>
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
            onClick={() => setActiveTab('schema')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'schema'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Modelagem SQL (DDL)
          </button>
          <button
            onClick={() => setActiveTab('scalability')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'scalability'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Índices & Particionamento
          </button>
          <button
            onClick={() => setActiveTab('redis')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'redis'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Cache Redis
          </button>
          <button
            onClick={() => setActiveTab('replicas')}
            className={`pb-2 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'replicas'
                ? 'border-[#7ce000] text-[#7ce000]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Replicação & Monitoramento
          </button>
        </div>

        {/* Tab 1: SQL Schema */}
        {activeTab === 'schema' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            <div className="p-3 bg-[#112319] border border-[#1b3827] rounded-xl text-gray-300">
              Estrutura relacional normalizada em PostgreSQL com chaves estrangeiras íntegras e campos otimizados:
            </div>
            <pre className="bg-[#08130e] p-4 rounded-xl font-mono text-[#a4f74d] text-[11px] leading-relaxed overflow-x-auto border border-[#162e20]">
{`-- 1. TABELA DE USUÁRIOS (Alunos 60+ e Profissionais)
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    papel VARCHAR(20) NOT NULL CHECK (papel IN ('aluno', 'profissional')),
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    avatar_url TEXT,
    objetivo VARCHAR(100),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE ANAMNESE CLÍNICA
CREATE TABLE anamneses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    hipertensao BOOLEAN DEFAULT FALSE,
    diabetes BOOLEAN DEFAULT FALSE,
    cardiacos BOOLEAN DEFAULT FALSE,
    artrose BOOLEAN DEFAULT FALSE,
    osteoporose BOOLEAN DEFAULT FALSE,
    obesidade BOOLEAN DEFAULT FALSE,
    outras_condicoes BOOLEAN DEFAULT FALSE,
    observacoes TEXT,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE MÉTRICAS VITAIS (Particionada por RANGE de data)
CREATE TABLE metricas_saude (
    id UUID NOT NULL,
    aluno_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    frequencia_cardiaca INT,
    pressao_sistolica INT,
    pressao_diastolica INT,
    saturacao_oxigenio NUMERIC(4,1),
    peso_kg NUMERIC(5,2),
    altura_m NUMERIC(3,2),
    registrado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (registrado_em);

-- 4. TABELA DE TREINOS E PRESCRIÇÕES
CREATE TABLE treinos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    profissional_id UUID REFERENCES usuarios(id),
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    ordem INT DEFAULT 1,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA DE EXERCÍCIOS
CREATE TABLE exercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treino_id UUID NOT NULL REFERENCES treinos(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    series INT DEFAULT 3,
    repeticoes VARCHAR(50) DEFAULT '12 repetições',
    tempo_descanso_seg INT DEFAULT 3,
    imagem_url TEXT NOT NULL,
    video_url TEXT,
    instrucao_audio_texto TEXT NOT NULL,
    ordem_execucao INT NOT NULL
);`}
            </pre>
          </div>
        )}

        {/* Tab 2: Scalability, Indexes & Partitioning */}
        {activeTab === 'scalability' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-gray-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-[#122319] border border-[#1e3c2b] rounded-2xl space-y-2">
                <h4 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  1. Índices Estratégicos (B-Tree)
                </h4>
                <p>
                  Criamos índices compostos nas colunas mais buscadas nos filtros diários do app:
                </p>
                <pre className="bg-[#08130e] p-2.5 rounded-lg font-mono text-[10.5px] text-[#a4f74d]">
{`-- Busca de login rápida O(log n)
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Busca de treinos ativos por aluno
CREATE INDEX idx_treinos_aluno_ativo 
ON treinos(aluno_id, ativo);

-- Histórico de saúde ordenado
CREATE INDEX idx_metricas_aluno_data 
ON metricas_saude(aluno_id, registrado_em DESC);`}
                </pre>
              </div>

              <div className="p-4 bg-[#122319] border border-[#1e3c2b] rounded-2xl space-y-2">
                <h4 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  2. Particionamento de Tabelas Grandes
                </h4>
                <p>
                  A tabela <code>metricas_saude</code> acumula milhões de registros com aferições diárias de pressão, batimentos e peso.
                </p>
                <pre className="bg-[#08130e] p-2.5 rounded-lg font-mono text-[10.5px] text-[#a4f74d]">
{`-- Partição Anual 2026
CREATE TABLE metricas_saude_2026 PARTITION OF metricas_saude
FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

-- Partição Anual 2027
CREATE TABLE metricas_saude_2027 PARTITION OF metricas_saude
FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');`}
                </pre>
                <p className="text-[11px] text-gray-400">
                  O Postgres faz <em>partition pruning</em>, consultando apenas a partição relevante e acelerando queries em até 10x!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Redis Cache Layer */}
        {activeTab === 'redis' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-gray-300">
            <div className="p-4 bg-[#122319] border border-[#1e3c2b] rounded-2xl space-y-3">
              <h4 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Arquitetura de Cache em Memória com Redis
              </h4>
              <p>
                Mais de 80% das requisições no app 60+ FIT são consultas de leitura do treino de hoje, lembretes ativos e métricas mais recentes. O Redis armazena isso em memória RAM com latência sub-milissegundo (&lt; 2ms).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#08130e] border border-[#162e20] rounded-xl space-y-1">
                  <span className="font-mono text-[#86ef3c] text-xs">Chave: aluno:&#123;id&#125;:treino_hoje</span>
                  <p className="text-[11px] text-gray-400">
                    Armazena o JSON completo do treino com as URLs das imagens e instruções de áudio. TTL: 24 horas.
                  </p>
                </div>
                <div className="p-3 bg-[#08130e] border border-[#162e20] rounded-xl space-y-1">
                  <span className="font-mono text-[#86ef3c] text-xs">Chave: aluno:&#123;id&#125;:ultimos_vitais</span>
                  <p className="text-[11px] text-gray-400">
                    Armazena os últimos valores de PA, FC e SpO2 para carregar instantaneamente na tela &quot;Minha Saúde&quot;.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#091510] rounded-xl border border-[#183122]">
                <strong className="text-white block mb-1">Padrão Cache-Aside:</strong>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-300">
                  <li>O backend busca primeiro no Redis: <code>redis.get(`aluno:$&#123;id&#125;:treino`)</code>.</li>
                  <li>Se houver <em>Cache Hit</em>, retorna imediatamente sem tocar no SQL.</li>
                  <li>Se <em>Cache Miss</em>, busca no PostgreSQL, grava no Redis e responde.</li>
                  <li>Ao atualizar o treino pelo profissional, invalida a chave no Redis (<em>Cache Invalidation</em>).</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Read Replicas & Monitoring */}
        {activeTab === 'replicas' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-gray-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-[#122319] border border-[#1e3c2b] rounded-2xl space-y-2">
                <h4 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                  <Server className="w-4 h-4" />
                  Replicação de Leitura (Read Replicas)
                </h4>
                <p>
                  Separação de tráfego de leitura e gravação no Cloud SQL / RDS:
                </p>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7ce000] shrink-0 mt-0.5" />
                    <span><strong>Instância Primária (Master):</strong> Recebe apenas escritas (INSERT, UPDATE, DELETE) de avaliações, anamnese e cadastros.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7ce000] shrink-0 mt-0.5" />
                    <span><strong>Read Replicas (2+ nós):</strong> Recebem consultas analíticas do painel do profissional, gráficos de evolução e listagens.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#122319] border border-[#1e3c2b] rounded-2xl space-y-2">
                <h4 className="font-bold text-[#86ef3c] text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Monitoramento Contínuo
                </h4>
                <p>
                  Garante SLA de 99.9% e detecção precoce de gargalos:
                </p>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7ce000] shrink-0 mt-0.5" />
                    <span><strong>pg_stat_statements:</strong> Monitora as queries mais lentas (&gt; 100ms) para ajuste contínuo de índices.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7ce000] shrink-0 mt-0.5" />
                    <span><strong>Connection Pooling (PgBouncer):</strong> Gerencia milhares de conexões simultâneas de celulares sem estourar conexões do banco.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-[#1b3a2a] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#7ce000] hover:bg-[#6ec800] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
