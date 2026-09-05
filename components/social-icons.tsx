type IconProps = { className?: string };

const base = 'h-4 w-4 fill-current';

export function FacebookIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M15 8.5h2.5V5h-2.5c-2.2 0-4 1.8-4 4v2H9v3.5h2v7h3.5v-7h2.5l.5-3.5h-3v-2c0-.55.45-1 1-1Z" />
    </svg>
  );
}

export function InstagramIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className.replace('fill-current', 'stroke-current fill-none stroke-[1.6]')}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TwitterIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M18.9 4h2.4l-5.3 6.1L22.2 20h-4.9l-3.8-5-4.4 5H6.7l5.7-6.5L5 4h5l3.5 4.6L18.9 4Zm-.8 14.5h1.3L8 5.4H6.6l11.5 13.1Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M21.6 7.6c-.2-1.2-1.1-2.1-2.3-2.3C17.5 5 12 5 12 5s-5.5 0-7.3.3c-1.2.2-2.1 1.1-2.3 2.3C2 9.4 2 12 2 12s0 2.6.4 4.4c.2 1.2 1.1 2.1 2.3 2.3 1.8.3 7.3.3 7.3.3s5.5 0 7.3-.3c1.2-.2 2.1-1.1 2.3-2.3.4-1.8.4-4.4.4-4.4s0-2.6-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6.9 8.9H3.9V20h3V8.9ZM5.4 4c-1 0-1.8.8-1.8 1.8 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8C7.2 4.8 6.4 4 5.4 4ZM14.6 8.6c-1.4 0-2.4.6-2.9 1.4V8.9H8.7V20h3V14c0-1.6.3-3.1 2.3-3.1 1.9 0 2 1.8 2 3.2V20h3v-6.4c0-3-.6-5-3.4-5Z" />
    </svg>
  );
}
