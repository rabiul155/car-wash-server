import { UserType } from './user.interface';
import User from './user.model';

const createUserDB = async (userData: UserType) => {
  const user = await User.create(userData);
  return user;
};
const getUserDB = async () => {
  const users = await User.find();
  return users;
};

export const userServices = {
  createUserDB,
  getUserDB,
};
