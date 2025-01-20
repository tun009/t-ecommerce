import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // get port config from environments
  const port = parseInt(env.VITE_PORT) ?? 5173
  const isExposeHost = env.VITE_IS_EXPOSE_HOST === 'true'
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: port,
      host: isExposeHost
    },
    preview: {
      port: port,
      host: isExposeHost
    },
    build: {
      chunkSizeWarningLimit: 1600
    }
  }
})
