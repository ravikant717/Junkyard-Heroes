import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useDealerStore = create((set) => ({
  pickupRequests: [],
  isFetching: false,

  fetchPendingRequests: async () => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get("/dealer/pickup/pending");
      console.log("pickupRequests response:", response.data); // <-- Add this line
      // If your array is at response.data.requests or similar, use that:
      set({
        pickupRequests: Array.isArray(response.data)
          ? response.data
          : response.data.requests || [],
      });
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    } finally {
      set({ isFetching: false });
    }
  },
}));
