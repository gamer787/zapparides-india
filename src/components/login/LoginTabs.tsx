import { Shield, Headphones, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginTabsProps {
  selectedRole: 'admin' | 'support' | 'employee';
  onRoleSelect: (role: 'admin' | 'support' | 'employee') => void;
}

export function LoginTabs({ selectedRole, onRoleSelect }: LoginTabsProps) {
  const tabs = [
    { role: 'admin' as const, label: 'Admin Login', icon: Shield },
    { role: 'support' as const, label: 'Support Login', icon: Headphones },
    { role: 'employee' as const, label: 'Employee Login', icon: Users },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {tabs.map(({ role, label, icon: Icon }) => (
        <motion.button
          key={role}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRoleSelect(role)}
          className={`
            p-4 rounded-xl flex flex-col items-center justify-center gap-2
            transition-colors duration-200
            ${selectedRole === role 
              ? 'bg-cyan-500/20 border-2 border-cyan-500' 
              : 'bg-gray-800/50 hover:bg-gray-800/70'
            }
          `}
        >
          <Icon className={`w-6 h-6 ${selectedRole === role ? 'text-cyan-400' : 'text-gray-400'}`} />
          <span className={`text-sm ${selectedRole === role ? 'text-cyan-400' : 'text-gray-400'}`}>
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}