<script lang="ts">
    export let center: boolean = true;
    export let vertical: boolean = false;
    export let title: string = undefined;
</script>

{#if title}
    <h2>{title}</h2>
{/if}
<div class="example" class:centered={center} class:vertical>
    <slot />
</div>

<style lang="scss">
    .example {
        background-color: #ffffff;
        border: 1px solid #dddddd;
        padding: 30px;
        border-radius: 4px;
        min-height: 140px;
        box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.3);
        margin-bottom: 20px;

        &.centered {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &.vertical {
            flex-direction: column;

            & > :global(*) {
                margin-bottom: 20px;
                margin-right: 0;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        & > :global(*) {
            margin-right: 20px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
