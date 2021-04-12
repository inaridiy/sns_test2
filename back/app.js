const express = require("express"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT || 4000,
  server = require("http").createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { setup } = require("./src/websoket"),
  io = setup(server);

const log4js = require("log4js"),
  { systemLogger, accessLogger } = require("./src/logger/logger");
app.use(log4js.connectLogger(accessLogger));

app.use(express.static("./medias/"));

const routes = require("./routes"); // Routeのインポート

app.use("/", routes);

const { logErrors, errorHandler } = require("./src/middlewares/error");
app.use(logErrors);
app.use(errorHandler);

(async () => {
  server.listen(port, () => {
    systemLogger.info("system start");
  });
})();

module.exports.io = io;
