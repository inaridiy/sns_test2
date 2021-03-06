import Vue from "vue";
export const state = () => ({
  servers: {},
  setuped: false,
  messages: {},
  server: {},
  users: {},
  test: []
});

export const getters = {
  getUsers: state => {
    return state.users || [];
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
  addMessages(state, msg) {
    state.messages = {
      ...state.messages,
      [msg.channel_id]: { ...state.messages[msg.channel_id], [msg.id]: msg }
    };
  },
  addMessagesBulk(state, data) {
    data.rows.forEach(
      msg =>
        (state.messages = {
          ...state.messages,
          [msg.channel_id]: { ...state.messages[msg.channel_id], [msg.id]: msg }
        })
    );
  },
  setServer(state, server_id) {
    const server = state.servers[server_id];
    state.server = server;
  },
  setUsers(state) {
    Object.values(state.servers).forEach(server => {
      const temp = [];
      server.belongs.forEach(user => {
        temp.push(user.user);
      });
      state.users = { ...state.users, [server.id]: temp };
    });
  }
};

export const actions = {
  async setup({ rootState, commit, state, dispatch }) {
    if (!state.setuped) {
      await dispatch("getAllServerData");
      await dispatch("subscribeMessage");
      commit("setUsers");
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
    commit("addMessagesBulk", messages);
  }
};
