import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../lib/firebase';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export function GSTCalculation() {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [driverEarnings, setDriverEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverData = () => {
      const tripsRef = ref(database, 'tripRequests');
      
      onValue(tripsRef, (snapshot) => {
        const tripsData = snapshot.val() || {};
        const earnings: Record<string, any> = {};

        // Process completed trips
        Object.entries(tripsData).forEach(([tripId, tripData]: [string, any]) => {
          if (tripData.status === 'completed' && tripData.driverId) {
            const fareAmount = parseFloat(tripData.fareAmount);
            const gstAmount = fareAmount * 0.05; // 5% GST

            if (!earnings[tripData.driverId]) {
              earnings[tripData.driverId] = {
                driverId: tripData.driverId,
                driverName: tripData.driverName,
                totalEarnings: 0,
                totalGST: 0,
                trips: []
              };
            }

            earnings[tripData.driverId].trips.push({
              tripId,
              fareAmount,
              gstAmount,
              timestamp: tripData.timestamp
            });

            earnings[tripData.driverId].totalEarnings += fareAmount;
            earnings[tripData.driverId].totalGST += gstAmount;
          }
        });

        setDriverEarnings(Object.values(earnings));
        setLoading(false);
      });
    };

    fetchDriverData();
  }, []);

  const handleDriverSelect = (driverId: string) => {
    setSelectedDriver(driverId);
  };

  const handleCalculateGST = async () => {
    if (!selectedDriver) {
      toast.error('Please select a driver');
      return;
    }

    const driver = driverEarnings.find(d => d.driverId === selectedDriver);
    if (!driver) return;

    try {
      const driverRef = ref(database, `Drivers/${selectedDriver}`);
      await update(driverRef, {
        gstToBePaid: driver.totalGST
      });
      toast.success('GST calculation updated');
    } catch (error) {
      console.error('Error updating GST:', error);
      toast.error('Failed to update GST calculation');
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-cyan-400">Driver GST Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Select Driver
            </label>
            <select
              value={selectedDriver}
              onChange={(e) => handleDriverSelect(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white"
            >
              <option value="">Select a driver</option>
              {driverEarnings.map(driver => (
                <option key={driver.driverId} value={driver.driverId}>
                  {driver.driverName}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="secondary"
            onClick={handleCalculateGST}
            disabled={!selectedDriver}
            className="w-full"
          >
            Calculate GST
          </Button>
        </div>

        {selectedDriver && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 rounded-xl p-6"
          >
            {driverEarnings
              .filter(d => d.driverId === selectedDriver)
              .map(driver => (
                <div key={driver.driverId} className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Driver Summary</h3>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      Total Earnings: <span className="text-cyan-400">
                        ₹{driver.totalEarnings.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Total GST (5%): <span className="text-red-400">
                        ₹{driver.totalGST.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Total Trips: <span className="text-white">
                        {driver.trips.length}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </div>

      {/* Driver Earnings Table */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-white mb-4">All Drivers GST Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Driver</th>
                <th className="text-right py-4 px-4 text-cyan-400 font-medium">Total Earnings</th>
                <th className="text-right py-4 px-4 text-cyan-400 font-medium">GST Amount (5%)</th>
                <th className="text-right py-4 px-4 text-cyan-400 font-medium">Total Trips</th>
              </tr>
            </thead>
            <tbody>
              {driverEarnings.map(driver => (
                <tr key={driver.driverId} className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">{driver.driverName}</td>
                  <td className="py-4 px-4 text-right text-cyan-400">
                    ₹{driver.totalEarnings.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right text-red-400">
                    ₹{driver.totalGST.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-400">
                    {driver.trips.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}