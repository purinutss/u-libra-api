module.exports = (sequelize, Datatypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      summary: {
        type: Datatypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      bookCover: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  Book.associate = (models) => {
    Book.hasMany(models.Comment, {
      foreignKey: {
        name: "bookId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Book.belongsTo(models.University, {
      foreignKey: {
        name: "universityId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Book.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Book;
};
