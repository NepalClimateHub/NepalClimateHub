export const BLOG_CATEGORIES = [
  'Voices & Stories',
  'Community',
  'Education',
  'Environment',
  'Climate Technology',
  'Climate Policy',
  'Sustainability',
  'Climate Justice',
  'Climate Science',
] as const;

export const BLOG_CATEGORY_SET: ReadonlySet<string> = new Set(BLOG_CATEGORIES);
