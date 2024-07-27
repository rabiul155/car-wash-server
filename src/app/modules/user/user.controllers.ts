import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.services';

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await userServices.createUserDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 200,
    message: 'User created successfully',
    data,
  });
});

const getUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await userServices.getUserDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User fetched successfully',
    data,
  });
});

export const userControllers = {
  createUser,
  getUsers,
};
