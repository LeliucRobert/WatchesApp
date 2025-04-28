/** @format */

"use client"; // Only needed if you are using Next.js 13+ App Router

import { useState } from "react";
import { registerUser } from "@/api/userApi";
import "../../styles/register.css";
import Image from "next/image";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await registerUser(username, password);
      setSuccess("Registered successfully!");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <div className='register-page'>
      <div className='register-container'>
        {/* <div className='logo'>
          <Image
            src='/images/Watch.png'
            alt='Watchly Logo'
            width={44}
            height={44}
            className='logo-image'
          />
          <span className='logo-text'>Watchly</span>
        </div> */}

        {/* Title */}
        <h1 className='register-title'>Sign up</h1>

        {/* Form */}
        <form className='register-form' onSubmit={handleSubmit}>
          <input
            className='register-input'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className='register-input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className='register-input'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className='register-button' type='submit'>
            Register
          </button>

          {error && <p className='register-error'>{error}</p>}
          {success && <p className='register-success'>{success}</p>}
        </form>
      </div>
    </div>
  );
}
