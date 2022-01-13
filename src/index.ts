// Export the router
export { default as router } from "./router";

// Export some common components
export * from "./lib/components/docs";
export { default as Scene } from "./lib/components/scene.svelte";
export { default as Example } from "./lib/components/example.svelte";

// Export the inner page object
export { default as page } from "./page";

import App from "./app.svelte";
import "./styles/main.scss";

/**
 * Start the application
 */
export function start({ target }: AppParams) {
    return new App({ target: target });
}

interface AppParams {
    target: HTMLElement;
}
