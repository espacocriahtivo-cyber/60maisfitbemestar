import React, { useState } from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { EvolutionDataPoint, UserProfile } from '../types';

interface EvolutionScreenProps {
  data: EvolutionDataPoint[];
  user: UserProfile;
  onBack: () => void;
}

export const EvolutionScreen: React.FC<EvolutionScreenProps> = ({
  data,
  user,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'peso' | 'forca' | 'equilibrio'>('peso');

  // Chart values based on active tab
  const getChartConfig = () => {
    if (activeTab === 'peso') {
      return {
        yLabels: ['70', '65', '60', '55'],
        // Mapping kg to Y coordinates (70kg -> Y 15, 55kg -> Y 135)
        getY: (val: number) => {
          // range: 70 to 55 => span 15
          // y-range: 15 to 135 => span 120
          const ratio = (70 - val) / 15;
          return 15 + ratio * 120;
        },
        getValue: (d: EvolutionDataPoint) => d.weight,
        unit: 'kg',
        currentValue: `${user.weight} kg`,
        targetValue: `${user.targetWeight} kg`,
        currentLabel: 'Peso atual',
        targetLabel: 'Meta',
      };
    } else if (activeTab === 'forca') {
      return {
        yLabels: ['100', '80', '60', '40'],
        getY: (val: number) => {
          const ratio = (100 - val) / 60;
          return 15 + ratio * 120;
        },
        getValue: (d: EvolutionDataPoint) => d.forceIndex || 70,
        unit: 'pts',
        currentValue: '88 pts',
        targetValue: '95 pts',
        currentLabel: 'Índice atual',
        targetLabel: 'Meta semestral',
      };
    } else {
      return {
        yLabels: ['100', '80', '60', '40'],
        getY: (val: number) => {
          const ratio = (100 - val) / 60;
          return 15 + ratio * 120;
        },
        getValue: (d: EvolutionDataPoint) => d.balanceScore || 75,
        unit: '%',
        currentValue: '90%',
        targetValue: '95%',
        currentLabel: 'Estabilidade',
        targetLabel: 'Meta de Equilíbrio',
      };
    }
  };

  const config = getChartConfig();

  // Generate SVG polyline points (X coords: Jan=35, Fev=85, Mar=135, Abr=185, Mai=235, Jun=285)
  const xCoords = [35, 85, 135, 185, 235, 285];
  const points = data
    .map((d, i) => `${xCoords[i]},${config.getY(config.getValue(d))}`)
    .join(' ');

  return (
    <div className="w-full h-full flex flex-col justify-start px-5 pt-2 pb-4 overflow-y-auto no-scrollbar bg-[#041b16] text-white select-none">
      {/* Navigation Header */}
      <section className="flex items-center pb-3 border-b border-emerald-950/40 relative">
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="p-1 -ml-1 text-white hover:text-[#84cc16] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg pr-5 text-neutral-100">
          Minha evolução
        </h1>
      </section>

      {/* Filter Tabs */}
      <nav aria-label="Filtro de evolução" className="grid grid-cols-3 gap-2 my-3.5">
        <button
          type="button"
          onClick={() => setActiveTab('peso')}
          className={`py-2 px-3 rounded-full text-center text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer ${
            activeTab === 'peso'
              ? 'bg-[#84cc16] text-zinc-950 shadow-sm'
              : 'bg-[#082820] text-emerald-100/80 border border-[#144136] hover:border-emerald-500/50'
          }`}
        >
          Peso
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('forca')}
          className={`py-2 px-3 rounded-full text-center text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer ${
            activeTab === 'forca'
              ? 'bg-[#84cc16] text-zinc-950 shadow-sm'
              : 'bg-[#082820] text-emerald-100/80 border border-[#144136] hover:border-emerald-500/50'
          }`}
        >
          Força
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('equilibrio')}
          className={`py-2 px-3 rounded-full text-center text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer ${
            activeTab === 'equilibrio'
              ? 'bg-[#84cc16] text-zinc-950 shadow-sm'
              : 'bg-[#082820] text-emerald-100/80 border border-[#144136] hover:border-emerald-500/50'
          }`}
        >
          Equilíbrio
        </button>
      </nav>

      {/* Progress Chart Card (White card) */}
      <section className="bg-white rounded-2xl p-4 shadow-lg text-slate-800 flex flex-col mb-3.5">
        <div className="w-full relative pt-1">
          <svg
            aria-label="Gráfico de evolução"
            className="w-full h-44 overflow-visible"
            viewBox="0 0 310 160"
          >
            {/* Y-Axis Labels & Dashed Grid Lines */}
            {config.yLabels.map((label, idx) => {
              const y = 15 + idx * 40;
              return (
                <g key={label}>
                  <text fill="#64748b" fontSize="10" fontWeight="500" x="0" y={y + 3}>
                    {label}
                  </text>
                  <line
                    stroke="#e2e8f0"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                    x1="24"
                    x2="300"
                    y1={y}
                    y2={y}
                  ></line>
                </g>
              );
            })}

            {/* Baseline */}
            <line stroke="#cbd5e1" strokeWidth="1.2" x1="24" x2="300" y1="135" y2="135"></line>

            {/* Trend Polyline */}
            <polyline
              fill="none"
              points={points}
              stroke="#65a30d"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.8"
            ></polyline>

            {/* Data Point Dots */}
            {data.map((d, idx) => {
              const cx = xCoords[idx];
              const cy = config.getY(config.getValue(d));
              return (
                <g key={d.month}>
                  <circle cx={cx} cy={cy} fill="#65a30d" r="4" stroke="#ffffff" strokeWidth="1.5"></circle>
                  <text
                    fill="#64748b"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                    x={cx}
                    y="152"
                  >
                    {d.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Current vs Target Row */}
        <div className="grid grid-cols-2 pt-3 mt-1 border-t border-slate-100 divide-x divide-slate-100 text-center">
          <div className="pr-2">
            <span className="block text-xs text-slate-500 font-medium">{config.currentLabel}</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{config.currentValue}</p>
          </div>
          <div className="pl-2">
            <span className="block text-xs text-slate-500 font-medium">{config.targetLabel}</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{config.targetValue}</p>
          </div>
        </div>
      </section>

      {/* Achievement Reward Card */}
      <section className="bg-[#dcfce7] border border-emerald-300/80 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm">
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <Trophy className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-emerald-950 font-bold text-sm leading-snug">Você completou</p>
          <p className="text-emerald-800 text-xs font-semibold mt-0.5">
            {user.completedWorkoutsThisMonth} treinos este mês!
          </p>
        </div>
      </section>
    </div>
  );
};
