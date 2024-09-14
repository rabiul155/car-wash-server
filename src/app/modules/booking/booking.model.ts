import mongoose from 'mongoose';
import { BookingType } from './booking.interface';
import { boolean } from 'zod';

// Define the schema
const BookingSchema = new mongoose.Schema<BookingType>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'UserId is required'],
      ref: 'User',
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'ServiceId is required'],
      ref: 'Service',
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'SlotId is required'],
      ref: 'Slot',
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      enum: {
        values: [
          'car',
          'truck',
          'SUV',
          'van',
          'motorcycle',
          'bus',
          'electricVehicle',
          'hybridVehicle',
          'bicycle',
        ],
        message: 'Vehicle type is not valid',
      },
    },
    vehicleBrand: {
      type: String,
      required: [true, 'Vehicle brand is required'],
    },
    vehicleModel: {
      type: String,
      required: [true, 'Vehicle model is required'],
    },
    manufacturingYear: {
      type: Number,
      required: [true, 'Manufacturing year is required'],
    },
    registrationPlate: {
      type: String,
      required: [true, 'Registration plate is required'],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const Booking = mongoose.model<BookingType>('Booking', BookingSchema);
export default Booking;
