import { Router } from "express";
import { AddProduct, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const router = Router()

//user wishlist
router.post("/add", AddProduct);
router.put("/remove", removeFromWishlist)
router.post("/", getWishlist)

export default router