const path = require('path')
import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3001,
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  build: {
    outDir: 'front'
  }})