import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { slotServices } from './slot.services';
import notFoundResponse from '../../utils/notFoundResponse';

const createSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await slotServices.createSlotDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 200,
    message: 'Slots created successfully',
    data,
  });
});

const getSlots: RequestHandler = catchAsync(async (req, res, next) => {
  const query = req.query;
  const data = await slotServices.getSlotsDB(query);
  if (!data || data.length === 0) {
    return notFoundResponse(res);
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Slots retrieved successfully',
    data,
  });
});

const getAvailableSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const query = req.query;
  const data = await slotServices.getAvailableSlotDB(query);
  if (!data || data.length === 0) {
    return notFoundResponse(res);
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Available slots retrieved successfully',
    data,
  });
});

export const slotController = {
  createSlot,
  getSlots,
  getAvailableSlot,
};
