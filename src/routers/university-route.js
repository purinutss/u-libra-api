const express = require("express");

const universityController = require("../controllers/university-controller");

const router = express.Router();

router.post("/create", universityController.createUniversity);
router.get("/get/:universityId", universityController.getUniversityById);

module.exports = router;
