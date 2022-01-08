import path from "path";

export const config: RuntimeConfig = {
    root: process.cwd(),
    load: "pages/**/*",
    styles: [],
    pages: [],

    /*
     * Return the full path to be scanned for sketches
     */
    get path() {
        if (this.load.startsWith("/")) {
            return this.load;
        } else {
            return path.join(this.root, this.load);
        }
    },

    /**
     * Checks if a path is a page
     */
    isPage(path: string) {
        return this.pages.includes(path);
    },
};

export default config;

export interface RuntimeConfig {
    load: string;
    root: string;
    path: string;
    pages: string[];
    styles: string | string[];
    isPage: (path: string) => boolean;
}
