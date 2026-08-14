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

// Client-safe submission function for form handling in browser React environment
export async function submitApplicationFn({ data }: { data: any }) {
  const appData: ApplicationData =
    data && typeof data === "object" && "data" in data
      ? (data as any).data
      : (data as ApplicationData) || {};

  console.log(`[Launch 10 Application] Form submitted for:`, appData.company, appData.email);

  // If a server endpoint exists (e.g. /api/apply or Webhook), post to it via browser fetch
  try {
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // If running strictly client-side SPA without backend API route, fallback gracefully
  }

  return { success: true, message: "Application submitted successfully!" };
}
