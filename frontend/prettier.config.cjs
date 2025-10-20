// - スタイル統一と差分最小化を優先
/** @type {import('prettier').Config} */
module.exports = {
  // 文字列: シングルクオート
  singleQuote: true,
  // セミコロン必須
  semi: true,
  // 末尾カンマ: 差分を小さく保つ
  trailingComma: 'all',
  // アロー関数の引数括弧: 常に付与（可読性）
  arrowParens: 'always',
  // 1行の最大長: 読みやすさと差分のバランス
  printWidth: 100,
  // インデント: スペース2
  tabWidth: 2,
  useTabs: false,
  // JSXではダブルクオート（一般的な慣習）
  jsxSingleQuote: false,
  // オブジェクトリテラルのスペース
  bracketSpacing: true,
  // JSXの>は改行しない
  bracketSameLine: false,
  // 改行コード: LF に統一（OS差異の吸収）
  endOfLine: 'lf',
};
