/** @format */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import "../styles/components/UserDropdown.css";
import { useAuth } from "@/context/AuthContext";
import { fetchCurrentUser } from "@/api/userApi";
export default function UserDropdown() {
  const { access, user, loading, logout } = useAuth();
  const router = useRouter();
  return (
    <div className='dropdown-container'>
      <button className='icon-button'>
        <User className='icon' />
      </button>

      <div className='dropdown-menu'>
        {access ? (
          <>
            <button
              className='dropdown-item'
              onClick={() => router.push("/profile")}
            >
              View Profile
            </button>

            {user?.is_staff && (
              <button
                className='dropdown-item'
                onClick={() => router.push("/staff_dashboard")}
              >
                Admin Dashboard
              </button>
            )}

            <button className='dropdown-item' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className='dropdown-item'
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className='dropdown-item'
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </>
        )}

        <hr className='dropdown-separator' />

        <div className='dropdown-status'>
          {access && !loading ? (
            <em>
              Logged in as: {user?.username}{" "}
              {user?.is_staff && <strong>(ADMIN)</strong>}
            </em>
          ) : (
            <em>Not logged in</em>
          )}
        </div>
      </div>
    </div>
  );
}
