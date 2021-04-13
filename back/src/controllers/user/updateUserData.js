const { Users } = require("../../db/models");

module.exports.updateUserData = async function (req, res, next) {
  const { name, path, prof } = req.body;

  try {
    await Users.update(
      { name, icon: path, profile: prof },
      { where: { id: req.user.id } }
    );
    return res.json({
      messge: "update User successfully",
    });
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};
