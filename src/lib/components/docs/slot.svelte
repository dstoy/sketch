<script lang="ts">
    import { beforeUpdate, getContext, onDestroy } from "svelte";
    import { DocsStoreApi } from "./store";

    const store = getContext<DocsStoreApi>("docs");
    const { addSlot, removeSlot } = store;

    export let name: string;

    let content: HTMLElement;
    let registered = false;

    beforeUpdate(() => {
        if (content && !registered) {
            const description = content.innerHTML;
            addSlot({ name, description });
            registered = true;
        }
    });

    onDestroy(() => {
        removeSlot(name);
    });
</script>

<div class="slots" bind:this={content}>
    <slot />
</div>

<style lang="scss">
    .slots {
        display: none;
    }
</style>
