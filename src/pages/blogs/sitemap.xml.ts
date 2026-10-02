import { fetchAllBlogSummaries } from 'src/api';
import { createSlug } from 'src/utils/slug';

export async function GET() {
  const blogs = await fetchAllBlogSummaries();

  const urls = blogs
    .map((blog) => {
      return `
    <url>
        <loc>https://nepalclimatehub.org/blogs/${createSlug(blog.title)}</loc>
    </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
