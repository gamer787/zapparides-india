import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { database } from '../../lib/firebase';
import { Car, Calendar, Clock, MapPin, Search } from 'lucide-react';

interface Trip {
  id: string;
  userId: string;
  driverId: string;
  pickup: string;
  dropoff: string;
  date: string;
  status: 'completed' | 'cancelled';
  fare: number;
  distance: number;
  duration: number;
}

export function TripsHistory() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    const tripsRef = ref(database, 'Trips');
    
    const unsubscribe = onValue(tripsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tripsList = Object.entries(data).map(([id, tripData]: [string, any]) => ({
          id,
          ...tripData
        }));
        setTrips(tripsList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = 
      trip.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.dropoff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || trip.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <div className="flex items-center gap-3 mb-6">
        <Car className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-cyan-400">Trips History</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips..."
            className="w-full pl-12 pr-4 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'cancelled')}
          className="px-4 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white"
        >
          <option value="all">All Trips</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading trips...</div>
      ) : filteredTrips.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No trips found</div>
      ) : (
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/50 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Trip ID: {trip.id}</span>
                <span className={`
                  px-3 py-1 rounded-full text-sm
                  ${trip.status === 'completed' 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-red-500/10 text-red-400'
                  }
                `}>
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Pickup: {trip.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Dropoff: {trip.dropoff}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(trip.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{trip.duration} mins</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <div className="text-gray-400">
                  Distance: <span className="text-white">{trip.distance} km</span>
                </div>
                <div className="text-lg font-medium text-cyan-400">
                  ₹{trip.fare.toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}