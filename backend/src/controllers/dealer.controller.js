import PickupRequest from "../models/customer/PickupRequest.customer.model.js";

export const getPendingPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({ status: "pending" })
      .populate("customerId", "name email")
      .sort({
        createdAt: -1,
      });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching pending pickup requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
