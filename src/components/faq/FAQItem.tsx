import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../../data/faqs';

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-cyan-500/20 rounded-lg overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex justify-between items-center bg-gray-800/50 hover:bg-gray-800/70"
      >
        <span className="text-lg font-medium text-white">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-cyan-400 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gray-800/30">
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}