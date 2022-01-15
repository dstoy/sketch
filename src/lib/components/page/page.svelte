<script lang="ts">
    import { beforeUpdate, onDestroy } from "svelte";
    import type { SvelteComponentDev } from "svelte/internal";

    export let title = undefined;
    export let page = undefined;

    let root: HTMLElement;
    let mounted: SvelteComponentDev;

    beforeUpdate(() => {
        if (page && root) {
            // cleanup the old component
            mounted?.$destroy();

            // scroll to the top
            document.body.scrollTop = 0;

            // mount the new one
            mounted = new page({ target: root });
        }
    });

    onDestroy(() => {
        mounted?.$destroy();
    });
</script>

<div class="sketch-page">
    {#if title && page}
        <div class="page-title">{title}</div>
        <div class="page-content" bind:this={root} />
    {/if}
</div>

<style lang="scss" global>
    @import "styles/main.scss";
    @import "styles/vars.scss";

    .sketch-page {
        padding: 20px 40px;
        background-color: var(--sketch-page-bg);
        min-height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;

        & > .page-content > *:not(.example):not(.scene):not(.docs) {
            &,
            * {
                @include reset-font();

                &:is(ul),
                &:is(ol) {
                    margin-left: 40px;
                    margin-bottom: 20px;
                }

                &:is(ul) {
                    list-style: disc;
                }

                &:is(ol) {
                    list-style: number;
                }

                &:is(em) {
                    font-style: italic;
                }

                &:is(strong) {
                    font-weight: bolder;
                }

                &:is(code) {
                    background-color: rgba(0, 0, 0, 0.05);
                    border-radius: 3px;
                    padding: 2px 8px;
                }

                &:is(pre) > code {
                    background-color: rgba(0, 0, 0, 0.05);
                    display: block;
                    margin-bottom: 20px;
                    padding: 10px 15px;
                    border-radius: 4px;
                }

                &:is(blockquote) {
                    display: block;
                    margin-bottom: 20px;
                    padding: 10px 15px;
                    border-left: 5px solid rgba(0, 0, 0, 0.05);

                    & > *:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }

        & > .page-title {
            font-size: 2em !important;
            font-weight: bolder;
            margin-bottom: 20px;
        }

        & > .page-content > h2 {
            color: black;
            font-weight: bolder;
            border-bottom: 1px solid #cacaca;
            font-size: 1.3em !important;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
    }
</style>
