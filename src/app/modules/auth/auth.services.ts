import bcrypt from 'bcrypt';
import AppError from '../../error/AppError';
import { UserType } from '../user/user.interface';
import User from '../user/user.model';

const signUpUserDB = async (userData: UserType) => {
  const user = await User.create(userData);

  // Remove password and __v before sending user data to client
  user.password = '';
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

  // Remove password and __v before sending user data to client
  user.password = '';
  user.__v = undefined;

  return user;
};

const updateRoleDB = async (data: { _id: string; role: 'admin' | 'user' }) => {
  const user = await User.findByIdAndUpdate(
    { _id: data._id },
    { role: data.role },
    { new: true },
  );
  return user;
};
const updateUserDB = async (data: { _id: string; user: UserType }) => {
  const payload = {
    name: data.user.name,
    phone: data.user.phone,
    address: data.user.address,
  };

  const result = await User.findByIdAndUpdate({ _id: data._id }, payload, {
    new: true,
  });
  return result;
};

const authServices = {
  signUpUserDB,
  logInUserDB,
  updateRoleDB,
  updateUserDB,
};

export default authServices;
