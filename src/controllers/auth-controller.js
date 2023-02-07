const { validateRegister } = require("../validators/auth-validator");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

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
    // const value = validateLogin(req.body);
  } catch (err) {
    next(err);
  }
};
