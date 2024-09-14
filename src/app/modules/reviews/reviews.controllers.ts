import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { reviewService } from './reviews.services';

const createReview: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await reviewService.createReview(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data,
  });
});
const getAllReview: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await reviewService.getAllReviews(
    req.query as Record<string, string>,
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Review fetched successfully',
    data,
  });
});

export const reviewController = {
  createReview,
  getAllReview,
};
