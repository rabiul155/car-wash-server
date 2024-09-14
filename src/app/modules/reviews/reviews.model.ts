import mongoose from 'mongoose';
import { ReviewType } from './reviews.interface';

const userSchema = new mongoose.Schema<ReviewType>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    rating: {
      type: Number,
      required: [true, 'Rating is required'],
    },

    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
  },
  { timestamps: true },
);

const Reviews = mongoose.model<ReviewType>('Review', userSchema);

export default Reviews;
