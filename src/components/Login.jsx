import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  // ¡IMPORTANTE! Reemplaza con la URL de tu Google Apps Script Web App
  // Esta URL se obtiene después de desplegar tu script de Google Apps Script.
  const GOOGLE_APPS_SCRIPT_URL = import.meta.env.DEV
    ? "/api"
    : "https://script.google.com/macros/s/AKfycbx2vaSnkov3GiKDmqEtbfhDCc06uoA5_20FTL7bjbvBone3ylLo-r8h6aMLBPwwhkRb/exec";

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          action: "login",
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        onLoginSuccess(data.userData); // Guarda datos en estado
        navigate("/dashboard"); // 👈 Redirige tras login
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setMessage({
        type: "error",
        text: "Error de conexión. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
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
