import React, { useState } from 'react';
import { ArrowLeft, Heart, Activity, Check, Plus } from 'lucide-react';
import { HealthMetrics } from '../types';

interface HealthScreenProps {
  metrics: HealthMetrics;
  onRecordNewData: (metrics: Partial<HealthMetrics>) => void;
  onBack: () => void;
}

export const HealthScreen: React.FC<HealthScreenProps> = ({
  metrics,
  onRecordNewData,
  onBack,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHeartRate, setNewHeartRate] = useState(metrics.heartRate.toString());
  const [newBloodPressure, setNewBloodPressure] = useState(metrics.bloodPressure);
  const [newSpO2, setNewSpO2] = useState(metrics.oxygenSaturation.toString());

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    onRecordNewData({
      heartRate: parseInt(newHeartRate, 10) || 72,
      bloodPressure: newBloodPressure || '120 / 80',
      oxygenSaturation: parseInt(newSpO2, 10) || 98,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-2 pb-4 overflow-y-auto no-scrollbar bg-[#09130e] text-white select-none relative">
      {/* Top Header */}
      <div>
        <nav className="relative flex items-center justify-between pb-3 border-b border-[#13241a]">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="p-1.5 -ml-1 text-white hover:text-[#72e718] active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="flex-1 text-center font-bold text-lg text-white pr-7 tracking-tight">
            Minha saúde
          </h1>
        </nav>

        {/* Vital Metrics Cards */}
        <main className="space-y-3.5 pt-4">
          {/* Card 1: Frequência Cardíaca */}
          <div className="bg-[#121f18] border border-[#1c2e24] rounded-2xl p-4 flex items-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#ff334b] flex items-center justify-center shadow-inner shrink-0 mr-4">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-300 text-sm font-medium tracking-wide">Frequência cardíaca</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white text-2xl font-bold tracking-tight">
                  {metrics.heartRate} <span className="text-xl font-medium">bpm</span>
                </span>
              </div>
              <div className="mt-1">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#163321] text-[#63e320] border border-[#234d31]">
                  Normal
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Pressão Arterial */}
          <div className="bg-[#121f18] border border-[#1c2e24] rounded-2xl p-4 flex items-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#0091ff] flex items-center justify-center shadow-inner shrink-0 mr-4">
              <Activity className="w-8 h-8 text-white stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-300 text-sm font-medium tracking-wide">Pressão arterial</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white text-2xl font-bold tracking-tight">
                  {metrics.bloodPressure} <span className="text-lg font-medium">mmHg</span>
                </span>
              </div>
              <div className="mt-1">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#163321] text-[#63e320] border border-[#234d31]">
                  Normal
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Saturação (SpO2) */}
          <div className="bg-[#121f18] border border-[#1c2e24] rounded-2xl p-4 flex items-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#02a4ff] flex flex-col items-center justify-center text-white shadow-inner shrink-0 mr-4">
              <span className="text-lg font-black leading-none">
                O<sub className="text-[11px] font-bold">2</sub>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-300 text-sm font-medium tracking-wide">Saturação (SpO₂)</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white text-2xl font-bold tracking-tight">
                  {metrics.oxygenSaturation}%
                </span>
              </div>
              <div className="mt-1">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#163321] text-[#63e320] border border-[#234d31]">
                  Normal
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Button: REGISTRAR NOVOS DADOS */}
      <div className="pt-4 pb-1">
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="w-full py-4 bg-[#72e718] hover:bg-[#64cc15] active:scale-[0.98] text-black font-extrabold text-sm sm:text-base rounded-xl uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>REGISTRAR NOVOS DADOS</span>
        </button>
      </div>

      {/* Modal for Recording New Data */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121f18] border border-[#1f382a] rounded-2xl p-5 w-full max-w-xs space-y-4">
            <h3 className="text-base font-bold text-white text-center">Registrar Novos Sinais Vitais</h3>
            <form onSubmit={handleSaveModal} className="space-y-3">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Frequência Cardíaca (bpm)</label>
                <input
                  type="number"
                  value={newHeartRate}
                  onChange={(e) => setNewHeartRate(e.target.value)}
                  className="w-full bg-[#0a1510] border border-[#1f382a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#72e718]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Pressão Arterial (mmHg)</label>
                <input
                  type="text"
                  value={newBloodPressure}
                  onChange={(e) => setNewBloodPressure(e.target.value)}
                  placeholder="Ex: 120 / 80"
                  className="w-full bg-[#0a1510] border border-[#1f382a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#72e718]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Saturação SpO₂ (%)</label>
                <input
                  type="number"
                  value={newSpO2}
                  onChange={(e) => setNewSpO2(e.target.value)}
                  className="w-full bg-[#0a1510] border border-[#1f382a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#72e718]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#72e718] hover:bg-[#64cc15] text-black font-extrabold rounded-lg text-xs"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
