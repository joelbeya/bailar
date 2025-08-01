import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Désactiver temporairement les règles problématiques
      '@typescript-eslint/no-unused-expressions': 'off',
      // Ajouter d'autres règles personnalisées si nécessaire
    },
  },
];
