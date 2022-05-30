import {Router} from 'express'
import { getAllShoppingHistory, getShoppingCart, getShoppingHistory } from '../controllers/shoppingCart.controller.js';

const router = Router()

router.get("/", getShoppingCart);
router.get("/History", getShoppingHistory);
router.get("/allhistory", getAllShoppingHistory)




export default router