/** @format */

"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { generateFakeWatches } from "@/utils/FakeData";
import {
  fetchWatches,
  createWatch,
  updateWatch,
  deleteWatch,
} from "@/api/watchApi";
// Create context
import { useBackendStatus } from "@/utils/BackendStatus";

const OFFLINE_QUEUE_KEY = "offlineWatchQueue";
const fileCache = new Map(); // place this at the top of your file or in a shared file

const saveToQueue = (operation) => {
  const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)) || [];

  // Handle media files separately
  if (
    operation.data &&
    operation.data.media &&
    Array.isArray(operation.data.media)
  ) {
    const fakeId = operation.data.id || `offline-${Date.now()}`;
    const mediaKey = `media-${fakeId}`;

    fileCache.set(mediaKey, operation.data.media); // Store real files in memory
    operation.data.media = mediaKey; // Replace media array with just the key
  }

  queue.push(operation);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue)); // ✅ Now safe
};

const loadQueue = () =>
  JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)) || [];

const clearQueue = () => localStorage.removeItem(OFFLINE_QUEUE_KEY);

const EntityContext = createContext();
export const useEntities = () => useContext(EntityContext);
export const EntityProvider = ({ children }) => {
  const { isOffline, isServerDown, statusChecked } = useBackendStatus();

  const [entities, setEntities] = useState([]);
  const loadEntities = async () => {
    console.log(isOffline);

    if (isServerDown) {
      const queue = JSON.parse(localStorage.getItem("offlineWatchQueue")) || [];
      console.log(queue);
      const local = queue.map((op) => op.data);
      console.log(local);
      setEntities(local);
      return;
    }
    try {
      const data = await fetchWatches();
      setEntities(data);
    } catch (error) {
      console.error("Failed to fetch watches:", error);
    }
  };

  const syncQueue = async () => {
    const queue = loadQueue();
    if (queue.length === 0) return;

    try {
      for (const op of queue) {
        const formData = new FormData();

        if (
          op.data.media &&
          typeof op.data.media === "string" &&
          fileCache.has(op.data.media)
        ) {
          const files = fileCache.get(op.data.media);
          files.forEach((file) => formData.append("media", file));
        }

        formData.append("name", op.data.name);
        formData.append("category", op.data.category);
        formData.append("condition", op.data.condition);
        formData.append("description", op.data.description);
        formData.append("price", op.data.price);
        formData.append("seller", op.data.seller);

        if (op.type === "ADD") {
          await createWatch(formData);
        } else if (op.type === "EDIT") {
          await updateWatch(op.id, formData);
        } else if (op.type === "DELETE") {
          await deleteWatch(op.id);
        }
      }

      clearQueue();
      await loadEntities();
    } catch (err) {
      console.error("Failed to sync offline data:", err);
    }
  };

  // Load from backend
  useEffect(() => {
    if (!statusChecked) return;
    if (!isOffline && !isServerDown) {
      syncQueue();
    }
    // clearQueue();
    loadEntities();
  }, [isOffline, isServerDown, statusChecked]);

  const addEntity = async (newEntity) => {
    try {
      if (isOffline || isServerDown) {
        console.log("Cleaned Entity from FormData:", newEntity);
        console.log(entities);
        setEntities((prev) => [...prev, newEntity]);
        saveToQueue({ type: "ADD", data: newEntity });
        // await loadEntities();
        return;
      } else {
        console.log(newEntity);

        const data = new FormData();
        data.append("name", newEntity.name);
        data.append("category", newEntity.category);
        data.append("condition", newEntity.condition);
        data.append("description", newEntity.description);
        data.append("price", newEntity.price);
        data.append("seller", "John Doe");

        (newEntity.media || []).forEach((file) => {
          if (file instanceof File) {
            data.append("media", file);
          } else if (isEditing && file.id) {
            data.append("existing_media_ids", file.id); // keep reference to existing files
          }
        });

        const created = await createWatch(data);
        setEntities((prev) => [...prev, created]);
        await loadEntities();
      }
    } catch (error) {
      console.error("Failed to create watch:", error);
    }
  };

  const editEntity = async (entityId, updatedEntity) => {
    try {
      if (isOffline || isServerDown) {
        // const cleaned = {
        //   id: entityId,
        //   name: updatedEntity.get("name"),
        //   category: updatedEntity.get("category"),
        //   condition: updatedEntity.get("condition"),
        //   description: updatedEntity.get("description"),
        //   price: updatedEntity.get("price"),
        //   seller: updatedEntity.get("seller"),
        //   media: updatedEntity.getAll("media") || [],
        // };
        // setEntities((prev) =>
        //   prev.map((item) =>
        //     item.id === entityId ? { ...item, ...cleaned } : item
        //   )
        // );
        // saveToQueue({ type: "EDIT", id: entityId, data: cleaned });
        // return;
      } else {
        const data = new FormData();
        data.append("name", updatedEntity.name);
        data.append("category", updatedEntity.category);
        data.append("condition", updatedEntity.condition);
        data.append("description", updatedEntity.description);
        data.append("price", updatedEntity.price);
        data.append("seller", "John Doe");

        (updatedEntity.media || []).forEach((file) => {
          if (file instanceof File) {
            data.append("media", file);
          } else if (file.id) {
            data.append("existing_media_ids", file.id);
          }
        });

        console.log(entityId);
        console.log("Updating entity:", updatedEntity.media);
        const updated = await updateWatch(entityId, data);
        setEntities((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
      }
    } catch (error) {
      console.error("Failed to update watch:", error);
    }
  };

  const deleteEntity = async (id) => {
    try {
      if (isOffline || isServerDown) {
        setEntities((prev) => prev.filter((item) => item.id !== id));

        // saveToQueue({ type: "DELETE", id });

        return;
      } else {
        await deleteWatch(id);
        setEntities((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete watch:", error);
    }
  };

  return (
    <EntityContext.Provider
      value={{ entities, loadEntities, addEntity, deleteEntity, editEntity }}
    >
      {children}
    </EntityContext.Provider>
  );
};
