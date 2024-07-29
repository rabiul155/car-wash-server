"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myBookingRouter = exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const auth_1 = require("../../middleware/auth");
const booking_controllers_1 = require("./booking.controllers");
const booking_validate_1 = __importDefault(require("./booking.validate"));
const router = express_1.default.Router();
router
    .route('/')
    .get(auth_1.authenticate, (0, auth_1.authorization)('admin'), booking_controllers_1.bookingControllers.getAllBooking)
    .post(auth_1.authenticate, (0, auth_1.authorization)('user'), (0, validateRequest_1.default)(booking_validate_1.default), booking_controllers_1.bookingControllers.createBooking);
exports.bookingRoutes = router;
exports.myBookingRouter = express_1.default.Router();
exports.myBookingRouter.get('/', auth_1.authenticate, (0, auth_1.authorization)('user'), booking_controllers_1.bookingControllers.getMyBooking);
