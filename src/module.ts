import {
  defineNuxtModule,
  extendViteConfig,
  createResolver,
  addComponentsDir,
  useNuxt,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

/**
 * for build
 */
const setupTranspilation = () => {
  const nuxt = useNuxt();

  const transpile = nuxt.options.build.transpile || [];
  // transpile.push("qrcode");
  nuxt.options.build.transpile = transpile;
};

const setupOptimizeDeps = () => {
  extendViteConfig((config) => {
    // config.optimizeDeps?.include?.push("qrcode");
  });
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve("./runtime");

    addComponentsDir({ path: resolve(runtimeDir, "components") });
  },
});
