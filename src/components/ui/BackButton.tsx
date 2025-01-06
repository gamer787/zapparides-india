import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/')}
      className={`
        flex items-center gap-2 px-4 py-2 
        bg-gray-800/50 text-cyan-400 
        rounded-lg hover:bg-gray-800/70 
        transition-colors
        ${className}
      `}
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </motion.button>
  );
}