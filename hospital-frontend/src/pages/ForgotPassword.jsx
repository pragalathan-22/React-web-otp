import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert("OTP sent to your email");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to send OTP";
      alert(message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Forgot Password</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button>Send OTP</button>
    </form>
  );
}
