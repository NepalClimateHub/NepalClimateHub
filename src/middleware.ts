import { getSecret } from 'astro:env/server';
import { defineMiddleware } from 'astro:middleware';
import type { APIContext } from 'astro';
import { BLOG_CATEGORY_SET } from './constants/blogCategories';
import { parseEventFilters, serializeEventFilters } from './utils/eventFilters';
import { parseNewsFilters, serializeNewsFilters } from './utils/newsFilters';
import {
  parseOpportunityFilters,
  serializeOpportunityFilters,
} from './utils/opportunityFilters';
import {
  parseResourceFilters,
  serializeResourceFilters,
} from './utils/resourceFilters';

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

function filteredListingKey(
  pathname: string,
  normalizeFilters: (params: URLSearchParams) => URLSearchParams
) {
  return (url: URL): URL => {
    const canonical = new URL(pathname, url.origin);
    for (const [key, value] of normalizeFilters(url.searchParams)) {
      canonical.searchParams.set(key, value);
    }

    const page = Number.parseInt(url.searchParams.get('page') || '1', 10);
    if (Number.isFinite(page) && page > 1) {
      canonical.searchParams.set('page', String(page));
    }

    canonical.searchParams.sort();
    return canonical;
  };
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
  {
    test: (p) => p === '/events',
    canonicalKey: filteredListingKey('/events', (params) =>
      serializeEventFilters(parseEventFilters(params))
    ),
  },
  {
    test: (p) => EVENT_DETAIL_PATTERN.test(p),
    canonicalKey: canonicalPathOnlyKey,
  },
  {
    test: (p) => p === '/opportunities',
    canonicalKey: filteredListingKey('/opportunities', (params) =>
      serializeOpportunityFilters(parseOpportunityFilters(params))
    ),
  },
  {
    test: (p) => OPPORTUNITY_DETAIL_PATTERN.test(p),
    canonicalKey: canonicalPathOnlyKey,
  },
  {
    test: (p) => p === '/resources',
    canonicalKey: filteredListingKey('/resources', (params) =>
      serializeResourceFilters(parseResourceFilters(params))
    ),
  },
  {
    test: (p) => p === '/news',
    canonicalKey: filteredListingKey('/news', (params) =>
      serializeNewsFilters(parseNewsFilters(params))
    ),
  },
];

function matchCacheRoute(pathname: string): CacheRoute | undefined {
  return CACHE_ROUTES.find((route) => route.test(pathname));
}

function withSecurityHeaders(response: Response) {
  if (!response.headers.get('content-type')?.startsWith('text/html')) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
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

  return withSecurityHeaders(
    new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  );
}

const BLOG_PREVIEW_PATH = '/blog-preview';
const DEFAULT_PREVIEW_ORIGIN = 'https://cms.nepalclimatehub.org';
const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const FORM_CONTENT_TYPES = [
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
];

function isFormSubmission(request: Request): boolean {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  return (
    UNSAFE_METHODS.has(request.method) &&
    FORM_CONTENT_TYPES.some((type) => contentType.startsWith(type))
  );
}

function allowedPreviewOrigins(): string[] {
  const configured = getSecret('PREVIEW_ALLOWED_ORIGINS')?.trim();
  return (configured || DEFAULT_PREVIEW_ORIGIN)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isTrustedOrigin(context: APIContext): boolean {
  const origin = context.request.headers.get('origin');
  if (!origin) return false;
  if (context.url.pathname === BLOG_PREVIEW_PATH) {
    return allowedPreviewOrigins().includes(origin);
  }
  return origin === context.url.origin;
}

// Mirrors Astro's checkOrigin, except /blog-preview accepts the allow-listed CMS origins.
function rejectCrossSiteForm(context: APIContext): Response | null {
  if (!isFormSubmission(context.request) || isTrustedOrigin(context)) {
    return null;
  }
  return new Response('Cross-site POST form submissions are forbidden', {
    status: 403,
  });
}

function allowPreviewFraming(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.delete('X-Frame-Options');
  const ancestors = ["'self'", ...allowedPreviewOrigins()].join(' ');
  const policy = headers.get('Content-Security-Policy');
  headers.set(
    'Content-Security-Policy',
    `${policy ? `${policy}; ` : ''}frame-ancestors ${ancestors}`
  );
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const rejection = rejectCrossSiteForm(context);
  if (rejection) return rejection;

  if (context.url.pathname === BLOG_PREVIEW_PATH) {
    return allowPreviewFraming(withSecurityHeaders(await next()));
  }

  if (context.isPrerendered) return withSecurityHeaders(await next());

  const route = matchCacheRoute(context.url.pathname);
  if (!route) return withSecurityHeaders(await next());

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
