import {Router} from 'express'
import { getShoppingCart, getShoppingHistory } from '../controllers/shoppingCart.controller.js';

const router = Router()

router.get("/", getShoppingCart);
router.get("/History", getShoppingHistory);




export default router