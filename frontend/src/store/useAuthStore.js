//Zustand Auth Store

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create((set) => ({
  authUser: null, // The authenticated user object
  isCheckingAuth: true, // Indicates if the authentication status is being checked
  isSigningUp: false, // Indicates if the user is currently signing up
  isLoggingIn: false, // Indicates if the user is currently logging in

  checkAuth: async () => {
    try {
      const res = await axiosInstance.post("/auth/check");
      //Assuming the response contains the authenticated user data
      set({ authUser: res.data || null });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ authUser: null }); //Explicitly set authUser to null if there's an error
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
