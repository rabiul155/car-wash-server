import { z } from 'zod';

const reviewValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim(),
  rating: z.number({ required_error: 'Rating is required' }),
  message: z.string({ required_error: 'Message is required' }).trim(),
});

export default reviewValidationSchema;
