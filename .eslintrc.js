module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    browser: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ["react", "@typescript-eslint", "no-autofix"],
  rules: {
    "prefer-const": "off",
    "no-autofix/prefer-const": "error"
  },
};
