import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  // Prettier統合：ESLintのスタイルルールを無効化してPrettierに任せる
  ...compat.extends('plugin:prettier/recommended'),
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // 未使用の変数を検出（unused-importsプラグインを使用）
      '@typescript-eslint/no-unused-vars': 'off', // unused-importsに任せるため無効化
      'no-unused-vars': 'off', // unused-importsに任せるため無効化
      'unused-imports/no-unused-imports': 'error', // 未使用のインポートを自動削除
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_', // _で始まる変数は許可
          args: 'after-used',
          argsIgnorePattern: '^_', // _で始まる引数は許可
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_', // _で始まるエラー変数は許可
        },
      ],
      // console.logを禁止（warn/error/debugは許可）
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'debug'],
        },
      ],
    },
  },
];

export default eslintConfig;
