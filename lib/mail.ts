import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// sinclairshotels.com isn't verified in Resend yet (the domain still points at the
// legacy site — see CLAUDE.md's SEO note), so sending "from" it 403s with
// "domain is not verified" and Resend never delivers. Resend's own onboarding@resend.dev
// sender needs no domain verification, at the cost of only being able to deliver to the
// Resend account's own verified email — fine for pre-launch testing. Swap
// MAIL_FROM_ADDRESS to a sinclairshotels.com address once that domain is added and
// verified at https://resend.com/domains.
const FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || 'Sinclairs Hotels <onboarding@resend.dev>';

// Configurable so a local/staging environment can redirect staff notifications to a
// safe test inbox via env var, without touching the three call sites that use it.
export const STAFF_NOTIFY_EMAIL =
  process.env.STAFF_NOTIFY_EMAIL || 'reservations@sinclairshotels.com';

// Every outbound mail is also Bcc'd here — lets whoever's testing as "the business"
// see guest-facing sends (i-Pay confirmations, voucher copies) too, not just the
// staff-notification ones. Blank by default so production doesn't Bcc anyone.
const OWNER_BCC_EMAIL = process.env.OWNER_BCC_EMAIL || undefined;

function withOwnerBcc(bcc?: string | string[]): string | string[] | undefined {
  if (!OWNER_BCC_EMAIL) return bcc;
  const existing = bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : [];
  return existing.includes(OWNER_BCC_EMAIL) ? existing : [...existing, OWNER_BCC_EMAIL];
}

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
  const finalBcc = withOwnerBcc(bcc);

  if (!resend) {
    console.log('[mail:dev-fallback]', { to, bcc: finalBcc, replyTo, subject });
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    bcc: finalBcc,
    replyTo,
    subject,
    html,
  });
  if (error) {
    console.error('[mail:send-failed]', error);
  }
}
