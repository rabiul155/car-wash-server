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
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const signUpUserDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(userData);
    // Remove password and __v before sending user data to client
    user.password = '';
    user.__v = undefined;
    return user;
});
const logInUserDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    if (!email || !password) {
        throw new AppError_1.default(400, 'Invalid email or password');
    }
    const user = yield user_model_1.default.findOne({ email }).select('+password');
    if (!user) {
        throw new AppError_1.default(401, 'Invalid email or password');
    }
    const isValid = yield user.validatePassword(password, user.password);
    if (!isValid) {
        throw new AppError_1.default(401, 'Invalid email or password');
    }
    // Remove password and __v before sending user data to client
    user.password = '';
    user.__v = undefined;
    return user;
});
const updateRoleDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate({ _id: data._id }, { role: data.role }, { new: true });
    return user;
});
const updateUserDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        name: data.user.name,
        phone: data.user.phone,
        address: data.user.address,
    };
    const result = yield user_model_1.default.findByIdAndUpdate({ _id: data._id }, payload, {
        new: true,
    });
    return result;
});
const authServices = {
    signUpUserDB,
    logInUserDB,
    updateRoleDB,
    updateUserDB,
};
exports.default = authServices;
