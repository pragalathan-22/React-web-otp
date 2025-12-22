const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "doctor", "patient", "receptionist", "pharmacist"],
    default: "patient",
  },

  resetOTP: String,
  otpExpiry: Date,
});

module.exports = mongoose.model("User", userSchema);
