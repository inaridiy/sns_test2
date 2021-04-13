<template>
  <v-navigation-drawer :value.sync="drawer" app>
    <ShowMe />
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="server in servers"
        :key="server.id"
        link
        :to="getURL(server.id)"
      >
        <v-list-item-avatar>
          <v-img :src="getIcon(server.icon)"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ server.name }}
            <v-menu offset-y open-on-hover>
              <template v-slot:activator="{ on, attrs }"
                ><v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small v-if="server.user_id === $auth.user.id"
                    >mdi-dots-vertical</v-icon
                  >
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group>
                  <v-list-item :to="`/management/user/invitation/${server.id}`"
                    ><v-list-item-content>
                      <v-list-item-title>招待する</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item :to="`/management/server/${server.id}`"
                    ><v-list-item-content>
                      <v-list-item-title>設定</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <CreateServer />
    <JoinServer />
  </v-navigation-drawer>
</template>
<script>
import ShowMe from "~/components/navi/ShowMe";
import CreateServer from "~/components/navi/CreateServer";
import JoinServer from "~/components/navi/JoinServer";

import { mapState } from "vuex";
export default {
  components: { ShowMe, CreateServer, JoinServer },
  data: () => ({ dialog: false }),
  methods: {},
  computed: {
    getIcon() {
      return value => (value ? this.$config.apiURL + "/" + value : "/icon.png");
    },
    getURL() {
      return server_id => `/channel/${server_id}`;
    },
    ...mapState("server", ["servers"]),
    ...mapState("channel", ["drawer"])
  }
};
</script>
