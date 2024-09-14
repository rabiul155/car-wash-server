"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const reviews_controllers_1 = require("./reviews.controllers");
const review_validate_1 = __importDefault(require("./review.validate"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(review_validate_1.default), reviews_controllers_1.reviewController.createReview);
router.route('/').get(reviews_controllers_1.reviewController.getAllReview);
exports.reviewRoutes = router;
