const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Media = sequelize.define("media", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    path: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  //  Media.sync();

  return { Media };
};
