import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReceptionistDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "receptionist") {
      navigate("/login/receptionist");
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
        <h1>Receptionist Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>Welcome, {localStorage.getItem("name")}!</p>
      <p>This is the Receptionist Dashboard. Add your receptionist features here.</p>
    </div>
  );
}

