import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  // Get email from query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || "";
    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        form
      );

      alert("Password reset successful");
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            MediCare<span className="text-blue-600">+</span>
          </h1>
          <p className="text-slate-500 mt-1">
            Secure Account Recovery
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">

          <h2 className="text-xl font-semibold text-slate-800 text-center">
            Reset Password
          </h2>
          <p className="text-sm text-slate-500 text-center mt-1">
            Enter the OTP sent to your email and create a new password
          </p>

          {/* Form */}
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                OTP Code
              </label>
              <input
                type="text"
                required
                value={form.otp}
                onChange={(e) =>
                  setForm({ ...form, otp: e.target.value })
                }
                placeholder="6-digit OTP"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5
                           tracking-widest text-center
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                New Password
              </label>
              <input
                type="password"
                required
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium
                         hover:bg-blue-700 transition-all duration-300 shadow"
            >
              Reset Password
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center text-sm">
            <Link
              to="/"
              className="text-slate-500 hover:text-slate-700"
            >
              ← Back to Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-8">
          © {new Date().getFullYear()} MediCare+ Hospital Management System
        </p>
      </div>
    </div>
  );
}
