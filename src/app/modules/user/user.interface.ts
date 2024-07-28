import { Model } from 'mongoose';

export type UserType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
};

export type UserMethodType = {
  validatePassword(
    userPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
};

export type UserModelType = Model<
  UserType,
  Record<string, string>,
  UserMethodType
>;
