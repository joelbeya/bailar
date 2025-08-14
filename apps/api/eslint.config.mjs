// Configuration pour ESLint avec TypeScript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // Configuration de base
  js.configs.recommended,
  
  // Configuration TypeScript
  ...tseslint.configs.strictTypeChecked,
  
  // Configuration spécifique à l'API
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Règles de base
      'no-unused-vars': 'off', // Désactivé car géré par @typescript-eslint
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      
      // Règles TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // Désactiver temporairement les règles problématiques
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/dot-notation': 'off',
    },
  },
  
  // Ignorer les dossiers de build et node_modules
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.d.ts',
      '**/*.js',
      '!**/*.ts',
    ],
  },
];
