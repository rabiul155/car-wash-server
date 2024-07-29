import mongoose from 'mongoose';
import SlotModel from '../slot/slot.model';
import Booking from './booking.model';
import AppError from '../../error/AppError';

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const slot = await SlotModel.findById(data.slotId);

    console.log(data.slotId);

    if (!slot) {
      throw new AppError(400, 'Error creating booking try again slot');
    }

    if (slot && slot?.isBooked === 'booked') {
      throw new AppError(400, 'Slot already booked try new slot');
    }

    // Update the slot and save to DB
    slot.isBooked = 'booked';
    await slot.save();

    const booking = await Booking.create(payload);

    if (!booking) {
      throw new AppError(400, 'Error creating booking try again booking');
    }

    const result = await Booking.findById(booking._id)
      .populate({ path: 'customer' })
      .populate({ path: 'service' })
      .populate({ path: 'slot' });

    if (!result) {
      throw new AppError(400, 'Error creating booking try again result');
    }

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const getAllBookingDB = async () => {
  const results = await Booking.find()
    .populate({ path: 'customer' })
    .populate({ path: 'service' })
    .populate({ path: 'slot' });
  return results;
};
const getMyBookingDB = async (customerId: string) => {
  const results = await Booking.find({ customer: customerId })
    .populate({ path: 'customer' })
    .populate({ path: 'service' })
    .populate({ path: 'slot' });
  return results;
};

export const bookingServices = {
  createBookingDB,
  getAllBookingDB,
  getMyBookingDB,
};
