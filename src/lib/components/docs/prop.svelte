<script lang="ts">
    import { beforeUpdate, onDestroy } from "svelte";
    import { addProp, removeProp } from "./store";

    export let name: string;
    export let type: string = "string";

    let defaultValue = $$props["default"];
    let content: HTMLElement;
    let registered = false;

    beforeUpdate(() => {
        if (content && !registered) {
            addProp(name, type, defaultValue, content.innerHTML);
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
