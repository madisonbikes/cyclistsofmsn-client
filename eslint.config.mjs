import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginPromise from "eslint-plugin-promise";
import importPlugin from "eslint-plugin-import";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

const projectIgnores = {
  ignores: [
    "node_modules/**",
    "dist/**",
    "**/*.css",
    "**/*.svg",
    "**/*.js",
    "eslint.config.mjs",
    "**/.*",
  ],
};

const projectRules = {
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn", // or error
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    eqeqeq: ["warn", "smart"],
    "require-await": ["warn"],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true },
    ],
    ...pluginReactHooks.configs.recommended.rules,
  },
};

export default tseslint.config(
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: {},
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  pluginPromise.configs["flat/recommended"],
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  projectIgnores,
  projectRules,
);
