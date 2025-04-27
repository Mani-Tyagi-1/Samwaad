import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import authRoutes from "./routes/authRoutes.js";
import volunteerRoutes from './routes/volunteerRoutes.js'; 
import "./config/passport.js"; 

dotenv.config();

const app = express();
const server = http.createServer(app);

// --- Environment Variables ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI environment variable is not set.");
  process.exit(1); 
}



// --- Middleware ---
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- Database Connection ---
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`✅ Connected to MongoDB`))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- API Routes ---
app.use("/api/auth", authRoutes);

app.use("/api/volunteers", volunteerRoutes); 


export default app; 