"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const slotValidationSchema = zod_1.z.object({
    service: zod_1.z.string({ required_error: 'Service is required.' }),
    date: zod_1.z.string({ required_error: 'Date is required.' }),
    startTime: zod_1.z.string({ required_error: 'Date is required.' }),
    endTime: zod_1.z.string({ required_error: 'Date is required.' }),
    isBooked: zod_1.z
        .enum(['available', 'booked', 'canceled'], {
        required_error: 'Booking status is required.',
    })
        .optional(),
});
exports.default = slotValidationSchema;
