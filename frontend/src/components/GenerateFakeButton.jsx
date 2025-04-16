/** @format */

"use client";

import { generateFakeWatches } from "@/utils/FakeData";
import { useEntities } from "@/context/EntityContext";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export default function GenerateFakeButton({ onNewEntity }) {
  const [isActive, setIsActive] = useState(false);
  const { addEntity } = useEntities();
  const socketRef = useRef(null);

  const toggleSystem = async () => {
    if (isActive) {
      // Stop generator
      await fetch("http://localhost:8000/api/stop_generator/", {
        method: "POST",
      });
      console.log("🛑 Generator stopped");

      // Disconnect WebSocket
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      console.log("❌ WebSocket disconnected");
    } else {
      // Start generator
      await fetch("http://localhost:8000/api/start_generator/", {
        method: "POST",
      });
      console.log("🟢 Generator started");

      // Connect WebSocket
      const socket = new WebSocket("ws://localhost:8000/ws/watches/");
      socketRef.current = socket;

      socket.onopen = () => console.log("✅ WebSocket connected");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("📡 Received real-time data:", data);

        if (onNewEntity) {
          onNewEntity(data); // ✅ Send it to parent
        }

        addEntity(data);
      };

      socket.onclose = () => {
        console.log("🔌 WebSocket closed");
        socketRef.current = null;
      };
    }

    setIsActive((prev) => !prev);
  };

  return (
    <div className='my-4'>
      <Button
        onClick={toggleSystem}
        className={`text-black ${
          isActive ? "bg-yellow-500" : "bg-green-600"
        } hover:opacity-90`}
      >
        {isActive
          ? "Stop Generator & WebSocket"
          : "Start Generator & WebSocket"}
      </Button>
    </div>
  );
}
