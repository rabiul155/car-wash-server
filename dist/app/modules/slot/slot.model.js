"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const service_model_1 = require("../service/service.model");
// Define the Mongoose schema
const slotSchema = new mongoose_1.default.Schema({
    service: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: service_model_1.ServiceModel,
        required: [true, 'Service id is required.'],
    },
    date: {
        type: String,
        required: [true, 'Date is required.'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required.'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required.'],
    },
    isBooked: {
        type: String,
        required: [true, 'Booking status is required.'],
        enum: ['available', 'booked', 'canceled'],
        default: 'available',
    },
}, {
    timestamps: true,
});
// Create the Mongoose model
const SlotModel = mongoose_1.default.model('Slot', slotSchema);
exports.default = SlotModel;
