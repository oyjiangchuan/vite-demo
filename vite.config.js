import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import { assetFileNames, manualChunks } from './build/vite/output'
import { configPath, resolve, root, wrapperEnv } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // console.log('mode==', mode)
  return {
    envDir: configPath,
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    plugins: [
      vue()
      // legacy({
      //   targets: ['ie >= 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // })
    ],
    css: {
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCaseOnly'
      },
      preprocessorOptions: {
        less: {
          // modifyVars: {
          // 	hack: `true; @import (reference) "@/styles/global/index.less";`,
          // },import { supportBuild } from './parts';
          javascriptEnabled: true
        }
      }
    },
    build: {
      assetsDir: 'assetsDir',
      rollupOptions: {
        plugins: [dynamicImportVars()],
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          assetFileNames: assetFileNames,
          manualChunks: manualChunks
        }
      }
    }
  }
})
