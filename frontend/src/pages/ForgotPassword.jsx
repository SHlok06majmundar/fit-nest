import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API } from '../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // For managing messages
  const { emailToChange } = useParams();
  const navigate = useNavigate();
  const showMessage = (msg, type = "error") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 8000); // Message disappears after 8 seconds
  };
  // Send OTP to the email
  const sendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(API.AUTH.SEND_OTP, {
        email: emailToChange ? emailToChange : email,
        reason: "forgot-password",
      }, {
        withCredentials: true
      });
      setOtpSent(true);
      setLoading(false);
      showMessage("OTP sent to your email.", "success");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
      showMessage("Error sending OTP. Please try again.");
    }
  };
  // Verify the OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post(API.AUTH.VERIFY_OTP, {
        email: emailToChange ? emailToChange : email,
        otp,
      }, { withCredentials: true });
      if (response.data.verified) {
        setOtpVerified(true);
        showMessage("OTP verified. You can now reset your password.", "success");
      } else {
        showMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showMessage("Error verifying OTP. Please try again.");
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios.post(API.AUTH.RESET_PASSWORD, {
        email: emailToChange ? emailToChange : email,
        newPassword,
      }, { withCredentials: true });
      showMessage("Password reset successfully! You can now log in.", "success");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      showMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-black p-6 rounded-lg shadow-lg w-96 border border-green-500"
        style={{ boxShadow: "0 0 15px 2px rgb(47, 112, 47)" }}
      >
        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-4">
          Forgot Password
        </h1>

        {/* Displaying message if any */}
        {message && (
          <div
            className={`p-2 mb-4 text-sm rounded-md ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message.text}
          </div>
        )}

        {!otpSent ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={emailToChange || email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter your email"
                disabled={!!emailToChange}
              />
            </div>
            <button
              onClick={sendOtp}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : !otpVerified ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter OTP"
              />
            </div>
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
                placeholder="Confirm new password"
              />
            </div>
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
