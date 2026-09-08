import { PAGE_SIZE_OPTIONS } from '@/lib/admin-format';
import Link from 'next/link';

export function AdminPagination({
  page,
  totalPages,
  total,
  itemLabel,
  itemLabelPlural,
  buildHref,
  pageSize,
  buildPageSizeHref,
}: {
  page: number;
  totalPages: number;
  total: number;
  itemLabel: string;
  itemLabelPlural?: string;
  buildHref: (page: number) => string;
  pageSize: number;
  buildPageSizeHref: (size: number) => string;
}) {
  return (
    <div className="mt-3 flex shrink-0 items-center justify-between text-sm text-ink/60">
      <p>
        Page {page} of {totalPages} &middot; {total}{' '}
        {total === 1 ? itemLabel : (itemLabelPlural ?? `${itemLabel}s`)}
      </p>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-ink/40">Rows:</span>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <Link
              key={size}
              href={buildPageSizeHref(size)}
              className={
                size === pageSize
                  ? 'font-semibold text-forest'
                  : 'text-ink/50 underline-offset-2 hover:text-forest hover:underline'
              }
            >
              {size}
            </Link>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex gap-3">
            {page > 1 && (
              <Link href={buildHref(page - 1)} className="text-forest underline">
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link href={buildHref(page + 1)} className="text-forest underline">
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
