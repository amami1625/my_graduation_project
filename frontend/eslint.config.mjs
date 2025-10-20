import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

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
    rules: {
      // 未使用の変数を検出
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // _で始まる引数は許可（意図的に未使用の場合）
          varsIgnorePattern: '^_', // _で始まる変数は許可
          caughtErrorsIgnorePattern: '^_', // _で始まるエラー変数は許可
        },
      ],
      // 未使用のインポートを検出
      'no-unused-vars': 'off', // TypeScript版を使うのでJavaScript版は無効化
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
