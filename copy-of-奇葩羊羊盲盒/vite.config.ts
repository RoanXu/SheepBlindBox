import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 这里的 './' 非常重要，确保部署在子路径下也能找到资源
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})