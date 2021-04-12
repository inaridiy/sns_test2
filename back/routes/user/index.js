const express = require("express"),
  router = express.Router();

const { isAuth } = require("../../src/middlewares/isAuth"),
  { getUserServer } = require("../../src/controllers/user/getUserServer"),
  { updateUserData } = require("../../src/controllers/user/updateUserData");

router.route("/belong").get(isAuth, getUserServer);
router.route("/").post(isAuth, updateUserData);

module.exports = router;
