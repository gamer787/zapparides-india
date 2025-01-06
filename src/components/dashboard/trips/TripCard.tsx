import { motion } from 'framer-motion';
import { MapPin, Car, User, IndianRupee, Calendar } from 'lucide-react';
import { Trip } from '../../../types/trip';
import { Button } from '../../ui/Button';

interface TripCardProps {
  trip: Trip;
  onViewMap: (trip: Trip) => void;
}

export function TripCard({ trip, onViewMap }: TripCardProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-xl p-6 space-y-4 border border-cyan-500/20"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm text-gray-400">Trip ID:</span>
          <p className="font-mono text-cyan-400">{trip.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          trip.status === 'completed' ? 'bg-green-500/10 text-green-400' :
          trip.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
          'bg-yellow-500/10 text-yellow-400'
        }`}>
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-300">
          <User className="w-4 h-4 text-cyan-400" />
          <span>User: {trip.userName}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Car className="w-4 h-4 text-cyan-400" />
          <span>Driver: {trip.driverName}</span>
          <span className="text-sm text-gray-500">
            ({trip.carDetails.model} - {trip.carDetails.number})
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <div className="flex-1">
            <p className="text-sm">From: {trip.pickUpAddress}</p>
            <p className="text-sm">To: {trip.dropOffAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <IndianRupee className="w-4 h-4 text-cyan-400" />
            <span>₹{trip.fareAmount}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">{formatDate(trip.timestamp)}</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => onViewMap(trip)}
        className="w-full mt-4"
      >
        View Route
      </Button>
    </motion.div>
  );
}