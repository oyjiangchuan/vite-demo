module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended', 'prettier'],
  settings: {
    'import/resolver': {
      alias: [['@', './src']]
    }
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  // 第三方插件
  // vue
  plugins: ['eslint-plugin-vue', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', 'never'],
    'no-spaced-func': 'off', // 变量声明未使用
    'no-tabs': 'off',
    'no-unused-vars': 'off',
    eqeqeq: 'off',
    semi: ['error', 'never'],
    'vue/require-default-prop': 1,
    'vue/multi-word-component-names': 0,
    'vue/eqeqeq': [2, 'always', { null: 'ignore' }],
    'vue/max-attributes-per-line': [0, { singleline: 1, multiline: { max: 1, allowFirstLine: false } }]
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
