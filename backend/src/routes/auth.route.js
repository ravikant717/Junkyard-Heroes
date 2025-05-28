//auth.route.js -> A good convention

import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

//post method
//organise controllers
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/check", protectRoute, checkAuth);
export default router;
