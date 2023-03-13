module.exports = (sequelize, Datatypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      detail: {
        type: Datatypes.STRING
      }
    },
    { underscored: true }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Comment.belongsTo(models.Book, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

  return Comment;
};
