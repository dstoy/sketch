<script lang="ts">
    import { props } from "./store";
</script>

<div class="docs">
    <div class="title">Props</div>
    <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Type</td>
                <td>Default</td>
            </tr>
        </thead>
        <tbody>
            {#each $props as prop}
                <tr>
                    <td>{prop.name}</td>
                    <td>{@html prop.content}</td>
                    <td>{prop.type}</td>
                    <td>{prop.defaultValue ?? "-"}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <slot />
</div>

<style lang="scss">
    .docs {
        background-color: #ffffff;
        border: 1px solid #dddddd;
        padding: 10px;
        border-radius: 4px;
        min-height: 200px;
        box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.3);
        margin-bottom: 20px;

        & > .title {
            color: #2d2d2d;
            font-weight: bolder;
            border-bottom: 1px solid #cacaca;
            font-size: 1.1em;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }

        & > table {
            width: 100%;
            border-collapse: collapse;

            td {
                border-top: 1px solid #f0f0f0;
                border-bottom: 1px solid #f0f0f0;
                padding: 5px 10px;
                font-size: 0.9em;
            }

            thead td {
                font-weight: bolder;
                font-weight: bold;
                border-bottom: 3px double #9a9a9a;
            }

            tbody tr:hover > td {
                background: #f7f7f7;
            }
        }
    }
</style>
