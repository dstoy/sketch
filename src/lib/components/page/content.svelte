<script lang="ts">
    import { page } from "sketch";
    import { active } from "sketch/router";
    import { onDestroy } from "svelte";
    import navigation from "../layout/navigation/store";

    let frame: any;

    page.setup(active);

    function onMenuClicked() {
        navigation.show();
    }

    function onLoad() {
        const node = frame?.contentWindow?.document;
        node?.addEventListener("menuClicked", onMenuClicked);
    }

    onDestroy(() => {
        const node = frame?.contentWindow?.document;
        node?.removeEventListener("menuClicked", onMenuClicked);
    });
</script>

<iframe
    title="page-frame"
    frameborder="0"
    width="100"
    src="page.html"
    bind:this={frame}
    on:load={onLoad}
/>

<style lang="scss">
    iframe {
        width: 100%;
        height: 100%;
    }
</style>
