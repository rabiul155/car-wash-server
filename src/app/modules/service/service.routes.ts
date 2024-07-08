import express from 'express';
import validateRequest from '../../utils/validateRequest';
import serviceValidationSchema from './service.validate';
import { serviceControllers } from './service.controllers';

const router = express.Router();

router
  .route('/')
  .get(serviceControllers.getAllServices)
  .post(
    validateRequest(serviceValidationSchema),
    serviceControllers.createService,
  );
router
  .route('/:id')
  .get(serviceControllers.getServices)
  .patch(
    validateRequest(serviceValidationSchema.partial()),
    serviceControllers.updateServices,
  )
  .delete(serviceControllers.deleteServices);

export const servicesRouter = router;
