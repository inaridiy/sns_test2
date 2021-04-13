<template>
  <v-container>
    <FormCard title="サーバーの設定を変える">
      <v-form>
        <v-text-field
          v-model="user.name"
          :disabled="disabled"
          placeholder="サーバーの名前"
        />
        <v-file-input
          accept="image/*"
          label="サーバーアイコンを選択するのじゃ"
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
import FormCard from "~/components/form/formCard.vue";

export default {
  components: { FormCard },
  data() {
    return {
      error: "",
      disabled: false,

      user: {
        name: "",
        file: null
      }
    };
  },
  methods: {
    async changeFile(e) {
      this.user.file = e;
    },
    async submit() {
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
        const { server_id } = this.$route.params;
        const { name } = this.user;
        await this.$axios.$put("/management/server", {
          name,
          icon: fileData?.mediaData.path,
          server_id
        });

        this.$router.push("/channel/" + server_id);
      } catch (e) {
        console.log(e);
        this.error = "入力内容にエラーがあります";
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
