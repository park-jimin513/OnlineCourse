import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const requestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    }
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p className="msg">{message}</p>

        {step === 1 && (
          <form onSubmit={requestOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={resetPassword}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        )}

        {step === 3 && <p>Password reset successful! You can now login.</p>}
      </div>
    </div>
  );
}

