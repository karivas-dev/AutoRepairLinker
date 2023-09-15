// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Estado del usuario autenticado

  // Función para iniciar sesión
  const login = (token) => {
    // Lógica de inicio de sesión, por ejemplo, autenticación con un servidor
    setToken(token);
  };

  // Función para cerrar sesión
  const logout = () => {
    // Lógica de cierre de sesión, por ejemplo, eliminar el token de autenticación
    setToken(null);
  };

   // Función para obtener el token actual
    const getToken = () => {
        return token;
    };

    return (
        <AuthContext.Provider value={{ token, login, logout ,getToken}}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};