import AppError from '../../error/AppError';
import { ServiceType } from '../service/service.interface';
import { carServices } from '../service/service.services';
import { SlotType } from './slot.interface';
import SlotModel from './slot.model';

function timeStringToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function timeNumberToString(timeNum: number) {
  const hour = String(timeNum / 60).padStart(2, '0');
  const min = String(timeNum % 60).padStart(2, '0');
  const time = `${hour}:${min}`;
  return time;
}

const createTimeSlot = (data: SlotType, duration: number) => {
  const slots: SlotType[] = [];
  const startTime = timeStringToMinutes(data.startTime);
  const endTime = timeStringToMinutes(data.startTime);
  const slot = (endTime - startTime) / duration;

  for (let i = 0; i < slot; i++) {
    const payload = { ...data };
    payload.startTime = timeNumberToString(startTime + i * duration);
    payload.endTime = timeNumberToString(startTime + i * duration + duration);
    slots.push(payload);
  }

  return slots;
};

const createSlotDB = async (data: SlotType) => {
  const serviceId = data.service;

  const service: ServiceType = await carServices.getServicesDB(serviceId);

  if (!service) {
    throw new AppError(404, 'Service not found');
  }

  // Creating time slot from start to end time
  const slotData = createTimeSlot(data, service.duration);
  console.log(slotData);

  // const result = await SlotModel.create(slotData);
  // return result;
};

export const slotServices = {
  createSlotDB,
};
