/*
 * A vite/rollup plugin for automatically importing all
 * sketch pages into the entry point of the project
 */
import path from "path";
import glob from "glob";
import { PluginOption } from "vite";
import config from "./config";

const entry = path.resolve(__dirname, "..", "start.ts");

export default function build() {
    let importBlock = "";

    return {
        name: "vite-plugin-sketch",
        enforce: "pre",

        /**
         * Get the firs non external loaded file and mark it as the
         * application entry point
         */
        load(id) {
            if (id === entry) {
                // Prepare the auto import block
                config.pages = [];
                const files = glob.sync(config.path);
                const chunks = [];

                chunks.push(
                    `import { router as __sketch_router__ } from "sketch";`,
                );

                for (const file of files) {
                    const idx = chunks.length;
                    const pageId = `SketchPage_${idx}`;
                    config.pages.push(file);

                    chunks.push(`
                        import * as ${pageId} from "${file}";
                        __sketch_router__.register(${pageId});
                    `);
                }

                importBlock = chunks.join("\n");
            }

            return null;
        },

        /**
         * Transfor the entry point to auto include all pages
         */
        transform(code, id) {
            if (id === entry) {
                code = code + `\n\n${importBlock}`;
                return code;
            }

            return null;
        },
    } as PluginOption;
}
