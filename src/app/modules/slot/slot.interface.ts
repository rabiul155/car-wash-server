import mongoose from 'mongoose';

export type SlotType = {
  service: mongoose.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: 'available' | 'booked' | 'canceled';
};

export interface QueryType {
  date?: string;
  service?: string;
  serviceId?: string;
}
