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
exports.slotController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const slot_services_1 = require("./slot.services");
const createSlot = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield slot_services_1.slotServices.createSlotDB(req.body);
    res.status(201).json({
        success: true,
        statusCode: 200,
        message: 'Slots created successfully',
        data,
    });
}));
const getSlots = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const data = yield slot_services_1.slotServices.getSlotsDB(query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Slots retrieved successfully',
        data,
    });
}));
const getAvailableSlot = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const data = yield slot_services_1.slotServices.getAvailableSlotDB(query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Available slots retrieved successfully',
        data,
    });
}));
exports.slotController = {
    createSlot,
    getSlots,
    getAvailableSlot,
};
