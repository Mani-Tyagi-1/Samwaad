import User from "../models/User.js";
import { hash, compare } from "bcryptjs";
import pkg from "jsonwebtoken";


const { sign } = pkg;

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await hash(password, 10);
    const newUser = await User.create({ username, email, password: hashed });

    const token = sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ msg: "Invalid credentials" });

    const match = await compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

export async function googleAuthCallback(req, res) {
  const user = req.user;
  const token = sign({ id: user._id }, process.env.JWT_SECRET);
  // Return the token and user data to the frontend
  // res.json({ token, user });
  res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);

}


export async function getUserProfile(req, res) {
  try {
    // req.user.id should be attached by the auth middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const user = await User.findById(req.user.id).select("-password"); // Exclude password hash

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user }); // Return the user data
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error getting user profile" });
  }
}
