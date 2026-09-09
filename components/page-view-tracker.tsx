'use client';

import { pushDataLayerEvent } from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

// Mounted once in the root layout — covers every route with no per-page
// wiring. Next.js App Router navigations are client-side (no full page
// load), so GTM's own page-load-based page_view never refires on them;
// this pushes an explicit one on every pathname/query change instead.
// useSearchParams() opts the whole subtree out of static rendering unless
// wrapped in Suspense, so the tracking logic lives in an inner component.
function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    pushDataLayerEvent('page_view', {
      page_path: query ? `${pathname}?${query}` : pathname,
    });
  }, [pathname, searchParams]);

  return null;
}

export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}
