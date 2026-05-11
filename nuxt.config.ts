export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://localhost:7186/api'
    }
  },
  vite: {
    optimizeDeps: {
      include: ['bootstrap/dist/js/bootstrap.bundle.min.js']
    }
  }
})
