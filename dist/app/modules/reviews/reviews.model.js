"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
    },
}, { timestamps: true });
const Reviews = mongoose_1.default.model('Review', userSchema);
exports.default = Reviews;
