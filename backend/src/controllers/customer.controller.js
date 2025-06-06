import PickupRequest from "../models/customer/PickupRequest.customer.model.js";

export const createPickupRequest = async (req, res) => {
  try {
    const request = new PickupRequest(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    console.error("Error creating pickup request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRequestsByCustomer = async (req, res) => {
  try {
    const requests = await PickupRequest.find({
      customerId: req.params.customerId,
    });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching pickup requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { feedback, rating } = req.body;
    const updated = await PickupRequest.findByIdAndUpdate(
      req.params.id,
      { feedback, rating },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
