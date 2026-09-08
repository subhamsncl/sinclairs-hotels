// Email addresses have no spaces for the browser to wrap at, so a narrow
// column forces an arbitrary mid-word break (e.g. "sinclairshotels.co" / "m").
// A <wbr/> right after the "@" gives it a natural, legible place to wrap instead.
export function EmailText({ email }: { email: string }) {
  const at = email.indexOf('@');
  if (at === -1) return <>{email}</>;

  return (
    <>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </>
  );
}
