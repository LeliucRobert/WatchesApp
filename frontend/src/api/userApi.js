/** @format */

// userApi.js
import axios from "./axios";
import API from "./axios";
const BASE_URL = "http://localhost:8000/api";

export async function loginUser(username, password) {
  const res = await axios.post(`${BASE_URL}/login/`, {
    username,
    password,
  });

  const data = res.data;
  return data;
}

export async function registerUser(username, email, password) {
  const res = await axios.post(`${BASE_URL}/register/`, {
    username,
    email,
    password,
  });

  return res.data;
}

export async function logoutUser(refresh) {
  if (!refresh) return;

  const res = await axios.post(`${BASE_URL}/logout/`, { refresh });

  if (res.status === 200) {
    alert("Logged out successfully!");
  } else {
    alert("Failed to logout.");
  }
}

export async function fetchCurrentUser() {
  const res = await API.get("/me/");
  return res.data;
}
