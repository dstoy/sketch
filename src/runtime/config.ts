export const config: RuntimeConfig = {
    load: "pages/**/*",
    pages: [],

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
    pages: string[];
    isPage: (path: string) => boolean;
}
