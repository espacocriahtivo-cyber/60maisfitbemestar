import React, { useState } from 'react';
import { ArrowLeft, Gift, Dumbbell, Crown, Star, Check } from 'lucide-react';
import { SubscriptionPlan } from '../types';

interface PlansScreenProps {
  plans: SubscriptionPlan[];
  onSubscribe: (planId: string) => void;
  onBack: () => void;
}

export const PlansScreen: React.FC<PlansScreenProps> = ({
  plans,
  onSubscribe,
  onBack,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('essencial');

  const renderPlanIcon = (id: string) => {
    switch (id) {
      case 'gratuito':
        return <Gift className="w-7 h-7 text-amber-500" />;
      case 'essencial':
        return <Dumbbell className="w-7 h-7 text-emerald-600" />;
      case 'premium':
        return <Crown className="w-7 h-7 text-blue-600" />;
      case 'personalizado':
        return <Star className="w-7 h-7 text-purple-600" />;
      default:
        return <Dumbbell className="w-7 h-7 text-emerald-600" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-2 pb-4 overflow-y-auto no-scrollbar bg-[#0e1713] text-white select-none">
      {/* Navigation Header */}
      <div>
        <nav className="flex items-center pb-3 relative">
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="p-1 -ml-1 text-white hover:text-[#7ae127] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="flex-1 text-center font-bold text-lg tracking-tight text-white pr-6">
            Escolha seu plano
          </h1>
        </nav>

        {/* Subscription Plan Cards */}
        <section aria-label="Opções de Planos" className="space-y-3 pt-1">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <label
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`group relative flex items-center justify-between p-3.5 rounded-2xl bg-white text-gray-900 shadow-md cursor-pointer transition-all border-2 ${
                  isSelected ? 'border-emerald-500 shadow-lg' : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  {/* Icon badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${plan.bgColor}`}
                  >
                    {renderPlanIcon(plan.id)}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 leading-tight">{plan.name}</h2>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {plan.price}
                      {plan.period && (
                        <span className="text-xs font-semibold text-gray-600">{plan.period}</span>
                      )}
                    </p>
                    {plan.badgeText && (
                      <p
                        className={`text-xs font-medium mt-0.5 ${
                          plan.id === 'essencial'
                            ? 'text-emerald-700'
                            : plan.id === 'premium'
                            ? 'text-blue-700'
                            : 'text-purple-700'
                        }`}
                      >
                        {plan.badgeText}
                      </p>
                    )}
                  </div>
                </div>

                {/* Selection Circle */}
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0"></div>
                  </div>
                )}
              </label>
            );
          })}
        </section>
      </div>

      {/* Footer and CTA */}
      <footer className="pt-4 flex flex-col items-center mt-auto">
        <p className="text-xs font-normal text-gray-300/80 mb-3 text-center">
          Cancele quando quiser. Sem taxas de cancelamento.
        </p>
        <button
          onClick={() => onSubscribe(selectedPlanId)}
          type="button"
          className="w-full py-4 px-6 rounded-full bg-[#7ae127] hover:bg-[#6ecb23] active:scale-[0.99] text-gray-950 font-extrabold text-base tracking-wide uppercase transition duration-150 shadow-lg shadow-lime-900/30 cursor-pointer"
        >
          ASSINAR AGORA
        </button>
      </footer>
    </div>
  );
};
