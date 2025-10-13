import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://example.com",
  integrations: [],
  build: { format: "directory" }
});
