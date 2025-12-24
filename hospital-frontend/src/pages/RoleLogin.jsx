import { useState, useEffect } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function RoleLogin() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const validRoles = ["admin", "doctor", "patient", "receptionist", "pharmacist"];

  const roleLabels = {
    admin: "Administrator",
    doctor: "Doctor",
    patient: "Patient",
    receptionist: "Receptionist",
    pharmacist: "Pharmacist",
  };

  const roleDashboards = {
    admin: "/admin/dashboard",
    doctor: "/doctor/dashboard",
    patient: "/patient/dashboard",
    receptionist: "/receptionist/dashboard",
    pharmacist: "/pharmacist/dashboard",
  };

  // 🔒 Validate role
  useEffect(() => {
    if (!validRoles.includes(role)) {
      navigate("/");
    }
  }, [role, navigate]);

  if (!role || !validRoles.includes(role)) return null;

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ ...form, role });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      alert(`Welcome ${res.data.name}`);
      navigate(roleDashboards[res.data.role] || "/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
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
            {roleLabels[role]} Login Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">

          {/* Role Badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
              {roleLabels[role]}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-slate-800 text-center">
            Sign in to your account
          </h2>
          <p className="text-sm text-slate-500 text-center mt-1">
            Enter your credentials to continue
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
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
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
              Login
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

            {role === "patient" && (
              <p className="mt-3 text-slate-600">
                Don’t have an account?{" "}
                <Link
                  to="/register/patient"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Register
                </Link>
              </p>
            )}

            <Link
              to="/"
              className="block mt-4 text-slate-500 hover:text-slate-700"
            >
              ← Back to Role Selection
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
