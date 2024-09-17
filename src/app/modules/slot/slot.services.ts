import AppError from '../../error/AppError';
import { carServices } from '../service/service.services';
import { QueryType, SlotType } from './slot.interface';
import SlotModel from './slot.model';
import createTimeSlot from '../../utils/createTimeSlot';

const createSlotDB = async (data: SlotType) => {
  const service = await carServices.getServicesDB(data.service);

  if (!service) {
    throw new AppError(404, 'Service not found');
  }

  // Creating time slot from start to end time
  const slotData = createTimeSlot(data, service.duration);
  if (slotData.length === 0) {
    throw new AppError(
      404,
      'Error creating time slot please check start and end time',
    );
  }
  const result = await SlotModel.create(slotData);
  return result;
};

const getSlotsDB = async (searchQuery: QueryType) => {
  const { date, serviceId } = searchQuery;
  const query: QueryType = {};
  if (date) {
    query.date = date;
  }
  if (serviceId) {
    query.service = serviceId;
  }

  const results = await SlotModel.find(query);

  return results;
};

const getAvailableSlotDB = async (searchQuery: QueryType) => {
  const { date, serviceId } = searchQuery;
  const query: QueryType = {};
  if (date) {
    query.date = date;
  }
  if (serviceId) {
    query.service = serviceId;
  }

  const results = await SlotModel.find({
    $and: [{ isBooked: 'available' }, query],
  });

  return results;
};

export const slotServices = {
  createSlotDB,
  getSlotsDB,
  getAvailableSlotDB,
};
