const express = require("express"),
  router = express.Router();

router.use("/auth", require("./auth"));
router.use("/management", require("./management"));
router.use("/media", require("./media"));
router.post("/join", require("./join"));

module.exports = router;
