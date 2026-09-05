import { publicSiteUrl } from '../site-url';

const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPE_MAP[char] ?? char);
}

export function emailLayout({ title, bodyHtml }: { title: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; background-color:#faf7f1; font-family:'Libre Baskerville', Georgia, 'Times New Roman', serif; color:#1c1c1a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f1; padding:24px 0;">
<tr>
<td align="center">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden;">
<tr>
<td style="background-color:#006b54; padding:24px 32px;">
<img src="${publicSiteUrl}/email/logo.png" width="176" height="32" alt="Sinclairs Hotels &amp; Resorts" style="display:block; border:0;">
</td>
</tr>
<tr>
<td style="border-top:3px solid #fcc201;"></td>
</tr>
<tr>
<td style="padding:32px;">
${bodyHtml}
</td>
</tr>
<tr>
<td style="background-color:#f2ede3; padding:16px 32px; font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#6b6b63;">
This is an automated message from Sinclairs Hotels &amp; Resorts &mdash; sinclairshotels.com.
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

// Escapes both label and value itself — callers should pass raw strings, never
// pre-escaped ones, so a value can never accidentally end up unescaped in the HTML.
export function fieldRowsHtml(fields: Array<[string, string]>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:13px;">
${fields
  .map(
    ([label, value]) => `<tr>
<td style="padding:6px 12px; background-color:#f2ede3; font-weight:bold; width:160px; vertical-align:top; border-bottom:1px solid #e5e0d5;">${escapeHtml(label)}</td>
<td style="padding:6px 12px; vertical-align:top; border-bottom:1px solid #e5e0d5;">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
</tr>`,
  )
  .join('\n')}
</table>`;
}

// Bulletproof table-based button — matches the site's gold CTA pill (see
// CLAUDE.md's "Closing CTA band"), styled as a table rather than a plain
// <a> so it renders consistently across email clients that strip button CSS.
export function buttonHtml(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0;">
<tr>
<td style="background-color:#fcc201; border-radius:4px;">
<a href="${href}" style="display:inline-block; padding:12px 24px; font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:0.5px; color:#006b54; text-decoration:none;">${escapeHtml(label)}</a>
</td>
</tr>
</table>`;
}
