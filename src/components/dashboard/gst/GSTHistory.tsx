import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { History, Download } from 'lucide-react';
import type { GSTCalculation } from '../../../types/gst';

export function GSTHistory() {
  const { user } = useAuth();
  const [calculations, setCalculations] = useState<GSTCalculation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const calculationsRef = query(
      ref(database, 'gstCalculations'),
      orderByChild('timestamp')
    );

    const unsubscribe = onValue(calculationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const calculationsList = Object.entries(data)
          .map(([id, calc]: [string, any]) => ({
            id,
            ...calc
          }))
          .filter(calc => calc.userId === user.uid)
          .reverse();
        setCalculations(calculationsList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className="text-center py-4 text-gray-400">Loading history...</div>;
  }

  if (calculations.length === 0) {
    return <div className="text-center py-4 text-gray-400">No calculations yet</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <History className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-medium text-white">Recent Calculations</h3>
      </div>

      <div className="space-y-4">
        {calculations.slice(0, 5).map((calc) => (
          <motion.div
            key={calc.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/30 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-400">
                Base Amount: <span className="text-white">₹{calc.baseAmount.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-400">
                GST ({calc.gstRate}%): <span className="text-white">₹{calc.gstAmount.toFixed(2)}</span>
              </p>
              <p className="text-sm text-cyan-400">
                Total: ₹{calc.totalAmount.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(calc.timestamp).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}