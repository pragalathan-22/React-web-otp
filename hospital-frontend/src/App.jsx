import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTypeSelection from "./pages/UserTypeSelection";
import RoleLogin from "./pages/RoleLogin";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/dashboards/Admin/AdminDashboard";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import ReceptionistDashboard from "./pages/dashboards/ReceptionistDashboard";
import PharmacistDashboard from "./pages/dashboards/PharmacistDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/login/:role" element={<RoleLogin />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
        <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
