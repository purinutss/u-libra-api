const { University } = require("../models");

exports.createUniversity = async (req, res, next) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json({ university });
  } catch (error) {
    next(error);
  }
};

exports.getUniversityById = async (req, res, next) => {
  try {
    const university = await University.findById(req.params.id);
    res.status(200).json({ university });
  } catch (error) {
    next(error);
  }
};
