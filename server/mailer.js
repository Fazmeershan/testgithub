import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;

const transporter =
  SMTP_HOST && MAIL_TO
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      })
    : null;

if (!transporter) {
  console.warn('SMTP not configured: enquiries are saved to server/data/enquiries.jsonl only.');
}

export async function notify(enquiry) {
  if (!transporter) return;
  const lines = [
    `Category: ${enquiry.category}`,
    `Name: ${enquiry.fullName}`,
    `Company: ${enquiry.company || '-'}`,
    `Email: ${enquiry.email}`,
    `Telephone: ${enquiry.phone || '-'}`,
    `Country: ${enquiry.country}`,
    `Language: ${enquiry.language}`,
    `Received: ${enquiry.receivedAt}`,
    '',
    enquiry.message,
  ];
  await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to: MAIL_TO,
    replyTo: enquiry.email,
    subject: `Website enquiry (${enquiry.category}): ${enquiry.fullName}`,
    text: lines.join('\n'),
  });
}
