import React from 'react';
import { Rocket, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Lightning Fast',
    description: 'Book your ride in seconds with our intuitive interface'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Advanced safety features for peace of mind'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance'
  }
];

export function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-6 bg-gradient-to-b from-blue-900/40 to-transparent rounded-2xl">
            <feature.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}