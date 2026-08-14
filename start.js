// Production server entrypoint ensuring HOST=0.0.0.0 and PORT are set for cloud containers
process.env.HOST = process.env.HOST || "0.0.0.0";
process.env.PORT = process.env.PORT || process.env.NITRO_PORT || "3000";

console.log(`[Production Server] Launching 'one' SSR engine on ${process.env.HOST}:${process.env.PORT}`);

import("./dist/server/server.js").catch((err) => {
  console.error("[Production Server Error] Failed to launch server:", err);
  process.exit(1);
});
