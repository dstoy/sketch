import path from "path";
import config, { RuntimeConfig } from "./config";

import plugin from "./plugin";
import transformer from "./transformer";

/**
 * Update the runtime configuiration
 */
export function configure(options: Partial<RuntimeConfig>) {
    // convert the styles to a list
    if (typeof options.styles === "string") {
        options.styles = [options.styles];
    }

    for (const [prop, value] of Object.entries(options)) {
        config[prop] = value;
    }
}

/**
 * Return the root of the library
 */
export function root() {
    return path.join(__dirname, "../");
}

export default {
    get lib() {
        return path.join(__dirname, "../../");
    },
    configure,
    plugin,
    transformer,
};
