import mongoose from 'mongoose';
import { ServiceType } from './service.interface';
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required.'],
  },
  description: {
    type: String,
    required: [true, 'Service description is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Service price is required.'],
    min: [0, 'Service price must be a positive number.'],
  },
  duration: {
    type: Number,
    required: [true, 'Service duration is required.'],
    min: [0, 'Service duration must be a positive number.'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const ServiceModel = mongoose.model<ServiceType>(
  'Service',
  serviceSchema,
);
