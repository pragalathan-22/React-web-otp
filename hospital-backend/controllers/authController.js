const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/mail");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔒 Only patient can self-register
    const role = "patient";

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};


// LOGIN
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  // If role is provided in request, validate it matches user's role
  if (role && user.role !== role) {
    return res.status(403).json({ 
      message: `This login is for ${role} only. Your account is ${user.role}.` 
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    role: user.role,
    name: user.name,
  });
};

// SEND OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.resetOTP = hashedOTP;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      html: `<h3>Your OTP is: ${otp}</h3>
             <p>Use this code to reset your password. No links are required.</p>
             <p>This code expires in 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    res
      .status(500)
      .json({ message: "Failed to send OTP email. Check server logs." });
  }
};

// VERIFY OTP & RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const hashedOTP = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  const user = await User.findOne({
    email,
    resetOTP: hashedOTP,
    otpExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOTP = undefined;
  user.otpExpiry = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};
