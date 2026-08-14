import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { renderApplicationEmailHtml, renderConfirmationEmailHtml } from "./src/lib/smtp.ts";

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
                  const senderFrom = process.env.SMTP_FROM || process.env.RESEND_FROM || '"one Platform" <noreply@yespstudio.com>';

                  if (resendApiKey && resendApiKey.startsWith("re_")) {
                    // 1. Admin Notification Email
                    const adminSubject = `🚀 New Launch 10 Application: ${appData.company || "New Applicant"}`;
                    const adminHtml = renderApplicationEmailHtml(appData);

                    await fetch("https://api.resend.com/emails", {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${resendApiKey}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        from: senderFrom,
                        to: [notificationEmail],
                        subject: adminSubject,
                        html: adminHtml,
                      }),
                    }).catch((e) => console.error("[Dev Resend Admin Error]", e));

                    // 2. Applicant Confirmation Email
                    if (appData.email) {
                      const confirmSubject = `Application Received — Launch 10 Program (one)`;
                      const confirmHtml = renderConfirmationEmailHtml(appData);

                      await fetch("https://api.resend.com/emails", {
                        method: "POST",
                        headers: {
                          "Authorization": `Bearer ${resendApiKey}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          from: senderFrom,
                          to: [appData.email],
                          subject: confirmSubject,
                          html: confirmHtml,
                        }),
                      }).catch((e) => console.error("[Dev Resend Confirm Error]", e));
                      console.log(`[Dev API /api/apply] Sent applicant confirmation email to ${appData.email}`);
                    }
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
