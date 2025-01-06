import { DriverData, TripData } from '../types/gst';

export function logDatabaseError(path: string, error: any) {
  console.error(`Error fetching data from ${path}:`, error);
}

export function validateDriverData(data: any): data is Record<string, DriverData> {
  if (!data) {
    console.warn('No driver data found');
    return false;
  }
  
  if (typeof data !== 'object' || Object.keys(data).length === 0) {
    console.warn('Invalid driver data structure');
    return false;
  }

  return true;
}

export function validateTripData(data: any): data is Record<string, TripData> {
  if (!data) {
    console.warn('No trip data found');
    return false;
  }

  if (typeof data !== 'object' || Object.keys(data).length === 0) {
    console.warn('Invalid trip data structure');
    return false;
  }

  return true;
}

export function processDriverEarnings(driversData: Record<string, DriverData>, tripsData: Record<string, TripData>) {
  const earnings: Record<string, any> = {};

  // Initialize earnings with driver information
  Object.entries(driversData).forEach(([driverId, driver]) => {
    earnings[driverId] = {
      driverId,
      driverName: driver.name || 'Unknown Driver',
      totalEarnings: 0,
      totalGST: 0,
      trips: []
    };
  });

  // Process completed trips
  Object.entries(tripsData).forEach(([tripId, trip]) => {
    if (trip.status === 'completed' && trip.driverId && earnings[trip.driverId]) {
      const fareAmount = parseFloat(trip.fareAmount.toString()) || 0;
      const gstAmount = fareAmount * GST_RATE;

      earnings[trip.driverId].trips.push({
        tripId,
        fareAmount,
        gstAmount,
        timestamp: trip.timestamp || new Date().toISOString()
      });

      earnings[trip.driverId].totalEarnings += fareAmount;
      earnings[trip.driverId].totalGST += gstAmount;
    }
  });

  return Object.values(earnings);
}