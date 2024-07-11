import { d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, h as renderComponent } from '../astro_ByfXohXA.mjs';
import 'kleur/colors';
/* empty css                          */
import { $ as $$Icon, a as $$Header, b as $$Footer, c as $$Layout } from './about_DUMHM_h-.mjs';
import { N as NewsJSON } from './index_Ct_nIk8d.mjs';
/* empty css                                 */

function sortByBirthDateDescending(data) {
  const monthShortNames = {
      "Jan": "01",
      "Feb": "02",
      "Mar": "03",
      "Apr": "04",
      "May": "05",
      "Jun": "06",
      "Jul": "07",
      "Aug": "08",
      "Sep": "09",
      "Oct": "10",
      "Nov": "11",
      "Dec": "12"
  };
  
  return data.sort((a, b) => {
      const dateA = new Date(a.date.replace(/(\w{3}) (\d{2}), (\d{4})/, (match, p1, p2, p3) => `${p3}-${monthShortNames[p1]}-${p2}`));
      const dateB = new Date(b.date.replace(/(\w{3}) (\d{2}), (\d{4})/, (match, p1, p2, p3) => `${p3}-${monthShortNames[p1]}-${p2}`));
      return dateB - dateA;
  });
}

const $$NewsStoriesSection = createComponent(($$result, $$props, $$slots) => {
  const NewsJSON$1 = sortByBirthDateDescending(NewsJSON);
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-uwzd5lov> <h2 class="page-title" data-astro-cid-uwzd5lov>News & Stories</h2> <p class="page-tagline" data-astro-cid-uwzd5lov>The latest on climate impact and actions</p> <!-- container to wrap news card --> <div class="news-container" data-astro-cid-uwzd5lov> ${NewsJSON$1.map((news) => renderTemplate`<div class="news-card" data-astro-cid-uwzd5lov> <a${addAttribute(news.newsSrc, "href")} target="_blank" data-astro-cid-uwzd5lov> <div class="content" data-astro-cid-uwzd5lov> <h3 class="news-headline" data-astro-cid-uwzd5lov>${news.headline}</h3> <div class="news-image-wrapper" data-astro-cid-uwzd5lov> <img${addAttribute(news.imgSrc, "src")}${addAttribute(news.headline, "alt")} data-astro-cid-uwzd5lov> </div> </div> <div class="link-date-wrapper" data-astro-cid-uwzd5lov> <div class="link" data-astro-cid-uwzd5lov> <span class="link-icon" data-astro-cid-uwzd5lov> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:link", "data-astro-cid-uwzd5lov": true })} </span> <a${addAttribute(news.newsSrc, "href")} target="_blank" data-astro-cid-uwzd5lov> ${news.linkText} </a> </div> <div class="date" data-astro-cid-uwzd5lov> <span class="link-icon" data-astro-cid-uwzd5lov> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:clock", "data-astro-cid-uwzd5lov": true })} </span> <span data-astro-cid-uwzd5lov>${news.date}</span> </div> </div> </a> </div>`)} </div> </div> `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/NewsStoriesSection.astro", void 0);

const $$Newsstories = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Nepal Climate Hub", "data-astro-cid-mnbx3olu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-container" data-astro-cid-mnbx3olu> <!-- header section  --> <section class="header-section" data-astro-cid-mnbx3olu> ${renderComponent($$result2, "Header", $$Header, { "logoColor": "#1A1B1E", "data-astro-cid-mnbx3olu": true })} <!-- a mini navbar --> <div class="mini-nav" data-astro-cid-mnbx3olu> <a href="/" data-astro-cid-mnbx3olu>Home</a> </div> </section> <section class="news-section" data-astro-cid-mnbx3olu> ${renderComponent($$result2, "NewsStoriesSection", $$NewsStoriesSection, { "data-astro-cid-mnbx3olu": true })} </section> <section class="footer-section" data-astro-cid-mnbx3olu> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-mnbx3olu": true })} </section> </main> ` })} `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/news&stories.astro", void 0);

const $$file = "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/news&stories.astro";
const $$url = "/news&stories";

export { $$Newsstories as default, $$file as file, $$url as url };
