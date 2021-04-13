<template>
  <v-container>
    <FormCard title="自分の設定を変える">
      <v-form>
        <NameInput :name.sync="user.name" :disabled="disabled" />
        <ProfInput :name.sync="user.prof" :disabled="disabled" />
        <v-file-input
          accept="image/*"
          label="プロフィール画像を選択するのじゃ"
          @change="changeFile"
        ></v-file-input>
        <v-card-actions>
          <v-btn class="info" @click="submit" :disabled="disabled">変更</v-btn>
        </v-card-actions>
      </v-form>
    </FormCard>
    <transition
      ><v-alert
        v-if="error"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        {{ error }}
      </v-alert></transition
    >
  </v-container>
</template>

<script>
import NameInput from "~/components/form/nameInput.vue";
import ProfInput from "~/components/form/ProfInput.vue";
import FormCard from "~/components/form/formCard.vue";

export default {
  components: { NameInput, FormCard, ProfInput },
  data() {
    return {
      error: "",
      disabled: false,

      user: {
        name: "",
        prof: "",
        file: null
      }
    };
  },
  methods: {
    async changeFile(e) {
      this.user.file = e;
    },
    async submit() {
      const user = this.user;
      this.disabled = true;
      try {
        let fileData;
        if (this.user.file) {
          const params = new FormData();
          params.append("file", this.user.file);

          fileData = await this.$axios.$post("/media", params, {
            headers: {
              "content-type": "multipart/form-data"
            }
          });
        }
        console.log(this.user);
        const { name, prof } = this.user;
        await this.$axios.$post("/user", {
          name,
          prof,
          path: fileData?.mediaData.path
        });
        await this.$auth.logout();
        this.$router.push("/auth/login");
      } catch (e) {
        console.log(e);
        this.error = "パスワードまたはEmailが間違ってます";
        this.disabled = false;
      }
    }
  }
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
