import { Router } from "express";
import {
  getAllProducts,
  getAllBrands,
  GetShoesByGender,
  getDetails,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/brand", getAllBrands);
router.get("/gender/:gender", GetShoesByGender);
router.get("/details/:id", getDetails);

export default router;
