import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  installModule,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@freeloop/nuxt-ui-components",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve("./runtime");

    // install other modules
    installModule("@nuxtjs/tailwindcss", {
      exposeConfig: true,
      config: {
        darkMode: "class",
        content: {
          files: [resolve(runtimeDir, "components/**/*.{vue,mjs,ts}")],
          transform: {
            vue: (content: string) => {
              return content.replaceAll(/(?:\r\n|\r|\n)/g, " ");
            },
          },
        },
      },
    });
    installModule("nuxt-icon");

    // auto imports
    addComponentsDir({ path: resolve(runtimeDir, "components") });
  },
});
