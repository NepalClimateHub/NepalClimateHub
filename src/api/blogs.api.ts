import { createSlug } from 'src/utils/slug';
import type { Blog, BlogResponse } from '../types/blog';
import { API_BASE_URL, ApiError, handleResponse } from './index';

const QUOTE = 0x22; // "
const BACKSLASH = 0x5c; // \
const COLON = 0x3a; // :
const CONTENT_KEY = new TextEncoder().encode('content');

/**
 * Streams a JSON body through, replacing the value of every `"content"` string with
 * `""` without ever buffering the whole response.
 *
 * Blog `content` is HTML that can embed base64 images, so the list endpoint returns
 * tens of MB. Reading that with `response.json()` (twice per page) blew through the
 * Cloudflare Worker memory limit. Scanning bytes is safe because `"`, `\` and `:` are
 * ASCII and never occur inside a multi-byte UTF-8 sequence.
 */
function stripContentStrings(): TransformStream<Uint8Array, Uint8Array> {
  let inString = false;
  let skipping = false; // inside a "content" value being dropped
  let pendingBackslashes = 0; // run of backslashes carried across chunk boundaries
  // True while the only thing since the closing quote of a `"content"` string is
  // whitespace and a single ':', i.e. the next string is that key's value.
  let expectContentValue = false;
  let sawColon = false;
  const keyBuf = new Uint8Array(CONTENT_KEY.length + 1);
  let keyLen = 0;

  return new TransformStream({
    transform(chunk, controller) {
      let pos = 0;
      let emitFrom = 0;

      while (pos < chunk.length) {
        if (!inString) {
          const quote = chunk.indexOf(QUOTE, pos);
          const end = quote === -1 ? chunk.length : quote;
          for (let i = pos; i < end && expectContentValue; i++) {
            const byte = chunk[i];
            if (byte === COLON && !sawColon) sawColon = true;
            else if (
              byte !== 0x20 &&
              byte !== 0x0a &&
              byte !== 0x0d &&
              byte !== 0x09
            ) {
              expectContentValue = false;
            }
          }
          if (quote === -1) break;

          inString = true;
          skipping = expectContentValue && sawColon;
          expectContentValue = false;
          sawColon = false;
          keyLen = 0;
          pendingBackslashes = 0;
          pos = quote + 1;
          if (skipping) {
            controller.enqueue(chunk.slice(emitFrom, pos));
          }
          continue;
        }

        const quote = chunk.indexOf(QUOTE, pos);
        const end = quote === -1 ? chunk.length : quote;

        if (!skipping) {
          for (let i = pos; i < end && keyLen < keyBuf.length; i++) {
            keyBuf[keyLen++] = chunk[i];
          }
        }

        // Count the backslashes immediately before `end` to tell `\"` from `"`.
        let run = 0;
        for (let i = end - 1; i >= pos && chunk[i] === BACKSLASH; i--) run++;
        if (run === end - pos) run += pendingBackslashes;

        if (quote === -1) {
          pendingBackslashes = run;
          break;
        }

        pos = quote + 1;
        pendingBackslashes = 0;
        if (run % 2 === 1) {
          // Escaped quote: part of the string.
          if (!skipping && keyLen < keyBuf.length) keyBuf[keyLen++] = QUOTE;
          continue;
        }

        inString = false;
        if (skipping) {
          skipping = false;
          emitFrom = quote; // resume output at the closing quote
        } else {
          expectContentValue =
            keyLen === CONTENT_KEY.length &&
            CONTENT_KEY.every((byte, i) => keyBuf[i] === byte);
        }
      }

      if (!skipping && emitFrom < chunk.length) {
        controller.enqueue(chunk.slice(emitFrom));
      }
    },
  });
}

const blogsRequest = (path = '') =>
  fetch(`${API_BASE_URL}/api/v1/blogs${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const assertApiBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }
};

/**
 * Fetches every blog with `content` emptied out. Use this for listings, cards and
 * sitemaps; fetch a single blog with `getBlogById` when its body is needed.
 */
export const fetchAllBlogs = async (): Promise<BlogResponse> => {
  assertApiBaseUrl();
  try {
    const response = await blogsRequest();
    if (!response.ok || !response.body) {
      return await handleResponse<BlogResponse>(response);
    }
    const stripped = response.body.pipeThrough(stripContentStrings());
    return await new Response(stripped).json();
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        `Failed to fetch all blogs data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch all blogs data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  if (!id) return;
  assertApiBaseUrl();
  try {
    const response = await blogsRequest(`/${id}`);
    const { data } = await handleResponse<{ data: Blog }>(response);
    return data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch blog: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const getBlogBySlug = async (
  slug: string
): Promise<Blog | undefined> => {
  if (!slug) return;
  try {
    const response = await fetchAllBlogs();
    const summary = response.data.find(
      (blog) => createSlug(blog.title) === slug
    );
    return summary ? await getBlogById(summary.id) : undefined;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return undefined;
  }
};

export const fetchFeaturedBlogs = async (): Promise<BlogResponse> => {
  assertApiBaseUrl();
  try {
    const response = await blogsRequest('/featured');
    return await handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch featured blogs: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const getFeaturedPost = (blogs: Blog[]): Blog | null =>
  blogs.find((blog) => blog.isFeatured) || null;

export const getTopReadPosts = async (): Promise<Blog[]> => {
  try {
    const { data } = await fetchAllBlogs();
    return data.filter((blog) => blog.isTopRead).slice(0, 3);
  } catch (error) {
    console.error('Error fetching top read posts:', error);
    return [];
  }
};
