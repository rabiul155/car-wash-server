import mongoose, { Document, Mongoose, Schema } from 'mongoose';
import { SlotType } from './slot.interface';

// Define the Mongoose schema
const slotSchema = new mongoose.Schema<SlotType>({
  service: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Service id is required.'],
  },
  date: {
    type: String,
    required: [true, 'Date is required.'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required.'],
  },
  endTime: {
    type: String,
    required: [true, 'End time is required.'],
  },
  isBooked: {
    type: String,
    required: [true, 'Booking status is required.'],
    enum: ['available', 'booked', 'canceled'],
    default: 'available',
  },
});

// Create the Mongoose model
const SlotModel = mongoose.model<SlotType>('Slot', slotSchema);

export default SlotModel;
