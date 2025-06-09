import express from "express";
const router = express.Router();

import { getPendingPickupRequests } from "../controllers/dealer.controller.js";

router.get("/pickup/pending", getPendingPickupRequests);

export default router;
