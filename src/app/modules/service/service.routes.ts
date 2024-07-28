import express from 'express';
import validateRequest from '../../utils/validateRequest';
import serviceValidationSchema from './service.validate';
import { serviceControllers } from './service.controllers';
import { authenticate, authorization } from '../../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(serviceControllers.getAllServices)
  .post(
    authenticate,
    authorization('admin'),
    validateRequest(serviceValidationSchema),
    serviceControllers.createService,
  );
router
  .route('/:id')
  .get(serviceControllers.getServices)
  .patch(
    authenticate,
    authorization('admin'),
    validateRequest(serviceValidationSchema.partial()),
    serviceControllers.updateServices,
  )
  .delete(
    authenticate,
    authorization('admin'),
    serviceControllers.deleteServices,
  );

export const servicesRouter = router;
