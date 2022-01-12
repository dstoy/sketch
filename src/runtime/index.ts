import config, { RuntimeConfig } from "./config";

import plugin from "./plugin";
import transformer from "./transformer";

/**
 * Update the runtime configuiration
 */
export function configure(options: Partial<RuntimeConfig>) {
    for (const [prop, value] of Object.entries(options)) {
        config[prop] = value;
    }
}

export default {
    configure,
    plugin,
    transformer,
};
