module.exports = (sequelize, Datatypes) => {
  const Chapter = sequelize.define(
    "Chapter",
    {
      title: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: Datatypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Chapter.associate = (models) => {
    Chapter.belongsTo(models.Book, {
      foreignKey: {
        name: "bookId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Chapter;
};
