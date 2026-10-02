import { defineMiddleware } from 'astro:middleware';

const BLOG_CATEGORIES = new Set([
  'Voices & Stories',
  'Community',
  'Education',
  'Environment',
  'Climate Technology',
  'Climate Policy',
  'Sustainability',
  'Climate Justice',
  'Climate Science',
]);
const PUBLIC_CACHE_CONTROL =
  'public, max-age=60, s-maxage=300, stale-while-revalidate=600, stale-if-error=86400';

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

function canonicalBlogCacheUrl(url: URL): URL {
  if (url.pathname !== '/blogs') {
    return new URL(url.pathname, url.origin);
  }

  const canonical = new URL('/blogs', url.origin);
  const category = url.searchParams.get('category');
  const page = Number.parseInt(url.searchParams.get('page') || '1', 10);

  if (category && BLOG_CATEGORIES.has(category)) {
    canonical.searchParams.set('category', category);
  }
  if (Number.isFinite(page) && page > 1) {
    canonical.searchParams.set('page', String(page));
  }

  canonical.searchParams.sort();
  return canonical;
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
  const isBlogListingPage = context.url.pathname === '/blogs';
  const isBlogDetailPage = /^\/blogs\/[a-z0-9-]+$/.test(context.url.pathname);
  const isCacheableBlogPage = isBlogListingPage || isBlogDetailPage;
  const hasPrivateRequestState =
    context.request.headers.has('authorization') ||
    context.request.headers.has('cookie');

  if (
    context.request.method !== 'GET' ||
    !isCacheableBlogPage ||
    hasPrivateRequestState
  ) {
    return isCacheableBlogPage
      ? withCacheHeaders(await next(), 'BYPASS')
      : next();
  }

  const cacheRequest = new Request(canonicalBlogCacheUrl(context.url), {
    method: 'GET',
  });
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
          console.error('Failed to cache public blog response', error);
        })
    );
  }

  return response;
});
