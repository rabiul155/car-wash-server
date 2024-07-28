import express from 'express';
import validateRequest from '../../utils/validateRequest';
import slotValidationSchema from './slot.validate';
import { slotController } from './slot.controllers';
import { authenticate, authorization } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorization('admin'),
  validateRequest(slotValidationSchema),
  slotController.createSlot,
);

router.get('/availability', slotController.getAvailableSlot);

export const slotRoutes = router;
