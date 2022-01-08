import type { SvelteComponentDev } from "svelte/internal";
import { get, writable } from "svelte/store";

const added: Record<string, string> = {};

export const pages = writable<PageConfig[]>([]);
export const active = writable<PageConfig | undefined>(undefined);
export const params = writable<QueryParam>({});

// Determine the current page from the url
parse(window.location);

// Handle the url change and process the url on update
window.addEventListener("popstate", () => {
    parse(window.location);
});

// Handle page reload events
if (import.meta.hot) {
    window.addEventListener("sketchPageLoad", (e: CustomEvent) => {
        const config = e.detail;
        if (added[config.file]) {
            updatePage(config);
        }
    });
}

/**
 * Parse a location and transform it to an active page entry
 * including the values for the query parameters
 */
function parse(location: Location) {
    const href = location.hash.replace("#", "");
    const parts = href.split("?");
    const slug = parts[0];

    // Search for the page
    const page = get(pages).find((page) => page.slug === slug);
    if (!page) {
        return;
    }

    // Set the page as active
    active.set({ ...page });

    // Process the query params
    const _params = {};
    if (parts.length > 1) {
        const values: string[] = parts[1].split("&");

        // Convert the array of strings into an object
        for (const pair of values) {
            const kv = pair.split("=");
            const key = decodeURIComponent(kv[0]);
            let value: QueryParamValue = decodeURIComponent(kv[1]);

            // do some type casting
            if (value === "true") {
                value = true;
            } else if (value === "false") {
                value = false;
            } else if (value.match(/^\d+$/)) {
                value = parseInt(value);
            }

            _params[key] = value;
        }
    }

    params.set(_params);
}

/**
 * Load a page by it's slug
 */
export async function load(slug: string) {
    window.location.hash = slug;
}

/**
 * Register a new page. Check if the passed modules is a
 * valid Sketch page and register it.
 */
export async function register(module: PageModule) {
    const config = module.__sketch_page_config;
    if (config) {
        const { file, name } = config;
        const exists = Object.values(added).find((entry) => name === entry);

        // Check for existing page
        if (exists) {
            // eslint-disable-next-line no-console
            console.error(
                `Sketch: page '${name}' has already already been registerd`,
            );
            return;
        }
        added[file] = name;

        // Add the page to the list
        addPage(module.default, config);
    }
}

/**
 * Add a new page to the router
 */
async function addPage(component: SvelteComponentDev, setup: SetupConfig) {
    // extract the page config
    const config = getPageConfig(setup);
    const page: PageConfig = {
        ...config,
        component,
    };

    // Save the page in the store
    pages.update((list) => {
        return [...list, page];
    });

    // parse the url to pick a page
    parse(window.location);

    // open the home page by default
    const $active = get(active);
    if (!$active && setup.home) {
        active.set({ ...page });
    }
}

/**
 * Update a page configuration
 */
function updatePage(setup: SetupConfig) {
    const $pages = get(pages);
    const page = $pages.find((page) => page.file === setup.file);
    if (!page) {
        return;
    }

    // Extract the new config and update the exsiting one
    const config = getPageConfig(setup);
    for (const key of Object.keys(config)) {
        page[key] = config[key];
    }

    // Check if the page is active
    const $active = get(active);
    if ($active.file === page.file) {
        if ($active.slug !== page.slug) {
            active.set({ ...page });
            load(page.slug);
        }
    }

    pages.set($pages);
}

/**
 * Prepare the page configuration from the page setup arguments
 */
function getPageConfig(setup: SetupConfig): Omit<PageConfig, "component"> {
    const file = setup.file;
    const name = setup.name;
    const slug = name.toLowerCase().replace(/\W+/gi, "-");

    // Extract the page title
    const parts = name.split("/");
    const title = parts[parts.length - 1];

    return {
        name,
        title,
        slug,
        file,
    };
}

export interface PageConfig {
    slug: string;
    component: SvelteComponentDev;
    title: string;
    name: string;
    file: string;
}

interface SetupConfig {
    file: string;
    name: string;
    home?: boolean;
}

interface PageModule {
    __sketch_page_config?: SetupConfig;
    default: SvelteComponentDev;
}

type QueryParamValue = string | number | boolean | undefined;
type QueryParam = Record<string, QueryParamValue>;

export default {
    load,
    pages,
    active,
    register,
};
