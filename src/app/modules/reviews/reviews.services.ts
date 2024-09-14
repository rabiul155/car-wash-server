import { ReviewType } from './reviews.interface';
import Reviews from './reviews.model';

const createReview = async (data: ReviewType) => {
  const result = await Reviews.create(data);
  return result;
};

const getAllReviews = async (query: Record<string, string>) => {
  const limit = query.limit;

  const results = await Reviews.find().limit(Number(limit)).sort('-createdAt');
  return results;
};

export const reviewService = {
  getAllReviews,
  createReview,
};
