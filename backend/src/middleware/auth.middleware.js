import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Assuming the JWT is stored in a cookie named 'jwt'
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret key
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
