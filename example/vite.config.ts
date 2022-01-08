import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { markdown } from "svelte-preprocess-markdown";
import tsconfigPaths from "vite-tsconfig-paths";
import svelteConfig from "../svelte.config";
import sketch from "../src/runtime";

// Configure the project
sketch.configure({
    root: `${__dirname}`,
    load: `pages/**/*.{svelte,md}`,
    styles: ["./styles/main.scss"],
});

export default defineConfig({
    root: sketch.lib,
    plugins: [
        tsconfigPaths(),
        sketch.plugin(),
        svelte({
            emitCss: false,
            extensions: [".svelte", ".md"],
            preprocess: [
                sketch.transformer(),
                svelteConfig.preprocess,
                markdown(),
            ],
        }),
    ],
    resolve: {
        alias: {
            sketch: `${__dirname}/../src`,
            "~": `${__dirname}/../src`,
        },
    },
});
