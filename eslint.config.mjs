
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ['**/node_modules/', '.dist/'],
    languageOptions: { globals: globals.browser },

    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

    rules: {
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }],
    },
    globals : {
      "process" : "readonly"
    }
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];