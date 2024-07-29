import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { authenticate, authorization } from '../../middleware/auth';
import { bookingControllers } from './booking.controllers';
import bookingValidationSchema from './booking.validate';

const router = express.Router();

router
  .route('/')
  .get(authenticate, authorization('admin'), bookingControllers.getAllBooking)
  .post(
    authenticate,
    authorization('user'),
    validateRequest(bookingValidationSchema),
    bookingControllers.createBooking,
  );

export const bookingRoutes = router;

export const myBookingRouter = express.Router();

myBookingRouter.get(
  '/',
  authenticate,
  authorization('user'),
  bookingControllers.getMyBooking,
);
