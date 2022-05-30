
import {Router} from 'express'
import { getShoppingCart, getShoppingHistory, removeFromCart } from '../controllers/shoppingCart.controller.js';

const router = Router()

router.post("/", getShoppingCart);
router.get("/History", getShoppingHistory);
router.post("/remove", removeFromCart)




export default router