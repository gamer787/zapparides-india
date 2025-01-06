export interface CarDetails {
  carColor: string;
  carModel: string;
  carNumber: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  blockStatus: boolean;
  car_details: CarDetails;
  earnings: number;
  license_number: string;
  state: string;
  vehicle_type: string;
  photo_url?: string;
}