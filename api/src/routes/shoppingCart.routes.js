
import {Router} from 'express'
import { getShoppingCart, getShoppingHistory, getAllShoppingHistory, removeFromCart } from '../controllers/shoppingCart.controller.js';


const router = Router()

router.post("/", getShoppingCart);
router.post("/History", getShoppingHistory);

router.get("/allhistory", getAllShoppingHistory)

router.put("/remove", removeFromCart)




export default router