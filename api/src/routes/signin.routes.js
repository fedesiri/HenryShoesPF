import { Router } from "express";
import passport from "passport";
import {
  sigInCallbackController,
  sigInGoogleFailureController,
  sigInGoogleSuccessController,
  signInController,
} from "../controllers/signin.controller.js";
import {
  createNewPassword,
  forgotPassword,
} from "../controllers/signin.controller.js";
import verifyEmail from "../middlewares/verification.js";

const router = Router();

router.post("/", signInController);

//forgot password
router.put("/forgot-password", forgotPassword);

//create new password
router.put("/new-password", createNewPassword);


// Login with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/signin/google/success",
    failureRedirect: "/signin/google/failure",
  }),
  sigInCallbackController
);
router.get("/google/success", sigInGoogleSuccessController);
router.get("/google/failure", sigInGoogleFailureController);


export default router;
