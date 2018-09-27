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
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/sort-comp': 0,
    'no-mixed-operators': 0,
    'arrow-parens': 0,
  },
};
