export function StatTiles({
  tiles,
}: {
  tiles: { label: string; value: string | number }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="flex items-baseline gap-1.5 rounded border border-ink/10 bg-white px-2.5 py-1"
        >
          <span className="text-[11px] uppercase tracking-wider text-ink/50">{tile.label}</span>
          <span className="text-sm font-semibold text-forest">{tile.value}</span>
        </div>
      ))}
    </div>
  );
}
