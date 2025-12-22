import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    localStorage.setItem("token", res.data.token);

    alert(`Login Success - Role: ${res.data.role}`);
    // dashboard redirect later
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button>Login</button>

      {/* Navigation Links */}
      <p style={{ marginTop: "10px" }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <p>
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
