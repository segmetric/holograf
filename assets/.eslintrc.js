module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "plugin:jsdoc/recommended-error"],
  globals: {
    Elixir_Enum: "readonly",
    Elixir_Kernel: "readonly",
    Erlang: "readonly",
    Erlang_maps: "readonly",
    Hologram: "readonly",
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jsdoc"],
  rules: {
    "no-unused-vars": [
      "error",
      {argsIgnorePattern: "^_", varsIgnorePattern: "^_"},
    ],
  },
};
