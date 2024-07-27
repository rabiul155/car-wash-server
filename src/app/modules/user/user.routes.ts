import express from 'express';
import validateRequest from '../../utils/validateRequest';
import userValidationSchema from './user.validate';
import { userControllers } from './user.controllers';

const router = express.Router();

router
  .route('/')
  .get(userControllers.getUsers)
  .post(validateRequest(userValidationSchema), userControllers.createUser);

export const usersRouter = router;
