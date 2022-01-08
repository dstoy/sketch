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
        svelte({
            preprocess: svelteConfig.preprocess,
        }),
    ],
    build: {
        lib: {
            name: "sketch",
            entry: resolve("index.html"),
            fileName: (format: string) => `sketch.${format}.js`,
        },
        rollupOptions: {
            external: ["svelte"],
            output: {
                globals: {
                    svelte: "svelte",
                },
            },
        },
    },
});
