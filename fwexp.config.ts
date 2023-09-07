import type { Config, DeepPartial } from "./types";

const defineConfig = <T extends DeepPartial<Config>>(config: T) => config;

// export default defineConfig({ router: false, nitro: { srcDir: "./server" } });
export default defineConfig({});
