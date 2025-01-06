import { motion } from 'framer-motion';
import { Building, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function EnterpriseSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <Building className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Own Your ZappaRides Enterprise
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Launch your own ride-hailing business with our enterprise solutions. 
          Get custom branding, dedicated support, and powerful management tools.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="secondary"
            onClick={() => window.open('https://enterprise.zappa-rides.com', '_blank')}
            className="group"
          >
            Learn More About Enterprise
            <ArrowRight className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}