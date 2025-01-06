import { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { BetaBadge } from '../ui/BetaBadge';
import { 
  SubscriptionDuration, 
  SubscriptionPrice, 
  CommissionTier,
  CommissionRate 
} from '../../data/pricing-plans';

interface PricingCardProps {
  title: string;
  icon: LucideIcon;
  price?: string;
  subscriptionPrices?: Record<SubscriptionDuration, SubscriptionPrice>;
  commissionRates?: Record<CommissionTier, CommissionRate>;
  description: string;
  features: string[];
  buttonText: string;
  variant: 'primary' | 'secondary' | 'outline';
  isBeta?: boolean;
  onSelect?: () => void;
}

export function PricingCard({
  title,
  icon: Icon,
  price,
  subscriptionPrices,
  commissionRates,
  description,
  features,
  buttonText,
  variant,
  isBeta,
  onSelect
}: PricingCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<SubscriptionDuration>('month');
  const [selectedCommissionTier, setSelectedCommissionTier] = useState<CommissionTier>('first-month');

  const renderPrice = () => {
    if (subscriptionPrices) {
      const selected = subscriptionPrices[selectedDuration];
      return (
        <div className="space-y-4 mb-6">
          <p className="text-4xl font-bold text-cyan-400">₹{selected.price}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.values(subscriptionPrices).map((option) => (
              <button
                key={option.duration}
                onClick={() => setSelectedDuration(option.duration)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedDuration === option.duration
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (commissionRates) {
      const selected = commissionRates[selectedCommissionTier];
      return (
        <div className="space-y-4 mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-cyan-400">{selected.rate}%</p>
            <p className="text-sm text-gray-400 mt-1">{selected.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.values(commissionRates).map((option) => (
              <button
                key={option.tier}
                onClick={() => setSelectedCommissionTier(option.tier)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCommissionTier === option.tier
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return <p className="text-4xl font-bold text-cyan-400 mb-4">{price}</p>;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative bg-gray-800/50 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm"
    >
      {isBeta && <BetaBadge />}
      <Icon className="w-12 h-12 text-cyan-400 mb-6" />
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      {renderPrice()}
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-300">
            <Zap className="w-5 h-5 text-cyan-400 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button 
        variant={variant} 
        className="w-full"
        disabled={isBeta}
        onClick={onSelect}
      >
        {buttonText}
      </Button>
    </motion.div>
  );
}