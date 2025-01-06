import { motion } from 'framer-motion';
import { Building2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export function ParentCompanySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-8">
          <Building2 className="w-16 h-16 text-cyan-400 mx-auto" />
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Our Parent Company
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl text-gray-300">
              ZappaRides is proudly backed by Lotus Scientific Solutions, a leading technology innovator 
              with a proven track record in developing cutting-edge solutions for various industries.
            </p>
            <p className="text-lg text-gray-400">
               Lotus Scientific Solutions brings robust infrastructure, technical expertise, and a vision for the future of mobility.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pt-4"
            >
              <Button
                variant="secondary"
                onClick={() => window.open('https://lotusscientificsolutions.com', '_blank')}
                className="group"
              >
                Visit Lotus Scientific Solutions
                <ExternalLink className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}