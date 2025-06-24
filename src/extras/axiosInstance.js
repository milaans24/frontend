import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://milaan-backend-71ny.onrender.com", // or dynamic from redux if needed
  withCredentials: true, // use this only if using cookies
});

// Interceptor for handling TokenExpiredError globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error?.response?.data;

    if (err?.name === "TokenExpiredError") {
      // Clear storage or auth state
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      toast.error("Session expired. Please log in again.");

      // Redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
