import { motion } from 'framer-motion';
import { X, Home, Users, Car, Calculator, History, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: Car, label: 'Drivers', path: '/dashboard/drivers' },
    { icon: Calculator, label: 'GST Calculator', path: '/dashboard/gst' },
    { icon: History, label: 'Trips History', path: '/dashboard/trips' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
  ];

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: open ? 0 : -280 }}
      className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900/50 border-r border-cyan-500/20 backdrop-blur-sm z-50"
    >
      <div className="p-4 flex items-center justify-between border-b border-cyan-500/20">
        <h1 className="text-xl font-bold text-cyan-400">Admin Dashboard</h1>
        <button
          onClick={onClose}
          className="p-2 hover:bg-cyan-500/10 rounded-lg"
        >
          <X className="w-5 h-5 text-cyan-400" />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
              ${location.pathname === item.path
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-400 hover:bg-gray-800/50'
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}