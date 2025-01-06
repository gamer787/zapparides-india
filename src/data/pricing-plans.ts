import { Zap, Shield, Settings } from 'lucide-react';

export type SubscriptionDuration = 'ride' | 'day' | 'week' | 'month';
export type CommissionTier = 'first-month' | 'six-months' | 'one-year';

export interface SubscriptionPrice {
  duration: SubscriptionDuration;
  price: number;
  label: string;
}

export interface CommissionRate {
  tier: CommissionTier;
  rate: number;
  label: string;
  description: string;
}

const subscriptionPrices: Record<SubscriptionDuration, SubscriptionPrice> = {
  ride: {
    duration: 'ride',
    price: 10,
    label: 'Per Ride'
  },
  day: {
    duration: 'day',
    price: 199,
    label: '24 Hours'
  },
  week: {
    duration: 'week',
    price: 599,
    label: '7 Days'
  },
  month: {
    duration: 'month',
    price: 999,
    label: '30 Days'
  }
};

const commissionRates: Record<CommissionTier, CommissionRate> = {
  'first-month': {
    tier: 'first-month',
    rate: 18,
    label: 'First 6 Month',
    description: 'Start your journey with our standard rate'
  },
  'six-months': {
    tier: 'six-months',
    rate: 12,
    label: 'After 6 Months',
    description: 'Reduced rate for loyal drivers'
  },
  'one-year': {
    tier: 'one-year',
    rate: 8.5,
    label: 'After 1 Year',
    description: 'Our best rate for long-term partners'
  }
};

export const pricingPlans = [
  {
    title: "Commission Based",
    icon: Zap,
    commissionRates,
    description: "Pay as you earn with our competitive commission rates that decrease over time",
    features: [
      "No monthly fees",
      "Decreasing commission rates",
      "24/7 support",
      "Real-time earnings",
      "Flexible schedule"
    ],
    buttonText: "Get Started",
    variant: "primary" as const
  },
  {
    title: "Subscription Based",
    icon: Shield,
    subscriptionPrices,
    description: "Choose your perfect subscription duration",
    features: [
      "No commission fees",
      "only a fixed amount based on your needs",
      "Unlimited rides during period",
      "Priority support",
      "Analytics dashboard",
      "Training resources",
      "Flexible schedule"
    ],
    buttonText: "Select Plan",
    variant: "secondary" as const
  },
  {
    title: "Custom Plan",
    icon: Settings,
    price: "Custom",
    description: "Get what you want, on your terms",
    features: [
      "Flexible pricing structure",
      "Customizable features",
      "Dedicated account manager",
      "Beta feature access",
      "Priority development requests"
    ],
    buttonText: "Coming Soon",
    variant: "outline" as const,
    isBeta: true
  }
];