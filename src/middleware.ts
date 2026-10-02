import { defineMiddleware } from 'astro:middleware';
import { BLOG_CATEGORY_SET } from './constants/blogCategories';
import {
  EVENT_FILTER_KEYS,
  parseEventFilters,
  serializeEventFilters,
} from './utils/eventFilters';

const PUBLIC_CACHE_CONTROL =
  'public, max-age=60, s-maxage=300, stale-while-revalidate=600, stale-if-error=86400';

// Cached routes don't read cookies; this guards against a future auth cookie.
const SESSION_COOKIE_NAMES = new Set([
  'session',
  'sessionid',
  'auth',
  'token',
  'jwt',
]);

const BLOG_DETAIL_PATTERN = /^\/blogs\/[a-z0-9-]+$/;
const EVENT_DETAIL_PATTERN = /^\/events\/[a-z0-9-]+$/;
const OPPORTUNITY_DETAIL_PATTERN = /^\/opportunities\/[a-z0-9-]+$/;

type WorkerCache = {
  match: (request: Request) => Promise<Response | undefined>;
  put: (request: Request, response: Response) => Promise<void>;
};

type CloudflareRuntime = {
  caches: { default: WorkerCache };
  ctx: { waitUntil: (promise: Promise<unknown>) => void };
};

function getCloudflareRuntime(locals: unknown): CloudflareRuntime | undefined {
  const runtime = (locals as { runtime?: unknown }).runtime;

  if (!runtime || typeof runtime !== 'object') return undefined;

  const candidate = runtime as Partial<CloudflareRuntime>;
  const cache = candidate.caches?.default;

  if (
    !cache ||
    typeof cache.match !== 'function' ||
    typeof cache.put !== 'function' ||
    typeof candidate.ctx?.waitUntil !== 'function'
  ) {
    return undefined;
  }

  return candidate as CloudflareRuntime;
}

function hasSessionCookie(cookieHeader: string): boolean {
  return cookieHeader.split(';').some((pair) => {
    const name = pair.split('=')[0]?.trim().toLowerCase();
    return !!name && SESSION_COOKIE_NAMES.has(name);
  });
}

function canonicalPathOnlyKey(url: URL): URL {
  return new URL(url.pathname, url.origin);
}

function canonicalBlogsKey(url: URL): URL {
  const canonical = new URL('/blogs', url.origin);
  const category = url.searchParams.get('category');
  const page = Number.parseInt(url.searchParams.get('page') || '1', 10);

  if (category && BLOG_CATEGORY_SET.has(category)) {
    canonical.searchParams.set('category', category);
  }
  if (Number.isFinite(page) && page > 1) {
    canonical.searchParams.set('page', String(page));
  }

  canonical.searchParams.sort();
  return canonical;
}

function canonicalEventsKey(url: URL): URL {
  const canonical = new URL('/events', url.origin);
  const filterParams = serializeEventFilters(
    parseEventFilters(url.searchParams)
  );

  for (const key of EVENT_FILTER_KEYS) {
    const value = filterParams.get(key);
    if (value) canonical.searchParams.set(key, value);
  }

  const page = Number.parseInt(url.searchParams.get('page') || '1', 10);
  if (Number.isFinite(page) && page > 1) {
    canonical.searchParams.set('page', String(page));
  }

  canonical.searchParams.sort();
  return canonical;
}

interface CacheRoute {
  test: (pathname: string) => boolean;
  canonicalKey: (url: URL) => URL;
}

const CACHE_ROUTES: CacheRoute[] = [
  { test: (p) => p === '/', canonicalKey: canonicalPathOnlyKey },
  { test: (p) => p === '/blogs', canonicalKey: canonicalBlogsKey },
  {
    test: (p) => BLOG_DETAIL_PATTERN.test(p),
    canonicalKey: canonicalPathOnlyKey,
  },
  { test: (p) => p === '/events', canonicalKey: canonicalEventsKey },
  {
    test: (p) => EVENT_DETAIL_PATTERN.test(p),
    canonicalKey: canonicalPathOnlyKey,
  },
  { test: (p) => p === '/opportunities', canonicalKey: canonicalPathOnlyKey },
  {
    test: (p) => OPPORTUNITY_DETAIL_PATTERN.test(p),
    canonicalKey: canonicalPathOnlyKey,
  },
  { test: (p) => p === '/resources', canonicalKey: canonicalPathOnlyKey },
  { test: (p) => p === '/news', canonicalKey: canonicalPathOnlyKey },
];

function matchCacheRoute(pathname: string): CacheRoute | undefined {
  return CACHE_ROUTES.find((route) => route.test(pathname));
}

function withCacheHeaders(
  response: Response,
  status: 'HIT' | 'MISS' | 'BYPASS'
) {
  const headers = new Headers(response.headers);

  headers.set(
    'Cache-Control',
    status === 'BYPASS' ? 'private, no-store' : PUBLIC_CACHE_CONTROL
  );
  headers.set('Vary', 'Accept-Encoding');
  headers.set('X-NCH-Cache', status);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next();

  const route = matchCacheRoute(context.url.pathname);
  if (!route) return next();

  if (context.request.method !== 'GET') {
    return withCacheHeaders(await next(), 'BYPASS');
  }

  const cookieHeader = context.request.headers.get('cookie');
  const hasPrivateRequestState =
    context.request.headers.has('authorization') ||
    (cookieHeader !== null && hasSessionCookie(cookieHeader));

  if (hasPrivateRequestState) {
    return withCacheHeaders(await next(), 'BYPASS');
  }

  const canonicalUrl = route.canonicalKey(context.url);
  context.locals.canonicalPath = `${canonicalUrl.pathname}${canonicalUrl.search}`;
  const cacheRequest = new Request(canonicalUrl, { method: 'GET' });
  const runtime = getCloudflareRuntime(context.locals);

  if (runtime) {
    const cached = await runtime.caches.default.match(cacheRequest);
    if (cached) return withCacheHeaders(cached, 'HIT');
  }

  const response = withCacheHeaders(await next(), 'MISS');
  const canCache =
    runtime &&
    response.status === 200 &&
    response.headers.get('content-type')?.startsWith('text/html') &&
    !response.headers.has('set-cookie');

  if (canCache) {
    runtime.ctx.waitUntil(
      runtime.caches.default
        .put(cacheRequest, response.clone())
        .catch((error) => {
          console.error('Failed to cache public response', error);
        })
    );
  }

  return response;
});
