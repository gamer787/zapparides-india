import { motion } from 'framer-motion';
import { Ban, CheckCircle, Star } from 'lucide-react';

interface DriverListProps {
  drivers: any[];
  loading: boolean;
  onToggleBlock: (driverId: string, currentStatus: boolean) => void;
}

export function DriverList({ drivers, loading, onToggleBlock }: DriverListProps) {
  if (loading) {
    return <div className="text-gray-400">Loading drivers...</div>;
  }

  if (drivers.length === 0) {
    return <div className="text-gray-400">No drivers found</div>;
  }

  return (
    <div className="space-y-4">
      {drivers.map(driver => (
        <motion.div
          key={driver.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 p-4 rounded-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-medium text-white">{driver.name || 'Unnamed Driver'}</h3>
              <p className="text-sm text-gray-400">{driver.email}</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleBlock(driver.id, driver.blocked)}
              className={`
                p-2 rounded-lg flex items-center gap-2
                ${driver.blocked 
                  ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                  : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                }
              `}
            >
              {driver.blocked ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Unblock
                </>
              ) : (
                <>
                  <Ban className="w-5 h-5" />
                  Block
                </>
              )}
            </motion.button>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4" />
              {driver.rating || '0.0'}
            </div>
            <div className="text-gray-400">
              {driver.totalRides || 0} rides
            </div>
            <div className="text-gray-400">
              Joined {new Date(driver.joinedAt).toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}