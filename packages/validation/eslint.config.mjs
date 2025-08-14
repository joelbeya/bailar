// Configuration minimale pour ESLint
import js from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig} */
const config = [
  // Configuration de base
  js.configs.recommended,
  
  // Configuration spécifique au package de validation
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Règles de base
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      
      // Désactiver les règles problématiques
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default config;
