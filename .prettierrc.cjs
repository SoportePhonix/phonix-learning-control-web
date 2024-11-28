module.exports = {
  printWidth: 120,
  bracketSpacing: true,
  trailingComma: 'es5',
  singleQuote: true,
  bracketSameLine: false,
  semi: true,
  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
};
