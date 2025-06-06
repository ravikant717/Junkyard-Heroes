import express from "express";
const router = express.Router();
import {
  createPickupRequest,
  getRequestsByCustomer,
  submitFeedback,
} from "../controllers/customer.controller.js";
router.post("/", createPickupRequest);
router.get("/:customerId", getRequestsByCustomer);
router.put("/:id/feedback", submitFeedback);

export default router;
