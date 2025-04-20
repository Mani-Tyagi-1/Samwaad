// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for Google OAuth users initially
    googleId: { type: String }, // To link Google account
    profilePicture: { type: String }, // <-- Add this field
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
