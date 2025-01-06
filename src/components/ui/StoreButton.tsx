import React from 'react';
import { Apple, Smartphone } from 'lucide-react';
import { Button } from './Button';

interface StoreButtonProps {
  store: 'android' | 'apple';
  onClick: () => void;
}

export function StoreButton({ store, onClick }: StoreButtonProps) {
  const config = {
    android: {
      icon: <Smartphone className="w-5 h-5" />,
      label: 'ANDROID',
      variant: 'android' as const
    },
    apple: {
      icon: <Apple className="w-5 h-5" />,
      label: 'APPLE',
      variant: 'outline' as const
    }
  };

  const { icon, label, variant } = config[store];
  
  return (
    <Button
      variant={variant}
      onClick={onClick}
      icon={icon}
      label={label}
      className="min-w-[180px]"
    />
  );
}