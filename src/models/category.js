module.exports = (sequelize, Datatypes) => {
  const Category = sequelize.define(
    "Category",
    {
      title: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Book, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Category;
};
