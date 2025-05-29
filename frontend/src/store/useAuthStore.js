//Zustand Auth Store

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
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

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));
