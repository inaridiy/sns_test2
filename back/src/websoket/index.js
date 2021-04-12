module.exports.setup = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.sockets.on("connection", (socket) => {
    socket.on("join_channel", require("./socketJoinController")(socket));
    socket.on("post_message", require("./postMessage")(socket));
  });
  return io;
};
