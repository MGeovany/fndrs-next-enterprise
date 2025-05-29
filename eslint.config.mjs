import eslintPluginNext from "@next/eslint-plugin-next"
// https://github.com/francoismassart/eslint-plugin-tailwindcss/pull/381
// import eslintPluginTailwindcss from "eslint-plugin-tailwindcss"
import eslintPluginStorybook from "eslint-plugin-storybook"
import typescriptEslint from "typescript-eslint"

const eslintIgnore = [".git/", ".next/", "node_modules/", "dist/", "build/", "coverage/", "*.min.js", "*.config.js", "*.d.ts"]
typescriptEslint.config(
  {
    ignores: eslintIgnore,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      }
    }
  },

  ...eslintPluginStorybook.configs["flat/recommended"],
  //  https://github.com/francoismassart/eslint-plugin-tailwindcss/pull/381
  // ...eslintPluginTailwindcss.configs["flat/recommended"],
  typescriptEslint.configs.recommended,
  {
    plugins: {
      "@next/next": eslintPluginNext
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules
    }
  },
  {
    settings: {
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl", "cn", "cva"]
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  }
)

export default config
