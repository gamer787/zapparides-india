export interface Trip {
  id: string;
  userName: string;
  driverName: string;
  carDetails: {
    model: string;
    number: string;
    color: string;
  };
  fareAmount: number;
  pickUpAddress: string;
  dropOffAddress: string;
  pickUpLatLng: {
    latitude: number;
    longitude: number;
  };
  dropOffLatLng: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
  status: 'completed' | 'cancelled' | 'ongoing';
}