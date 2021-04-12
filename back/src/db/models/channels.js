const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Channels = sequelize.define(
    "channel",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
      type: { type: Sequelize.INTEGER },
      server_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      scopes: {},
    }
  );

  //Channels.sync();

  return { Channels };
};
