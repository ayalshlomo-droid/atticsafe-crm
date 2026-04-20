import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, subject, html, pdfBase64, filename } = req.body;

    if (!to || !subject || !html || !pdfBase64 || !filename) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await resend.emails.send({
      from: "AtticSafe <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
      attachments: [
        {
          filename: filename,
          content: pdfBase64
        }
      ]
    });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Failed to send email"
    });
  }
}
