"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }).trim(),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Please fill a valid email address' })
        .trim(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters long' }),
    phone: zod_1.z.string(),
    role: zod_1.z.enum(['admin', 'user']).default('user'),
    address: zod_1.z.string({ required_error: 'Address is required' }).trim(),
});
exports.default = userValidationSchema;
