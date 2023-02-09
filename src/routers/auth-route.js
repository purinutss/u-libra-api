const express = require("express");
const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/autehnticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
