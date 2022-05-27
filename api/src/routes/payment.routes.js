import {Router} from 'express';
import { cancelPayment, capturePayment, createPayment } from '../controllers/payment.controller.js';

const router = Router();


router.get('/create-order', createPayment)

router.get('/capture-order', capturePayment)

router.get('/cancel-order', cancelPayment)

export default router