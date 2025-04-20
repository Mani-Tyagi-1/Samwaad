import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Adjust path

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No token format correct, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object for use in the next controller
    // You might want to fetch the user here or just pass the ID
    req.user = { id: decoded.id }; // Assuming your JWT payload has 'id'

    next(); // Proceed to the controller function
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
