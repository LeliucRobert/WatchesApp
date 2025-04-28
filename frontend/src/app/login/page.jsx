/** @format */
"use client";
import { useState } from "react";
import { loginUser } from "@/api/userApi";
import "../../styles/login.css";
import Image from "next/image";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await loginUser(username, password);
      setSuccess("Logged in successfully!");
      setUsername("");
      setPassword("");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        {/* Logo */}
        {/* <div className='logo'>
          <Image
            src='/images/Watch.png'
            alt='Watchly Logo'
            width={44}
            height={44}
            className='logo-image'
          />
          <span className='logo-text'>Watchly</span>
        </div>

        {/* Title */}
        <h1 className='login-title'>Sign In</h1>

        {/* Form */}
        <form className='login-form' onSubmit={handleSubmit}>
          <input
            className='login-input'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className='login-input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className='login-button' type='submit'>
            Login
          </button>

          {error && <p className='login-error'>{error}</p>}
          {success && <p className='login-success'>{success}</p>}
        </form>
      </div>
    </div>
  );
}
