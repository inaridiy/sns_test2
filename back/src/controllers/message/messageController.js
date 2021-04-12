const { Channels, Messages, Belong, Users } = require("../../db/models");

module.exports.postMessage = async (req, res, next) => {
  const { channel_id, message, media_id } = req.body;
  if (!channel_id || !message) {
    return res.status(400).json({
      message: "",
    });
  }
  try {
    const channelData = await Channels.findByPk(channel_id);
    if (!channelData) {
      return res.status(400).json({
        message: "channel not found",
      });
    }

    const isBelong = await Belong.count({
      where: { user_id: req.user.id, server_id: channelData.server_id },
    });
    if (!isBelong) {
      return res.status(400).json({
        message: "Not in the channel",
      });
    }

    const msgData = await Messages.create({
      channel_id,
      text: message,
      media_id,
      user_id: req.user.id,
    });
    const { io } = require("../../../app");
    io.to(channel_id).emit("newMessage", msgData);
    return res.json({
      message: "Post message done",
    });
  } catch (e) {
    next({ Stack: e, msg: "post message error", statusCode: 500 });
  }
};

module.exports.getMessage = async (req, res, next) => {
  const { channel_id, page = 1 } = req.query;
  console.log(req.query);
  if (!channel_id) {
    return res.status(400).json({
      message: "",
    });
  }

  try {
    const channelData = await Channels.findByPk(channel_id);
    if (!channelData) {
      return res.status(400).json({
        message: "channel not found",
      });
    }

    const isBelong = await Belong.count({
      where: { user_id: req.user.id, server_id: channelData.server_id },
    });
    if (!isBelong) {
      return res.status(400).json({
        message: "Not in the channel",
      });
    }
    const perPage = 50;

    const result = await Messages.findAndCountAll({
      where: { channel_id },
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [["updatedAt", "ASC"]],
    });

    res.json(result);
  } catch (e) {
    next({ Stack: e, msg: "post message error", statusCode: 500 });
  }
};
