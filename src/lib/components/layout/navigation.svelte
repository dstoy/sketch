<script lang="ts">
    import { onDestroy } from "svelte";
    import { get } from "svelte/store";
    import { pages, active, load } from "../../../router";

    let menu: MenuItem[] = [];

    // process the page and build the navigation according to the
    // page labels. If the labels contain / they will be treated as parents
    const unsubscribe = pages.subscribe(($pages) => {
        let group: Record<string, MenuItem> = {};
        let $active = get(active);

        let _menu: MenuItem[] = [];
        $pages.map((page) => {
            let target = _menu;

            // check for paret element
            let parts = page.name.split("/");
            if (parts.length > 1) {
                let label = parts[0];
                let parent = group[label];

                // add the parent to the menu
                if (!parent) {
                    parent = {
                        label,
                        group: true,
                        children: [],
                    };

                    _menu.push(parent);
                    group[label] = parent;
                }

                // change the target where the menu entry will be added
                target = parent.children;

                // open the parent if the item is selected
                if (page.slug === $active?.slug) {
                    parent.opened = true;
                }
            }

            // get the last item from the parts
            let label = parts[parts.length - 1];
            const url = `#${page.slug}`;

            const item: MenuItem = {
                slug: page.slug,
                label,
                url,
            };
            target.push(item);
        });

        // Sort the menu items moving the single items at the top
        // and sorting all nested items alphabetically
        _menu = _menu
            .sort((a, b) => {
                if (!!a.group > !!b.group) return 1;
                if (!!a.group < !!b.group) return -1;
                return 0;
            })
            .map((item) => {
                if (item.group) {
                    item.children = item.children.sort((a, b) => {
                        if (a.label > b.label) return 1;
                        if (a.label < b.label) return -1;
                        return 0;
                    });
                }

                return item;
            });

        menu = _menu;
    });

    // clean up on unload
    onDestroy(() => {
        unsubscribe();
    });

    // let active = undefined;
    const onClick = (item: MenuItem) => {
        if (item.group) {
            item.opened = !item.opened;
            menu = [...menu];
        } else {
            load(item.slug);
        }
    };

    interface MenuItem {
        label: string;
        group?: boolean;
        opened?: boolean;
        url?: string;
        slug?: string;
        children?: MenuItem[];
    }
</script>

<div class="navigation">
    <div class="head">
        <span class="logo">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                ><g fill="none"
                    ><path
                        d="M10.75 22H4.917a2.086 2.086 0 0 1-2.084-2.084v-9.7a1.977
                        1.977 0 0 1-.592-2.558c.9-1.608 1.818-3.193 2.721-4.712A1.976
                        1.976 0 0 1 6.666 2c.424.004.836.139 1.18.385l.024.015c.412.24
                        4.392 2.609 7.591 4.512l2.84 1.688l.13.077a372.255 372.255
                        0 0 1 2.744 1.628a1.963 1.963 0 0 1 .583 2.553c-.883
                        1.577-1.8 3.162-2.72 4.712a1.983 1.983 0 0 1-1.68.951c-.136
                        0-.27-.015-.4-.045c-.117.069-.757.48-1.568 1c-1.443.925-3.415
                        2.19-3.643 2.307a1.976 1.976 0 0 1-.997.217zM4.5 13.03v6.886c0
                        .23.187.417.417.417H8.74A485.729 485.729 0 0 1 4.5 13.03zm1.358-1c.4.687
                        4.716 8.132 4.752 8.182a.3.3 0 0 0 .38.082c.134-.076 4.193-2.684
                        4.233-2.71c-.314-.185-2.586-1.539-4.992-2.972L5.838
                        12l.007.011l.01.017v.006l.003-.004zm.474-8.13c-.808 1.3-2.616
                        4.528-2.64 4.587a.312.312 0 0 0 .124.386c.133.079 13.354 7.956
                        13.48 7.976a.32.32 0 0 0 .048 0a.31.31 0 0 0 .266-.149a414.198 414.198
                        0 0 0 2.694-4.667a.316.316 0 0 0-.125-.387c-.127-.076-13.323-7.918-13.408-7.955a.314.314
                        0 0 0-.383.117l-.007.012l-.008.012l-.012.02v.005l-.015.024l-.015.019h.001zm1.353
                        5.49a1.666 1.666 0 1 1 1.667-1.67a1.669 1.669 0 0 1-1.667 1.667v.003z"
                        fill="currentColor"
                    /></g
                ></svg
            >
        </span>
        <span class="name"> Sketch Book </span>
    </div>
    <div class="menu">
        {#each menu as item}
            {#if item.group}
                <div class="group" class:opened={item.opened}>
                    <div class="label" on:click={() => onClick(item)}>
                        <em>{item.label}</em>
                    </div>
                    <div class="items">
                        {#each item.children as child}
                            <a
                                href={child.url}
                                class:active={child.slug === $active?.slug}
                                on:click|preventDefault={() => onClick(child)}
                                >{child.label}</a
                            >
                        {/each}
                    </div>
                </div>
            {:else}
                <a
                    href={item.url}
                    class:active={item.slug === $active?.slug}
                    on:click|preventDefault={() => onClick(item)}
                    >{item.label}</a
                >
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    $h-bg: #536579;
    $h-color: white;
    $text-color: #d1d0d0;

    .navigation {
        color: #d1d0d0;

        & > .head {
            font-weight: bolder;
            padding: 8px 20px;
            font-size: 1.2rem;
            display: flex;
            align-items: center;

            .logo {
                margin-right: 10px;
                color: #f3903a;
            }
        }

        & > .menu {
            padding: 10px 10px;

            a,
            .group > .label {
                display: block;
                padding: 6px 10px;
                text-decoration: none;
                border-radius: 4px;
                margin-bottom: 4px;
                color: #d1d0d0;
                cursor: pointer;

                &:hover {
                    background: $h-bg;
                    color: $h-color;
                }
            }

            a {
                display: block;
                padding: 6px 10px;
                text-decoration: none;
                border-radius: 4px;
                margin-bottom: 4px;
                cursor: pointer;

                &.active {
                    font-weight: bolder;
                    background: $h-bg;
                    color: $h-color;
                }
            }

            .group {
                & > .label {
                    position: relative;
                    padding-right: 24px;

                    em {
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: bolder;
                        color: white;
                    }

                    &::after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 50%;
                        right: 8px;

                        width: 6px;
                        height: 6px;
                        margin-top: -0.35em;
                        border-right: 1px solid currentColor;
                        border-bottom: 1px solid currentColor;
                        transform: rotate(45deg);
                        transition: transform 0.2s ease-out,
                            margin-top 0.2s ease-out;
                    }
                }

                & > .items {
                    display: none;
                    border-left: 4px solid $h-bg;
                    margin-left: 16px;
                    padding-left: 7px;
                }

                &.opened {
                    & > .label {
                        &::after {
                            transform: rotate(225deg);
                            margin-top: -0.05em;
                        }
                    }
                    & > .items {
                        display: block;
                    }
                }
            }
        }
    }
</style>
