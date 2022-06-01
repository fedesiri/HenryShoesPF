import { Router } from "express";
import { addReview, getAllReviews, deleteReiew, modifyReview, getReviews, getSpecificReview, } from "../controllers/reviews.controller.js";

const router = Router();

router.post('/', addReview);
router.get('/:email', getReviews)
router.get("/:productId/:email", getSpecificReview)
router.get("/", getAllReviews)
router.delete("/:idReview", deleteReiew)
router.put("/modifyReview", modifyReview)

export default router;