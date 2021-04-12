const { Belong, Channels } = require("../db/models");
const { jwtconfig } = require("../config/config"),
  jwt = require("jsonwebtoken");

module.exports = (socket) => {
  return async (data) => {
    const { channel_id, token } = data;
    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtconfig.secretKey, (err, user) => {
        if (!err) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });

    const channelData = await Channels.findByPk(channel_id);
    if (!channelData) {
      return;
    }

    const isBelong = await Belong.count({
      where: { user_id: user.id, server_id: channelData.server_id },
    });
    if (!isBelong) {
      return;
    }
    socket.join(channel_id);
  };
};
