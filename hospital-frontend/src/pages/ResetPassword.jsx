import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || "";
    if (email) setForm((prev) => ({ ...prev, email }));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        form
      );

      alert("Password reset successful");
      navigate("/"); // back to login
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to reset password";
      alert(message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Reset Password</h2>
      <p>Enter the OTP sent to your email and set a new password.</p>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="OTP"
        value={form.otp}
        onChange={(e) => setForm({ ...form, otp: e.target.value })}
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) =>
          setForm({ ...form, newPassword: e.target.value })
        }
      />

      <button>Reset Password</button>
    </form>
  );
}
