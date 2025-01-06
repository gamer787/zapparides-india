import { motion } from 'framer-motion';
import { GSTCalculation } from '../../../types/gst';
import { formatGSTAmount } from '../../../utils/gst';

interface DriverGSTSummaryProps {
  calculation?: GSTCalculation;
}

export function DriverGSTSummary({ calculation }: DriverGSTSummaryProps) {
  if (!calculation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-800/50 rounded-xl p-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Driver Summary</h3>
        <div className="space-y-2">
          <p className="text-gray-400">
            Total Earnings: <span className="text-cyan-400">
              {formatGSTAmount(calculation.earnings)}
            </span>
          </p>
          <p className="text-gray-400">
            GST Amount (5%): <span className="text-red-400">
              {formatGSTAmount(calculation.gstAmount)}
            </span>
          </p>
          <p className="text-gray-400">
            Last Updated: <span className="text-white">
              {new Date(calculation.timestamp).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}