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

  const roleLabels = {
    admin: "Administrator",
    doctor: "Doctor",
    patient: "Patient",
    receptionist: "Receptionist",
    pharmacist: "Pharmacist",
  };

  const dashboards = {
    admin: "/admin/dashboard",
    doctor: "/doctor/dashboard",
    patient: "/patient/dashboard",
    receptionist: "/receptionist/dashboard",
    pharmacist: "/pharmacist/dashboard",
  };

  useEffect(() => {
    if (!roleLabels[role]) {
      navigate("/");
    }
  }, [role, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ ...form, role });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      navigate(dashboards[res.data.role]);
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            {roleLabels[role]} Login
          </h1>
          <p className="text-slate-500 mt-1">
            Access your dashboard securely
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg
                       hover:bg-blue-700 transition font-medium"
          >
            Sign In
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

          <p className="mt-3 text-slate-600">
            Don’t have an account?{" "}
            <Link
              to={`/register/${role}`}
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>

          <p className="mt-4">
            <Link
              to="/"
              className="text-slate-500 hover:text-slate-700"
            >
              ← Back to Role Selection
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
