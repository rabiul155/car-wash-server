import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import authServices from './auth.services';
import createToken from '../../utils/createToken';

const singUpUser: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await authServices.signUpUserDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data,
  });
});

const logInUser: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await authServices.logInUserDB(req.body);
  const token = createToken(data.email);
  req.user = data;
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token,
    data,
  });
});

const updateRole: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await authServices.updateRoleDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User role update successfully',
    data,
  });
});
const updateUser: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await authServices.updateUserDB({
    _id: req.params.id,
    user: req.body,
  });
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User update successfully',
    data,
  });
});

const authControllers = {
  singUpUser,
  logInUser,
  updateRole,
  updateUser,
};

export default authControllers;
