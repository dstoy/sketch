import path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import svelteConfig from "../svelte.config.js";
import tsconfigPaths from "vite-tsconfig-paths";

const resolve = (rel: string) => {
    return path.resolve(__dirname, `/../${rel}`);
}

export default defineConfig({
    plugins: [
        tsconfigPaths(),
    ],
    build: {
        lib: {
            name: "runtime",
            entry: resolve("src/runtime/index.ts"),
            fileName: (format: string) => `runtime.${format}.js`,
        },
        rollupOptions: {
            external: [
                "svelte",
                "glob",
                "chalk",
            ],
            output: {
                exports: "named",
                globals: {
                    svelte: "svelte",
                    glob: "glob",
                    chalk: "chalk",
                },
            },
        },
    },
});
