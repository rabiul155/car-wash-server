"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    serviceId: zod_1.z.string({ required_error: 'ServiceId must be a valid ObjectId' }),
    slotId: zod_1.z.string({ required_error: 'SlotId must be a valid ObjectId' }),
    vehicleType: zod_1.z.enum([
        'car',
        'truck',
        'SUV',
        'van',
        'motorcycle',
        'bus',
        'electricVehicle',
        'hybridVehicle',
        'bicycle',
    ], { message: 'Vehicle type is not valid' }),
    vehicleBrand: zod_1.z.string({ required_error: 'Vehicle brand is required' }),
    vehicleModel: zod_1.z.string({ required_error: 'Vehicle model is required' }),
    manufacturingYear: zod_1.z.number({
        required_error: 'Manufacturing year is required',
    }),
    registrationPlate: zod_1.z.string({
        required_error: 'Registration plate is required',
    }),
});
exports.default = bookingValidationSchema;
