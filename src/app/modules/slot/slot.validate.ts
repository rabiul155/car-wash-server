import { z } from 'zod';

const slotValidationSchema = z.object({
  service: z.string({ required_error: 'Service is required.' }),
  date: z.string({ required_error: 'Date is required.' }),
  startTime: z.string({ required_error: 'Date is required.' }),
  endTime: z.string({ required_error: 'Date is required.' }),
  isBooked: z
    .enum(['available', 'booked', 'canceled'], {
      required_error: 'Booking status is required.',
    })
    .optional(),
});

export default slotValidationSchema;
