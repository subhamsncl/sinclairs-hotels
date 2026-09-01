import type { Hotel } from '@/content/types';

export function VenueTable({ hotel }: { hotel: Hotel }) {
  const spaces = hotel.eventSpaces;
  if (!spaces) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-forest/10 bg-white">
      <div className="border-b border-forest/10 px-6 py-4">
        <h3 className="font-display text-lg text-forest">{hotel.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-gold">
          {spaces.venues.length} {spaces.venues.length === 1 ? 'Event Room' : 'Event Rooms'} ·{' '}
          {spaces.totalSqFt.toLocaleString('en-IN')} sq ft · Up to {spaces.maxCapacity} guests
        </p>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-forest/10 text-xs uppercase tracking-wider text-ink/50">
            <th className="px-6 py-2 font-normal">Venue</th>
            <th className="px-6 py-2 font-normal">Area (sq ft)</th>
            <th className="px-6 py-2 font-normal">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {spaces.venues.map((venue) => (
            <tr key={venue.name} className="border-b border-forest/5 last:border-0">
              <td className="px-6 py-2 text-ink/80">{venue.name}</td>
              <td className="px-6 py-2 text-ink/70">{venue.areaSqFt.toLocaleString('en-IN')}</td>
              <td className="px-6 py-2 text-ink/70">{venue.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
