/** @format */

import { useEffect, useState } from "react";
export function useBackendStatus(pingUrl = "http://localhost:8000/api/ping/") {
  const [isOffline, setIsOffline] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false); // ✅

  const checkServer = async () => {
    try {
      const res = await fetch(pingUrl);
      setIsServerDown(!res.ok);
    } catch {
      setIsServerDown(true);
    }
    setStatusChecked(true); // ✅ Mark check complete
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStatusChange = () => setIsOffline(!navigator.onLine);

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    handleStatusChange();
    checkServer();

    const interval = setInterval(checkServer, 5000);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
      clearInterval(interval);
    };
  }, []);

  return { isOffline, isServerDown, statusChecked };
}
