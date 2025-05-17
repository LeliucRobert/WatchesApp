/** @format */

// userApi.js
import axios from "./axios";
import API from "./axios";
// const BASE_URL = "http://localhost:8000/api";
const BASE_URL = "${process.env.NEXT_PUBLIC_API_URL}/api";

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

export async function getUserProfile() {
  const response = await API.get("/user/profile/");
  return response.data;
}

export async function updateUserProfile(data) {
  const response = await API.put("/user/profile/", data);
  return response.data;
}

// Change password
export async function changeUserPassword(current_password, new_password) {
  const response = await API.post("/user/change_password/", {
    current_password,
    new_password,
  });
  return response.data;
}

export async function deleteAccount() {
  const response = await API.delete("/user/delete_account/", {});
  return response.data;
}

export async function fetchCurrentUser() {
  const res = await API.get("/me/");
  return res.data;
}
