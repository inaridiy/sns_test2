const express = require("express"),
  router = express.Router(),
  multipart = require("connect-multiparty"),
  multipartMiddleware = multipart();

const { isAuth } = require("../../src/middlewares/isAuth"),
  { mediaUpload } = require("../../src/controllers/media/mediaController");

router.route("/").post(isAuth, multipartMiddleware, mediaUpload);

module.exports = router;
