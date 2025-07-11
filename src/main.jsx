import React from "react"; // <-- ¡IMPORTACIÓN AÑADIDA!
import ReactDOM from "react-dom/client";
// Importa el componente principal de tu aplicación
import App from "./App.jsx"; // Asegúrate de que la ruta sea correcta

// Importa los estilos globales. Vite se encargará de inyectarlos correctamente.
import "./index.css";

// Obtiene el elemento DOM donde se montará tu aplicación React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza el componente principal de tu aplicación dentro del modo estricto de React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
