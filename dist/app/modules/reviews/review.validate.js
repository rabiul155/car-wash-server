"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }).trim(),
    rating: zod_1.z.number({ required_error: 'Rating is required' }),
    message: zod_1.z.string({ required_error: 'Message is required' }).trim(),
});
exports.default = reviewValidationSchema;
