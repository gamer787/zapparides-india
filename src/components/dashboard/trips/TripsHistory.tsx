import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { Search, MapPin, ExternalLink } from 'lucide-react';

interface TripRequest {
  tripId: string;
  userId: string;
  driverId: string;
  userName: string;
  driverName: string;
  carDetails: string;
  fareAmount: number;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dropLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  status: string;
  timestamp: number;
}

export function TripsHistory() {
  const [trips, setTrips] = useState<TripRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tripsRef = ref(database, 'tripRequests');
    
    const unsubscribe = onValue(tripsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        console.log('Firebase data:', data);

        if (data) {
          const tripsList = Object.entries(data).map(([id, trip]: [string, any]) => ({
            tripId: id,
            userId: trip.userId || '',
            driverId: trip.driverId || '',
            userName: trip.userName || 'Unknown User',
            driverName: trip.driverName || 'Unknown Driver',
            carDetails: trip.carDetails || 'N/A',
            fareAmount: parseFloat(trip.fareAmount) || 0,
            pickupLocation: {
              address: trip.pickupLocation?.address || '',
              latitude: trip.pickupLocation?.latitude || 0,
              longitude: trip.pickupLocation?.longitude || 0
            },
            dropLocation: {
              address: trip.dropLocation?.address || '',
              latitude: trip.dropLocation?.latitude || 0,
              longitude: trip.dropLocation?.longitude || 0
            },
            status: trip.status || 'unknown',
            timestamp: trip.timestamp || Date.now()
          }));

          setTrips(tripsList);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const openInGoogleMaps = (pickup: any, drop: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup.latitude},${pickup.longitude}&destination=${drop.latitude},${drop.longitude}`;
    window.open(url, '_blank');
  };

  const filteredTrips = trips.filter(trip => 
    trip.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.tripId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Trip History</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by user, driver, or trip ID..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading trips...</div>
      ) : filteredTrips.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No trips found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Trip ID</th>
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">User Name</th>
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Driver Name</th>
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Car Details</th>
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Status</th>
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Fare Amount</th>
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Pickup</th>
                <th className="text-left py-4 px-4 text-cyan-400 font-medium">Dropoff</th>
                <th className="text-center py-4 px-4 text-cyan-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map(trip => (
                <tr key={trip.tripId} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-4 px-4 font-mono text-sm text-gray-400">{trip.tripId}</td>
                  <td className="py-4 px-4 text-white">{trip.userName}</td>
                  <td className="py-4 px-4 text-white">{trip.driverName}</td>
                  <td className="py-4 px-4 text-gray-400">{trip.carDetails}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      trip.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                      trip.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-cyan-400">₹{trip.fareAmount}</td>
                  <td className="py-4 px-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="truncate max-w-[200px]" title={trip.pickupLocation.address}>
                        {trip.pickupLocation.address}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="truncate max-w-[200px]" title={trip.dropLocation.address}>
                        {trip.dropLocation.address}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => openInGoogleMaps(trip.pickupLocation, trip.dropLocation)}
                      className="p-2 hover:bg-cyan-500/10 rounded-lg text-cyan-400 transition-colors"
                      title="View route in Google Maps"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}