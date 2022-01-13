<script lang="ts">
    export let center: boolean = true;
</script>

<div class="example" class:centered={center}>
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
    }
</style>
