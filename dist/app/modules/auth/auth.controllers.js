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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_services_1 = __importDefault(require("./auth.services"));
const createToken_1 = __importDefault(require("../../utils/createToken"));
const singUpUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_services_1.default.signUpUserDB(req.body);
    const token = (0, createToken_1.default)(data.email);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data,
        token,
    });
}));
const logInUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_services_1.default.logInUserDB(req.body);
    const token = (0, createToken_1.default)(data.email);
    req.user = data;
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User logged in successfully',
        token,
        data,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_services_1.default.updateUserDB({
        _id: req.params.id,
        user: req.body,
    });
    const token = (0, createToken_1.default)(data.email);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User update successfully',
        data,
        token,
    });
}));
const updateRole = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_services_1.default.updateRoleDB(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User role update successfully',
        data,
    });
}));
const authControllers = {
    singUpUser,
    logInUser,
    updateRole,
    updateUser,
};
exports.default = authControllers;
