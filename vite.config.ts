import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
    preview: {
      host: "0.0.0.0",
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4173,
      allowedHosts: true,
    },
    plugins: [
      tailwindcss(),
      viteReact({
        jsxRuntime: "automatic",
      }),
      {
        name: "api-apply-handler",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === "POST" && req.url === "/api/apply") {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk.toString();
              });
              req.on("end", async () => {
                try {
                  const appData = JSON.parse(body || "{}");
                  console.log(`[Dev API /api/apply] Received application from ${appData.name || "Applicant"} (${appData.company || "Business"})`);

                  const resendApiKey = process.env.RESEND_API_KEY || process.env.SMTP_PASS;
                  const notificationEmail = process.env.NOTIFICATION_EMAIL || "srinithinoffl@gmail.com";

                  if (resendApiKey && resendApiKey.startsWith("re_")) {
                    await fetch("https://api.resend.com/emails", {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${resendApiKey}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        from: process.env.SMTP_FROM || process.env.RESEND_FROM || '"one Platform" <noreply@yespstudio.com>',
                        to: [notificationEmail],
                        subject: `🚀 New Launch 10 Application: ${appData.company || "New Applicant"}`,
                        html: `
                          <h2>New Launch 10 Application Received</h2>
                          <p><strong>Company:</strong> ${appData.company || "N/A"}</p>
                          <p><strong>Name:</strong> ${appData.name || "N/A"} (${appData.designation || ""})</p>
                          <p><strong>Email:</strong> ${appData.email || "N/A"}</p>
                          <p><strong>Phone:</strong> ${appData.phone || "N/A"}</p>
                          <p><strong>Industry:</strong> ${appData.industry || "N/A"}</p>
                          <p><strong>Team Size:</strong> ${appData.employees || "N/A"}</p>
                          <p><strong>Problem:</strong> ${appData.problem || "N/A"}</p>
                        `,
                      }),
                    }).catch((e) => console.error("[Dev Resend Error]", e));
                  }

                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true, message: "Application submitted successfully!" }));
                } catch (e) {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true, message: "Application received." }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
  };
});
