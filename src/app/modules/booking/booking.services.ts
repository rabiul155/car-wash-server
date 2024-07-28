import { BookingType } from './booking.interface';
import Booking from './booking.model';

const createBookingDB = async (userId: string, data: any) => {
  const payload = {
    customer: userId,
    service: data.serviceId,
    slot: data.slotId,
    vehicleType: data.vehicleType,
    vehicleBrand: data.vehicleBrand,
    vehicleModel: data.vehicleModel,
    manufacturingYear: data.manufacturingYear,
    registrationPlate: data.registrationPlate,
  };
  console.log(payload);
  const result = await Booking.create(payload);
  return result;
};

export const bookingServices = {
  createBookingDB,
};
