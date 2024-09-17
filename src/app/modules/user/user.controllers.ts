import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import userServices from './user.services';
import notFoundResponse from '../../utils/notFoundResponse';

const getUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await userServices.getUserDB();
  if (!data || data.length === 0) {
    return notFoundResponse(res);
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User fetched successfully',
    data,
  });
});

const updateRole: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await userServices.updateRoleDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User role update successfully',
    data,
  });
});

const userControllers = {
  getUsers,
  updateRole,
};

export default userControllers;
