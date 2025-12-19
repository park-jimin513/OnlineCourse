import { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      setMessage(res.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-card">
      <h2 className="register-title">Register</h2>

      {message && <p className="message-text">{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
}
