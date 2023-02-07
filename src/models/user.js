module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      telephone: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 8,
        },
      },
      profileImage: {
        type: Datatypes.STRING,
      },
      role: {
        type: Datatypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Comment, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return User;
};
