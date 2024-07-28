import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import userServices from './user.services';

const getUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await userServices.getUserDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User fetched successfully',
    data,
  });
});

const userControllers = {
  getUsers,
};

export default userControllers;
