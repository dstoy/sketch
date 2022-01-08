<script lang="ts">
    import { beforeUpdate } from "svelte";

    let content: HTMLElement = undefined;
    let frame: HTMLIFrameElement = undefined;
    let detached = false;
    let loaded = false;
    let rendered = false;

    /**
     * Wait for the iframe to load
     */
    const onFrameLoad = () => {
        loaded = true;

        // render the content
        render();
    };

    /**
     * Render the content into the iframe
     */
    const render = () => {
        if (rendered || !frame || !content || !loaded) {
            return;
        }

        const head = frame.contentDocument.head;
        const body = frame.contentDocument.body;
        if (body) {
            body.appendChild(content);
            rendered = true;

            // inject all the styles in the iframe
            Array.from(
                document.querySelectorAll('style, link[rel="stylesheet"]'),
            ).forEach((node) => head.appendChild(node.cloneNode(true)));
        }
    };

    /**
     * Detatch the content from the page and wait for the iframe to load
     * so we can inject it back into the page
     */
    beforeUpdate(() => {
        if (!content) {
            return;
        }

        // detatch from the original parent
        if (!detached) {
            let parent = content.parentNode;
            if (parent) {
                parent.removeChild(content);
            }

            detached = true;
        }

        // render the content
        render();
    });
</script>

<iframe
    title="scope-wrapper"
    frameborder="0"
    width="100"
    on:load={onFrameLoad}
    bind:this={frame}
/>

<style lang="scss" global>
    iframe {
        width: 100%;
        height: 100%;
    }
</style>
