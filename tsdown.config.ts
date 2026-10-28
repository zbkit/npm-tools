import { defineConfig } from "tsdown";

export default defineConfig({
  tsconfig: "tsconfig.app.json",
  platform: "neutral",
  exports: true,
  alias: {
    "@": "./src",
  },
  // ...config options
});
