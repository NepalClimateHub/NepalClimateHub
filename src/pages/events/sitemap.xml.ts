import { fetchAllBlogs, fetchEvents } from "src/api";
import { createSlug } from "src/utils/slug";

export async function GET() {
    const data = await fetchEvents();

    if (!data || !data.data) {
        throw new Error("Error fetching Events");
    }

    const urls = data.data
        .map((event) => {
            return `
    <url>
        <loc>https://nepalclimatehub.org/events/${createSlug(event.title)}</loc>
    </url>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
