import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const submit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    alert("Registered Successfully");
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>

      <select onChange={(e)=>setForm({...form,role:e.target.value})}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
        <option value="receptionist">Receptionist</option>
        <option value="pharmacist">Pharmacist</option>
      </select>

      <button>Register</button>
    </form>
  );
}
