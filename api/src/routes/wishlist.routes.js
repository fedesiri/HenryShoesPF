import { Router } from "express";
import { AddProduct, getWishlist } from "../controllers/wishlist.controller.js";

const router = Router()

//user wishlist
router.post("/wishlist", AddProduct);
router.get("/wishlist", getWishlist)

export default router