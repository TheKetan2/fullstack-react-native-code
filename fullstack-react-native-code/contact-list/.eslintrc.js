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
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'react/no-did-mount-set-state': 0, // https://github.com/yannickcr/eslint-plugin-react/issues/1110
    'react/no-typos': 0, // https://github.com/yannickcr/eslint-plugin-react/issues/1389
    'arrow-parens': 0,
  },
};
