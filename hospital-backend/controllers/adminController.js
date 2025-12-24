const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createStaff = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["doctor", "receptionist", "pharmacist"].includes(role)) {
    return res.status(403).json({ message: "Invalid role" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.json({ message: "Staff account created successfully" });
};
