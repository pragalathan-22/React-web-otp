const nodemailer = require("nodemailer");

// Gmail SMTP transporter; requires an app password when 2FA is enabled.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Warn early if credentials are missing or invalid to make debugging easier.
transporter.verify().catch((err) => {
  console.error("Email transporter verification failed:", err.message);
});

module.exports = transporter;
