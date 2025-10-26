import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/strapi",
    "@hebilicious/vue-query-nuxt",
  ],
  strapi: {
    url: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  },
  vueQuery: {
    // Конфигурация для SSR
    stateKey: 'vueQuery',
    // DevTools в разработке
    devtools: process.env.NODE_ENV === 'development',
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});