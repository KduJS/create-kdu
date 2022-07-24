import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'wite'
import kdu from '@witejs/plugin-kdu'

// https://witejs.web.app/config/
export default defineConfig({
  plugins: [kdu()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
