import mongoose from 'mongoose';
import SlotModel from '../slot/slot.model';
import Booking from './booking.model';
import AppError from '../../error/AppError';
import { BookingType } from './booking.interface';

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

    if (!slot) {
      throw new AppError(400, 'Error creating booking try again slot');
    }

    if (slot && slot?.isBooked === 'booked') {
      throw new AppError(400, 'Slot already booked try new slot');
    }

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

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const updateBooking = async (bookingId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking: BookingType | null = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      { isConfirmed: true },
      { new: true },
    );

    if (!booking) {
      throw new AppError(400, 'Error updating booking try again slot');
    }

    const result = await SlotModel.findByIdAndUpdate(
      { _id: booking.slot },
      { isBooked: 'booked' },
      { new: true },
    );

    if (!result) {
      throw new AppError(400, 'Error updating booking try again slot');
    }

    await session.commitTransaction();
    await session.endSession();

    return booking;
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
  updateBooking,
};
