import { loadConfig } from "c12";
import type { Config } from "../types";
import { build as buildVite } from "vite";
import {
  build,
  copyPublicAssets,
  createNitro,
  prepare,
  prerender,
  writeTypes,
} from "nitropack";

export const run = async () => {
  const { config } = await loadConfig<Config>({
    configFile: "fwexp.config.ts",
    defaultConfig: {
      router: {},
      nitro: {
        typescript: { internalPaths: true },
        esbuild: {
          options: {
            loaders: {
              ".tsx": "tsx",
            },
          },
        },
        publicAssets: [
          {
            dir: "./.nitro/client/assets",
            baseURL: "/assets",
            maxAge: 31536000,
          },
        ],
        bundledStorage: ["templates"],
        devStorage: {
          templates: {
            driver: "fs",
            base: ".nitro/templates",
          },
        },
        handlers: [
          {
            handler: "./core/server.tsx",
            route: "/**",
          },
        ],
      },
      vite: {},
    },
  });

  // DEV
  const nitro = await createNitro({
    ...config?.nitro,
  });
  await prepare(nitro);
  await writeTypes(nitro);

  await buildVite({
    build: {
      outDir: ".nitro/client",
    },
    ...config?.vite,
  });

  await copyPublicAssets(nitro);
  await prerender(nitro);
  await build(nitro);
  await nitro.close();

  return;
};

run();
