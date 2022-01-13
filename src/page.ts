import { get, Writable } from "svelte/store";
import type { PageConfig } from "./router";
import { Page } from "./lib/components/page";

/**
 * Load the current page upon frame load event
 */
function load() {
    const active: Store = window.top.$$sketch.store;

    // Get the current page
    const $active = get(active);

    const target = document.body;
    const page = new Page({
        target,
        props: {
            title: $active?.title,
            page: $active?.component,
        },
    });

    // Monitor for changes in the active store value
    active.subscribe(($active) => {
        page.$set({
            title: $active?.title,
            page: $active?.component,
        });
    });
}

/**
 * Load the wrapper component
 */
function setup(active: Store) {
    window.$$sketch = {
        store: active,
    };
}

type Store = Writable<PageConfig | undefined>;

export default {
    load,
    setup,
};
