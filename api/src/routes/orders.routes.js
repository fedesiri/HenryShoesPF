import { Router } from "express";
import {
  getOrder,
  createOrder,
  getStock,
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/orders", getOrder);
router.post("/orders", createOrder);
router.get("/stock", getStock);

export default router;
