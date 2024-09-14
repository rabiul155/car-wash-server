import { ReviewType } from './reviews.interface';
import Reviews from './reviews.model';

const createReview = async (data: ReviewType) => {
  const result = await Reviews.create(data);
  return result;
};

const getAllReviews = async () => {
  const results = await Reviews.find();
  return results;
};

export const reviewService = {
  getAllReviews,
  createReview,
};
