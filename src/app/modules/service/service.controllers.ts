import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { carServices } from './service.services';
import notFoundResponse from '../../utils/notFoundResponse';

const createService: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await carServices.createServicesDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Service created successfully',
    data,
  });
});

const getAllServices: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await carServices.getAllServicesDB(
    req.query as Record<string, string> | {},
  );
  if (!data || data.length === 0) {
    return notFoundResponse(res);
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service retrieved successfully',
    data,
  });
});
const getServices: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await carServices.getServicesDB(req.params.id);
  if (!data) {
    return notFoundResponse(res);
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service retrieved successfully',
    data,
  });
});

const updateServices: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await carServices.updateServicesDB(req.params.id, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service updated successfully',
    data,
  });
});

const deleteServices: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await carServices.deleteServicesDB(req.params.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service deleted successfully',
    data,
  });
});

export const serviceControllers = {
  createService,
  getAllServices,
  getServices,
  updateServices,
  deleteServices,
};
