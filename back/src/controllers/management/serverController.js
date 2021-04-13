const { Channels, Servers, Belong, Users } = require("../../db/models");

module.exports.getServerData = async (req, res, next) => {
  const { server_id } = req.query;
  try {
    const server = await Servers.findByPk(server_id, {
      include: [
        { model: Channels },
        { model: Belong, include: [{ model: Users }] },
      ],
    });
    res.json(server);
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};

module.exports.createServer = async (req, res, next) => {
  const { name = "無名のサーバー" } = req.body,
    { id: user_id } = req.user;
  try {
    const server = await Servers.create({ name, user_id }).catch((e) => {
      throw new Error(e);
    });
    await Belong.create({
      user_id,
      server_id: server.id,
    });
    return res.json({
      message: "create server successfully",
    });
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};

module.exports.deleteChannel = async (req, res, next) => {
  const { channel_id } = req.query,
    { id: user_id } = req.user;

  const channelData = await Channels.findByPk(channel_id);

  if (!Object.keys(channelData).length) {
    return res.status(400).json({
      message: "channel not found",
    });
  }

  if (channelData.user_id === user_id) {
    channelData.destroy();
  } else {
    return res.status(400).json({
      message: "not match channel created user",
    });
  }
};

module.exports.updateServer = async (req, res, next) => {
  const { server_id, name, icon } = req.body;
  try {
    await Servers.findByPk(server_id).then((server) => {
      (server.name = name), (server.icon = icon);
      server.save();
    });
    return res.json({
      message: "update data ok",
    });
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};
