import glob from "glob";
import { parse, walk } from "svelte/compiler";
import chalk from "chalk";
const config = {
  load: "pages/**/*",
  pages: [],
  isPage(path) {
    return this.pages.includes(path);
  }
};
function build() {
  let importBlock = "";
  let entry;
  return {
    name: "vite-plugin-sketch",
    enforce: "pre",
    load(id) {
      if (!entry && !id.includes("node_modules")) {
        entry = id;
        config.pages = [];
        const files = glob.sync(config.load);
        const chunks = [];
        chunks.push(`import { router as __sketch_router__ } from "sketch";`);
        for (const file of files) {
          const idx = chunks.length;
          const pageId = `SketchPage_${idx}`;
          config.pages.push(file);
          chunks.push(`
                        import * as ${pageId} from "${file}";
                        __sketch_router__.register(${pageId});
                    `);
        }
        importBlock = chunks.join("\n");
      }
      return null;
    },
    transform(code, id) {
      if (id === entry) {
        code = code + `

${importBlock}`;
        return code;
      }
      return null;
    }
  };
}
const NAME_PROP = "sketch";
const INDEX_PROP = "home";
function getPageConfig(markup) {
  const pageConfig = {};
  const matches = markup.match(/(<script[\s\S]*<\/script>)/);
  if (!matches) {
    return pageConfig;
  }
  const script = matches[0];
  const ast = parse(script);
  walk(ast.instance, {
    enter(node) {
      var _a, _b, _c;
      if (node.type === "ExportNamedDeclaration") {
        const { declaration } = node;
        const declarator = (_a = declaration.declarations) == null ? void 0 : _a.find((item) => item.type === "VariableDeclarator");
        if (declarator) {
          const variable = {
            name: (_b = declarator.id) == null ? void 0 : _b.name,
            value: (_c = declarator.init) == null ? void 0 : _c.value
          };
          if (variable.name === NAME_PROP) {
            pageConfig.name = variable.value;
          }
          if (variable.name === INDEX_PROP) {
            pageConfig.home = variable.value;
          }
        }
      }
    }
  });
  return pageConfig;
}
function process(markup, filename) {
  const pageConfig = getPageConfig(markup);
  if (!pageConfig.name) {
    error("Missing page name. You can use `export const pageName = '....' to provide it.", filename);
    return markup;
  }
  const block = `
        export const __sketch_page_config = {
            name: "${pageConfig.name}",
            home: ${!!pageConfig.home},
            file: "${filename}",
        };

        if (false) {
            window.dispatchEvent(
                new CustomEvent("sketchPageLoad", {
                    detail: __sketch_page_config,
                }),
            );
        }
    `;
  const reg = /^\s*(<script\s+context="module"\s*>)[\s\S]*?<\/script>/gim;
  const moduleContext = reg.exec(markup);
  if (moduleContext) {
    markup = markup.replace(moduleContext[1], `${moduleContext[1]}
${block}
`);
  } else {
    markup = `${markup}

<script context="module">
${block}
<\/script>`;
  }
  return markup;
}
function error(message, filename) {
  console.error(chalk.red(`failed to load sketch page: ${filename}
`) + chalk.red(message));
}
function transformer() {
  return {
    async markup({ content, filename }) {
      if (config.isPage(filename)) {
        content = process(content, filename);
      }
      return { code: content };
    }
  };
}
function configure(options) {
  for (const [prop, value] of Object.entries(options)) {
    config[prop] = value;
  }
}
var index = {
  configure,
  plugin: build,
  transformer
};
export { configure, index as default };
