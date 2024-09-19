import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { slotServices } from './slot.services';

const createSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await slotServices.createSlotDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Slots created successfully',
    data,
  });
});
const updateSlot: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await slotServices.updateSlotDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Slots updated successfully',
    data,
  });
});

const getSlots: RequestHandler = catchAsync(async (req, res, next) => {
  const query = req.query;
  const data = await slotServices.getSlotsDB(query);
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
  updateSlot,
  getAvailableSlot,
};
