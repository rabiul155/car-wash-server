"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const serviceValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Service name is required.' }),
    category: zod_1.z.string({ required_error: 'Service category is required.' }),
    image: zod_1.z.string({ required_error: 'Service image is required.' }),
    description: zod_1.z.string({ required_error: 'Service description is required.' }),
    price: zod_1.z
        .number({ required_error: 'Price is required' })
        .min(0, 'Service price must be a positive number.'),
    duration: zod_1.z
        .number({ required_error: 'Duration is required' })
        .min(0, 'Service duration must be a positive number.'),
});
exports.default = serviceValidationSchema;
