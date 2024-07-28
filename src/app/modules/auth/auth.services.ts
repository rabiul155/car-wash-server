import AppError from '../../error/AppError';
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

const authServices = {
  signUpUserDB,
  logInUserDB,
};

export default authServices;
