import { writable } from "svelte/store";

export const props = writable<PropConfig[]>([]);

/**
 * Add a new property to the property list
 */
export function addProp(
    name: string,
    type: string,
    defaultValue: string,
    content: string,
) {
    props.update((list) => {
        return [
            ...list,
            {
                name,
                type,
                defaultValue,
                content,
            },
        ];
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

interface PropConfig {
    name: string;
    type: string;
    defaultValue?: string;
    content: string;
}
