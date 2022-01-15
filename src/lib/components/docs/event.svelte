<script lang="ts">
    import { beforeUpdate, onDestroy } from "svelte";
    import { addEvent, removeEvent } from "./store";

    export let name: string;

    let content: HTMLElement;
    let registered = false;

    beforeUpdate(() => {
        if (content && !registered) {
            const description = content.innerHTML;
            addEvent({ name, description });
            registered = true;
        }
    });

    onDestroy(() => {
        removeEvent(name);
    });
</script>

<div class="events" bind:this={content}>
    <slot />
</div>

<style lang="scss">
    .events {
        display: none;
    }
</style>
