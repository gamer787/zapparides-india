export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  earnings: number;
  gstToBePaid?: number;
}

export interface GSTCalculation {
  driverId: string;
  driverName: string;
  earnings: number;
  gstAmount: number;
  timestamp: string;
}

export interface TripData {
  driverId: string;
  fareAmount: number | string;
  status: string;
  timestamp: string;
  userName?: string;
  pickupLocation?: {
    address: string;
  };
  dropLocation?: {
    address: string;
  };
}

export interface DriverData {
  name: string;
  earnings: number;
  gstToBePaid?: number;
}