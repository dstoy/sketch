import path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import svelteConfig from "../svelte.config.js";
import tsconfigPaths from "vite-tsconfig-paths";

const resolve = (rel: string) => {
    return path.resolve(__dirname, `/../${rel}`);
};

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        svelte({
            preprocess: svelteConfig.preprocess,
        }),
    ],
    build: {
        emptyOutDir: false,
        sourcemap: true,
        lib: {
            name: "sketch",
            entry: resolve("src/index.ts"),
            fileName: (format) => `sketch.${format}.js`,
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["svelte", "svelte/internal", "svelte/store"],
            output: {
                globals: {
                    svelte: "svelte",
                    ["svelte/internal"]: "svelte/internal",
                    ["svelte/store"]: "svelte/store",
                },
            },
        },
    },
});
