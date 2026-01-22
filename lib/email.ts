import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Test connection on startup
transporter.verify((error) => {
  if (error) console.error("SMTP error:", error);
  else console.log("SMTP ready for Engineering Tech Builders Club emails");
});

export async function sendVerificationEmail(email: string, fullName: string, verifyLink: string) {
  const info = await transporter.sendMail({
    from: `"Engineering Tech Builders Club" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Verify Your Engineering Tech Builders Club Account",
    html: `
      <h2>Welcome to Engineering Tech Builders Club!</h2>
      <p>Hello ${fullName},</p>
      <p>Thank you for registering. Verify your email to activate:</p>
      <a href="${verifyLink}" style="padding:12px 24px;background:#2563eb;color:white;text-decoration:none;border-radius:6px;display:inline-block;">
        Verify Email
      </a>
      <p>Expires in 24 hours. Ignore if not you.</p>
      <p>Engineering Tech Builders Club Team</p>
    `,
  });
  console.log(`Verification sent to ${email}: ${info.messageId}`);
  return info;
}

export async function sendResetPasswordEmail(email: string, fullName: string, resetLink: string) {
  const info = await transporter.sendMail({
    from: `"Engineering Tech Builders Club" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Reset Your Engineering Tech Builders Club Password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Hello ${fullName},</p>
      <p>Reset your password:</p>
      <a href="${resetLink}" style="padding:12px 24px;background:#2563eb;color:white;text-decoration:none;border-radius:6px;display:inline-block;">
        Reset My Password
      </a>
        <p>Expires in 1 hour. Ignore if not you.</p>
        <p>Engineering Tech Builders Club Team</p>
    `,
  });
  console.log(`Password reset sent to ${email}: ${info.messageId}`);
  return info;
}
