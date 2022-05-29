import {Router} from 'express';
import { cancelPayment, capturePayment, CloseCart, createPayment } from '../controllers/payment.controller.js';

const router = Router();


router.post('/create-order', createPayment)

router.get('/capture-order', capturePayment)

router.get('/cancel-order', cancelPayment)
router.post('/payment-success', CloseCart)

export default router