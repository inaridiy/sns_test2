const { Servers, Belong } = require("../../../db/models"),
  { jwtconfig } = require("../../../config/config");

const jwt = require("jsonwebtoken");

module.exports.enterServer = async (req, res, next) => {
  const { token } = req.query;
  try {
    const tokenData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtconfig.secretKey, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).catch((e) => {
      return res.status(400).json({
        message: "token is bad",
      });
    });
    await Belong.create({
      user_id: req.user.id,
      server_id: tokenData.id,
    });
    return res.json({
      message: "enter server done",
    });
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};
