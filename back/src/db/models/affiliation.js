const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Belong = sequelize.define("belong", {
    server_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: "servers", key: "id" }, // 外部キー
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      references: { model: "users", key: "id" }, // 外部キー
      onUpdate: "cascade",
      onDelete: "cascade",
    },
  });

  Belong.sync();

  return { Belong };
};
