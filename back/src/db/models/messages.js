const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Messages = sequelize.define("messages", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: Sequelize.STRING },
    channel_id: {
      type: Sequelize.INTEGER,
    },
    media_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.STRING,
    },
  });

  // Messages.sync();

  return { Messages };
};
