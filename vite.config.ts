// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

// In local dev the Lovable asset CDN (/__l5e/assets-v1/…) is unavailable.
// This plugin reads each *.asset.json, maps the CDN path back to the local
// file, and serves it so images and audio work during `npm run dev`.
function localAssetDevPlugin() {
  const assetDir = resolve(__dirname, "src/assets");
  // Build a map: CDN path → local file path
  const map = new Map<string, string>();
  if (existsSync(assetDir)) {
    const files = require("node:fs").readdirSync(assetDir) as string[];
    for (const f of files) {
      if (!f.endsWith(".asset.json")) continue;
      try {
        const json = JSON.parse(readFileSync(join(assetDir, f), "utf-8")) as {
          url?: string;
          original_filename?: string;
        };
        if (json.url && json.original_filename) {
          const localPath = join(assetDir, json.original_filename);
          if (existsSync(localPath)) {
            map.set(json.url, localPath);
          }
        }
      } catch {
        // skip malformed json
      }
    }
  }

  return {
    name: "local-asset-dev",
    apply: "serve" as const,
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        const local = map.get(url);
        if (!local) return next();
        const ext = local.split(".").pop() ?? "";
        const mime: Record<string, string> = {
          webp: "image/webp",
          mp3: "audio/mpeg",
          png: "image/png",
          jpg: "image/jpeg",
          svg: "image/svg+xml",
        };
        try {
          const data = readFileSync(local);
          res.setHeader("Content-Type", mime[ext] ?? "application/octet-stream");
          res.setHeader("Cache-Control", "no-store");
          res.end(data);
        } catch {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [localAssetDevPlugin()],
  },
});
