import { d as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_ByfXohXA.mjs';
import 'kleur/colors';
/* empty css                          */
import { a as $$Header, b as $$Footer, c as $$Layout } from './about_DUMHM_h-.mjs';
import { $ as $$CardFilterSection, C as CardContainer } from './climate-champions_D_wc60Fg.mjs';
import { O as OrganizationsJSON } from './index_Ct_nIk8d.mjs';
/* empty css                                  */

const $$Organizations = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Nepal Climate Hub", "data-astro-cid-rbttmkam": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-container" data-astro-cid-rbttmkam> <!-- header section  --> <section class="header-section" data-astro-cid-rbttmkam> ${renderComponent($$result2, "Header", $$Header, { "logoColor": "#1A1B1E", "data-astro-cid-rbttmkam": true })} <!-- a mini navbar --> <div class="mini-nav" data-astro-cid-rbttmkam> <a href="/" data-astro-cid-rbttmkam>Home</a> </div> </section> <div class="organization-wrapper" data-astro-cid-rbttmkam> <section class="filter-section" data-astro-cid-rbttmkam> ${renderComponent($$result2, "CardFilterSection", $$CardFilterSection, { "heading": "Organizations", "tagline": "Find your community", "filter": "true", "data-astro-cid-rbttmkam": true })} </section> <section class="organization-cards-section" data-astro-cid-rbttmkam> ${renderComponent($$result2, "CardContainer", CardContainer, { "client:load": true, "cardsArray": OrganizationsJSON, "dataType": "organization", "cardProfilePictureBgSize": "contain", "initialCardCount": "12/", "client:component-hydration": "load", "client:component-path": "@components/CardContainer.jsx", "client:component-export": "default", "data-astro-cid-rbttmkam": true })} </section></div> <section class="footer-section" data-astro-cid-rbttmkam> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-rbttmkam": true })} </section> </main> ` })} `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/organizations.astro", void 0);

const $$file = "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/organizations.astro";
const $$url = "/organizations";

export { $$Organizations as default, $$file as file, $$url as url };
