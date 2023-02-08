const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validator");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const value = validateRegister(req.body);
    console.log(value);

    const user = await User.findOne({
      where: { email: { [Op.eq]: value.email } },
    });
    console.log(user);

    if (user) {
      createError("Email has already exist", 400);
    }
    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res.status(201).json({ message: "register successful, login to continue" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: { email: { [Op.eq]: value.email } },
    });

    if (!user) {
      createError("User not found, invalid email or password", 400);
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      createError("User not found, invalid email or password", 400);
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json(accessToken);
  } catch (err) {
    next(err);
  }
};
