import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import { assetFileNames, manualChunks } from './build/vite/output'
import { configPath, resolve, root, wrapperEnv } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isBuild = mode === 'production'

  // 根据VITE命令设置NODE环境变量
  process.env.NODE_ENV = mode

  const env = loadEnv(mode, configPath)

  const viteEnv = wrapperEnv(env)
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root: root,
    envDir: configPath,
    envPrefix: 'GLOBAL',
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
          manualChunks: manualChunks,
          assetFileNames: assetFileNames
        }
      }
    }
  }
})
