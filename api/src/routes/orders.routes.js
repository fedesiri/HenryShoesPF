import { Router } from "express";
import {
  getOrder,
  createOrder,
  getStock,
  HandleStock,
  getProductStock
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/", getOrder);
router.post("/create", createOrder);
router.get("/stock", getStock);
router.post("/stock", HandleStock);
router.get("/prodStock/:productId", getProductStock) 

export default router;
