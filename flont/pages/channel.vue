<template>
  <div>
    <AppBar />
    <Navi />
    <MembersNavi />
    <nuxt-child />
  </div>
</template>

<script>
import Navi from "~/components/navi/Navi";
import AppBar from "~/components/bar/AppBar";
import MembersNavi from "~/components/navi/MembersNavi";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: { Navi, AppBar, MembersNavi },
  data: () => ({ drawer: true, channels: [] }),
  async mounted() {
    await this.setup();
    this.updateServer();
    this.updateMessage(this.$route.params);
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path && this.setuped) {
        this.updateServer();
        this.updateMessage(to.params);
      }

      const channels = this.server.channels,
        expression =
          to.params.server_id && !to.params.channel_id && channels.length;

      expression &&
        this.$router.push(`/channel/${to.params.server_id}/${channels[0].id}`);
    }
  },
  computed: {
    getIcon() {
      return value => value || "/icon.png";
    },

    ...mapState("server", ["servers", "server", "setuped", "messages"])
  },
  methods: {
    async updateServer() {
      const { server_id } = this.$route.params;
      server_id && (await this.setServer(server_id));
    },
    async updateMessage({ channel_id }) {
      channel_id &&
        Object.keys(this.messages[channel_id]).length < 50 &&
        this.getMessage({ channel_id });
    },

    ...mapMutations("server", ["setServer"]),
    ...mapActions("server", ["setup", "getMessage"])
  }
};
</script>
