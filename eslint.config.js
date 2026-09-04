import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import jsxA11y from "eslint-plugin-jsx-a11y"
import perfectionist from "eslint-plugin-perfectionist"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist", "node_modules", "playwright-report", "test-results"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      perfectionist,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true, allowExportNames: ["useTheme"] },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          ignoreCase: true,
          newlinesBetween: 1,
          internalPattern: ["^@/"],
        },
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          type: "natural",
          ignoreCase: true,
        },
      ],
    },
  },
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: [
      "src/components/ui/**/*.{ts,tsx}",
      "src/components/theme-provider.tsx",
      "src/hooks/**/*.{ts,tsx}",
      "src/lib/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app", "@/app/**", "**/app", "**/app.*"],
              message: "Kit, hook, and lib modules must not import showcase-level app code.",
            },
            {
              group: [
                "@/components/app-sidebar",
                "@/components/app-sidebar/**",
                "**/app-sidebar",
                "**/app-sidebar.*",
              ],
              message: "Kit, hook, and lib modules must not import the showcase sidebar.",
            },
            {
              group: [
                "@/components/charts-card",
                "@/components/charts-card/**",
                "**/charts-card",
                "**/charts-card.*",
              ],
              message: "Kit, hook, and lib modules must not import the showcase charts card.",
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
)
