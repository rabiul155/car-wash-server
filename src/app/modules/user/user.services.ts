import { UserType } from './user.interface';
import User from './user.model';

const getUserDB = async () => {
  const users = await User.find();
  return users;
};

const userServices = {
  getUserDB,
};

export default userServices;
