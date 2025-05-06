/** @format */

"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  deleteAccount,
} from "@/api/userApi";
import { useRouter } from "next/navigation";
import "../../styles/profile.css";
export default function ProfilePage() {
  const { logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({});
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
  });
  const router = useRouter();

  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setUserData(data);
        setForm(data);
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updated = await updateUserProfile(form);
      setUserData(updated);
      alert("Profile updated");
      setMsg("Profile updated.");
    } catch (err) {
      setMsg("Failed to update profile.");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await changeUserPassword(
        passwords.current_password,
        passwords.new_password
      );
      setMsg("Password changed. Please log in again.");
      logout();
    } catch (err) {
      setMsg("Failed to change password.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setMsg("Account Deleted succesfully");
      setTimeout(() => {
        localStorage.clear();
        router.push("/login");
      }, 200);
    } catch (err) {
      setMsg("Failed to delete account.");
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className='profile-container'>
      <h1 className='profile-title'>Profile</h1>

      <label className='profile-label'>
        Username:
        <input
          className='profile-input'
          name='username'
          value={form.username}
          onChange={handleChange}
        />
      </label>
      <label className='profile-label'>
        Email:
        <input
          className='profile-input'
          name='email'
          value={form.email}
          onChange={handleChange}
        />
      </label>
      <label className='profile-label'>
        First Name:
        <input
          className='profile-input'
          name='first_name'
          value={form.first_name || ""}
          onChange={handleChange}
        />
      </label>
      <label className='profile-label'>
        Last Name:
        <input
          className='profile-input'
          name='last_name'
          value={form.last_name || ""}
          onChange={handleChange}
        />
      </label>
      <div className='profile-info'>
        Role: {userData.is_staff ? "Admin" : "User"}
      </div>
      <div className='profile-info'>
        Joined: {new Date(userData.date_joined).toLocaleString()}
      </div>

      <button className='profile-button update-btn' onClick={handleUpdate}>
        Update Profile
      </button>

      <hr className='profile-divider' />

      <h2 className='profile-subtitle'>Change Password</h2>
      <input
        className='profile-input'
        placeholder='Current password'
        type='password'
        value={passwords.current_password}
        onChange={(e) =>
          setPasswords({ ...passwords, current_password: e.target.value })
        }
      />
      <input
        className='profile-input'
        placeholder='New password'
        type='password'
        value={passwords.new_password}
        onChange={(e) =>
          setPasswords({ ...passwords, new_password: e.target.value })
        }
      />

      <button
        className='profile-button password-btn'
        onClick={handlePasswordChange}
      >
        Change Password
      </button>

      <button
        className='profile-button delete-btn'
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>

      {msg && <p className='profile-message'>{msg}</p>}
    </div>
  );
}
