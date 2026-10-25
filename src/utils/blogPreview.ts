export interface BlogPreviewData {
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  tags: Array<{ tag: string }>;
  authorImage?: string;
  authorRole?: string;
  authorBio?: string;
  authorLinkedin?: string;
}

export const MAX_PREVIEW_BYTES = 2 * 1024 * 1024;

const WORDS_PER_MINUTE = 200;
const UNSAFE_TAGS =
  /<\/?(?:script|meta|base|link|iframe|object|embed)\b[^>]*>/gi;

const text = (value: unknown, max: number): string | undefined =>
  typeof value === 'string' && value.trim() !== ''
    ? value.trim().slice(0, max)
    : undefined;

const httpUrl = (value: unknown): string | undefined => {
  const candidate = text(value, 2048);
  if (!candidate) return undefined;
  try {
    const { protocol } = new URL(candidate);
    return protocol === 'http:' || protocol === 'https:'
      ? candidate
      : undefined;
  } catch {
    return undefined;
  }
};

const readingTimeFor = (content: string): string => {
  const words = content
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
};

export const parseBlogPreview = (raw: unknown): BlogPreviewData | null => {
  if (typeof raw !== 'string' || raw.length > MAX_PREVIEW_BYTES) return null;
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    body = parsed as Record<string, unknown>;
  } catch {
    return null;
  }

  const content =
    typeof body.content === 'string'
      ? body.content.replace(UNSAFE_TAGS, '')
      : '';
  const published = new Date(String(body.publishedDate ?? ''));
  const tags = Array.isArray(body.tags)
    ? body.tags
        .map((tag) => text(tag, 100))
        .filter((tag): tag is string => tag !== undefined)
        .slice(0, 50)
        .map((tag) => ({ tag }))
    : [];

  return {
    title: text(body.title, 300) ?? 'Untitled',
    content,
    author: text(body.author, 200) ?? 'Author',
    publishedDate: (Number.isNaN(published.getTime())
      ? new Date()
      : published
    ).toISOString(),
    readingTime: text(body.readingTime, 50) ?? readingTimeFor(content),
    tags,
    authorImage: httpUrl(body.authorImage),
    authorRole: text(body.authorRole, 200),
    authorBio: text(body.authorBio, 2000),
    authorLinkedin: httpUrl(body.authorLinkedin),
  };
};
