import express from "express";
import passport from "passport";
import {
  signup,
  login,
  googleAuthCallback,
} from "../controllers/authController.js";
import { getUserProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/auth.js"; // <-- Import the auth middleware

const router = express.Router();

// Email/password auth
router.post("/signup", signup);
router.post("/login", login);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleAuthCallback
);


router.get('/user', authMiddleware, getUserProfile); // <-- Add this protected route


export default router;
