module.exports = (sequelize, Datatypes) => {
  const University = sequelize.define(
    "University",
    {
      name: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  University.associate = (models) => {
    University.hasMany(models.Book, {
      foreignKey: {
        name: "universityId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return University;
};
