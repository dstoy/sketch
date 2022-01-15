<script lang="ts">
    import { beforeUpdate, getContext, onDestroy } from "svelte";
    import { DocsStoreApi } from "./store";

    const store = getContext<DocsStoreApi>("docs");
    const { addProp, removeProp } = store;

    export let name: string;
    export let type: string = "string";

    let defaultValue = $$props["default"];
    let content: HTMLElement;
    let registered = false;

    beforeUpdate(() => {
        if (content && !registered) {
            const description = content.innerHTML;
            addProp({ name, type, defaultValue, description });

            registered = true;
        }
    });

    onDestroy(() => {
        removeProp(name);
    });
</script>

<div class="props" bind:this={content}>
    <slot />
</div>

<style lang="scss">
    .props {
        display: none;
    }
</style>
