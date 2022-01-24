import { writable } from "svelte/store";

const active = writable<{ opened: boolean }>({ opened: false });

export default {
    subscribe: active.subscribe,
    update: active.update,
    set: active.set,
    show() {
        active.update(() => ({ opened: true }));
    },
    hide() {
        active.update(() => ({ opened: false }));
    },
    toggle() {
        active.update((state) => ({ opened: !state }));
    },
};
