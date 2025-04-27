// backend/models/VolunteerApplication.js
import mongoose from "mongoose";

const volunteerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Basic email format validation
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      // Add more specific phone validation if needed
    },
    age: {
      type: Number, // Store age as a number
      required: [true, "Age is required"],
      min: [16, "Must be at least 16 years old"], // Example minimum age
    },
    gender: {
      type: String,
      trim: true,
      enum: ["Male", "Female", "Non-binary", "Other", "Prefer not to say", ""], // Allow empty string if not selected
      default: "",
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    education: {
      type: String,
      trim: true,
      default: "",
    },
    interest: {
      type: String,
      required: [true, "Volunteering interest is required"],
      trim: true,
      // You could add an enum here too if the options are strictly controlled
      // enum: ["Peer Support Facilitator", "Community Outreach", ... ]
    },
    availability: {
      type: String,
      required: [true, "Availability is required"],
      trim: true,
    },
    motivation: {
      type: String,
      required: [true, "Motivation is required"],
      trim: true,
    },
    resumePath: {
      // Stores the path to the uploaded file
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
    // Optional: link to a User account if volunteers become users later
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Optional: Index for faster lookup by email or status
volunteerApplicationSchema.index({ email: 1 });
volunteerApplicationSchema.index({ status: 1 });

export const VolunteerApplication = mongoose.model(
  "Volunteers",
  volunteerApplicationSchema
);
