const { Users } = require("../../db/models/");

module.exports.getUserData = async (req, res, next) => {
  try {
    if (!req.query.user_id)
      return res.status(400).json({
        message: "Exit completed",
      });
    const UserData = await Users.findByPk(req.query.user_id);
    res.json(UserData);
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};
