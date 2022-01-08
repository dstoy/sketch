import { parse, walk } from "svelte/compiler";
import path from "path";
import chalk from "chalk";
import config from "./config";

const NAME_PROP = "sketch";
const INDEX_PROP = "home";
const CONTENT_PAGE = path.resolve(
    __dirname,
    "../lib/components/page/content.svelte",
);

/**
 * Extract page configuration from the component
 */
function getPageConfig(markup: string): PageConfig {
    const pageConfig: PageConfig = {};

    // Exctract only the script tags to parse
    const matches = markup.match(/(<script[\s\S]*<\/script>)/);
    if (!matches) {
        return pageConfig;
    }

    const script = matches[0];
    const ast = parse(script);

    walk(ast.instance, {
        enter(node) {
            if (node.type === "ExportNamedDeclaration") {
                const { declaration } = node;
                const declarator = declaration.declarations?.find(
                    (item: any) => item.type === "VariableDeclarator",
                );

                if (declarator) {
                    const variable = {
                        name: declarator.id?.name,
                        value: declarator.init?.value,
                    };

                    if (variable.name === NAME_PROP) {
                        pageConfig.name = variable.value;
                    }

                    if (variable.name === INDEX_PROP) {
                        pageConfig.home = variable.value;
                    }
                }
            }
        },
    });

    return pageConfig;
}

/**
 * Process a sketch page file and patch it so it auto loads on
 * application start
 */
function process(markup: string, filename: string) {
    // Extract the page config from the page markup
    const pageConfig = getPageConfig(markup);

    // Validate the page configuration
    if (!pageConfig.name) {
        error(
            "Missing page name. " +
                "You can use `export const pageName = '....' to provide it.",
            filename,
        );
        return markup;
    }

    // Inject the page registration block
    const block = `
        export const __sketch_page_config = {
            name: "${pageConfig.name}",
            home: ${!!pageConfig.home},
            file: "${filename}",
        };

        if (import.meta.hot) {
            window.dispatchEvent(
                new CustomEvent("sketchPageLoad", {
                    detail: __sketch_page_config,
                }),
            );
        }
    `;

    // Make sure we use existing module context if exits. It is not allowed
    // to have more than one module contexts per component
    const reg = /^\s*(<script\s+context="module"\s*>)[\s\S]*?<\/script>/gim;
    const moduleContext = reg.exec(markup);

    if (moduleContext) {
        markup = markup.replace(
            moduleContext[1],
            `${moduleContext[1]}\n${block}\n`,
        );
    } else {
        markup = `${markup}\n\n<script context="module">\n${block}\n</script>`;
    }

    return markup;
}

/**
 * Inject the custom styles into the content page
 */
function style(markup: string) {
    if (config.styles.length > 0) {
        const imports = (config.styles as string[]).map((style) => {
            const fullPath = path.join(config.root, style);
            return `@import "${fullPath}";\n`;
        });

        const reg = /^\s*(<style[\s\S]*?>[\s\S]*?)<\/style>/gim;
        const styleBlock = reg.exec(markup);

        if (styleBlock) {
            markup = markup.replace(
                styleBlock[1],
                `${styleBlock[1]}\n${imports}\n`,
            );
        }
    }

    return markup;
}

/**
 * Prints an error message
 */
function error(message: string, filename: string) {
    // eslint-disable-next-line no-console
    console.error(
        chalk.red(`failed to load sketch page: ${filename}\n`) +
            chalk.red(message),
    );
}

/**
 * Transform the page components
 */
export default function transformer() {
    return {
        async markup({ content, filename }) {
            if (config.isPage(filename)) {
                content = process(content, filename);
            }

            if (filename === CONTENT_PAGE) {
                content = style(content);
            }

            return { code: content };
        },
    };
}

interface PageConfig {
    name?: string;
    home?: boolean;
}
