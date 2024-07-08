import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import { ServiceType } from './service.interface';
import { ServiceModel } from './service.model';

const createServicesDB = async (data: ServiceType) => {
  const result = await ServiceModel.create(data);
  return result;
};

const getAllServicesDB = async () => {
  const results = await ServiceModel.find();
  return results;
};

const getServicesDB = async (id: string | mongoose.Types.ObjectId) => {
  const result = await ServiceModel.findById(id);
  if (!result) {
    throw new AppError(404, 'Service not found');
  }
  return result;
};

const updateServicesDB = async (id: string, data: Partial<ServiceType>) => {
  const result = await ServiceModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(404, 'Service not found');
  }
  return result;
};

const deleteServicesDB = async (id: string) => {
  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(404, 'Service not found');
  }
  return result;
};

export const carServices = {
  createServicesDB,
  getAllServicesDB,
  getServicesDB,
  updateServicesDB,
  deleteServicesDB,
};
