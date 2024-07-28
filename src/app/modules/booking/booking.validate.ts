import { z } from 'zod';

const bookingValidationSchema = z.object({
  serviceId: z.string({ required_error: 'ServiceId must be a valid ObjectId' }),
  slotId: z.string({ required_error: 'SlotId must be a valid ObjectId' }),
  vehicleType: z.enum(
    [
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
    { message: 'Vehicle type is not valid' },
  ),
  vehicleBrand: z.string({ required_error: 'Vehicle brand is required' }),
  vehicleModel: z.string({ required_error: 'Vehicle model is required' }),
  manufacturingYear: z.number({
    required_error: 'Manufacturing year is required',
  }),
  registrationPlate: z.string({
    required_error: 'Registration plate is required',
  }),
});

export default bookingValidationSchema;
