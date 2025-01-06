import { useState } from 'react';
import { Car, Eye, Download } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { GSTCalculation } from '../../../types/gst';
import { formatGSTAmount } from '../../../utils/gst';
import { exportToCSV } from '../../../utils/export';
import { Button } from '../../ui/Button';
import { TripDetailsModal } from './TripDetailsModal';
import toast from 'react-hot-toast';

interface DriverGSTTableProps {
  calculations: GSTCalculation[];
  loading: boolean;
}

export function DriverGSTTable({ calculations = [], loading }: DriverGSTTableProps) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [driverTrips, setDriverTrips] = useState<any[]>([]);

  const handleViewDetails = (driverId: string, driverName: string) => {
    const tripsRef = ref(database, 'tripRequests');
    
    onValue(tripsRef, (snapshot) => {
      const tripsData = snapshot.val();
      if (!tripsData) return;

      const driverTrips = Object.entries(tripsData)
        .filter(([_, trip]: [string, any]) => trip.driverID === driverId)
        .map(([tripID, trip]: [string, any]) => ({
          tripID,
          fareAmount: Number(trip.fareAmount) || 0,
          timestamp: trip.timestamp || new Date().toISOString(),
          pickupLocation: trip.pickupLocation?.address || trip.pickupAddress,
          dropLocation: trip.dropLocation?.address || trip.dropAddress,
          userName: trip.userName || 'Unknown User',
          status: trip.status || 'unknown'
        }))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setDriverTrips(driverTrips);
      setSelectedDriver(driverName);
    });
  };

  const handleDownload = () => {
    try {
      const filename = `driver-gst-summary-${new Date().toISOString().split('T')[0]}`;
      exportToCSV(calculations, filename);
      toast.success('GST summary downloaded successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      toast.error('Failed to download GST summary');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading driver data...</div>;
  }

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-cyan-400">Driver Earnings & GST Summary</h2>
        </div>
        
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex items-center gap-2"
          disabled={calculations.length === 0}
        >
          <Download className="w-4 h-4" />
          Download CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">Driver</th>
              <th className="text-right py-4 px-4 text-cyan-400 font-medium">Total Earnings</th>
              <th className="text-right py-4 px-4 text-cyan-400 font-medium">GST Amount (5%)</th>
              <th className="text-center py-4 px-4 text-cyan-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {calculations.map(calc => (
              <tr key={calc.driverId} className="border-b border-gray-800">
                <td className="py-4 px-4 text-white">{calc.driverName}</td>
                <td className="py-4 px-4 text-right text-cyan-400">
                  {formatGSTAmount(calc.earnings)}
                </td>
                <td className="py-4 px-4 text-right text-red-400">
                  {formatGSTAmount(calc.gstAmount)}
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => handleViewDetails(calc.driverId, calc.driverName)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDriver && (
        <TripDetailsModal
          driverName={selectedDriver}
          trips={driverTrips}
          onClose={() => {
            setSelectedDriver(null);
            setDriverTrips([]);
          }}
        />
      )}
    </div>
  );
}