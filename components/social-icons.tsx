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
