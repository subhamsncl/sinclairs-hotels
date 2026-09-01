type IconProps = { className?: string };

const base = 'h-5 w-5 stroke-current fill-none stroke-2';

export function CameraIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function FlowerIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="12" cy="19" r="2.5" />
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="12" r="2.5" />
    </svg>
  );
}

export function CateringIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 3v7a2 2 0 0 0 2 2v9M7 3a2 2 0 0 0-2 2v5M7 3a2 2 0 0 1 2 2v5M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v8" />
    </svg>
  );
}

export function MusicIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  );
}

export function CakeIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 21v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7Z" />
      <path d="M4 17h16M12 12V8M12 8c-1 0-1.5-.7-1.5-1.5S11 5 12 5s1.5.7 1.5 1.5S13 8 12 8Z" />
    </svg>
  );
}

export function HeartIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.5 5 6 5c2 0 3.5 1.2 4 2.3.5-1.1 2-2.3 4-2.3 3.5 0 5.2 3.2 3.5 6.5C19 15.65 12 20 12 20Z" />
    </svg>
  );
}
