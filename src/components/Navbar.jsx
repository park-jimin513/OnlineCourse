import React, { useState, useEffect } from "react";
import "./Navbar.css";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload(); // refresh UI
  };

  return (
    <>
      <nav className="navbar-custom">
        <div className="navbar-container">
          <h2 className="navbar-brand">MyApp</h2>

          <div className="navbar-buttons">
            {!isLoggedIn ? (
              <>
                <button className="btn-nav" onClick={() => setShowLogin(true)}>
                  Login
                </button>
                <button
                  className="btn-nav"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
              </>
            ) : (
              <button className="btn-nav logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && !isLoggedIn && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              ✕
            </button>
            <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && !isLoggedIn && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button
              className="close-btn"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>
            <RegisterPage />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
