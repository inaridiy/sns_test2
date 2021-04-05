const { Servers, Belong } = require("../../../db/models");

module.exports.leaveServer = async (req, res, next) => {
  const { server_id, user_id } = req.query;
  try {
    const serverData = await Servers.findByPk(server_id);
    if (serverData.user_id === req.user.id || req.user.id === user_id) {
      await Belong.destroy({ where: { user_id, server_id } });
      return res.json({
        message: "Exit completed",
      });
    } else {
      return res.json({
        message: "Not qualified",
      });
    }
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};
