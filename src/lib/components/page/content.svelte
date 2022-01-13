<script lang="ts">
    import { page } from "sketch";
    import { active } from "sketch/router";

    page.setup(active);
</script>

<iframe title="page-frame" frameborder="0" width="100" src="page.html" />

<style lang="scss">
    iframe {
        width: 100%;
        height: 100%;
    }
</style>
