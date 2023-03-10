const express = require("express");
const userController = require("../controllers/user-controller");

const upload = require("../middlewares/upload");
const router = express.Router();

router.patch("/profile", upload.single("profileImage"), userController.editProfile);
router.get("/profile/:userId", userController.getProfileById);

module.exports = router;
