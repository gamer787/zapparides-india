import { Driver, GSTCalculation } from '../types/gst';

export const GST_RATE = 0.05; // 5% GST

export function calculateDriverGST(driver: Driver): GSTCalculation {
  const gstAmount = driver.earnings * GST_RATE;
  
  return {
    driverId: driver.id,
    driverName: driver.name,
    earnings: driver.earnings,
    gstAmount,
    timestamp: new Date().toISOString()
  };
}

export function formatGSTAmount(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}