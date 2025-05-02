/** @format */

"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { access } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!access) {
      sessionStorage.setItem("redirectAfterLogin", pathname);
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [access]);

  if (!access) return null;
  if (!checked) return <div>Loading...</div>;

  return children;
}
