import express from 'express';
import validateRequest from '../../utils/validateRequest';
import slotValidationSchema from './slot.validate';
import { slotController } from './slot.controllers';

const router = express.Router();

router.post(
  '/',
  validateRequest(slotValidationSchema),
  slotController.createSlot,
);

router.get('/availability', slotController.getAvailableSlot);

export const slotsRouter = router;
