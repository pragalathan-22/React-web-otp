import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PharmacistDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "pharmacist") {
      navigate("/login/pharmacist");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Pharmacist Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>Welcome, {localStorage.getItem("name")}!</p>
      <p>This is the Pharmacist Dashboard. Add your pharmacist features here.</p>
    </div>
  );
}

