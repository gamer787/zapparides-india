import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { DriversTable } from './DriversTable';
import toast from 'react-hot-toast';
import type { Driver } from '../../../types/driver';

const DRIVERS_PATH = 'drivers';

export function DriversManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const driversRef = ref(database, DRIVERS_PATH);
    
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const driversList = Object.entries(data).map(([id, driverData]: [string, any]) => ({
          id,
          name: driverData.name || 'Unknown',
          email: driverData.email || '',
          phone: driverData.phone || '',
          blockStatus: driverData.blockStatus || false,
          car_details: driverData.car_details || null,
          earnings: driverData.earnings || 0,
          license_number: driverData.license_number || '',
          state: driverData.state || '',
          vehicle_type: driverData.vehicle_type || '',
          photo_url: driverData.photo_url || ''
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
      updates[`${DRIVERS_PATH}/${driverId}/blockStatus`] = !currentStatus;
      
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
    driver.phone.includes(searchQuery) ||
    driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.license_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Driver Management</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search drivers by name, email, phone, ID, license, or state..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <DriversTable
        drivers={filteredDrivers}
        loading={loading}
        onToggleBlock={handleToggleBlock}
      />
    </div>
  );
}