import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please fill a valid email address' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z.string(),
  role: z.enum(['admin', 'user']).default('user'),
  address: z.string({ required_error: 'Address is required' }).trim(),
});

export default userValidationSchema;
