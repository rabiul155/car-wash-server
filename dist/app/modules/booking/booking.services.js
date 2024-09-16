"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const createBookingDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        customer: userId,
        service: data.serviceId,
        slot: data.slotId,
        vehicleType: data.vehicleType,
        vehicleBrand: data.vehicleBrand,
        vehicleModel: data.vehicleModel,
        manufacturingYear: data.manufacturingYear,
        registrationPlate: data.registrationPlate,
    };
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const slot = yield slot_model_1.default.findById(data.slotId);
        if (!slot) {
            throw new AppError_1.default(400, 'Error creating booking try again slot');
        }
        if (slot && (slot === null || slot === void 0 ? void 0 : slot.isBooked) === 'booked') {
            throw new AppError_1.default(400, 'Slot already booked try new slot');
        }
        const booking = yield booking_model_1.default.create(payload);
        if (!booking) {
            throw new AppError_1.default(400, 'Error creating booking try again booking');
        }
        const result = yield booking_model_1.default.findById(booking._id)
            .populate({ path: 'customer' })
            .populate({ path: 'service' })
            .populate({ path: 'slot' });
        if (!result) {
            throw new AppError_1.default(400, 'Error creating booking try again result');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const updateBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const booking = yield booking_model_1.default.findByIdAndUpdate({ _id: bookingId }, { isConfirmed: true }, { new: true });
        if (!booking) {
            throw new AppError_1.default(400, 'Error updating booking try again slot');
        }
        const result = yield slot_model_1.default.findByIdAndUpdate({ _id: booking.slot }, { isBooked: 'booked' }, { new: true });
        if (!result) {
            throw new AppError_1.default(400, 'Error updating booking try again slot');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return booking;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const getAllBookingDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield booking_model_1.default.find()
        .populate({ path: 'customer' })
        .populate({ path: 'service' })
        .populate({ path: 'slot' });
    return results;
});
const getMyBookingDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield booking_model_1.default.find({ customer: customerId })
        .populate({ path: 'customer' })
        .populate({ path: 'service' })
        .populate({ path: 'slot' });
    return results;
});
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield booking_model_1.default.findOneAndDelete({ _id: bookingId });
    return null;
});
exports.bookingServices = {
    createBookingDB,
    getAllBookingDB,
    getMyBookingDB,
    updateBooking,
    deleteBooking,
};
