import { Router } from "express";
import { AddProduct, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const router = Router()

//user wishlist
router.post("/add", AddProduct);
router.delete("/remove", removeFromWishlist)
router.post("/", getWishlist)

export default router