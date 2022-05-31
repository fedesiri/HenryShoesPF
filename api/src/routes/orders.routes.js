import { Router } from "express";
import {
  getOrder,
  createOrder,
  getStock,
  HandleStock
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/", getOrder);
router.post("/create", createOrder);
router.post("/stock", getStock);
router.post("/HandleStock", HandleStock); 

export default router;
