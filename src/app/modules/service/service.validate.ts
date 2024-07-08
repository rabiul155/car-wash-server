import { z } from 'zod';

const serviceValidationSchema = z.object({
  name: z.string({ required_error: 'Service name is required.' }),
  description: z.string({ required_error: 'Service description is required.' }),
  price: z.number().min(0, 'Service price must be a positive number.'),
  duration: z.number().min(0, 'Service duration must be a positive number.'),
});

export default serviceValidationSchema;
