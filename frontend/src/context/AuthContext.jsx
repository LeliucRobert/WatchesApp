/** @format */
"use client";
// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  fetchCurrentUser,
} from "@/api/userApi";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    const storedRefresh = localStorage.getItem("refresh");

    if (storedAccess && storedRefresh) {
      setAccess(storedAccess);
      setRefresh(storedRefresh);

      fetchCurrentUser()
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setAccess(null);
      setRefresh(null);
      setUser(null);
      setLoading(false);
    }
  }, []);

  const register = async (username, email, password) => {
    try {
      await registerUser(username, email, password);
      alert("Registered successfully!");
      router.push("/login");
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setAccess(data.access);
      setRefresh(data.refresh);

      const redirectPath =
        sessionStorage.getItem("redirectAfterLogin") || "/dashboard";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
      return true;
    } catch (err) {
      alert(err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser(refresh);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setAccess(null);
      setRefresh(null);
      // router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, access, refresh, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
