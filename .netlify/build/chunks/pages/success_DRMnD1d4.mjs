import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, h as renderComponent } from '../astro_ByfXohXA.mjs';
import 'kleur/colors';
/* empty css                          */
import { $ as $$Icon, a as $$Header, b as $$Footer, c as $$Layout } from './about_DUMHM_h-.mjs';
/* empty css                            */

const $$Astro$1 = createAstro("https://net0.grant.codes");
const $$SuccessCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SuccessCard;
  const { heading, message } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-gu4jqlnn> <div class="card" data-astro-cid-gu4jqlnn> <div class="icon-wrapper" data-astro-cid-gu4jqlnn> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:success-circle-outline", "class": "icon", "data-astro-cid-gu4jqlnn": true })} </div> <h2 class="card-heading" data-astro-cid-gu4jqlnn>${heading}</h2> <p class="card-message" data-astro-cid-gu4jqlnn>${message}</p> </div> </div> `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/layouts/SuccessCard.astro", void 0);

const $$Astro = createAstro("https://net0.grant.codes");
const $$Success = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Success;
  let successType = Astro2.cookies.get("successType")?.value;
  let heading = "";
  let message = "";
  if (successType == "volunteerProfile") {
    heading = "Application Submitted Successfully!";
    message = "Thank you for submitting your application. We will review it and contact you soon to schedule an informal interview. We look forward to speaking with you.";
  } else if (successType == "activistProfile") {
    heading = "Profile Submitted Successfully!";
    message = "Thank you for submitting your profile. We will review it and upload it to our platform soon. You will be notified once it is published. If any information is missing, we will reach out to you via the email you provided.";
  } else if (successType == "organizationProfile") {
    heading = "Profile Submitted Successfully!";
    message = "Thank you for submitting your profile. We will review it and upload it to our platform soon. You will be notified once it is published. If any information is missing, we will reach out to you via the email you provided.";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Nepal Climate Hub", "data-astro-cid-5y44lzmc": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-container" data-astro-cid-5y44lzmc> <!-- header section  --> <section class="header-section" data-astro-cid-5y44lzmc> ${renderComponent($$result2, "Header", $$Header, { "logoColor": "#1A1B1E", "data-astro-cid-5y44lzmc": true })} <!-- a mini navbar --> <div class="mini-nav" data-astro-cid-5y44lzmc> <a href="/" data-astro-cid-5y44lzmc>Home</a> </div> </section> <section class="form-submission-section" data-astro-cid-5y44lzmc> ${renderComponent($$result2, "SuccessCard", $$SuccessCard, { "heading": heading, "message": message, "data-astro-cid-5y44lzmc": true })} </section> <section class="footer-section" data-astro-cid-5y44lzmc> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-5y44lzmc": true })} </section> </main> ` })}  `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/success.astro", void 0);

const $$file = "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/success.astro";
const $$url = "/success";

export { $$Success as default, $$file as file, $$url as url };
