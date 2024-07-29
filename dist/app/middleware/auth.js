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
exports.authorization = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../error/AppError"));
exports.authenticate = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError_1.default(401, 'You are not logged in! Please log in to get access.'));
    }
    // 2) Verification token
    const decoded = (yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET));
    // 3) Check if user still exists
    const currentUser = yield user_model_1.default.findOne({ email: decoded.email });
    if (!currentUser) {
        return next(new AppError_1.default(401, 'The user belonging to this token does no longer exist.'));
    }
    req.user = currentUser;
    next();
}));
// GRANT ACCESS TO PROTECTED ROUTE
const authorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError_1.default(403, 'You have no access to this route'));
        }
        next();
    };
};
exports.authorization = authorization;
