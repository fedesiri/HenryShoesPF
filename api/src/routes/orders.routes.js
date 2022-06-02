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
router.post("/stock", getStock);
router.post("/HandleStock", HandleStock); 
router.get("/productStock/:productId", getProductStock)


export default router;
