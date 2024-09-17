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
exports.slotServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const service_services_1 = require("../service/service.services");
const slot_model_1 = __importDefault(require("./slot.model"));
const createTimeSlot_1 = __importDefault(require("../../utils/createTimeSlot"));
const createSlotDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_services_1.carServices.getServicesDB(data.service);
    if (!service) {
        throw new AppError_1.default(404, 'Service not found');
    }
    // Creating time slot from start to end time
    const slotData = (0, createTimeSlot_1.default)(data, service.duration);
    if (slotData.length === 0) {
        throw new AppError_1.default(404, 'Error creating time slot please check start and end time');
    }
    const result = yield slot_model_1.default.create(slotData);
    return result;
});
const getSlotsDB = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId } = searchQuery;
    const query = {};
    if (date) {
        query.date = date;
    }
    if (serviceId) {
        query.service = serviceId;
    }
    const results = yield slot_model_1.default.find(query).populate({
        path: 'service',
    });
    return results;
});
const getAvailableSlotDB = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId } = searchQuery;
    const query = {};
    if (date) {
        query.date = date;
    }
    if (serviceId) {
        query.service = serviceId;
    }
    const results = yield slot_model_1.default.find({
        $and: [{ isBooked: 'available' }, query],
    }).populate({
        path: 'service',
    });
    return results;
});
exports.slotServices = {
    createSlotDB,
    getSlotsDB,
    getAvailableSlotDB,
};
