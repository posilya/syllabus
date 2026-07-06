import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vitest from '@vitest/eslint-plugin';

export default defineConfig([
    eslint.configs.recommended,
    eslintPluginUnicorn.configs['recommended'],
    {
        files: ['**/*.js'],
        ignores: ['**/*.js', 'node_modules/**/*'],
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unicorn/better-regex': 'warn',
            'unicorn/no-process-exit': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prevent-abbreviations': 'off',
        },
    },
    {
        files: ['src/**/*.test.js'],
        ...vitest.configs.recommended,
    },
    eslintPluginPrettierRecommended,
]);
