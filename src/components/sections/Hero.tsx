import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { StoreButton } from '../ui/StoreButton';
import { Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface HeroProps {
  onWaitlistClick: () => void;
}

export function Hero({ onWaitlistClick }: HeroProps) {
  const handleStoreClick = (store: 'android' | 'apple') => {
    toast.success(`Coming soon to ${store === 'android' ? 'Google Play' : 'App Store'}!`, {
      icon: '🚀',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            ZappaRides
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-8 text-cyan-400"
          >
            COMING SOON ON<br />ANDROID AND iOS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300"
          >
            Introducing ZappaRides, a revolutionary ride-hailing app designed specifically for the dynamic streets of India. 
            Built on the ethos of fairness and efficiency, we redefine the traditional model with transparent pricing and reliable service.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <StoreButton store="android" onClick={() => handleStoreClick('android')} />
            <StoreButton store="apple" onClick={() => handleStoreClick('apple')} />
            <Button 
              variant="secondary" 
              onClick={onWaitlistClick}
              icon={<Sparkles className="w-5 h-5" />}
              label="WAITLIST"
              className="min-w-[180px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}