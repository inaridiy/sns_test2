import { io } from "socket.io-client";

export default (context, inject) => {
  const socket = io(context.$config.apiURL);
  inject("socket", socket);
  context.$socket = socket;
};
