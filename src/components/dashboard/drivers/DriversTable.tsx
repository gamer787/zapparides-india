import { motion } from 'framer-motion';
import { Ban, CheckCircle, Copy, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Driver } from '../../../types/driver';

interface DriversTableProps {
  drivers: Driver[];
  loading: boolean;
  onToggleBlock: (driverId: string, currentStatus: boolean) => void;
}

export function DriversTable({ drivers, loading, onToggleBlock }: DriversTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('ID copied to clipboard');
  };

  const formatCarDetails = (car_details: Driver['car_details']) => {
    if (!car_details) return 'No car details';
    return `${car_details.carModel} - ${car_details.carColor} (${car_details.carNumber})`;
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading drivers...</div>;
  }

  if (!drivers.length) {
    return <div className="text-center py-8 text-gray-400">No drivers found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-cyan-500/20">
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Photo</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Driver ID</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Name</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Email</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Phone</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Vehicle</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">License</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">State</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Earnings</th>
            <th className="text-left py-4 px-4 text-cyan-400 font-medium">Status</th>
            <th className="text-right py-4 px-4 text-cyan-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <motion.tr
              key={driver.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b border-gray-800"
            >
              <td className="py-4 px-4">
                {driver.photo_url ? (
                  <img 
                    src={driver.photo_url} 
                    alt={driver.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/40';
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm font-mono">
                    {driver.id.slice(0, 8)}...
                  </span>
                  <button
                    onClick={() => copyToClipboard(driver.id)}
                    className="p-1 hover:bg-gray-800 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                  </button>
                </div>
              </td>
              <td className="py-4 px-4 text-white">{driver.name}</td>
              <td className="py-4 px-4 text-gray-400">{driver.email}</td>
              <td className="py-4 px-4 text-gray-400">{driver.phone}</td>
              <td className="py-4 px-4 text-gray-400">
                {driver.vehicle_type}
                <span className="text-xs text-gray-500 block">
                  {formatCarDetails(driver.car_details)}
                </span>
              </td>
              <td className="py-4 px-4 text-gray-400">{driver.license_number}</td>
              <td className="py-4 px-4 text-gray-400">{driver.state}</td>
              <td className="py-4 px-4 text-cyan-400">₹{driver.earnings.toLocaleString()}</td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  driver.blockStatus 
                    ? 'bg-red-500/10 text-red-400' 
                    : 'bg-green-500/10 text-green-400'
                }`}>
                  {driver.blockStatus ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onToggleBlock(driver.id, driver.blockStatus)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-lg
                    ${driver.blockStatus 
                      ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                      : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    }
                  `}
                >
                  {driver.blockStatus ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Unblock
                    </>
                  ) : (
                    <>
                      <Ban className="w-4 h-4" />
                      Block
                    </>
                  )}
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}