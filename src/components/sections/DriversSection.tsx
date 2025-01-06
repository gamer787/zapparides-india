import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Users } from 'lucide-react';

export function DriversSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <Users className="w-16 h-16 text-cyan-400 mx-auto" />
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Want to Join Our Driver Fleet?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join ZappaRides as a driver and be part of the revolution in urban mobility. 
            For the first time ever the power of choice is given to the our partners
          </p>
          <Button 
            variant="secondary"
            onClick={() => navigate('/drivers')}
            className="text-xl px-12"
          >
            View Driver Plans
          </Button>
        </motion.div>
      </div>
    </section>
  );
}