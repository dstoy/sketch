import { writable } from "svelte/store";

export function createStore() {
    const props = writable<PropConfig[]>([]);
    const slots = writable<SlotConfig[]>([]);
    const events = writable<EventConfig[]>([]);

    /**
     * Add a new property to the property list
     */
    function addProp(data: PropConfig) {
        props.update((list) => {
            return [...list, data];
        });
    }

    /**
     * Remove a property from the property list
     */
    function removeProp(name: string) {
        props.update((list) => {
            return list.filter((el) => el.name !== name);
        });
    }

    /**
     * Add a new slot to the list
     */
    function addSlot(data: SlotConfig) {
        slots.update((list) => {
            return [...list, data];
        });
    }

    /**
     * Remove a slot from the list
     */
    function removeSlot(name: string) {
        slots.update((list) => {
            return list.filter((el) => el.name !== name);
        });
    }

    /**
     * Add a new event to the list
     */
    function addEvent(data: EventConfig) {
        events.update((list) => {
            return [...list, data];
        });
    }

    /**
     * Remove an event from the list
     */
    function removeEvent(name: string) {
        events.update((list) => {
            return list.filter((el) => el.name !== name);
        });
    }

    return {
        props,
        slots,
        events,
        addProp,
        removeProp,
        addSlot,
        removeSlot,
        addEvent,
        removeEvent,
    };
}

interface PropConfig {
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
}

interface SlotConfig {
    name: string;
    description: string;
}

interface EventConfig {
    name: string;
    description: string;
}

export interface DocsStoreApi {
    addProp: (data: PropConfig) => void;
    removeProp: (name: string) => void;
    addSlot: (data: SlotConfig) => void;
    removeSlot: (name: string) => void;
    addEvent: (data: EventConfig) => void;
    removeEvent: (name: string) => void;
}
