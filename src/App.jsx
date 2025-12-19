import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page (with navbar & login/register buttons) */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Forgot Password flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
