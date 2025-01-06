import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../lib/firebase';
import { motion } from 'framer-motion';
import { Ban, CheckCircle, Search, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  blockStatus: boolean;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(database, 'Users');
    
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersList = Object.entries(data).map(([id, userData]: [string, any]) => ({
          id,
          name: userData.name || 'Unknown',
          email: userData.email || '',
          phone: userData.phone || '',
          blockStatus: userData.blockStatus || false
        }));
        setUsers(usersList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleBlock = async (userId: string, currentStatus: boolean) => {
    try {
      const updates: { [key: string]: any } = {};
      updates[`Users/${userId}/blockStatus`] = !currentStatus;
      
      await update(ref(database), updates);
      
      toast.success(`User ${!currentStatus ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('ID copied to clipboard');
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">User Management</h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name, email, phone, or ID..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">User ID</th>
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">Name</th>
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">Email</th>
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">Phone</th>
              <th className="text-left py-4 px-4 text-cyan-400 font-medium">Status</th>
              <th className="text-right py-4 px-4 text-cyan-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-800"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm font-mono">
                        {user.id.slice(0, 8)}...
                      </span>
                      <button
                        onClick={() => copyToClipboard(user.id)}
                        className="p-1 hover:bg-gray-800 rounded"
                      >
                        <Copy className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{user.name}</td>
                  <td className="py-4 px-4 text-gray-400">{user.email}</td>
                  <td className="py-4 px-4 text-gray-400">{user.phone}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      user.blockStatus 
                        ? 'bg-red-500/10 text-red-400' 
                        : 'bg-green-500/10 text-green-400'
                    }`}>
                      {user.blockStatus ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggleBlock(user.id, user.blockStatus)}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        ${user.blockStatus 
                          ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                          : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                        }
                      `}
                    >
                      {user.blockStatus ? (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}