/** @format */

"use client";

import { generateFakeWatches } from "@/utils/FakeData";
import { useEntities } from "@/context/EntityContext";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export default function GenerateFakeButton() {
  const { addEntity } = useEntities();
  const [isConnected, setIsConnected] = useState(false);
  const [latestWatch, setLatestWatch] = useState(null);
  const socketRef = useRef(null);

  // const handleGenerate = () => {
  //   const fakeEntities = generateFakeWatches(20); // 👈 generate 20 at once
  //   fakeEntities.forEach((entity) => addEntity(entity)); // 👈 add each individually
  // };

  const connectWebSocket = () => {
    if (socketRef.current) return;

    const socket = new WebSocket("ws://localhost:8000/ws/watches/");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📡 Received real-time data:", data);
      setLatestWatch(data);
      addEntity(data); // Optional: Add to frontend store immediately
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
      socketRef.current = null;
    };
  };

  const disconnectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      {!isConnected ? (
        <Button onClick={connectWebSocket} className='bg-blue-600 text-black'>
          Connect to Real-Time Watches
        </Button>
      ) : (
        <Button onClick={disconnectWebSocket} className='bg-red-600 text-black'>
          Disconnect WebSocket
        </Button>
      )}
    </div>
  );
}
