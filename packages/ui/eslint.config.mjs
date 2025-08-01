<<<<<<< HEAD
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        React: 'writable',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Désactiver temporairement les règles problématiques
      '@typescript-eslint/no-unused-expressions': 'off',
      // Règles spécifiques à React
      'react/react-in-jsx-scope': 'off', // Pas nécessaire avec les nouvelles versions de React
      'react/prop-types': 'off', // On utilise TypeScript pour les types
    },
  },
];
=======
import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default config;
>>>>>>> origin/main
