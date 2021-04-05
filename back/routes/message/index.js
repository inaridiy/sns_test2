const express = require("express"),
  router = express.Router();

const { isAuth } = require("../../src/middlewares/isAuth"),
  {
    postMessage,
    getMessage,
  } = require("../../src/controllers/message/messageController");

router.route("/").get(isAuth, getMessage).post(isAuth, postMessage);

module.exports = router;
