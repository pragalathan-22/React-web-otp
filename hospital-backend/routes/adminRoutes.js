const express = require("express");
const router = express.Router();
const { createStaff } = require("../controllers/adminController");
const { auth, adminOnly } = require("../middleware/auth");

router.post("/create-user", auth, adminOnly, createStaff);

module.exports = router;
