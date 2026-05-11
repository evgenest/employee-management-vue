export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: ''
    }
  },
  vite: {
    optimizeDeps: {
      include: ['bootstrap']
    }
  }
})
