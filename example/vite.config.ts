import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { markdown } from "svelte-preprocess-markdown";
import sveltePreprocess from "svelte-preprocess";
import tsconfigPaths from "vite-tsconfig-paths";
import sketch from "../src/runtime";

// Configure the project
sketch.configure({ load: `${__dirname}/pages/**/*.{svelte,md}` });

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        sketch.plugin(),
        svelte({
            emitCss: false,
            extensions: [".svelte", ".md"],
            preprocess: [
                sketch.transformer(),
                sveltePreprocess({
                    typescript: true,
                    scss: {
                        renderSync: true,
                        includePaths: ["pages"],
                    },
                }),
                markdown(),
            ],
        }),
    ],
    resolve: {
        alias: {
            sketch: `${__dirname}/../src/`,
        },
    },
});
