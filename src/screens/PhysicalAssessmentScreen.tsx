import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PhysicalAssessmentData } from '../types';

interface PhysicalAssessmentScreenProps {
  initialData: PhysicalAssessmentData;
  onSave: (data: PhysicalAssessmentData) => void;
  onBack: () => void;
}

export const PhysicalAssessmentScreen: React.FC<PhysicalAssessmentScreenProps> = ({
  initialData,
  onSave,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'dados' | 'funcional'>('dados');
  const [weight, setWeight] = useState(initialData.weight);
  const [height, setHeight] = useState(initialData.height);
  const [bloodPressure, setBloodPressure] = useState(initialData.bloodPressure);
  const [heartRate, setHeartRate] = useState(initialData.heartRate);
  const [oxygenSaturation, setOxygenSaturation] = useState(initialData.oxygenSaturation);
  const [functionalNotes, setFunctionalNotes] = useState(initialData.functionalNotes || '');

  // Functional test metrics
  const [sitToStandReps, setSitToStandReps] = useState('14');
  const [unipodalTime, setUnipodalTime] = useState('12s');
  const [flexibilityLevel, setFlexibilityLevel] = useState('Normal');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSave({
      weight,
      height,
      bloodPressure,
      heartRate,
      oxygenSaturation,
      functionalNotes,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-[#0b1f14] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Top Header */}
      <header className="w-full px-5 pt-2 pb-2">
        <div className="flex items-center relative py-1">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="p-1 -ml-1 text-white hover:opacity-80 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="text-xl font-bold tracking-normal text-white text-center flex-1 pr-6">
            Avaliação física
          </h1>
        </div>
      </header>

      {/* Main Content Card (White rounded card sheet) */}
      <main className="flex-1 bg-white rounded-t-[32px] px-6 pt-5 pb-5 flex flex-col justify-between shadow-2xl text-gray-800 overflow-y-auto no-scrollbar">
        <div>
          {/* Tab Switcher */}
          <div className="flex p-1 bg-[#102d1d] rounded-2xl mb-4 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('dados')}
              className={`flex-1 py-2.5 rounded-xl text-center text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'dados'
                  ? 'bg-[#7ae000] text-black shadow-md'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Dados
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('funcional')}
              className={`flex-1 py-2.5 rounded-xl text-center text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'funcional'
                  ? 'bg-[#7ae000] text-black shadow-md'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Funcional
            </button>
          </div>

          {/* Tab 1: Dados Vitais e Antropometria */}
          {activeTab === 'dados' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-3">
              {/* Peso (kg) */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1 ml-0.5">
                  Peso (kg)
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7ae000]"
                />
              </div>

              {/* Altura (m) */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1 ml-0.5">
                  Altura (m)
                </label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7ae000]"
                />
              </div>

              {/* Pressão arterial */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1 ml-0.5">
                  Pressão arterial
                </label>
                <input
                  type="text"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7ae000]"
                />
              </div>

              {/* Frequência cardíaca */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1 ml-0.5">
                  Frequência cardíaca
                </label>
                <input
                  type="text"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7ae000]"
                />
              </div>

              {/* Saturação de oxigênio (SpO2) */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1 ml-0.5">
                  Saturação de oxigênio (SpO₂)
                </label>
                <input
                  type="text"
                  value={oxygenSaturation}
                  onChange={(e) => setOxygenSaturation(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7ae000]"
                />
              </div>
            </form>
          )}

          {/* Tab 2: Testes Funcionais Especializados 60+ */}
          {activeTab === 'funcional' && (
            <div className="space-y-3.5">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                <strong>Bateria de Testes Funcionais Sênior:</strong> Avaliação de força em membros inferiores, agilidade e equilíbrio estático/dinâmico.
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1">
                  Sentar e Levantar da Cadeira (30 seg)
                </label>
                <input
                  type="text"
                  value={sitToStandReps}
                  onChange={(e) => setSitToStandReps(e.target.value)}
                  placeholder="Ex: 14 repetições"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-sm shadow-sm focus:ring-2 focus:ring-[#7ae000] outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1">
                  Equilíbrio Unipodal (tempo com apoio seguro)
                </label>
                <input
                  type="text"
                  value={unipodalTime}
                  onChange={(e) => setUnipodalTime(e.target.value)}
                  placeholder="Ex: 12 segundos"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-sm shadow-sm focus:ring-2 focus:ring-[#7ae000] outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1">
                  Flexibilidade e Mobilidade de Tronco
                </label>
                <select
                  value={flexibilityLevel}
                  onChange={(e) => setFlexibilityLevel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium text-sm shadow-sm focus:ring-2 focus:ring-[#7ae000] outline-none"
                >
                  <option value="Excelente">Excelente</option>
                  <option value="Normal">Normal</option>
                  <option value="Atenção necessária">Atenção necessária</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-700 mb-1">
                  Parecer do Profissional
                </label>
                <textarea
                  rows={2}
                  value={functionalNotes}
                  onChange={(e) => setFunctionalNotes(e.target.value)}
                  placeholder="Observações funcionais..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 text-xs shadow-sm focus:ring-2 focus:ring-[#7ae000] outline-none resize-none"
                ></textarea>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Save Action */}
        <div className="pt-4 pb-1">
          {savedSuccess && (
            <div className="mb-2 text-center text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Avaliação física salva no banco de dados!
            </div>
          )}
          <button
            onClick={handleSave}
            type="button"
            className="w-full py-4 bg-[#7ae000] hover:bg-[#6ec800] active:scale-[0.99] text-black font-extrabold text-base tracking-wide rounded-2xl shadow-lg shadow-[#7ae000]/30 transition-all uppercase flex items-center justify-center cursor-pointer"
          >
            SALVAR AVALIAÇÃO
          </button>
        </div>
      </main>
    </div>
  );
};
