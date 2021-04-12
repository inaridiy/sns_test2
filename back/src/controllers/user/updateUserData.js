const { Users } = require("../../db/models");

module.exports.updateUserData = async function (req, res, next) {
  const { name, path } = req.body;
  try {
    Users.update({ name, icon: path }, { where: { id: req.user.id } });
    return res.json({
      messge: "update User successfully",
    });
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};
