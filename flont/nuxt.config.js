export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",
  head: {
    titleTemplate: "%s - flont",
    title: "flont",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/socket.js", ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],
  router: {
    middleware: ["auth"]
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL: process.env.API_URL || "http://localhost:4000" },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "ja"
    }
  },
  auth: {
    redirect: {
      login: "/auth/login",
      logout: "/",
      callback: "/auth/login",
      home: "/channel"
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post", propertyName: "token" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/user", method: "get", propertyName: "user" }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "http://locahost:3000",
    apiURL: process.env.API_URL || "http://localhost:4000"
  }
};
