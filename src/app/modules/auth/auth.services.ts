import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import { UserType } from '../user/user.interface';
import User from '../user/user.model';

const signUpUserDB = async (userData: UserType) => {
  const user = await User.create(userData);
  user.__v = undefined;
  return user;
};

const logInUserDB = async (userData: { email: string; password: string }) => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new AppError(400, 'Invalid email or password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  const isValid = await user.validatePassword(password, user.password);
  if (!isValid) {
    throw new AppError(401, 'Invalid email or password');
  }

  user.password = '';
  user.__v = undefined;

  return user;
};

const authenticate: RequestHandler = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(401, 'You are not logged in! Please log in to get access.'),
    );
  }

  // 2) Verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);

  // 3) Check if user still exists
  const currentUser = await User.findOne({ email: decoded });
  if (!currentUser) {
    return next(
      new AppError(
        401,
        'The user belonging to this token does no longer exist.',
      ),
    );
  }

  req.user = currentUser;

  next();
});

// GRANT ACCESS TO PROTECTED ROUTE
const authorization = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "You don't have this permission"));
    }
    next();
  };
};

const authServices = {
  signUpUserDB,
  logInUserDB,
  authenticate,
  authorization,
};

export default authServices;
