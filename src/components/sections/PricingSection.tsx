import { motion } from 'framer-motion';
import { useState } from 'react';
import { pricingPlans } from '../../data/pricing-plans';
import { PricingCard } from '../pricing/PricingCard';
import { AppDownloadModal } from '../modals/AppDownloadModal';
import { ContactModal } from '../modals/ContactModal';
import { Sparkles } from 'lucide-react';

export function PricingSection() {
  const [showAppDownload, setShowAppDownload] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Choose Your Plan for Our Drivers
        </h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-gray-300 text-lg">
            At ZappaRides, we believe in complete transparency. By ensuring all our drivers understand our business model, 
            we maintain an ethical and sustainable ecosystem. Your success is our success.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-cyan-400">New: Flexible Plan Selection</h3>
            </div>
            <p className="text-gray-300">
              For the first time ever, drivers can now choose the pricing model that best fits their needs.
              Whether you prefer commission-based, subscription, or a custom plan - the power is in your hands!
            </p>
          </motion.div>

          <div className="mt-6 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
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
          whileInView={{ opacity: 1 }}
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
  );
}