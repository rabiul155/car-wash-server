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
exports.serviceControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_services_1 = require("./service.services");
const notFoundResponse_1 = __importDefault(require("../../utils/notFoundResponse"));
const createService = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_services_1.carServices.createServicesDB(req.body);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Service created successfully',
        data,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const data = yield service_services_1.carServices.getAllServicesDB(req.query);
    if (!data || data.length === 0) {
        return (0, notFoundResponse_1.default)(res);
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Service retrieved successfully',
        data,
    });
}));
const getServices = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_services_1.carServices.getServicesDB(req.params.id);
    if (!data) {
        return (0, notFoundResponse_1.default)(res);
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Service retrieved successfully',
        data,
    });
}));
const updateServices = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_services_1.carServices.updateServicesDB(req.params.id, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Service updated successfully',
        data,
    });
}));
const deleteServices = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service_services_1.carServices.deleteServicesDB(req.params.id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Service deleted successfully',
        data,
    });
}));
exports.serviceControllers = {
    createService,
    getAllServices,
    getServices,
    updateServices,
    deleteServices,
};
