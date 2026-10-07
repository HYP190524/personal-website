import vinext from "vinext";
import { defineConfig } from "vite";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const isVercel = process.env.VERCEL === "1";

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Vercel needs Nitro's Build Output API adapter. The Cloudflare/Sites
  // plugins are kept for the original local/Sites deployment path, but they
  // must not be loaded in Vercel builds.
  if (isVercel) {
    const { nitro } = await import("nitro/vite");

    return {
      server: isCodexSeatbeltSandbox
        ? { watch: { useFsEvents: false, usePolling: true } }
        : undefined,
      plugins: [vinext(), nitro()],
    };
  }

  const { cloudflare } = await import("@cloudflare/vite-plugin");
  const { default: hostingConfig } = await import("./.openai/hosting.json");
  const { sites } = await import("./build/sites-vite-plugin");

  const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
    "00000000-0000-4000-8000-000000000000";
  const { d1, r2 } = hostingConfig;
  const localBindingConfig = {
    main: "./worker/index.ts",
    compatibility_flags: ["nodejs_compat"],
    d1_databases: d1
      ? [
          {
            binding: d1,
            database_name: "site-creator-d1",
            database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
          },
        ]
      : [],
    r2_buckets: r2
      ? [
          {
            binding: r2,
            bucket_name: "site-creator-r2",
          },
        ]
      : [],
  };

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
