import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { bookingServices } from './booking.services';

const createBooking: RequestHandler = catchAsync(async (req, res, next) => {
  let data = await bookingServices.createBookingDB(req.user._id, req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Booking created successfully',
    data,
  });
});

export const bookingControllers = {
  createBooking,
};
