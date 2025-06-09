import express from "express";
const router = express.Router();
import {
  createPickupRequest,
  getRequestsByCustomer,
  submitFeedback,
} from "../controllers/customer.controller.js";
router.post("/pickup", createPickupRequest);
router.get("/pickup/:customerId", getRequestsByCustomer);
router.put("/pickup/:id/feedback", submitFeedback);

export default router;
