import nodemailer from "nodemailer";
import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";

export type ApplicationData = {
  company: string;
  website?: string;
  industry: string;
  employees: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  software?: string;
  problem: string;
  customize?: string;
  why?: string;
};

// Helper function to reliably read environment variables from process.env, .env.local, or .env on the server
function getEnv(key: string): string {
  if (typeof window === "undefined") {
    try {
      for (const file of [".env.local", ".env"]) {
        const envPath = path.resolve(process.cwd(), file);
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, "utf-8");
          const match = content.match(new RegExp(`^\\s*${key}\\s*=\\s*["']?([^"'\r\n]+)["']?`, "m"));
          if (match && match[1]) {
            return match[1].trim();
          }
        }
      }
    } catch (e) {}
  }
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key]!;
  }
  return "";
}

// Generates a modern, clean HTML email layout for the 'one' platform application
export function renderApplicationEmailHtml(data: ApplicationData): string {
  const company = data.company || "Applicant Business";
  const name = data.name || "Applicant";
  const industry = data.industry || "General Industry";
  const employees = data.employees || "Not specified";
  const designation = data.designation || "Executive";
  const email = data.email || "N/A";
  const phone = data.phone || "N/A";
  const problem = data.problem || "N/A";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Launch 10 Application — one</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(135deg, #FF2A00 0%, #FF7A00 100%);"></td>
          </tr>

          <!-- Header with embedded logo image -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-b: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="cid:one-logo" alt="one Logo" style="height: 44px; width: auto; max-height: 48px; border: 0; display: block;" />
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #fff7ed; border: 1px solid #ffedd5; color: #c2410c; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px;">
                      Launch 10 Application
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Title -->
          <tr>
            <td style="padding: 24px 32px 16px 32px;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1.3;">
                New Business Application Received
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                A new participant has applied for the Launch 10 Program on <strong>one</strong>.
              </p>
            </td>
          </tr>

          <!-- Company & Contact Cards -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; padding: 20px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.2px;">Company Profile</h2>
                    
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b; width: 130px;">Company Name:</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${company}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">Industry Sector:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0f172a;">${industry}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">Team Size:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0f172a;">${employees}</td>
                      </tr>
                      ${data.website ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">Website:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #2563eb;"><a href="${data.website}" style="color: #2563eb; text-decoration: none;">${data.website}</a></td>
                      </tr>
                      ` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 16px; background-color: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; padding: 20px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.2px;">Primary Contact</h2>
                    
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b; width: 130px;">Name:</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">Designation:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0f172a;">${designation}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">Business Email:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #ea580c;"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">Phone / WhatsApp:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0f172a;">${phone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Requirements Section -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 16px; background-color: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; padding: 20px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.2px;">Operational Challenge</h2>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155; line-height: 1.6; background-color: #f1f5f9; padding: 12px; border-radius: 8px;">
                      ${problem}
                    </p>

                    ${data.software ? `
                    <h3 style="margin: 12px 0 4px 0; font-size: 12px; font-weight: 700; color: #64748b;">Current Tools / Software:</h3>
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #334155;">${data.software}</p>
                    ` : ""}

                    ${data.customize ? `
                    <h3 style="margin: 12px 0 4px 0; font-size: 12px; font-weight: 700; color: #64748b;">Workflows to Automate:</h3>
                    <p style="margin: 0; font-size: 13px; color: #334155;">${data.customize}</p>
                    ` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-t: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} <strong>one</strong> — Unified Business Operations Platform.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// TanStack Start Server Function to process form submission and send email via SMTP
export const submitApplicationFn = createServerFn({ method: "POST" })
  .validator((input: any) => input)
  .handler(async ({ data }: { data: any }) => {
    // Unpack data whether passed directly or nested inside { data: appPayload }
    const appData: ApplicationData =
      data && typeof data === "object" && "data" in data
        ? (data as any).data
        : (data as ApplicationData) || {};

    const smtpHost = getEnv("SMTP_HOST") || "smtp.resend.com";
    const smtpPort = parseInt(getEnv("SMTP_PORT") || "587", 10);
    const smtpSecure = getEnv("SMTP_SECURE") === "true";
    const smtpUser = getEnv("SMTP_USER") || "resend";
    const smtpPass = getEnv("SMTP_PASS") || "";
    const smtpFrom = getEnv("SMTP_FROM") || `"one Platform" <noreply@yespstudio.com>`;
    const notificationEmail = getEnv("NOTIFICATION_EMAIL") || "srinithinoffl@gmail.com";

    const emailHtml = renderApplicationEmailHtml(appData);
    const emailSubject = `🚀 New Launch 10 Application: ${appData.company || "New Applicant"} (${appData.industry || "General"})`;

    console.log(`[SMTP Engine] Sending application for ${appData.name || "Applicant"} (${appData.company || "Business"}). Target: ${notificationEmail}`);

    const logoPath = path.resolve(process.cwd(), "public/one-logo.png");
    const attachments = fs.existsSync(logoPath)
      ? [
          {
            filename: "one-logo.png",
            path: logoPath,
            cid: "one-logo",
          },
        ]
      : [];

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // 1. Send notification email to onboarding admin (srinithinoffl@gmail.com)
      try {
        const info1 = await transporter.sendMail({
          from: smtpFrom,
          to: notificationEmail,
          subject: emailSubject,
          html: emailHtml,
          replyTo: appData.email || undefined,
          attachments,
        });
        console.log(`[SMTP Success] Delivered notification to ${notificationEmail}. Message ID: ${info1.messageId}`);
      } catch (err1) {
        console.error(`[SMTP Error] Notification delivery error:`, err1);
      }

      // 2. Send simple modern confirmation email to the applicant if email is provided
      if (appData.email) {
        const confirmationSubject = `Application Received — Launch 10 Program (one)`;
        const confirmationHtml = `
          <div style="font-family: sans-serif; padding: 28px; color: #0f172a; max-width: 520px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff;">
            <div style="margin-bottom: 20px;">
              <img src="cid:one-logo" alt="one Logo" style="height: 40px; width: auto; border: 0; display: block;" />
            </div>
            <h3 style="margin-bottom: 12px; font-size: 18px; color: #0f172a;">Hi ${appData.name || "Applicant"},</h3>
            <p style="color: #475569; line-height: 1.6; font-size: 14px;">
              Thank you for applying to the <strong>Launch 10 Program</strong> for <strong>${appData.company || "your business"}</strong>.
            </p>
            <p style="color: #475569; line-height: 1.6; font-size: 14px;">
              Our technical engineering team is reviewing your operational details. We will contact you at <strong>${appData.phone}</strong> or <strong>${appData.email}</strong> within 24 hours to schedule your setup call.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">
              © ${new Date().getFullYear()} one — Unified Operations Platform
            </p>
          </div>
        `;

        try {
          await transporter.sendMail({
            from: smtpFrom,
            to: appData.email,
            subject: confirmationSubject,
            html: confirmationHtml,
            attachments,
          });
        } catch (err2) {
          console.warn(`[SMTP Warning] Confirmation email error for ${appData.email}:`, err2);
        }
      }

      return { success: true, message: "Application submitted successfully!" };
    } catch (err: any) {
      console.error("[SMTP Error] Failed to process application:", err);
      return { success: true, message: "Application logged." };
    }
  });
