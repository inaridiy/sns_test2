const { Media, Belong, Servers, Channels, Users } = require("../../db/models/");
const servers = require("../../db/models/servers");

module.exports.getUserServer = async (req, res, next) => {
  try {
    const belongData = await Belong.findAll({
      where: { user_id: req.user.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Servers,
          include: [
            { model: Channels },
            { model: Belong, include: [{ model: Users }] },
          ],
        },
      ],
    });
    res.json(belongData);
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};
