/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  trailingComma: "all",
  tabWidth: 2,
  singleQuote: false,
  jsxSingleQuote: false,
  bracketSameLine: true,
  bracketSpacing: true,
  printWidth: 130,
  arrowParens: "always",
  endOfLine: "auto",
  plugins: ["prettier-plugin-tailwindcss", "@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["<BUILT_IN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^[^@./]", "", "^[./]"],
}
