/** @format */

"use client";

import { createContext, useState, useContext } from "react";

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

  return (
    <EntityContext.Provider value={{ entities, addEntity, deleteEntity }}>
      {children}
    </EntityContext.Provider>
  );
};
