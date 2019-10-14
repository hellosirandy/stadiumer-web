module.exports = {
  extends: [
    'airbnb'
  ],
  parser: "babel-eslint",
  plugins: [
    'react',
    'import',
  ],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "import/prefer-default-export": 0
  },
  globals: {
    "window": true,
    "document": true,
    "fetch": true,
    "localStorage": true
  }
};
