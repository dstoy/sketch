<script lang="ts">
    import type { SvelteComponentDev } from "svelte/internal";
    import { beforeUpdate, onDestroy } from "svelte";
    import Content from "./content.svelte";

    export let title = undefined;
    export let component = undefined;

    let frame: HTMLIFrameElement = undefined;
    let content: SvelteComponentDev;

    /**
     * Handle the iframe onload event
     */
    const onLoad = () => {
        // clone all styles
        const head = frame.contentDocument.head;
        const styles = document.querySelectorAll(
            'style, link[rel="stylesheet"]',
        );
        Array.from(styles).forEach((node) =>
            head.appendChild(node.cloneNode(true)),
        );

        const target = frame.contentDocument.body;
        content = new Content({
            target,
            props: {
                component,
                title,
            },
        });
    };

    /**
     * Destroy the content component when the page gets destroyed
     */
    onDestroy(() => {
        content?.$destroy();
    });

    /**
     * Update content props when the page props get updated
     */
    beforeUpdate(() => {
        if (frame) {
            frame.contentDocument.body.scrollTop = 0;
        }

        content?.$$set({
            title,
            component,
        });
    });
</script>

<iframe
    title="page-frame"
    frameborder="0"
    width="100"
    on:load={onLoad}
    bind:this={frame}
/>

<style lang="scss">
    iframe {
        width: 100%;
        height: 100%;
    }
</style>
