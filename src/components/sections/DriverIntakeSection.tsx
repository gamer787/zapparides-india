import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { GraduationCap } from 'lucide-react';

export function DriverIntakeSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <GraduationCap className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Driver Intake Program
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Transform your career with our exclusive corporate transition program. 
          Dedicated drivers can now path their way to becoming full-time corporate employees.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="secondary"
            onClick={() => navigate('/driver-intake')}
            className="group"
          >
            Learn About The Program
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}