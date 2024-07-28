import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserMethodType, UserModelType, UserType } from './user.interface';

const userSchema = new mongoose.Schema<UserType, UserModelType, UserMethodType>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,

      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
  },
  { timestamps: true },
);

// Hash password before adding data to database
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.validatePassword = async function (
  userPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(userPassword, hashPassword);
};

const User = mongoose.model<UserType, UserModelType>('User', userSchema);

export default User;
