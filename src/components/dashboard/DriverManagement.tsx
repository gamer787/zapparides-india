import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../lib/firebase';
import { motion } from 'framer-motion';
import { DriverList } from './DriverList';
import { SearchInput } from '../ui/SearchInput';
import toast from 'react-hot-toast';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating?: number;
  totalRides?: number;
  joinedAt?: string;
  blockStatus: boolean;
}

export function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const driversRef = ref(database, 'Drivers');
    
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const driversList = Object.entries(data).map(([id, driverData]: [string, any]) => ({
          id,
          name: driverData.name || 'Unknown',
          email: driverData.email || '',
          phone: driverData.phone || '',
          rating: driverData.rating || 0,
          totalRides: driverData.totalRides || 0,
          joinedAt: driverData.joinedAt || new Date().toISOString(),
          blockStatus: driverData.blockStatus || false
        }));
        setDrivers(driversList);
      } else {
        setDrivers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleBlock = async (driverId: string, currentStatus: boolean) => {
    try {
      const updates: { [key: string]: any } = {};
      updates[`Drivers/${driverId}/blockStatus`] = !currentStatus;
      
      await update(ref(database), updates);
      
      toast.success(`Driver ${!currentStatus ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      console.error('Error updating driver status:', error);
      toast.error('Failed to update driver status');
    }
  };

  const filteredDrivers = drivers.filter(driver => 
    driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.phone.includes(searchQuery)
  );

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Driver Management</h2>
      
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search drivers by name, email or phone..."
        className="mb-6"
      />

      <DriverList
        drivers={filteredDrivers}
        loading={loading}
        onToggleBlock={handleToggleBlock}
      />
    </div>
  );
}