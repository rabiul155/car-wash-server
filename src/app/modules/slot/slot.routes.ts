import express from 'express';
import validateRequest from '../../utils/validateRequest';
import slotValidationSchema from './slot.validate';
import { slotController } from './slot.controllers';

const router = express.Router();

router
  .route('/')

  .post(validateRequest(slotValidationSchema), slotController.createSlot);

export const slotsRouter = router;
