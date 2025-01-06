import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Car, DollarSign, Route } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../lib/firebase';

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeDrivers: 0,
    totalRevenue: 0,
    totalTrips: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Listen for users count
        const usersRef = ref(database, 'Users');
        onValue(usersRef, (snapshot) => {
          const users = snapshot.val() || {};
          const totalUsers = Object.keys(users).length;
          setStats(prev => ({ ...prev, totalUsers }));
        });

        // Listen for active drivers count
        const driversRef = ref(database, 'Drivers');
        onValue(driversRef, (snapshot) => {
          const drivers = snapshot.val() || {};
          const activeDrivers = Object.values(drivers).filter((driver: any) => 
            !driver.blockStatus
          ).length;
          
          setStats(prev => ({ ...prev, activeDrivers }));
        });

        // Listen for trips count
        const tripsRef = ref(database, 'tripRequests');
        onValue(tripsRef, (snapshot) => {
          const trips = snapshot.val() || {};
          const totalTrips = Object.keys(trips).length;
          
          // Calculate total revenue
          const totalRevenue = Object.values(trips).reduce((sum: number, trip: any) => 
            sum + (parseFloat(trip.fareAmount) || 0), 0
          );

          setStats(prev => ({
            ...prev,
            totalTrips,
            totalRevenue
          }));
        });

      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'cyan'
    },
    {
      title: 'Active Drivers',
      value: stats.activeDrivers,
      icon: Car,
      color: 'green'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Total Trips',
      value: stats.totalTrips.toLocaleString(),
      icon: Route,
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            bg-gray-900/50 p-6 rounded-2xl border border-${stat.color}-500/20
            hover:bg-gray-900/70 transition-colors
          `}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-${stat.color}-500/10 rounded-xl`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}