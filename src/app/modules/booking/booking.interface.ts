import mongoose from 'mongoose';

export type BookingType = {
  customer?: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  slot: mongoose.Types.ObjectId;
  vehicleType:
    | 'car'
    | 'truck'
    | 'SUV'
    | 'van'
    | 'motorcycle'
    | 'bus'
    | 'electricVehicle'
    | 'hybridVehicle'
    | 'bicycle';
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  isConfirmed?: false;
};
