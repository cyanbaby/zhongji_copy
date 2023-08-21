module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },

  parser: "vue-eslint-parser",
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
