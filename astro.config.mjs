import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  site: "https://loquitor.ai",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  build: { format: "directory" }
});
