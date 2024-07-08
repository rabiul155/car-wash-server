import express from 'express';
import validateRequest from '../../utils/validateRequest';
import serviceValidationSchema from './service.validate';

const router = express.Router();

router.route('/').get().post(validateRequest(serviceValidationSchema));
router.route('/:id').get().patch().delete();

export const servicesRouter = router;
