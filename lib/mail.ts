import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_ADDRESS = 'Sinclairs Hotels <noreply@sinclairshotels.com>';

// Configurable so a local/staging environment can redirect staff notifications to a
// safe test inbox via env var, without touching the three call sites that use it.
export const STAFF_NOTIFY_EMAIL =
  process.env.STAFF_NOTIFY_EMAIL || 'reservations@sinclairshotels.com';

export async function sendMail({
  to,
  bcc,
  replyTo,
  subject,
  html,
}: {
  to: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<void> {
  if (!resend) {
    console.log('[mail:dev-fallback]', { to, bcc, replyTo, subject });
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    bcc,
    replyTo,
    subject,
    html,
  });
  if (error) {
    console.error('[mail:send-failed]', error);
  }
}
