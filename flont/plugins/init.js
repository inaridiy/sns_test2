export default async ({ store }) => {
  if (store.state.auth.loggedIn) {
    // await store.dispatch("server/getAllServerData");
  }
};
