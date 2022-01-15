import { writable } from "svelte/store";

export const props = writable<PropConfig[]>([]);
export const slots = writable<SlotConfig[]>([]);
export const events = writable<EventConfig[]>([]);

/**
 * Add a new property to the property list
 */
export function addProp(data: PropConfig) {
    props.update((list) => {
        return [...list, data];
    });
}

/**
 * Remove a property from the property list
 */
export function removeProp(name: string) {
    props.update((list) => {
        return list.filter((el) => el.name !== name);
    });
}

/**
 * Add a new slot to the list
 */
export function addSlot(data: SlotConfig) {
    slots.update((list) => {
        return [...list, data];
    });
}

/**
 * Remove a slot from the list
 */
export function removeSlot(name: string) {
    slots.update((list) => {
        return list.filter((el) => el.name !== name);
    });
}

/**
 * Add a new event to the list
 */
export function addEvent(data: EventConfig) {
    events.update((list) => {
        return [...list, data];
    });
}

/**
 * Remove an event from the list
 */
export function removeEvent(name: string) {
    events.update((list) => {
        return list.filter((el) => el.name !== name);
    });
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
