/** @format */

"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { generateFakeWatches } from "@/utils/FakeData";
// Create context
const EntityContext = createContext();

// Custom hook for using the context
export const useEntities = () => useContext(EntityContext);

// Context Provider
export const EntityProvider = ({ children }) => {
  const [entities, setEntities] = useState([]);

  // Function to add an entity
  const addEntity = (newEntity) => {
    setEntities((prevEntities) => [
      ...prevEntities,
      { id: Date.now(), ...newEntity },
    ]);
  };

  const deleteEntity = (id) => {
    setEntities((prevEntities) =>
      prevEntities.filter((entity) => entity.id !== id)
    );
  };

  const editEntity = (updatedEntity) => {
    setEntities((prevEntities) =>
      prevEntities.map((entity) =>
        entity.id === updatedEntity.id ? updatedEntity : entity
      )
    );
  };

  useEffect(() => {
    const fakeWatches = generateFakeWatches(20);
    setEntities(fakeWatches);
  }, []);

  return (
    <EntityContext.Provider
      value={{ entities, addEntity, deleteEntity, editEntity }}
    >
      {children}
    </EntityContext.Provider>
  );
};
