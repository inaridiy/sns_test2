export const state = () => ({
  drawer: false,
  drawerRight: false
});
export const mutations = {
  openNavi(state) {
    state.drawer = !state.drawer;
  },
  openNaviRight(state) {
    state.drawerRight = !state.drawerRight;
  }
};
