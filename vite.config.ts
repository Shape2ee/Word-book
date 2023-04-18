import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@customTypes', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@customModules', replacement: path.resolve(__dirname, 'src/module') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
    ]
  }

})
