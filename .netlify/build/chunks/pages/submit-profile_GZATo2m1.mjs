import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_ByfXohXA.mjs';
import 'kleur/colors';
/* empty css                          */
import { a as $$Header, b as $$Footer, c as $$Layout } from './about_DUMHM_h-.mjs';
import { promises } from 'fs';
import { join } from 'path';
/* empty css                                   */

const $$Astro = createAstro("https://net0.grant.codes");
const prerender = false;
const $$SubmitProfile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SubmitProfile;
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const name = data.get("name");
      const address = data.get("address");
      const email = data.get("email");
      const phoneNumber = data.get("number");
      const facebookUrl = data.get("facebook");
      const linkedinUrl = data.get("linkedin");
      const instagramUrl = data.get("instagram");
      const bio = data.get("bio");
      const activistCardImage = data.get("activistCardImage");
      const organizationLogo = data.get("organizationLogo");
      const activistProfileImage = data.get("activist-image");
      const orgImageOne = data.get("organization-image-one");
      const orgImageTwo = data.get("organization-image-two");
      const orgImageThree = data.get("organization-image-three");
      const orgImageFour = data.get("organization-image-four");
      if (activistProfileImage) {
        const saveImage = async (image) => {
          const basePath = join(
            process.cwd(),
            "src",
            "assets",
            "activistProfile"
          );
          const imagePath = join(basePath, image.name);
          await promises.mkdir(basePath, { recursive: true });
          await promises.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));
        };
        if (activistCardImage instanceof File) {
          await saveImage(activistCardImage);
        }
        if (activistProfileImage instanceof File) {
          await saveImage(activistProfileImage);
        }
      }
      if (organizationLogo) {
        const saveImage = async (image) => {
          const basePath = join(
            process.cwd(),
            "src",
            "assets",
            "organizationProfile"
          );
          const imagePath = join(basePath, image.name);
          await promises.mkdir(basePath, { recursive: true });
          await promises.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));
        };
        if (organizationLogo instanceof File) {
          await saveImage(organizationLogo);
        }
        if (orgImageOne instanceof File) {
          await saveImage(orgImageOne);
        }
        if (orgImageTwo instanceof File) {
          await saveImage(orgImageTwo);
        }
        if (orgImageThree instanceof File) {
          await saveImage(orgImageThree);
        }
        if (orgImageFour instanceof File) {
          await saveImage(orgImageFour);
        }
      }
      if (organizationLogo) {
        console.log("This is organization details");
      }
      if (activistCardImage) {
        console.log("This is activist details");
      }
      console.log(name);
      console.log(address);
      console.log(email);
      console.log(phoneNumber);
      console.log(facebookUrl);
      console.log(linkedinUrl);
      console.log(instagramUrl);
      console.log(bio);
      Astro2.cookies.set("successType", "activistProfile", {
        path: "/success"
      });
      return Astro2.redirect("/success");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Nepal Climate Hub", "data-astro-cid-6tla343g": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-container" data-astro-cid-6tla343g> <!-- header section  --> <section class="header-section" data-astro-cid-6tla343g> ${renderComponent($$result2, "Header", $$Header, { "logoColor": "#1A1B1E", "data-astro-cid-6tla343g": true })} <!-- a mini navbar --> <div class="mini-nav" data-astro-cid-6tla343g> <a href="/" data-astro-cid-6tla343g>Home</a> </div> </section> <section class="profile-section" data-astro-cid-6tla343g> <div class="section-container" data-astro-cid-6tla343g> <h2 class="section-heading" data-astro-cid-6tla343g>Submit Profile</h2> <div class="introduction-section" data-astro-cid-6tla343g> <p data-astro-cid-6tla343g>
Make yourself <strong data-astro-cid-6tla343g>visible</strong> and <strong data-astro-cid-6tla343g>accessible</strong>
to Nepal's growing climate movement.
</p> <p data-astro-cid-6tla343g>
We are on a mission to educate, connect, and empower Nepal’s youth
						with knowledge of climate science, climate champions, climate-based
						organizations, timely information, resources, opportunities, and
						practical guidance to address pressing climate challenges through
						individual and collective action.
</p> </div> <div class="toggleBtnWrapper" data-astro-cid-6tla343g>
For
<button id="activist-btn" data-astro-cid-6tla343g> activists</button> <span data-astro-cid-6tla343g>|</span> <button id="organization-btn" data-astro-cid-6tla343g> organizations</button> </div> <!-- activist section --> <div class="activist-section" data-astro-cid-6tla343g> <p class="section-note" data-astro-cid-6tla343g>
We invite submissions from all climate champions and advocates
						engaged in activities or initiatives addressing climate change. If
						you are dedicated to combating climate change in any capacity, you
						are encouraged to submit your profile.
</p> <h3 class="sub-heading" data-astro-cid-6tla343g>Submit your climate journey</h3> <p data-astro-cid-6tla343g>
By submitting your profile to Nepal Climate Hub, you will gain
						unparalleled visibility among the entire climate-conscious community
						in Nepal. Highlight your personal contributions, achievements, and
						mission to a broad audience, helping you connect with interested
						individuals, potential collaborators, and organizations looking to
						join forces in the fight against climate change.
</p> <h3 class="sub-heading" data-astro-cid-6tla343g>Benefits</h3> <dl data-astro-cid-6tla343g> <dt class="description-term" data-astro-cid-6tla343g> <strong data-astro-cid-6tla343g>Increased Visibility</strong> </dt> <dd class="description-definition" data-astro-cid-6tla343g>
Showcase your work and impact to a diverse audience, raising
							awareness of your contributions to climate action.
</dd> <dt class="description-term" data-astro-cid-6tla343g> <strong data-astro-cid-6tla343g>Networking Opportunities</strong> </dt> <dd class="description-definition" data-astro-cid-6tla343g>
Connect with like-minded individuals and organizations passionate
							about climate action, fostering opportunities for collaboration
							and partnership.
</dd> <dt class="description-term" data-astro-cid-6tla343g><strong data-astro-cid-6tla343g>Resource Sharing</strong></dt> <dd class="description-definition" data-astro-cid-6tla343g>
Access and share timely information and resources with a broad
							network, enhancing your ability to address climate challenges
							effectively.
</dd> <dt class="description-term" data-astro-cid-6tla343g> <strong data-astro-cid-6tla343g>Inspiration and Leadership</strong> </dt> <dd class="description-definition" data-astro-cid-6tla343g>
Inspire others by sharing your journey and achievements,
							encouraging more people to take meaningful climate action.
</dd> <dt class="description-term" data-astro-cid-6tla343g><strong data-astro-cid-6tla343g>Community Impact</strong></dt> <dd class="description-definition" data-astro-cid-6tla343g>
Amplify your efforts and contribute to the collective action
							against climate change in Nepal, making a significant impact on
							local and national levels.
</dd> </dl> <h3 class="sub-heading" data-astro-cid-6tla343g>Submit Your Profile</h3> <p data-astro-cid-6tla343g>
To make your profile visible across Nepal, please fill out the form
						below with the following details:
</p> <form class="activist-form" method="post" enctype="multipart/form-data" data-astro-cid-6tla343g> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-name" data-astro-cid-6tla343g>Name <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="activist-name" required name="name" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-address" data-astro-cid-6tla343g>Address <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="activist-address" required name="address" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-email" data-astro-cid-6tla343g>Email <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="activist-email" required name="email" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-number" data-astro-cid-6tla343g>Phone Number</label> <input type="tel" id="activist-number" name="number" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-facebook" data-astro-cid-6tla343g>Facebook</label> <input type="text" id="activist-facebook" name="facebook" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-linkedin" data-astro-cid-6tla343g>LinkedIn</label> <input type="text" id="activist-linkedin" name="linkedin" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-instagram" data-astro-cid-6tla343g>Instagram</label> <input type="text" id="activist-instagram" name="instagram" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-website" data-astro-cid-6tla343g>Website (<i data-astro-cid-6tla343g>blog site or online further details</i>)</label> <input type="text" id="activist-website" name="website" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-tags" data-astro-cid-6tla343g>Working Themes (<i data-astro-cid-6tla343g>separate by comma</i>) <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="activist-tags" required name="tags" placeholder="Climate Justice Activist, Indigenous Youth, Research, Climate Finance, Climate Awareness, ..." data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-logo" data-astro-cid-6tla343g>Profile Picture (<i data-astro-cid-6tla343g>your profile card picture</i>) <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="file" id="activist-logo" required name="activistCardImage" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-picture" data-astro-cid-6tla343g>Upload your picture that will be visible next to your bio.<span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="file" id="activist-image" required name="activist-image" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="activist-bio" data-astro-cid-6tla343g>Provide a detailed description that includes your introduction
								and background, outlines your activities, achievements, and
								impact, and concludes with your message. (<i data-astro-cid-6tla343g>250 words max</i>) <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <textarea name="bio" id="activist-bio" data-astro-cid-6tla343g></textarea> </div> <input type="submit" data-astro-cid-6tla343g> </form> <p class="note" data-astro-cid-6tla343g>
Once submitted, your profile will be reviewed and published on our
						climate champion page directory, connecting you with passionate
						individuals and organizations across Nepal, typically within a week.
						You will be notified upon publication.
</p> </div> <!-- organization section --> <div class="organization-section" data-astro-cid-6tla343g> <p class="section-note" data-astro-cid-6tla343g>
We welcome submissions from all types of organizations, clubs, and
						communities that are engaged in activities or initiatives related to
						climate change. If your group is dedicated to addressing climate
						change in any capacity, you are eligible to submit your profile.
</p> <h3 class="sub-heading" data-astro-cid-6tla343g>Why Submit Your Organization's Profile?</h3> <p data-astro-cid-6tla343g>
By submitting your organization’s details to Nepal Climate Hub, you
						will gain unparalleled visibility among the entire climate-conscious
						community eager to support climate initiatives in Nepal. Highlight
						your organization’s works, activities, and mission to a broad
						audience, helping you connect with interested individuals, potential
						collaborators, project partners, and even your next team members.
</p> <h3 class="sub-heading" data-astro-cid-6tla343g>Benefits</h3> <dl data-astro-cid-6tla343g> <dt class="description-term" data-astro-cid-6tla343g> <strong data-astro-cid-6tla343g>Increased Visibility</strong> </dt> <dd class="description-definition" data-astro-cid-6tla343g>
Your organization will be showcased to a diverse audience,
							increasing awareness of your initiatives and impact.
</dd> <dt class="description-term" data-astro-cid-6tla343g> <strong data-astro-cid-6tla343g>Networking Opportunities</strong> </dt> <dd class="description-definition" data-astro-cid-6tla343g>
Connect with like-minded individuals and organizations passionate
							about climate action, fostering opportunities for collaboration
							and partnership.
</dd> <dt class="description-term" data-astro-cid-6tla343g><strong data-astro-cid-6tla343g>Resource Sharing</strong></dt> <dd class="description-definition" data-astro-cid-6tla343g>
Access and share timely information and resources with a broad
							network, enhancing your organization’s ability to address climate
							challenges effectively.
</dd> <dt class="description-term" data-astro-cid-6tla343g><strong data-astro-cid-6tla343g>Attract Talent</strong></dt> <dd class="description-definition" data-astro-cid-6tla343g>
Reach out to motivated individuals looking to join climate-focused
							organizations, helping you build a strong and dedicated team.
</dd> <dt class="description-term" data-astro-cid-6tla343g><strong data-astro-cid-6tla343g>Community Impact</strong></dt> <dd class="description-definition" data-astro-cid-6tla343g>
Amplify your efforts and contribute to the collective action
							against climate change in Nepal, making a significant impact on
							local and national levels.
</dd> </dl> <h3 class="sub-heading" data-astro-cid-6tla343g>Submit Your Organization's Profile</h3> <p data-astro-cid-6tla343g>
To make your organization visible across Nepal, please fill out the
						form below with the following details:
</p> <form class="organization-form" method="post" enctype="multipart/form-data" data-astro-cid-6tla343g> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-name" data-astro-cid-6tla343g>Organization Name <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="organization-name" required name="name" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-address" data-astro-cid-6tla343g>Address <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="organization-address" required name="address" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-email" data-astro-cid-6tla343g>Email <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="organization-email" required name="email" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-number" data-astro-cid-6tla343g>Phone Number <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="tel" id="organization-number" required name="number" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-facebook" data-astro-cid-6tla343g>Facebook</label> <input type="text" id="organization-facebook" name="facebook" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-linkedin" data-astro-cid-6tla343g>LinkedIn</label> <input type="text" id="organization-linkedin" name="linkedin" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-instagram" data-astro-cid-6tla343g>Instagram</label> <input type="text" id="organization-instagram" name="instagram" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-website" data-astro-cid-6tla343g>Website <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="organization-website" required name="website" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-tags" data-astro-cid-6tla343g>Working Themes (<i data-astro-cid-6tla343g>separate by comma</i>) <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="text" id="organization-tags" required name="tags" placeholder="Climate Adaption, Community Empowerment, Climate Finance, Climate Awareness, ..." data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-logo" data-astro-cid-6tla343g>Logo (<i data-astro-cid-6tla343g>must have white background </i>) <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="file" id="organization-logo" required name="organizationLogo" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-image-one" data-astro-cid-6tla343g>Upload any four pictures to showcase your team, work,
								activities, or anything else. <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <input type="file" id="organization-image-one" required name="organization-image-one" data-astro-cid-6tla343g> <br data-astro-cid-6tla343g> <input type="file" id="organization-image-two" required name="organization-image-two" data-astro-cid-6tla343g> <br data-astro-cid-6tla343g> <input type="file" id="organization-image-three" required name="organization-image-three" data-astro-cid-6tla343g> <br data-astro-cid-6tla343g> <input type="file" id="organization-image-four" required name="organization-image-four" data-astro-cid-6tla343g> </div> <div class="form-field" data-astro-cid-6tla343g> <label for="organization-bio" data-astro-cid-6tla343g>Provide a detailed description in three paragraphs, covering an
								introduction to your organization, its vision, mission, and
								objectives, as well as your works and activities. (<i data-astro-cid-6tla343g>250 words max</i>) <span class="required-asterisk" data-astro-cid-6tla343g>*</span></label> <textarea name="bio" id="organization-bio" data-astro-cid-6tla343g></textarea> </div> <input type="submit" data-astro-cid-6tla343g> </form> <p class="note" data-astro-cid-6tla343g>
Once submitted, your profile will be reviewed and published on our
						climate organizations page directory, connecting you with passionate
						individuals and organizations across Nepal, typically within a week.
						You will be notified upon publication.
</p> </div> <!-- end of the container --> </div> </section> <section class="footer-section" data-astro-cid-6tla343g> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-6tla343g": true })} </section> </main> ` })}  `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/submit-profile.astro", void 0);

const $$file = "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/submit-profile.astro";
const $$url = "/submit-profile";

export { $$SubmitProfile as default, $$file as file, prerender, $$url as url };
