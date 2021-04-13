<template>
  <v-navigation-drawer app clipped right :value.sync="drawerRight">
    <v-list>
      <v-list-item
        v-for="user in users[$route.params.server_id]"
        :key="user.id"
        link
      >
        <v-list-item-avatar>
          <v-img :src="getIcon(user.icon)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            >{{ user.name
            }}<v-icon v-if="user.id === server.user_id" color="yellow darken-2"
              >mdi-star
            </v-icon></v-list-item-title
          ><v-list-item-subtitle>{{ user.profile }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    getIcon() {
      return value => (value ? this.$config.apiURL + "/" + value : "/icon.png");
    },

    ...mapState("channel", ["drawerRight"]),
    ...mapState("server", ["users", "server"])
  }
};
</script>
