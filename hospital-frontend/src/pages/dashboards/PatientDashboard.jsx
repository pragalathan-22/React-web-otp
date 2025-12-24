import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "patient") {
      navigate("/login/patient");
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
        <h1>Patient Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>Welcome, {localStorage.getItem("name")}!</p>
      <p>This is the Patient Dashboard. Add your patient features here.</p>
    </div>
  );
}

