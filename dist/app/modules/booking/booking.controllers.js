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
exports.bookingControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_services_1 = require("./booking.services");
const createBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield booking_services_1.bookingServices.createBookingDB(req.user._id, req.body);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Booking successfully',
        data,
    });
}));
const getAllBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield booking_services_1.bookingServices.getAllBookingDB();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'All bookings retrieved successfully',
        data,
    });
}));
const getMyBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield booking_services_1.bookingServices.getMyBookingDB(req.user._id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User bookings retrieved successfully',
        data,
    });
}));
const updateBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield booking_services_1.bookingServices.updateBooking(req.query.id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User bookings updated successfully',
        data,
    });
}));
exports.bookingControllers = {
    createBooking,
    getAllBooking,
    getMyBooking,
    updateBooking,
};
