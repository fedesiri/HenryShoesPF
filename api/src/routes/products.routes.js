import { Router } from "express";
import {
  getAllProducts,
  GetShoesByGender,
  getDetails,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/gender/:gender", GetShoesByGender);
router.get("/details/:id", getDetails);

export default router;
