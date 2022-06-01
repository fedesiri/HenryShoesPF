import { Router } from "express";
import { addReview, getAllReviews, deleteReiew, modifyReview, getReviews, getSpecificReview, getReviewsId_Products } from "../controllers/reviews.controller.js";

const router = Router();

router.post('/', addReview);
router.get('/:email', getReviews)
router.get("/:productId/:email", getSpecificReview)
router.get("/", getAllReviews)
router.delete("/:idReview", deleteReiew)
router.put("/modifyReview", modifyReview)
router.post("/all", getReviewsId_Products)

export default router;