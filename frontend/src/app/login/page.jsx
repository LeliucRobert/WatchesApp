/** @format */
"use client";
import { useState } from "react";
import { loginUser } from "@/api/userApi";
import "../../styles/login.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await login(username, password);
      setSuccess("Logged in successfully!");
      setUsername("");
      setPassword("");
      const redirect =
        sessionStorage.getItem("redirectAfterLogin") || "/explore";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirect);
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
          <p className='login-register-link'>
            Not registered?{" "}
            <span
              onClick={() => router.push("/register")}
              className='register-link'
            >
              Create a new account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
