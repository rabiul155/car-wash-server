"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../error/AppError"));
const notFoundRoute = (req, res, next) => {
    next(new AppError_1.default(404, `Cannot find this route ${req.originalUrl} on this server`));
};
exports.default = notFoundRoute;
