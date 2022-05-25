import { Router } from "express";
import { AddProduct, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const router = Router()

//user wishlist
router.post("/wishlist", AddProduct);
router.post("/wishlist/remove", removeFromWishlist)
router.get("/wishlist", getWishlist)

export default router