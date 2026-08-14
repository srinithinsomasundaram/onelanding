import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const PORT = Number(process.env.PORT) || 3000;
const DIST_DIR = path.resolve(process.cwd(), "dist");

// Ensure dist directory exists or build it automatically on server startup
if (!fs.existsSync(path.join(DIST_DIR, "index.html"))) {
  console.log("[Production Server] dist/index.html not found. Building project...");
  try {
    execSync("npx vite build", { stdio: "inherit" });
  } catch (e) {
    console.error("[Production Server] Automatic build failed:", e);
  }
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webapp": "application/x-web-app-manifest+json",
  ".map": "application/json; charset=utf-8",
};

// Helper to send email via Resend HTTPS API if RESEND_API_KEY is available
async function sendResendEmail({ apiKey, from, to, subject, html }) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from || '"one Platform" <noreply@yespstudio.com>',
        to: [to],
        subject,
        html,
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("[Resend Error]", e);
    return false;
  }
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];

  // Health check routes for NGINX & Docker proxy health monitors
  if (urlPath === "/health" || urlPath === "/healthz" || urlPath === "/_health" || urlPath === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }));
    return;
  }

  // API Route: POST /api/apply
  if (req.method === "POST" && urlPath === "/api/apply") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const appData = JSON.parse(body || "{}");
        console.log(`[API /api/apply] Received application from ${appData.name || "Applicant"} (${appData.company || "Business"})`);

        const resendApiKey = process.env.RESEND_API_KEY || process.env.SMTP_PASS;
        const notificationEmail = process.env.NOTIFICATION_EMAIL || "srinithinoffl@gmail.com";

        if (resendApiKey && resendApiKey.startsWith("re_")) {
          const subject = `🚀 New Launch 10 Application: ${appData.company || "New Applicant"}`;
          const html = `
            <h2>New Launch 10 Application Received</h2>
            <p><strong>Company:</strong> ${appData.company || "N/A"}</p>
            <p><strong>Name:</strong> ${appData.name || "N/A"} (${appData.designation || ""})</p>
            <p><strong>Email:</strong> ${appData.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${appData.phone || "N/A"}</p>
            <p><strong>Industry:</strong> ${appData.industry || "N/A"}</p>
            <p><strong>Team Size:</strong> ${appData.employees || "N/A"}</p>
            <p><strong>Problem:</strong> ${appData.problem || "N/A"}</p>
          `;

          await sendResendEmail({
            apiKey: resendApiKey,
            from: process.env.SMTP_FROM || process.env.RESEND_FROM,
            to: notificationEmail,
            subject,
            html,
          });
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Application submitted successfully!" }));
      } catch (err) {
        console.error("[API Error]", err);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Application received." }));
      }
    });

    return;
  }

  // Serve static dist files
  const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");
  let filePath = path.join(DIST_DIR, safePath);

  let isFile = false;
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      isFile = true;
    }
  } catch (e) {
    isFile = false;
  }

  // SPA fallback to index.html for client-side routing if file doesn't exist
  if (!isFile) {
    filePath = path.join(DIST_DIR, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<!DOCTYPE html><html><head><title>one</title></head><body><div id='root'>Loading one platform...</div></body></html>");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
    });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[Production Server] Listening on http://0.0.0.0:${PORT}`);
});
