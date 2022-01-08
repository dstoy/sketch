<script lang="ts">
    export let title = undefined;
    export let component = undefined;
</script>

<div class="sketch-page">
    <div class="page-title">{title}</div>
    <svelte:component this={component} />
</div>

<style lang="scss" global>
    @import "../../../styles/main.scss";
    @import "../../../styles/vars.scss";

    .sketch-page {
        padding: 20px 40px;
        background-color: var(--sketch-page-bg);
        min-height: 100%;

        & > *:not(.sketch):not(.scene) {
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

        & > h2 {
            color: black;
            font-weight: bolder;
            border-bottom: 1px solid #cacaca;
            font-size: 1.3em !important;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
    }
</style>
