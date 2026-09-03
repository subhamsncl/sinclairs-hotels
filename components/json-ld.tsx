export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // script/style are the only elements React lets you pass raw text
  // children to, so this needs no dangerouslySetInnerHTML. Escaping "<"
  // still guards against a "</script>" breakout, even though every caller
  // only ever passes static, developer-authored data — never request input.
  return (
    <script type="application/ld+json">{JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  );
}
