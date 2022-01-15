<script lang="ts">
    import { beforeUpdate, onDestroy } from "svelte";
    import { addSlot, removeSlot } from "./store";

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
