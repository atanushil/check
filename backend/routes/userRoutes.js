const express = require("express");
const router = express.Router();
const authController = require("../controllers/userControllers");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

// Route accessible by all logged in users (admin or normal)
router.get("/protected", protect, authController.protected);

// Route accessible only by admins
router.get("/admin", protect, admin, authController.adminProtected);

module.exports = router;
