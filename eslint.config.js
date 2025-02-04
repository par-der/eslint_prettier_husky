import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '**/*.d.ts'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        warnOnUnsupportedTypeScriptVersion: false,
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
          extensions: ['.ts', '.tsx'],
          alwaysTryTypes: true,
        },
      },
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/button-has-type': 'error',
      'global-require': 'off',
      'import/no-unresolved': 'error',
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          pathGroups: [
            { pattern: '@app/**', group: 'internal' },
            { pattern: '@pages/**', group: 'internal' },
            { pattern: '@entities/**', group: 'internal' },
            { pattern: '@features/**', group: 'internal' },
            { pattern: '@shared/**', group: 'internal' },
            { pattern: '@widgets/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@shared/*/*/**',
                '@entities/*/**',
                '@features/*/**',
                '@widgets/*/**',
                '@pages/*/*/**',
                '@app/*/*/**',
              ],
              message:
                'Direct access to the internal parts of the module is prohibited',
            },
            {
              group: [
                '../**/shared',
                '../**/entities',
                '../**/features',
                '../**/widgets',
                '../**/pages',
                '../**/app',
              ],
              message: 'Prefer absolute imports instead of relatives',
            },
          ],
        },
      ],
    },
  }
);
