import {Router} from 'express'
import { getShoppingCart } from '../controllers/shoppingCart.controller.js';

const router = Router()

router.get("/", getShoppingCart);



export default router