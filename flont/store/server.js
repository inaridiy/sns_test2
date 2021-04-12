export const state = () => ({
  servers: {},
  setuped: false,
  messages: {},
  server: {},
  users: {}
});

export const getters = {
  getMessages: state => channel_id => {
    const msgArray =
      state.message && Object.values(state.messages[channel_id]).length
        ? Object.values(state.messages[channel_id])
        : [];
    return msgArray
      ? msgArray.sort((a, b) => {
          new Date(b.updatedAt) - new Date(a.updatedAt);
        })
      : [];
  }
};

export const mutations = {
  setServerData(state, data) {
    state.servers = data;
  },
  setupDone(state) {
    state.setuped = true;
  },
  setMessageChannels(state, data) {
    state.messages[data] = {};
  },
  addMessages(state, data) {
    state.messages[data.channel_id][data.id] = data;
  },
  addMessagesBulk(state, data) {
    data.rows.forEach(msg => (state.messages[msg.channel_id][msg.id] = msg));
  },
  setServer(state, server_id) {
    const server = state.servers[server_id];
    state.server = server;
  },
  setUsers(state) {
    for (server of Object.values(state.servers)) {
      for (user of server.belongs) {
        state.users[user.user_id] = user.user;
      }
    }
  }
};

export const actions = {
  async setup({ rootState, commit, state, dispatch }) {
    if (!rootState.auth.user.id) {
      return;
    }
    if (!state.setuped) {
      await dispatch("getAllServerData");
      await dispatch("subscribeMessage");
      commit("setupDone");
    }
  },

  async getAllServerData({ commit }) {
    const serverData_beforeFormat = await this.$axios
      .$get("/user/belong")
      .catch(e => {
        console.log(e.response);
      });
    const serverData = {};

    serverData_beforeFormat.forEach(data => {
      serverData[data.server_id] = data.server;
      data.server.channels.forEach(channel =>
        commit("setMessageChannels", channel.id)
      );
    });

    commit("setServerData", serverData);
  },

  async subscribeMessage({ commit, state }) {
    const token = this.$auth.strategy.token.get().split(" ")[1];
    Object.keys(state.messages).forEach(key => {
      this.$socket.emit("join_channel", {
        channel_id: key,
        token
      });
    });
    this.$socket.on("newMessage", data => {
      commit("addMessages", data);
    });
  },
  async getMessage({ commit, state }, data) {
    const messages = await this.$axios
      .$get("/msg", { params: data })
      .catch(e => {
        console.log(e.response);
      });
    console.log(messages);
    commit("addMessagesBulk", messages);
  }
};
