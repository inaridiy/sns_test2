const Sequelize = require("sequelize"),
  path = require("path"),
  { databaseLogger } = require("../../logger/logger");

const sequelize = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: path.join(__dirname, "../../../db.db"),
  logging: (log) => {
    databaseLogger.debug(log);
  },
});

const { Users } = require("./users")(sequelize),
  { Servers } = require("./servers")(sequelize),
  { Channels } = require("./channels")(sequelize),
  { Messages } = require("./messages")(sequelize),
  { Media } = require("./media")(sequelize),
  { Belong } = require("./affiliation")(sequelize);

Servers.hasMany(Channels, { foreignKey: "server_id", sourceKey: "id" });
Servers.hasMany(Belong, { foreignKey: "server_id", sourceKey: "id" });
Belong.hasOne(Users, { foreignKey: "id", sourceKey: "user_id" });
Belong.hasOne(Servers, { foreignKey: "id", sourceKey: "server_id" });

Users.sync();
Servers.sync();
Channels.sync();
Messages.sync();
Media.sync();
Belong.sync();

module.exports = {
  sequelize,
  Users,
  Servers,
  Channels,
  Messages,
  Media,
  Belong,
};
