import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

const resolve = (relativePath) => {
  return path.resolve(__dirname, relativePath)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  plugins: [
    vue(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ]
  // build: {
  //   assetsDir: 'static/img/',
  //   rollupOptions: {
  //     output: {
  //       chunkFileNames: 'static/js/[name]-[hash].js',
  //       entryFileNames: 'static/js/[name]-[hash].js',
  //       assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
  //     }
  //   }
  // }
})
