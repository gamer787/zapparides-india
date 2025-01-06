import { motion } from 'framer-motion';
import { Ban, CheckCircle } from 'lucide-react';

interface UserListProps {
  users: any[];
  loading: boolean;
  onToggleBlock: (userId: string, currentStatus: boolean) => void;
}

export function UserList({ users, loading, onToggleBlock }: UserListProps) {
  if (loading) {
    return <div className="text-gray-400">Loading users...</div>;
  }

  if (users.length === 0) {
    return <div className="text-gray-400">No users found</div>;
  }

  return (
    <div className="space-y-4">
      {users.map(user => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 p-4 rounded-xl flex items-center justify-between"
        >
          <div>
            <h3 className="font-medium text-white">{user.name || 'Unnamed User'}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleBlock(user.id, user.blocked)}
            className={`
              p-2 rounded-lg flex items-center gap-2
              ${user.blocked 
                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
              }
            `}
          >
            {user.blocked ? (
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
        </motion.div>
      ))}
    </div>
  );
}