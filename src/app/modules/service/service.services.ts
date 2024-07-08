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
const getServicesDB = async (id: string) => {
  const results = await ServiceModel.findById(id);
  return results;
};
const updateServicesDB = async (id: string, data: Partial<ServiceType>) => {
  const result = await ServiceModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteServicesDB = async (id: string) => {
  const result = await ServiceModel.findByIdAndDelete(id);
  return result;
};

export const carServices = {
  createServicesDB,
  getAllServicesDB,
  getServicesDB,
  updateServicesDB,
  deleteServicesDB,
};
