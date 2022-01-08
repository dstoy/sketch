import sveltePreprocess from "svelte-preprocess";

export default {
    preprocess: sveltePreprocess({
        typescript: true,
        scss: {
            renderSync: true,
            includePaths: ["src", "example"],
        },
    }),
};
