var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { writable, get } from "svelte/store";
import { SvelteComponent, init, safe_not_equal, element, text, space, attr, insert, append, set_data, detach, create_slot, update_slot_base, get_all_dirty_from_scope, get_slot_changes, transition_in, transition_out, destroy_each, component_subscribe, assign, exclude_internal_props, binding_callbacks, toggle_class, src_url_equal, noop, empty, listen, prevent_default, create_component, mount_component, destroy_component } from "svelte/internal";
import { beforeUpdate, onDestroy } from "svelte";
const added = {};
const pages = writable([]);
const active = writable(void 0);
const params = writable({});
if (window.top === window) {
  parse(window.location);
  window.addEventListener("popstate", () => {
    parse(window.location);
  });
  window.addEventListener("registerPage", (e) => {
    const { module, config } = e.detail;
    addPage(module, config);
  });
}
function parse(location) {
  const href = location.hash.replace("#", "");
  const parts = href.split("?");
  const slug = parts[0];
  const page2 = get(pages).find((page22) => page22.slug === slug);
  if (!page2) {
    return;
  }
  active.set(__spreadValues({}, page2));
  const _params = {};
  if (parts.length > 1) {
    const values = parts[1].split("&");
    for (const pair of values) {
      const kv = pair.split("=");
      const key = decodeURIComponent(kv[0]);
      let value = decodeURIComponent(kv[1]);
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      } else if (value.match(/^\d+$/)) {
        value = parseInt(value);
      }
      _params[key] = value;
    }
  }
  params.set(_params);
}
async function load$1(slug) {
  window.location.hash = slug;
}
async function register(module) {
  const config = module.__sketch_page_config;
  if (config) {
    const { file, name } = config;
    const exists = Object.values(added).find((entry) => name === entry);
    if (exists) {
      console.error(`Sketch: page '${name}' has already already been registerd`);
      return;
    }
    added[file] = name;
    const event = new CustomEvent("registerPage", {
      detail: {
        module: module.default,
        config
      }
    });
    window.top.dispatchEvent(event);
  }
}
async function addPage(component, setup2) {
  const config = getPageConfig(setup2);
  const page2 = __spreadProps(__spreadValues({}, config), {
    component
  });
  pages.update((list) => {
    return [...list, page2];
  });
  parse(window.location);
  const $active = get(active);
  if (!$active && setup2.home) {
    active.set(__spreadValues({}, page2));
  }
}
function getPageConfig(setup2) {
  const file = setup2.file;
  const name = setup2.name;
  const slug = name.toLowerCase().replace(/\W+/gi, "-");
  const parts = name.split("/");
  const title = parts[parts.length - 1];
  return {
    name,
    title,
    slug,
    file
  };
}
var router = {
  load: load$1,
  pages,
  active,
  register
};
const props = writable([]);
function addProp(name, type, defaultValue, content) {
  props.update((list) => {
    return [
      ...list,
      {
        name,
        type,
        defaultValue,
        content
      }
    ];
  });
}
function removeProp(name) {
  props.update((list) => {
    return list.filter((el) => el.name !== name);
  });
}
var docs_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function create_each_block$1(ctx) {
  var _a;
  let tr;
  let td0;
  let t0_value = ctx[3].name + "";
  let t0;
  let t1;
  let td1;
  let raw_value = ctx[3].content + "";
  let t2;
  let td2;
  let t3_value = ctx[3].type + "";
  let t3;
  let t4;
  let td3;
  let t5_value = ((_a = ctx[3].defaultValue) != null ? _a : "-") + "";
  let t5;
  let t6;
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      t2 = space();
      td2 = element("td");
      t3 = text(t3_value);
      t4 = space();
      td3 = element("td");
      t5 = text(t5_value);
      t6 = space();
      attr(td0, "class", "svelte-10noebx");
      attr(td1, "class", "svelte-10noebx");
      attr(td2, "class", "svelte-10noebx");
      attr(td3, "class", "svelte-10noebx");
      attr(tr, "class", "svelte-10noebx");
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      td1.innerHTML = raw_value;
      append(tr, t2);
      append(tr, td2);
      append(td2, t3);
      append(tr, t4);
      append(tr, td3);
      append(td3, t5);
      append(tr, t6);
    },
    p(ctx2, dirty) {
      var _a2;
      if (dirty & 1 && t0_value !== (t0_value = ctx2[3].name + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && raw_value !== (raw_value = ctx2[3].content + ""))
        td1.innerHTML = raw_value;
      if (dirty & 1 && t3_value !== (t3_value = ctx2[3].type + ""))
        set_data(t3, t3_value);
      if (dirty & 1 && t5_value !== (t5_value = ((_a2 = ctx2[3].defaultValue) != null ? _a2 : "-") + ""))
        set_data(t5, t5_value);
    },
    d(detaching) {
      if (detaching)
        detach(tr);
    }
  };
}
function create_fragment$7(ctx) {
  let div1;
  let div0;
  let t1;
  let table;
  let thead;
  let t9;
  let tbody;
  let t10;
  let current;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[1], null);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      div0.textContent = "Props";
      t1 = space();
      table = element("table");
      thead = element("thead");
      thead.innerHTML = `<tr class="svelte-10noebx"><td class="svelte-10noebx">Name</td> 
                <td class="svelte-10noebx">Description</td> 
                <td class="svelte-10noebx">Type</td> 
                <td class="svelte-10noebx">Default</td></tr>`;
      t9 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t10 = space();
      if (default_slot)
        default_slot.c();
      attr(div0, "class", "title svelte-10noebx");
      attr(table, "class", "svelte-10noebx");
      attr(div1, "class", "docs svelte-10noebx");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div1, t1);
      append(div1, table);
      append(table, thead);
      append(table, t9);
      append(table, tbody);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }
      append(div1, t10);
      if (default_slot) {
        default_slot.m(div1, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(tbody, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[1], !current ? get_all_dirty_from_scope(ctx2[1]) : get_slot_changes(default_slot_template, ctx2[1], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_each(each_blocks, detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let $props;
  component_subscribe($$self, props, ($$value) => $$invalidate(0, $props = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [$props, $$scope, slots];
}
class Docs extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$7, safe_not_equal, {});
  }
}
var prop_svelte_svelte_type_style_lang = "";
function create_fragment$6(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[4].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[3], null);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "class", "props svelte-1vtwary");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[5](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 8)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[3], !current ? get_all_dirty_from_scope(ctx2[3]) : get_slot_changes(default_slot_template, ctx2[3], dirty, null), null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      ctx[5](null);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { name } = $$props;
  let { type = "string" } = $$props;
  let defaultValue = $$props["default"];
  let content;
  let registered = false;
  beforeUpdate(() => {
    if (content && !registered) {
      addProp(name, type, defaultValue, content.innerHTML);
      registered = true;
    }
  });
  onDestroy(() => {
    removeProp(name);
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      content = $$value;
      $$invalidate(0, content);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(8, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("name" in $$new_props)
      $$invalidate(1, name = $$new_props.name);
    if ("type" in $$new_props)
      $$invalidate(2, type = $$new_props.type);
    if ("$$scope" in $$new_props)
      $$invalidate(3, $$scope = $$new_props.$$scope);
  };
  $$props = exclude_internal_props($$props);
  return [content, name, type, $$scope, slots, div_binding];
}
class Prop extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$6, safe_not_equal, { name: 1, type: 2 });
  }
}
class Scene extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, null, safe_not_equal, {});
  }
}
var example_svelte_svelte_type_style_lang = "";
function create_fragment$5(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[1], null);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "class", "example svelte-1vvm3e9");
      toggle_class(div, "centered", ctx[0]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[1], !current ? get_all_dirty_from_scope(ctx2[1]) : get_slot_changes(default_slot_template, ctx2[1], dirty, null), null);
        }
      }
      if (dirty & 1) {
        toggle_class(div, "centered", ctx2[0]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { center = true } = $$props;
  $$self.$$set = ($$props2) => {
    if ("center" in $$props2)
      $$invalidate(0, center = $$props2.center);
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [center, $$scope, slots];
}
class Example extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$5, safe_not_equal, { center: 0 });
  }
}
var content_svelte_svelte_type_style_lang = "";
function create_fragment$4(ctx) {
  let iframe;
  let iframe_src_value;
  return {
    c() {
      iframe = element("iframe");
      attr(iframe, "title", "page-frame");
      attr(iframe, "frameborder", "0");
      attr(iframe, "width", "100");
      if (!src_url_equal(iframe.src, iframe_src_value = "page.html"))
        attr(iframe, "src", iframe_src_value);
      attr(iframe, "class", "svelte-1oftune");
    },
    m(target, anchor) {
      insert(target, iframe, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(iframe);
    }
  };
}
function instance$2($$self) {
  page.setup(active);
  return [];
}
class Content extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$4, safe_not_equal, {});
  }
}
var page_svelte_svelte_type_style_lang = "";
function create_if_block$1(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(ctx[0]);
      t1 = space();
      div1 = element("div");
      attr(div0, "class", "page-title");
      attr(div1, "class", "page-content");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
      ctx[3](div1);
    },
    p(ctx2, dirty) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
      ctx[3](null);
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let if_block = ctx[0] && ctx[1] && create_if_block$1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      attr(div, "class", "sketch-page");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, [dirty]) {
      if (ctx2[0] && ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { title = void 0 } = $$props;
  let { page: page2 = void 0 } = $$props;
  let root;
  let mounted;
  beforeUpdate(() => {
    if (page2 && root) {
      mounted == null ? void 0 : mounted.$destroy();
      document.body.scrollTop = 0;
      mounted = new page2({ target: root });
    }
  });
  onDestroy(() => {
    mounted == null ? void 0 : mounted.$destroy();
  });
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      root = $$value;
      $$invalidate(2, root);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2)
      $$invalidate(0, title = $$props2.title);
    if ("page" in $$props2)
      $$invalidate(1, page2 = $$props2.page);
  };
  return [title, page2, root, div1_binding];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$3, safe_not_equal, { title: 0, page: 1 });
  }
}
function load() {
  const active2 = window.top.$$sketch.store;
  const $active = get(active2);
  const target = document.body;
  const page2 = new Page({
    target,
    props: {
      title: $active == null ? void 0 : $active.title,
      page: $active == null ? void 0 : $active.component
    }
  });
  active2.subscribe(($active2) => {
    page2.$set({
      title: $active2 == null ? void 0 : $active2.title,
      page: $active2 == null ? void 0 : $active2.component
    });
  });
}
function setup(active2) {
  window.$$sketch = {
    store: active2
  };
}
var page = {
  load,
  setup
};
var navigation_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}
function create_else_block(ctx) {
  let a;
  let t_value = ctx[7].label + "";
  let t;
  let a_href_value;
  let mounted;
  let dispose;
  function click_handler_2() {
    return ctx[5](ctx[7]);
  }
  return {
    c() {
      var _a;
      a = element("a");
      t = text(t_value);
      attr(a, "href", a_href_value = ctx[7].url);
      attr(a, "class", "svelte-1ssgg69");
      toggle_class(a, "active", ctx[7].slug === ((_a = ctx[1]) == null ? void 0 : _a.slug));
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
      if (!mounted) {
        dispose = listen(a, "click", prevent_default(click_handler_2));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _a;
      ctx = new_ctx;
      if (dirty & 1 && t_value !== (t_value = ctx[7].label + ""))
        set_data(t, t_value);
      if (dirty & 1 && a_href_value !== (a_href_value = ctx[7].url)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & 3) {
        toggle_class(a, "active", ctx[7].slug === ((_a = ctx[1]) == null ? void 0 : _a.slug));
      }
    },
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let div2;
  let div0;
  let em;
  let t0_value = ctx[7].label + "";
  let t0;
  let t1;
  let div1;
  let t2;
  let mounted;
  let dispose;
  function click_handler() {
    return ctx[3](ctx[7]);
  }
  let each_value_1 = ctx[7].children;
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      em = element("em");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      attr(em, "class", "svelte-1ssgg69");
      attr(div0, "class", "label svelte-1ssgg69");
      attr(div1, "class", "items svelte-1ssgg69");
      attr(div2, "class", "group svelte-1ssgg69");
      toggle_class(div2, "opened", ctx[7].opened);
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, em);
      append(em, t0);
      append(div2, t1);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div1, null);
      }
      append(div2, t2);
      if (!mounted) {
        dispose = listen(div0, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 1 && t0_value !== (t0_value = ctx[7].label + ""))
        set_data(t0, t0_value);
      if (dirty & 7) {
        each_value_1 = ctx[7].children;
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      if (dirty & 1) {
        toggle_class(div2, "opened", ctx[7].opened);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_1(ctx) {
  let a;
  let t_value = ctx[10].label + "";
  let t;
  let a_href_value;
  let mounted;
  let dispose;
  function click_handler_1() {
    return ctx[4](ctx[10]);
  }
  return {
    c() {
      var _a;
      a = element("a");
      t = text(t_value);
      attr(a, "href", a_href_value = ctx[10].url);
      attr(a, "class", "svelte-1ssgg69");
      toggle_class(a, "active", ctx[10].slug === ((_a = ctx[1]) == null ? void 0 : _a.slug));
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
      if (!mounted) {
        dispose = listen(a, "click", prevent_default(click_handler_1));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _a;
      ctx = new_ctx;
      if (dirty & 1 && t_value !== (t_value = ctx[10].label + ""))
        set_data(t, t_value);
      if (dirty & 1 && a_href_value !== (a_href_value = ctx[10].url)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & 3) {
        toggle_class(a, "active", ctx[10].slug === ((_a = ctx[1]) == null ? void 0 : _a.slug));
      }
    },
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (ctx2[7].group)
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment$2(ctx) {
  let div2;
  let div0;
  let t2;
  let div1;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      div0.innerHTML = `<span class="logo svelte-1ssgg69"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10.75 22H4.917a2.086 2.086 0 0 1-2.084-2.084v-9.7a1.977
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
                        5.49a1.666 1.666 0 1 1 1.667-1.67a1.669 1.669 0 0 1-1.667 1.667v.003z" fill="currentColor"></path></g></svg></span> 
        <span class="name">Sketch Book</span>`;
      t2 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "head svelte-1ssgg69");
      attr(div1, "class", "menu svelte-1ssgg69");
      attr(div2, "class", "navigation svelte-1ssgg69");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div2, t2);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div1, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 7) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div2);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $active;
  component_subscribe($$self, active, ($$value) => $$invalidate(1, $active = $$value));
  let menu = [];
  const unsubscribe = pages.subscribe(($pages) => {
    let group = {};
    let $active2 = get(active);
    let _menu = [];
    $pages.map((page2) => {
      let target = _menu;
      let parts = page2.name.split("/");
      if (parts.length > 1) {
        let label2 = parts[0];
        let parent = group[label2];
        if (!parent) {
          parent = { label: label2, group: true, children: [] };
          _menu.push(parent);
          group[label2] = parent;
        }
        target = parent.children;
        if (page2.slug === ($active2 == null ? void 0 : $active2.slug)) {
          parent.opened = true;
        }
      }
      let label = parts[parts.length - 1];
      const url = `#${page2.slug}`;
      const item = { slug: page2.slug, label, url };
      target.push(item);
    });
    _menu = _menu.sort((a, b) => {
      if (!!a.group > !!b.group)
        return 1;
      if (!!a.group < !!b.group)
        return -1;
      return 0;
    }).map((item) => {
      if (item.group) {
        item.children = item.children.sort((a, b) => {
          if (a.label > b.label)
            return 1;
          if (a.label < b.label)
            return -1;
          return 0;
        });
      }
      return item;
    });
    $$invalidate(0, menu = _menu);
  });
  onDestroy(() => {
    unsubscribe();
  });
  const onClick = (item) => {
    if (item.group) {
      item.opened = !item.opened;
      $$invalidate(0, menu = [...menu]);
    } else {
      load$1(item.slug);
    }
  };
  const click_handler = (item) => onClick(item);
  const click_handler_1 = (child) => onClick(child);
  const click_handler_2 = (item) => onClick(item);
  return [menu, $active, onClick, click_handler, click_handler_1, click_handler_2];
}
class Navigation extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$2, safe_not_equal, {});
  }
}
var layout_svelte_svelte_type_style_lang = "";
function create_fragment$1(ctx) {
  let div3;
  let div2;
  let div0;
  let navigation;
  let t;
  let div1;
  let content;
  let current;
  navigation = new Navigation({});
  content = new Content({});
  return {
    c() {
      div3 = element("div");
      div2 = element("div");
      div0 = element("div");
      create_component(navigation.$$.fragment);
      t = space();
      div1 = element("div");
      create_component(content.$$.fragment);
      attr(div0, "class", "navigation svelte-eu3h6w");
      attr(div1, "class", "content svelte-eu3h6w");
      attr(div2, "class", "wrapper svelte-eu3h6w");
      attr(div3, "class", "layout svelte-eu3h6w");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div2);
      append(div2, div0);
      mount_component(navigation, div0, null);
      append(div2, t);
      append(div2, div1);
      mount_component(content, div1, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(navigation.$$.fragment, local);
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navigation.$$.fragment, local);
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div3);
      destroy_component(navigation);
      destroy_component(content);
    }
  };
}
class Layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$1, safe_not_equal, {});
  }
}
function create_fragment(ctx) {
  let layout;
  let current;
  layout = new Layout({});
  return {
    c() {
      create_component(layout.$$.fragment);
    },
    m(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(layout, detaching);
    }
  };
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
var main = "";
function start({ target }) {
  return new App({ target });
}
export { Docs, Example, Prop, Scene, page, router, start };
//# sourceMappingURL=sketch.es.js.map
