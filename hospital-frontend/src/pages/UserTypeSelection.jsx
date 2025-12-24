import { useNavigate } from "react-router-dom";

export default function UserTypeSelection() {
  const navigate = useNavigate();

  const userTypes = [
    { role: "admin", label: "Administrator", description: "System & User Management" },
    { role: "doctor", label: "Doctor", description: "Patient Diagnosis & Treatment" },
    { role: "patient", label: "Patient", description: "Appointments & Medical Records" },
    { role: "receptionist", label: "Receptionist", description: "Appointments & Front Desk" },
    { role: "pharmacist", label: "Pharmacist", description: "Medicine & Prescriptions" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-800">
            MediCare<span className="text-blue-600">+</span> Management System
          </h1>
          <p className="text-slate-600 mt-2">
            Select your role to continue
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userTypes.map((user) => (
            <button
              key={user.role}
              onClick={() => navigate(`/login/${user.role}`)}
              className="group bg-white border border-slate-200 rounded-xl p-6 text-left
                         hover:border-blue-500 hover:shadow-lg
                         transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">
                  {user.label}
                </h3>
                <span className="text-xs uppercase tracking-wide 
                                 bg-blue-50 text-blue-600 
                                 px-3 py-1 rounded-full">
                  Login
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                {user.description}
              </p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-12">
          © {new Date().getFullYear()} MediCare+ Hospital Management System
        </p>
      </div>
    </div>
  );
}
