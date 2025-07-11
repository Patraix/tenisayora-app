import React, { useState } from "react";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  // ¡IMPORTANTE! Reemplaza con la URL de tu Google Apps Script Web App
  // Esta URL se obtiene después de desplegar tu script de Google Apps Script.
  const GOOGLE_APPS_SCRIPT_URL = "/api";
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" }); // Limpiar mensajes anteriores
    setIsLoading(true);

    // Validar que la URL de Apps Script ha sido actualizada
    if (GOOGLE_APPS_SCRIPT_URL === "TU_URL_DE_APPS_SCRIPT_AQUI") {
      setMessage({
        type: "error",
        text: "Por favor, actualiza GOOGLE_APPS_SCRIPT_URL en Login.jsx con la URL de tu Google Apps Script.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        // 'cors' es crucial para que el navegador permita la petición entre tu app React (localhost)
        // y los servidores de Google Apps Script.
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login", // Indica al script que realice la acción de login
          username: username,
          password: password,
        }),
      });

      const data = await response.json(); // Parsear la respuesta JSON del script

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        // Si el login es exitoso, llama a la función onLoginSuccess
        // para pasar los datos del usuario al componente padre (App.jsx)
        onLoginSuccess(data.userData);
      } else {
        // Si el login falla, muestra el mensaje de error del script
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      // Captura cualquier error de red o de la petición
      console.error("Error al intentar iniciar sesión:", error);
      setMessage({
        type: "error",
        text: "Error de conexión. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="container">
      <h1>Club de tenis Ayora</h1>
      <h2>Consulta de datos</h2>
      <form className="pure-form pure-form-stacked" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="username">Número de Socio:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ej: 100"
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ej: 12345678P"
          />

          <button
            type="submit"
            className="pure-button pure-button-primary"
            disabled={isLoading}
          >
            {isLoading ? "Validando.." : "Consultar"}
          </button>
        </fieldset>
      </form>
      {/* Muestra mensajes de éxito o error */}
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
}

export default Login;
