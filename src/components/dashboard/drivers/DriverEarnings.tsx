import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { GSTCalculator } from '../gst/GSTCalculator';
import { DriverGSTNotifications } from '../gst/DriverGSTNotifications';

export function DriverEarnings() {
  return (
    <div className="space-y-8">
      <GSTCalculator />
      <DriverGSTNotifications />
    </div>
  );
}