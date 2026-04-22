import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { to, customerName, inspectionStart, address } = req.body;

    const formattedDate = new Date(inspectionStart).toLocaleString();

    const { error } = await resend.emails.send({
      from: "AtticSafe <onboarding@resend.dev>", // TEMP
      replyTo: "atticsafe@gmail.com",
      to,
      subject: "Inspection Confirmation – AtticSafe",
      html: `
        <p>Hi ${customerName},</p>

        <p>Your attic inspection has been scheduled.</p>

        <p>
          <strong>Date & Time:</strong> ${formattedDate}<br/>
          <strong>Address:</strong> ${address}
        </p>

        <p>If you need to make any changes, just reply to this email.</p>

        <p>Thank you,<br/>AtticSafe</p>
      `,
    });

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
