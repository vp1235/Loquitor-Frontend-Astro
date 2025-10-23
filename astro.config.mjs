import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",
  site: "https://loquitor.ai",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  build: { format: "directory" }
});
