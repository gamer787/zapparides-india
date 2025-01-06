import { Modal } from '../../ui/Modal';
import { formatGSTAmount } from '../../../utils/gst';
import { MapPin, User, Clock } from 'lucide-react';

interface Trip {
  tripID: string;
  fareAmount: number;
  timestamp: string;
  pickupLocation?: string;
  dropLocation?: string;
  userName?: string;
  status: string;
}

interface TripDetailsModalProps {
  driverName: string;
  trips: Trip[];
  onClose: () => void;
}

export function TripDetailsModal({ driverName, trips, onClose }: TripDetailsModalProps) {
  const totalEarnings = trips.reduce((sum, trip) => sum + trip.fareAmount, 0);
  const totalGST = totalEarnings * 0.05;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-400';
      case 'ongoing':
        return 'text-yellow-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Modal title={`Trip Details - ${driverName}`} onClose={onClose}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-xl">
          <div>
            <p className="text-sm text-gray-400">Total Earnings</p>
            <p className="text-xl font-bold text-cyan-400">{formatGSTAmount(totalEarnings)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total GST (5%)</p>
            <p className="text-xl font-bold text-red-400">{formatGSTAmount(totalGST)}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="text-left py-2 px-4 text-cyan-400 font-medium">Trip ID</th>
                <th className="text-left py-2 px-4 text-cyan-400 font-medium">User</th>
                <th className="text-left py-2 px-4 text-cyan-400 font-medium">Status</th>
                <th className="text-left py-2 px-4 text-cyan-400 font-medium">Date</th>
                <th className="text-left py-2 px-4 text-cyan-400 font-medium">Locations</th>
                <th className="text-right py-2 px-4 text-cyan-400 font-medium">Fare</th>
                <th className="text-right py-2 px-4 text-cyan-400 font-medium">GST</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.tripID} className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-300 font-mono text-sm">
                    {trip.tripID.slice(0, 8)}...
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-300">{trip.userName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 ${getStatusColor(trip.status)}`}>
                      <Clock className="w-4 h-4" />
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300 text-sm">
                    {new Date(trip.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {trip.pickupLocation && trip.dropLocation ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span className="text-gray-300 truncate" title={trip.pickupLocation}>
                            {trip.pickupLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3 text-red-400" />
                          <span className="text-gray-300 truncate" title={trip.dropLocation}>
                            {trip.dropLocation}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">No location data</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-cyan-400">
                    {formatGSTAmount(trip.fareAmount)}
                  </td>
                  <td className="py-3 px-4 text-right text-red-400">
                    {formatGSTAmount(trip.fareAmount * 0.05)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {trips.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No trips found for this driver
          </div>
        )}
      </div>
    </Modal>
  );
}