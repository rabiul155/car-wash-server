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
  )
  .patch(authenticate, bookingControllers.updateBooking);

router.get(
  '/my-booking',
  authenticate,
  authorization('user'),
  bookingControllers.getMyBooking,
);

export const bookingRoutes = router;
