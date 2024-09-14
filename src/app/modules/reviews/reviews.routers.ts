import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { reviewController } from './reviews.controllers';
import reviewValidationSchema from './review.validate';

const router = express.Router();

router.post(
  '/',
  validateRequest(reviewValidationSchema),
  reviewController.createReview,
);

router.route('/').get(reviewController.getAllReview);

export const reviewRoutes = router;
