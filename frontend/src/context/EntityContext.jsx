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
const EntityContext = createContext();

// Custom hook for using the context
export const useEntities = () => useContext(EntityContext);

// // Context Provider
// export const EntityProvider = ({ children }) => {
//   const [entities, setEntities] = useState([]);

//   // Function to add an entity
//   const addEntity = (newEntity) => {
//     setEntities((prevEntities) => [
//       ...prevEntities,
//       { id: Date.now(), ...newEntity },
//     ]);
//   };

//   const deleteEntity = (id) => {
//     setEntities((prevEntities) =>
//       prevEntities.filter((entity) => entity.id !== id)
//     );
//   };

//   const editEntity = (updatedEntity) => {
//     setEntities((prevEntities) =>
//       prevEntities.map((entity) =>
//         entity.id === updatedEntity.id ? updatedEntity : entity
//       )
//     );
//   };

//   useEffect(() => {
//     const fakeWatches = generateFakeWatches(20);
//     setEntities(fakeWatches);
//   }, []);
export const EntityProvider = ({ children }) => {
  const [entities, setEntities] = useState([]);

  // Load from backend
  useEffect(() => {
    const loadEntities = async () => {
      try {
        const data = await fetchWatches();
        setEntities(data);
      } catch (error) {
        console.error("Failed to fetch watches:", error);
      }
    };

    loadEntities();
  }, []);

  const addEntity = async (newEntity) => {
    try {
      const created = await createWatch(newEntity);
      setEntities((prev) => [...prev, created]);
    } catch (error) {
      console.error("Failed to create watch:", error);
    }
  };

  const editEntity = async (updatedEntity) => {
    try {
      const updated = await updateWatch(updatedEntity.id, updatedEntity);
      setEntities((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (error) {
      console.error("Failed to update watch:", error);
    }
  };

  const deleteEntity = async (id) => {
    try {
      await apiDeleteWatch(id);
      setEntities((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete watch:", error);
    }
  };

  return (
    <EntityContext.Provider
      value={{ entities, addEntity, deleteEntity, editEntity }}
    >
      {children}
    </EntityContext.Provider>
  );
};
