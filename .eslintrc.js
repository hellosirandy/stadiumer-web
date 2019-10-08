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
  },
  globals: {
    "window": true
  }
};
