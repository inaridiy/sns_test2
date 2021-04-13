const express = require("express"),
  router = express.Router();

const { isAuth } = require("../../src/middlewares/isAuth");
const {
  getChannelData,
  createChannel,
  deleteChannel,
} = require("../../src/controllers/management/channelController");
const {
  getServerData,
  createServer,
  updateServer,
} = require("../../src/controllers/management/serverController");
const {
  getInvitationToken,
} = require("../../src/controllers/management/user/invitationController");
const {
  enterServer,
} = require("../../src/controllers/management/user/enterController");

router
  .route("/channel")
  .get(getChannelData)
  .post(isAuth, createChannel)
  .delete(deleteChannel);

router
  .route("/server")
  .get(getServerData)
  .post(isAuth, createServer)
  .put(isAuth, updateServer);

router.route("/invitation").get(isAuth, getInvitationToken);

router.route("/join").post(isAuth, enterServer);

module.exports = router;
