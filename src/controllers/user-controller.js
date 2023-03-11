const { User } = require("../models");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.editProfile = async (req, res, next) => {
  try {
    let profileImageUrl;
    if (req.file) {
      profileImageUrl = await cloudinary.upload(req.file.path);
    }
    // const editProfile = await User.update(
    //   {
    //     profileImage: profileImageUrl,
    //     username: req.body.username,
    //     bio: req.body.bio
    //   },
    //   { where: { id: req.user.id } }
    // );

    const { profileImage, username, bio } = req.body;
    const value = { profileImage: profileImageUrl, username, bio };

    const updateUser = await User.update(value, { where: { id: req.user.id } });

    res.status(200).json({ value });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getProfileById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
