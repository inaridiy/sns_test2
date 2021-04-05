const { Servers } = require("../../../db/models"),
  { jwtconfig } = require("../../../config/config");

const jwt = require("jsonwebtoken");

module.exports.getInvitationToken = async (req, res, next) => {
  const { server_id } = req.query;
  try {
    const { id, name, user_id } = await Servers.findByPk(server_id);
    if (user_id === req.user.id) {
      const token = jwt.sign({ id, name }, jwtconfig.secretKey);
      return res.json({ token });
    } else {
      return res.status(400).json({
        message: "The server does not exist or is not an administrator",
      });
    }
  } catch (e) {
    return next({ Stack: e, msg: "db error" });
  }
};
