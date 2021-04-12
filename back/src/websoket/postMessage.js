module.exports = (socket) => {
  return async (data) => {
    const { channel_id, msg } = data;
    socket.broadcast.to(channel_id).emit("newMessage", msg);
  };
};
