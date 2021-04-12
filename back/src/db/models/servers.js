const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Servers = sequelize.define(
    "server",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      icon: {
        type: Sequelize.INTEGER,
      },
    },
    {
      scopes: {},
    }
  );

  //Servers.sync();

  return { Servers };
};
