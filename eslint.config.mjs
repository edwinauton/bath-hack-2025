import globals from "globals";
import pluginJs from "@eslint/js";
import vue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...vue.configs["flat/essential"],
];
