import { motion } from 'framer-motion';
import { useState } from 'react';
import { pricingPlans } from '../data/pricing-plans';
import { PricingCard } from '../components/pricing/PricingCard';
import { AppDownloadModal } from '../components/modals/AppDownloadModal';
import { ContactModal } from '../components/modals/ContactModal';
import { BackButton } from '../components/ui/BackButton';

export function DriversPage() {
  const [showAppDownload, setShowAppDownload] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton />
      </div>
      
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Choose Your Plan for Our Drivers
          </h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <p className="text-gray-300 text-lg">
              At ZappaRides, we believe in complete transparency. By ensuring all our drivers understand our business model, 
              we maintain an ethical and sustainable ecosystem. Your success is our success.
            </p>
            <div className="mt-4 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <p className="text-cyan-400 font-medium">
                💡 All our pricing plans are designed with driver profitability in mind, backed by data and driver feedback.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.title}
                {...plan}
                onSelect={() => setShowAppDownload(true)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400">
              Not sure which plan is right for you?{' '}
              <button 
                className="text-cyan-400 hover:underline"
                onClick={() => setShowContact(true)}
              >
                Talk to our team
              </button>
            </p>
          </motion.div>
        </motion.div>

        {showAppDownload && (
          <AppDownloadModal onClose={() => setShowAppDownload(false)} />
        )}

        {showContact && (
          <ContactModal onClose={() => setShowContact(false)} />
        )}
      </section>
    </div>
  );
}