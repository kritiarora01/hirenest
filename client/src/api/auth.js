import axios from "axios";

const API_URL = "https://hirenest-server.onrender.com/api/auth";

// Register
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};