import { Router } from "express";
import { signupController } from "../controllers/signup.controller.js";
import { verifyEmail } from "../controllers/verifyemail.controller.js";
const router = Router();

router.post('/', signupController)
router.get('/verify-email', verifyEmail)

export default router;
