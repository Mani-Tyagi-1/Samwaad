// backend/routes/volunteerRoutes.js
import express from "express";
import * as volunteerController from "../controllers/volunteerController.js";
import upload from "../middlewares/uploads.js"; // Import multer configuration

const router = express.Router();

// --- Route to Submit Application ---
// Uses multer middleware to handle a single file upload with the field name 'resumeFile'
router.post(
  "/apply",
  upload.single("resumeFile"), // This key MUST match the FormData key on frontend
  volunteerController.submitApplication
);

// --- Route to Get All Applications (Add admin protection later) ---
router.get("/", volunteerController.getAllApplications);

// Add more routes here (e.g., get by ID, update status)

export default router;
