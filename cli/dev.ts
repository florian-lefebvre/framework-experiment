import { loadConfig } from "c12";
import type { Config } from "../types";
import { build, createDevServer, createNitro, prepare } from "nitropack";

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
    dev: true,
    preset: "nitro-dev",
    ...config?.nitro,
  });
  const server = createDevServer(nitro);
  await server.listen({});
  await prepare(nitro);
  await build(nitro);
  return;
};

run();
