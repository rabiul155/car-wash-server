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
exports.carServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const service_model_1 = require("./service.model");
const createServicesDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.create(data);
    return result;
});
const getAllServicesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield service_model_1.ServiceModel.find();
    return results;
});
const getServicesDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findById(id);
    return result;
});
const updateServicesDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(404, 'Service not found');
    }
    return result;
});
const deleteServicesDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(404, 'Service not found');
    }
    return result;
});
exports.carServices = {
    createServicesDB,
    getAllServicesDB,
    getServicesDB,
    updateServicesDB,
    deleteServicesDB,
};
