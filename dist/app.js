"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//route import
const notFoundRoute_1 = __importDefault(require("./app/middleware/notFoundRoute"));
const globalErrorHandler_1 = __importDefault(require("./app/error/globalErrorHandler"));
const service_routes_1 = require("./app/modules/service/service.routes");
const booking_routes_1 = require("./app/modules/booking/booking.routes");
const user_routes_1 = require("./app/modules/user/user.routes");
const slot_routes_1 = require("./app/modules/slot/slot.routes");
const reviews_routers_1 = require("./app/modules/reviews/reviews.routers");
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Testing route
app.get('/', (req, res) => {
    res.send('Hello from server');
});
// Route
app.use('/api/services', service_routes_1.serviceRoutes);
app.use('/api/bookings', booking_routes_1.bookingRoutes);
app.use('/api/slots', slot_routes_1.slotRoutes);
app.use('/api/auth', user_routes_1.userRoutes);
app.use('/api/reviews', reviews_routers_1.reviewRoutes);
app.use('/api/my-bookings', booking_routes_1.myBookingRouter);
//Not found route handle
app.all('*', notFoundRoute_1.default);
//Global error handling
app.use(globalErrorHandler_1.default);
exports.default = app;
