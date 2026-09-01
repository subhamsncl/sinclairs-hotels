import type { JSX } from 'react';

type IconProps = { className?: string };

const base = 'h-5 w-5 stroke-current fill-none stroke-[1.6]';

function WifiIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8.5a16 16 0 0 1 20 0M5.5 12.5a11 11 0 0 1 13 0M9 16.5a6 6 0 0 1 6 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PoolIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
      <path d="M6 13V6a2 2 0 0 1 2-2h3l7 7" />
    </svg>
  );
}

function ParkingIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 17V7h3.5a3 3 0 0 1 0 6H9" />
    </svg>
  );
}

function RestaurantIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 3v7a2 2 0 0 0 2 2v9M7 3a2 2 0 0 0-2 2v5M7 3a2 2 0 0 1 2 2v5M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v8" />
    </svg>
  );
}

function BarIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16l-6.5 8v7h3M10 19h3M9.5 12 4 4" />
    </svg>
  );
}

function SpaIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21c-4-1-6-4.5-6-8 3 0 6 1.5 6 5 0-3.5 3-5 6-5 0 3.5-2 7-6 8Z" />
      <path d="M12 13V4" />
    </svg>
  );
}

function TransferIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 13h13l3 4H3zM6 13V8a2 2 0 0 1 2-2h5l3 4" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

function LaundryIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 6h.01M11 6h.01" />
    </svg>
  );
}

function ElevatorIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M10 8l2-2 2 2M10 14l2 2 2-2" />
    </svg>
  );
}

function BusinessIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="1" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function GeneratorIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 3 4 14h6l-1 7 9-11h-6z" />
    </svg>
  );
}

function GardenIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21v-9M12 12C7 12 5 8 5 4c4 0 6 2 7 5 1-3 3-5 7-5 0 4-2 8-7 8Z" />
    </svg>
  );
}

function RoomServiceIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 18h16" />
      <path d="M6 18a6 6 0 0 1 12 0" />
      <path d="M12 12V9" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GamesIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M7 10v4M5 12h4M15 11h.01M18 13h.01" />
    </svg>
  );
}

function SightseeingIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 3 8v3l9-4 9 4V8Z" />
      <path d="M5 11v9h14v-9M10 20v-6h4v6" />
    </svg>
  );
}

function DoctorIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function CheckIcon({ className = base }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

const RULES: Array<[RegExp, (p: IconProps) => JSX.Element]> = [
  [/wi-?fi|internet/i, WifiIcon],
  [/pool/i, PoolIcon],
  [/park|car hire|valet/i, ParkingIcon],
  [/restaurant|cuisine|dining|cafe|café/i, RestaurantIcon],
  [/bar|lounge/i, BarIcon],
  [/spa|gym|yoga|fitness/i, SpaIcon],
  [/transfer|airport|railway|shuttle/i, TransferIcon],
  [/laundry/i, LaundryIcon],
  [/elevator|lift/i, ElevatorIcon],
  [/business/i, BusinessIcon],
  [/generator|power/i, GeneratorIcon],
  [/garden|lawn|terrace|outdoor/i, GardenIcon],
  [/room service|in-room dining/i, RoomServiceIcon],
  [/game|carrom|chess|ludo|badminton|table tennis|library|playzone/i, GamesIcon],
  [/sightseeing|tour/i, SightseeingIcon],
  [/doctor/i, DoctorIcon],
];

export function getAmenityIcon(label: string) {
  for (const [pattern, Icon] of RULES) {
    if (pattern.test(label)) return Icon;
  }
  return CheckIcon;
}
