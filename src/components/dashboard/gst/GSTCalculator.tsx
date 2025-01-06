import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCw } from 'lucide-react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { Button } from '../../ui/Button';
import { DriverGSTSummary } from './DriverGSTSummary';
import { DriverGSTTable } from './DriverGSTTable';
import { calculateDriverGST } from '../../../utils/gst';
import { Driver, GSTCalculation } from '../../../types/gst';
import toast from 'react-hot-toast';

export function GSTCalculator() {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [gstCalculations, setGSTCalculations] = useState<GSTCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  useEffect(() => {
    const driversRef = ref(database, 'drivers');
    
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setLoading(false);
        return;
      }

      const driversList = Object.entries(data).map(([id, driver]: [string, any]) => ({
        id,
        name: driver.name || 'Unknown Driver',
        email: driver.email || '',
        phone: driver.phone || '',
        earnings: driver.earnings || 0,
        gstToBePaid: driver.gstToBePaid
      }));

      setDrivers(driversList);
      
      // Calculate GST for all drivers
      const calculations = driversList.map(driver => calculateDriverGST(driver));
      setGSTCalculations(calculations);

      // Auto-update if enabled
      if (autoUpdate) {
        calculations.forEach(calc => {
          update(ref(database, `drivers/${calc.driverId}`), {
            gstToBePaid: calc.gstAmount
          });
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [autoUpdate]);

  const handleDriverSelect = (driverId: string) => {
    setSelectedDriver(driverId);
  };

  const handleCalculateGST = async () => {
    if (!selectedDriver) {
      toast.error('Please select a driver');
      return;
    }

    const calculation = gstCalculations.find(calc => calc.driverId === selectedDriver);
    if (!calculation) return;

    try {
      await update(ref(database, `drivers/${selectedDriver}`), {
        gstToBePaid: calculation.gstAmount
      });
      toast.success('GST calculation updated');
    } catch (error) {
      console.error('Error updating GST:', error);
      toast.error('Failed to update GST calculation');
    }
  };

  const toggleAutoUpdate = () => {
    setAutoUpdate(!autoUpdate);
    toast.success(`Auto GST calculation ${!autoUpdate ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-cyan-400">Driver GST Calculator</h2>
          </div>
          <Button
            variant="outline"
            onClick={toggleAutoUpdate}
            className={`flex items-center gap-2 ${autoUpdate ? 'text-green-400' : 'text-gray-400'}`}
          >
            <RotateCw className="w-4 h-4" />
            {autoUpdate ? 'Auto Update On' : 'Auto Update Off'}
          </Button>
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
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="secondary"
              onClick={handleCalculateGST}
              disabled={!selectedDriver || autoUpdate}
              className="w-full"
            >
              Calculate GST
            </Button>
          </div>

          {selectedDriver && (
            <DriverGSTSummary
              calculation={gstCalculations.find(calc => calc.driverId === selectedDriver)}
            />
          )}
        </div>
      </div>

      <DriverGSTTable calculations={gstCalculations} loading={loading} />
    </div>
  );
}