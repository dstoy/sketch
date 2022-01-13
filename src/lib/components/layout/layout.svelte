<script lang="ts">
    import Navigation from "./navigation.svelte";
    import { Content } from "../page";
</script>

<div class="layout">
    <div class="wrapper">
        <div class="navigation">
            <Navigation />
        </div>
        <div class="content">
            <Content />
        </div>
    </div>
</div>

<style lang="scss">
    .layout {
        height: 100vh;
        width: 100vw;
        background: #474747;

        & > .wrapper {
            display: flex;
            margin: 0 auto;
            max-width: 1200px;
            overflow: hidden;
            height: 100%;
            width: 100%;
            box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.3);
            position: relative;

            & > .navigation {
                width: 260px;
                height: 100%;
                overflow: auto;
                background: #22344a;
                box-shadow: 1px 0px 6px 2px rgba(0, 0, 0, 0.3);
            }

            & > .content {
                flex: 1;
                background-color: #f3f3f3;
            }
        }
    }
</style>
