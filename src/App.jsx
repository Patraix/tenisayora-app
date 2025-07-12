import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [userData, setUserData] = React.useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <Navigate to="/dashboard" replace />
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
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
