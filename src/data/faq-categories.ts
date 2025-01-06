import { Car, Shield, CreditCard, Building2, HelpCircle, Users } from 'lucide-react';

export const categories = [
  {
    id: 'general',
    label: 'General',
    icon: HelpCircle,
  },
  {
    id: 'rides',
    label: 'Rides & Pricing',
    icon: Car,
  },
  {
    id: 'safety',
    label: 'Safety',
    icon: Shield,
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: CreditCard,
  },
  {
    id: 'business',
    label: 'Business',
    icon: Building2,
  },
  {
    id: 'drivers',
    label: 'Drivers',
    icon: Users,
  },
] as const;

export type CategoryId = typeof categories[number]['id'];