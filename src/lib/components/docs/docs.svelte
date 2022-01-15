<script lang="ts">
    import { setContext } from "svelte";
    import { createStore } from "./store";

    const store = createStore();
    const { props, slots, events } = store;

    setContext("docs", store);

    export let title: string = undefined;
</script>

{#if title}
    <h2>{title}</h2>
{/if}
<div class="docs">
    {#if $props.length > 0}
        <div class="title">Props</div>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Default</td>
                    <td>Description</td>
                </tr>
            </thead>
            <tbody>
                {#each $props as prop}
                    <tr>
                        <td class="name">
                            {prop.name}<br />
                            <em>{prop.type}</em>
                        </td>
                        <td class="default">
                            {#if prop.defaultValue}
                                <code>{prop.defaultValue}</code>
                            {/if}
                        </td>
                        <td>{@html prop.description}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    {#if $slots.length > 0}
        <div class="title">Slots</div>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                </tr>
            </thead>
            <tbody>
                {#each $slots as slot}
                    <tr>
                        <td class="name">{slot.name}</td>
                        <td>{@html slot.description}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    {#if $events.length > 0}
        <div class="title">Events</div>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                </tr>
            </thead>
            <tbody>
                {#each $events as event}
                    <tr>
                        <td class="name">{event.name}</td>
                        <td>{@html event.description}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    <slot />
</div>

<style lang="scss">
    @import "styles/vars.scss";

    .docs {
        background-color: #ffffff;
        border: 1px solid #dddddd;
        padding: 20px;
        border-radius: 4px;
        min-height: 200px;
        box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.3);
        margin-bottom: 20px;

        @include reset-font();

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
            margin-bottom: 30px;

            &:last-of-type {
                margin-bottom: 0;
            }

            td {
                border-top: 1px solid #f0f0f0;
                border-bottom: 1px solid #f0f0f0;
                padding: 12px 10px;
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

            td.name {
                & > em {
                    color: #1e5ff9;
                }
            }
        }

        & :global(code) {
            font-size: inherit !important;
            line-height: 1.8;
            box-decoration-break: clone;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
            padding: 2px 8px;

            :global(&.block) {
                display: block;
                margin-top: 4px;
            }
        }
    }
</style>
