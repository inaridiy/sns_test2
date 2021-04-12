export const state = () => ({
  drawer: false
});
export const mutations = {
  openNavi(state) {
    state.drawer = !state.drawer;
  }
};
