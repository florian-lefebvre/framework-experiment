import type { NitroConfig } from "nitropack";
import type { UserConfig as ViteUserConfig } from "vite";

export type UIAdapter = {};
export type RouterAdapter = {};
export type Integration = {};

export type Config = {
  uiAdapter?: UIAdapter;
  router: RouterAdapter;
  integrations?: Integration[];
  nitro: NitroConfig;
  vite: ViteUserConfig;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
