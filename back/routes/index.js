const express = require("express"),
  router = express.Router();

router.use("/auth", require("./auth"));
router.use("/management", require("./management"));
router.use("/media", require("./media"));
router.use("/join", require("./join"));
router.use("/user", require("./user"));
router.use("/msg", require("./message"));
module.exports = router;
