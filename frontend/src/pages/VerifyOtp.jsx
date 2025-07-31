import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5 && value) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return alert("Not authenticated");

    fetch("https://deliveroo-yptw.onrender.com/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ otp: code }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid OTP");
        return res.json();
      })
      .then((data) => {
        setSuccess(data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      })
      .catch(() => setError("OTP verification failed"));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm max-xs:mx-5 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4 text-center">Verify OTP</h2>

        {success && <p className="text-green-600 text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="flex justify-between mb-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-10 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600 font-semibold"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
