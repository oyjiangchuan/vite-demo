module.exports = {
  //  依赖环境
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // extends: ['eslint:recommended', 'prettier'],
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  // 第三方插件
  plugins: ['eslint-plugin-vue'],
  // 规则 0不处理，1警告，2错误并退出
  rules: {
    'no-var': 2,
    'no-eval': 2,
    'no-alert': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-console': process.env.NODE_ENV !== 'production' ? 0 : [1, { allow: ['warn', 'error'] }],
    'no-restricted-syntax': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    eqeqeq: [2, 'always', { null: 'ignore' }],
    semi: [2, 'always', { omitLastInOneLineBlock: true }],
    'prefer-rest-params': 1,
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': 0,
    'space-infix-ops': 2,
    'space-before-blocks': 2,
    'block-spacing': [2, 'always'],
    'space-before-function-paren': 0,
    'no-lonely-if': 2,
    'vue/require-default-prop': 2,
    'vue/multi-word-component-names': 0,
    'vue/eqeqeq': [2, 'always', { null: 'ignore' }],
    'vue/max-attributes-per-line': [0, { singleline: 1, multiline: { max: 1, allowFirstLine: false } }]
  }
}
