import React from "react";

function Dashboard({ userData, onLogout }) {
  if (!userData) {
    return (
      <div className="container message error">
        No se encontraron datos de usuario.
      </div>
    );
  }

  return (
    <div className="container">
      <h2>
        Su consulta
        {userData["Número socio"] ||
          userData["Número Socio"] ||
          userData["socio"]}
      </h2>

      <div className="dashboard-data">
        {Object.entries(userData).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>

      <button
        onClick={onLogout}
        className="pure-button pure-button-primary logout-button"
      >
        Salir
      </button>
    </div>
  );
}

export default Dashboard;
