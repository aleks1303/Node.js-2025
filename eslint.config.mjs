// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";
//
// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
// ]);
// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Фікс для __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx,js,mjs,cjs}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname, // тепер працює
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            prettier,
            "simple-import-sort": simpleImportSort,
            import: importPlugin,
        },
        rules: {
            // базові правила
            "prettier/prettier": ["error", { endOfLine: "auto" }],
            "no-console": "warn",

            // імпорти
            "simple-import-sort/imports": "error",
            "import/first": "error",
            "import/newline-after-import": ["error", { count: 1 }],
            "import/no-duplicates": "error",

            // TypeScript
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "req|res|next" },
            ],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
        ignores: ["dist", "node_modules"],
    }
);
