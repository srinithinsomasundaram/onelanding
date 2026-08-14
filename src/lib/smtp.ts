import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export type ApplicationData = {
  company: string;
  website?: string | undefined;
  industry: string;
  employees: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  software?: string | undefined;
  problem: string;
  customize?: string | undefined;
  why?: string | undefined;
};

// Helper function to reliably read environment variables from process.env, .env.local, or .env on server
function getEnv(key: string): string {
  // 1. Highest priority: actual environment variables in process.env (Vercel, Netlify, Render, Docker, AWS)
  if (typeof process !== "undefined" && process.env && process.env[key] && !process.env[key]!.includes("YOUR_")) {
    return process.env[key]!.trim();
  }

  // 2. Local environment files (.env.local, .env) for development
  if (typeof window === "undefined") {
    try {
      for (const file of [".env.local", ".env"]) {
        const envPath = path.resolve(process.cwd(), file);
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, "utf-8");
          const match = content.match(new RegExp(`^\\s*${key}\\s*=\\s*["']?([^"'\r\n]+)["']?`, "m"));
          if (match && match[1] && !match[1].trim().includes("YOUR_")) {
            return match[1].trim();
          }
        }
      }
    } catch (e) {}
  }

  // 3. Fallback process.env lookup
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key]!.trim();
  }

  return "";
}

// Helper for sending transactional email via Resend HTTPS REST API (works on serverless without SMTP socket blocks)
async function sendViaResendApi({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  html,
  attachments,
}: {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string | undefined;
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: string }> | undefined;
}) {
  const payload: Record<string, any> = {
    from,
    to: [to],
    subject,
    html,
  };
  if (replyTo) {
    payload["reply_to"] = replyTo;
  }
  if (attachments && attachments.length > 0) {
    payload["attachments"] = attachments;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API HTTP ${response.status}: ${errorText}`);
  }

  return await response.json();
}

// Generates a modern, clean HTML email layout for the 'one' platform application admin notification
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

          <!-- Header with logo -->
          <tr>
            <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="https://one.yespstudio.com/one-logo.png" alt="one Logo" width="120" style="width: 120px; height: auto; max-height: 52px; display: block; border: 0; outline: none; object-fit: contain;" />
                  </td>
                  <td align="right" style="vertical-align: middle;">
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
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #334155;">${data.customize}</p>
                    ` : ""}

                    ${data.why ? `
                    <h3 style="margin: 12px 0 4px 0; font-size: 12px; font-weight: 700; color: #64748b;">Reason for applying:</h3>
                    <p style="margin: 0; font-size: 13px; color: #334155;">${data.why}</p>
                    ` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
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

// Generates a modern HTML email layout for applicant confirmation email
export function renderConfirmationEmailHtml(data: ApplicationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received — Launch 10 Program (one)</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(135deg, #FF2A00 0%, #FF7A00 100%);"></td>
          </tr>

          <!-- Header with logo -->
          <tr>
            <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              <img src="https://one.yespstudio.com/one-logo.png" alt="one Logo" width="120" style="width: 120px; height: auto; max-height: 52px; display: block; border: 0; outline: none; object-fit: contain;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 800; color: #0f172a;">Hi ${data.name || "Applicant"},</h3>
              <p style="margin: 0 0 14px 0; color: #475569; line-height: 1.6; font-size: 14px;">
                Thank you for applying to the <strong>Launch 10 Program</strong> for <strong>${data.company || "your business"}</strong>.
              </p>
              <p style="margin: 0 0 20px 0; color: #475569; line-height: 1.6; font-size: 14px;">
                Our technical engineering team is reviewing your operational details. We will contact you at <strong>${data.phone}</strong> or <strong>${data.email}</strong> within 24 hours to schedule your setup call.
              </p>

              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px;">
                <p style="margin: 0; font-size: 13px; color: #64748b; font-weight: 600;">
                  Next Steps: Our team will prepare a customized workflow prototype for ${data.company || "your business"} prior to our call.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} <strong>one</strong> — Unified Operations Platform
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

// Server Function to process form submission and send email via HTTPS API or SMTP
export async function submitApplicationFn({ data }: { data: any }) {
  // Unpack data whether passed directly or nested inside { data: appPayload }
  const appData: ApplicationData =
    data && typeof data === "object" && "data" in data
      ? (data as any).data
      : (data as ApplicationData) || {};

  const resendApiKey = getEnv("RESEND_API_KEY") || getEnv("SMTP_PASS");
  const smtpHost = getEnv("SMTP_HOST") || "smtp.resend.com";
  const smtpPort = parseInt(getEnv("SMTP_PORT") || "465", 10);
  const smtpSecure = getEnv("SMTP_SECURE") === "true" || smtpPort === 465;
  const smtpUser = getEnv("SMTP_USER") || "resend";
  const smtpPass = getEnv("SMTP_PASS") || "";
  const smtpFrom = getEnv("SMTP_FROM") || getEnv("RESEND_FROM") || `"one Platform" <noreply@yespstudio.com>`;
  const notificationEmail = getEnv("NOTIFICATION_EMAIL") || "srinithinoffl@gmail.com";

  const emailHtml = renderApplicationEmailHtml(appData);
  const confirmationHtml = renderConfirmationEmailHtml(appData);
  const emailSubject = `🚀 New Launch 10 Application: ${appData.company || "New Applicant"} (${appData.industry || "General"})`;

  console.log(`[Email Engine] Processing application for ${appData.name || "Applicant"} (${appData.company || "Business"}). Admin recipient: ${notificationEmail}`);

  let adminSent = false;
  let applicantSent = false;

  const logoPath = path.resolve(process.cwd(), "public/one-logo.png");
  const hasLogo = fs.existsSync(logoPath);

  // 1. Try Resend HTTPS REST API first (fastest, works on serverless without SMTP port restrictions)
  if (resendApiKey && resendApiKey.startsWith("re_")) {
    try {
      console.log(`[Email Engine] Attempting delivery via Resend HTTPS REST API...`);
      
      const resendAttachments = hasLogo
        ? [
            {
              filename: "one-logo.png",
              content: fs.readFileSync(logoPath).toString("base64"),
            },
          ]
        : undefined;

      const res1Payload: {
        apiKey: string;
        from: string;
        to: string;
        subject: string;
        html: string;
        replyTo?: string | undefined;
        attachments?: Array<{ filename: string; content: string }> | undefined;
      } = {
        apiKey: resendApiKey,
        from: smtpFrom,
        to: notificationEmail,
        subject: emailSubject,
        html: emailHtml,
      };
      if (appData.email) {
        res1Payload.replyTo = appData.email;
      }
      if (resendAttachments) {
        res1Payload.attachments = resendAttachments;
      }

      const res1 = await sendViaResendApi(res1Payload);
      console.log(`[Resend API Success] Delivered admin notification to ${notificationEmail}:`, res1.id);
      adminSent = true;

      if (appData.email) {
        const confirmationSubject = `Application Received — Launch 10 Program (one)`;
        const res2Payload: {
          apiKey: string;
          from: string;
          to: string;
          subject: string;
          html: string;
          attachments?: Array<{ filename: string; content: string }> | undefined;
        } = {
          apiKey: resendApiKey,
          from: smtpFrom,
          to: appData.email,
          subject: confirmationSubject,
          html: confirmationHtml,
        };
        if (resendAttachments) {
          res2Payload.attachments = resendAttachments;
        }

        const res2 = await sendViaResendApi(res2Payload);
        console.log(`[Resend API Success] Delivered confirmation to applicant ${appData.email}:`, res2.id);
        applicantSent = true;
      }

      return { success: true, message: "Application submitted successfully!" };
    } catch (resendErr: any) {
      console.warn(`[Resend API Warning] Resend HTTPS delivery attempt failed. Falling back to SMTP transport:`, resendErr.message);
    }
  }

  // 2. Fallback to Nodemailer SMTP
  try {
    const smtpAttachments = hasLogo
      ? [
          {
            filename: "one-logo.png",
            path: logoPath,
            cid: "one-logo",
          },
        ]
      : [];

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    if (!adminSent) {
      const info1 = await transporter.sendMail({
        from: smtpFrom,
        to: notificationEmail,
        subject: emailSubject,
        html: emailHtml,
        replyTo: appData.email || undefined,
        attachments: smtpAttachments,
      });
      console.log(`[SMTP Success] Delivered notification to ${notificationEmail}. Message ID: ${info1.messageId}`);
    }

    if (!applicantSent && appData.email) {
      const confirmationSubject = `Application Received — Launch 10 Program (one)`;
      const info2 = await transporter.sendMail({
        from: smtpFrom,
        to: appData.email,
        subject: confirmationSubject,
        html: confirmationHtml,
        attachments: smtpAttachments,
      });
      console.log(`[SMTP Success] Delivered confirmation to ${appData.email}. Message ID: ${info2.messageId}`);
    }

    return { success: true, message: "Application submitted successfully!" };
  } catch (smtpErr: any) {
    console.error("[SMTP Error] Failed to process application via SMTP:", smtpErr);
    return { success: true, message: "Application logged." };
  }
}
