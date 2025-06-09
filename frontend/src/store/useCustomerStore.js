import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useCustomerStore = create((set) => ({
  isSubmittingPickupRequest: false,
  submitPickupRequest: async (data) => {
    set({ isSubmittingPickupRequest: true });
    try {
      await axiosInstance.post("/customer/pickup", data);
      toast.success("Pickup request submitted successfully!");
    } catch (error) {
      console.error("Error submitting pickup request:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit pickup request"
      );
    } finally {
      set({ isSubmittingPickupRequest: false });
    }
  },
  getPickupRequests: async (customerId) => {
    try {
      const res = await axiosInstance.get(`/customer/pickup/${customerId}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching pickup requests:", error);
      toast.error("Failed to fetch pickup requests. Please try again later.");
    }
  },
}));
