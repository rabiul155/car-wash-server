import express from 'express';
import userValidationSchema from './user.validate';
import userControllers from './user.controllers';
import authControllers from '../auth/auth.controllers';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidationSchema),
  authControllers.singUpUser,
);
router.post('/login', authControllers.logInUser);

router.patch('/role', authControllers.updateRole);
router.patch('/:id', authControllers.updateUser);

router.route('/').get(userControllers.getUsers);

export const userRoutes = router;
