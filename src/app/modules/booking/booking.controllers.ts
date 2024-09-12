import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { bookingServices } from './booking.services';
import notFoundResponse from '../../utils/notFoundResponse';

const createBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await bookingServices.createBookingDB(req.user._id, req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Booking successfully',
    data,
  });
});

const getAllBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await bookingServices.getAllBookingDB();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'All bookings retrieved successfully',
    data,
  });
});
const getMyBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await bookingServices.getMyBookingDB(req.user._id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User bookings retrieved successfully',
    data,
  });
});
export const bookingControllers = {
  createBooking,
  getAllBooking,
  getMyBooking,
};
