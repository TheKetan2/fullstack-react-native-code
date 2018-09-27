module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    fetch: false,
    navigator: false,
    XMLHttpRequest: false,
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'no-console': 0,
    'no-loop-func': 0,
    'no-plusplus': 0,
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'react/no-did-mount-set-state': 0,
    'react/prefer-stateless-function': 0,
    'react/sort-comp': 0,
    'no-mixed-operators': 0,
    'arrow-parens': 0,
  },
};
