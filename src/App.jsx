import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./index.css"; // Importa los estilos globales desde el nuevo index.css

function App() {
  // Estado para controlar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para almacenar los datos del usuario logueado
  const [userData, setUserData] = useState(null);

  // useEffect para manejar la persistencia del login con localStorage
  useEffect(() => {
    // Al cargar la aplicación, intenta recuperar los datos del usuario de localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
        setIsLoggedIn(true);
      } catch (e) {
        // En caso de error al parsear (ej. datos corruptos), limpiar localStorage
        console.error("Error parsing stored user data:", e);
        localStorage.removeItem("userData");
      }
    }
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  // Función que se llama cuando el login es exitoso
  const handleLoginSuccess = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
    // Guarda los datos del usuario en localStorage para que persista la sesión
    localStorage.setItem("userData", JSON.stringify(data));
  };

  // Función que se llama para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    // Elimina los datos del usuario de localStorage
    localStorage.removeItem("userData");
  };

  return (
    <div className="App">
      {/* Renderizado condicional: muestra Login si no está logueado, Dashboard si sí lo está */}
      {isLoggedIn ? (
        <Dashboard userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
