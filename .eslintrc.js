module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    "vue/html-self-closing": ["warn", {
      "html": {
        "void": "never",
        "normal": "never",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/multiline-html-element-content-newline": ["warn", {
      "ignoreWhenEmpty": true,
      "allowEmptyLines": true,
    }]
  }
}
