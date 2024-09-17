import { UserType } from './user.interface';
import User from './user.model';

const getUserDB = async () => {
  const users = await User.find();
  return users;
};
const updateRoleDB = async (data: { _id: string; role: 'admin' | 'user' }) => {
  const user = await User.findByIdAndUpdate(
    { _id: data._id },
    { role: data.role },
    { new: true },
  );
  return user;
};

const userServices = {
  getUserDB,
  updateRoleDB,
};

export default userServices;
