import React, { createContext, useState, useContext } from 'react';

// Crea el contexto del usuario
const UserContext = createContext();

// Componente que proporciona el estado global del usuario
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para acceder al contexto del usuario
export function useUser() {
  return useContext(UserContext);
}
