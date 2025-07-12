import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
  };

  const handleLogout = () => {
    setUserData(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            userData ? (
              <Dashboard userData={userData} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
