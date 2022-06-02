import { Router } from "express";
import express from "express";
import morgan from "morgan";
import productsRoutes from './products.routes.js'
import categoriesRoutes from './categories.routes.js'
import adminRoutes from './admin.routes.js'
import signinRoutes from './signin.routes.js'
import signupRoutes from './signup.routes.js'
import userRoutes from './user.routes.js'
import shoppingCartRoutes from './shoppingCart.routes.js'
import ordersRoutes from './orders.routes.js'
import wishlistRoutes from './wishlist.routes.js'
import paymentRoutes from './payment.routes.js'
import reviewsRoutes from "./reviews.routes.js"
const router = Router();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));

router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/admin", adminRoutes);
router.use("/signin", signinRoutes);
router.use("/signup", signupRoutes); 
router.use("/user", userRoutes);
router.use("/shoppingcart", shoppingCartRoutes);
router.use("/orders", ordersRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/payment", paymentRoutes);
router.use("/reviews", reviewsRoutes)
// router.use("/token");




export default router;