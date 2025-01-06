import React, { useState } from 'react';
import { ref, push, query, orderByChild, equalTo, get } from 'firebase/database';
import { database } from '../lib/firebase';
import toast from 'react-hot-toast';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

export function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if email already exists
      const waitlistRef = ref(database, 'waitlist');
      const emailQuery = query(waitlistRef, orderByChild('email'), equalTo(formData.email));
      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        setIsRegistered(true);
        return;
      }

      await push(waitlistRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      toast.success('Successfully joined the waitlist!');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isRegistered) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-cyan-500/20 rounded-full mx-auto flex items-center justify-center"
        >
          <span className="text-4xl">✨</span>
        </motion.div>
        <h3 className="text-2xl font-bold text-cyan-400">You're Already Waitlisted!</h3>
        <p className="text-gray-300">
          We're working tirelessly to bring ZappaRides to you as soon as possible. 
          Thank you for your patience and enthusiasm!
        </p>
        <div className="pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-400"
          >
            We'll notify you at your registered email when we launch.
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <Input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Your Phone Number"
        required
      />
      <Button
        type="submit"
        variant="secondary"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </motion.form>
  );
}