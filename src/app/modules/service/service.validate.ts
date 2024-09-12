import { z } from 'zod';

const serviceValidationSchema = z.object({
  name: z.string({ required_error: 'Service name is required.' }),
  category: z.string({ required_error: 'Service category is required.' }),
  image: z.string({ required_error: 'Service image is required.' }),
  description: z.string({ required_error: 'Service description is required.' }),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, 'Service price must be a positive number.'),
  duration: z
    .number({ required_error: 'Duration is required' })
    .min(0, 'Service duration must be a positive number.'),
});

export default serviceValidationSchema;
