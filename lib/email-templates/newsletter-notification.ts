import { emailLayout, fieldRowsHtml } from './layout';

export function newsletterNotificationHtml({ email }: { email: string }): string {
  const bodyHtml = `
    <p style="font-size:14px; margin:0 0 20px;">A new visitor has signed up for the newsletter.</p>
    ${fieldRowsHtml([['Email', email]])}
  `;

  return emailLayout({ title: 'New newsletter subscriber', bodyHtml });
}
