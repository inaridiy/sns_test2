const express = require("express"),
  router = express.Router();

const { isAuth } = require("../../src/middlewares/isAuth");
const {
  enterServer,
} = require("../../src/controllers/management/user/enterController");
const {
  leaveServer,
} = require("../../src/controllers/management/user/leaveController");

router.route("/").post(isAuth, enterServer).delete(isAuth, leaveServer);

module.exports = router;
