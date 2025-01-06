import { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { Bell, Copy } from 'lucide-react';
import { Button } from '../../ui/Button';
import { formatGSTAmount } from '../../../utils/gst';
import toast from 'react-hot-toast';

interface DriverGST {
  id: string;
  name: string;
  earnings: number;
  gstToBePaid: number;
}

export function DriverGSTNotifications() {
  const [drivers, setDrivers] = useState<DriverGST[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const driversRef = ref(database, 'drivers');
    
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setLoading(false);
        return;
      }

      const driversList = Object.entries(data)
        .map(([id, driver]: [string, any]) => ({
          id,
          name: driver.name || 'Unknown Driver',
          earnings: driver.earnings || 0,
          gstToBePaid: driver.gstToBePaid || 0
        }))
        .filter(driver => driver.gstToBePaid > 0);

      setDrivers(driversList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendNotification = async (driverId: string, driverName: string, amount: number) => {
    try {
      const notificationsRef = ref(database, `notifications/${driverId}`);
      await push(notificationsRef, {
        type: 'GST_REMINDER',
        message: `Please pay your pending GST amount of ${formatGSTAmount(amount)}`,
        timestamp: new Date().toISOString(),
        read: false
      });
      
      toast.success(`Notification sent to ${driverName}`);
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send notification');
    }
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Driver ID copied to clipboard');
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading GST data...</div>;
  }

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Driver GST Payments</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">Driver ID</th>
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">Driver Name</th>
              <th className="text-right py-4 px-4 text-cyan-400 font-medium">Total Earnings</th>
              <th className="text-right py-4 px-4 text-cyan-400 font-medium">GST Due</th>
              <th className="text-right py-4 px-4 text-cyan-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No pending GST payments
                </td>
              </tr>
            ) : (
              drivers.map(driver => (
                <tr key={driver.id} className="border-b border-gray-800">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-mono">
                        {driver.id.slice(0, 8)}...
                      </span>
                      <button
                        onClick={() => copyId(driver.id)}
                        className="p-1 hover:bg-gray-800 rounded"
                      >
                        <Copy className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{driver.name}</td>
                  <td className="py-4 px-4 text-right text-cyan-400">
                    {formatGSTAmount(driver.earnings)}
                  </td>
                  <td className="py-4 px-4 text-right text-red-400">
                    {formatGSTAmount(driver.gstToBePaid)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      variant="outline"
                      onClick={() => sendNotification(driver.id, driver.name, driver.gstToBePaid)}
                      className="inline-flex items-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Send Reminder
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}