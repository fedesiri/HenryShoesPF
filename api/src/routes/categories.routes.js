import { Router } from "express";
import {
  getCategory,
  getCategoryId,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/", getCategory);
router.get("/details/:id", getCategoryId);


export default router;
