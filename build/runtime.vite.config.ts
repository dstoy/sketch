import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const resolve = (rel: string) => {
    return path.resolve(__dirname, `/../${rel}`);
};

export default defineConfig({
    plugins: [tsconfigPaths()],
    build: {
        emptyOutDir: false,
        lib: {
            name: "runtime",
            entry: resolve("src/runtime/index.ts"),
            fileName: () => "runtime.js",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["svelte/compiler", "glob", "chalk", "vite"],
            output: {
                exports: "named",
                globals: {
                    glob: "glob",
                    chalk: "chalk",
                    vite: "vite",
                },
            },
        },
    },
});
