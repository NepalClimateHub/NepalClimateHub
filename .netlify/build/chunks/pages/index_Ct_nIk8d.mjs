import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, h as renderComponent } from '../astro_ByfXohXA.mjs';
import 'kleur/colors';
import { $ as $$Icon, a as $$Header, b as $$Footer, c as $$Layout } from './about_DUMHM_h-.mjs';
import 'clsx';
/* empty css                          */
/* empty css                          */
import { A as ActivistsJSON } from './climate-champions_D_wc60Fg.mjs';
/* empty css                          */
/* empty css                          */
import { e as eventsJSON } from './events_Bdi1NlEs.mjs';
/* empty css                          */

const $$Astro$3 = createAstro("https://net0.grant.codes");
const $$ActivistSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ActivistSection;
  const { startIndex, endIndex, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-ri5pgnjv> <h2 class="section-heading" data-astro-cid-ri5pgnjv>${title}</h2> <!-- container to wrap activist cards --> <!-- render the activists from activistJSON --> <div class="activist-container" data-astro-cid-ri5pgnjv> ${ActivistsJSON.slice(startIndex, endIndex).map((activist) => renderTemplate`<a class="activist-card"${addAttribute(`/climate-champions/${activist.slug}`, "href")} data-astro-cid-ri5pgnjv> <div class="profile-wrapper" data-astro-cid-ri5pgnjv> <img${addAttribute(activist.logoUrl, "src")}${addAttribute(activist.name, "alt")} data-astro-cid-ri5pgnjv> </div> <div class="details" data-astro-cid-ri5pgnjv> <h3 class="activist-name" data-astro-cid-ri5pgnjv>${activist.name}</h3> <p class="location" data-astro-cid-ri5pgnjv> <span class="icon" data-astro-cid-ri5pgnjv> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:my-location", "class": "icon", "data-astro-cid-ri5pgnjv": true })} </span> <span class="address" data-astro-cid-ri5pgnjv>${activist.address}</span> </p> <p class="about" data-astro-cid-ri5pgnjv>${activist.description.substring(0, 112)}...</p> <div class="tags" data-astro-cid-ri5pgnjv> ${activist.tags.slice(0, 3).map((tag) => renderTemplate`<span class="tag" data-astro-cid-ri5pgnjv>${tag}</span>`)} </div> </div> </a>`)} <!-- slide control bars for mobile display --> <div class="card-controls" data-astro-cid-ri5pgnjv> <span class="bar bar-activist-section" data-astro-cid-ri5pgnjv></span> <span class="bar bar-activist-section" data-astro-cid-ri5pgnjv></span> <span class="bar bar-activist-section" data-astro-cid-ri5pgnjv></span> <span class="bar bar-activist-section" data-astro-cid-ri5pgnjv></span> </div> </div> <!-- link to redirect landing pages of activists --> <a href="/climate-champions" class="cta-link" data-astro-cid-ri5pgnjv>See All</a> </div>  `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/ActivistSection.astro", void 0);

const $$Astro$2 = createAstro("https://net0.grant.codes");
const $$FeaturedEventSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FeaturedEventSection;
  const { startIndex, endIndex, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-jdorlhla> <h2 class="section-heading" data-astro-cid-jdorlhla>${title}</h2> <!-- container to wrap event cards --> <!-- render the event from eventJSON --> <div class="event-container" data-astro-cid-jdorlhla> ${eventsJSON.slice(startIndex, endIndex).map((event) => renderTemplate`<a class="event-card"${addAttribute(`/events/${event.slug}`, "href")} data-astro-cid-jdorlhla> <div class="logo-wrapper" data-astro-cid-jdorlhla> <img${addAttribute(event.logoUrl, "src")}${addAttribute(event.name, "alt")} data-astro-cid-jdorlhla> </div> <div class="details" data-astro-cid-jdorlhla> <h3 class="event-name" data-astro-cid-jdorlhla>${event.name}</h3> <p class="location" data-astro-cid-jdorlhla> <span class="icon" data-astro-cid-jdorlhla> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:my-location", "class": "icon", "data-astro-cid-jdorlhla": true })} </span> <span class="address" data-astro-cid-jdorlhla>${event.address}</span> </p> <p class="description" data-astro-cid-jdorlhla>${event.description.substring(0, 108)}...</p> <div class="tags" data-astro-cid-jdorlhla> ${event.tags.slice(0, 3).map((tag) => renderTemplate`<span class="tag" data-astro-cid-jdorlhla>${tag}</span>`)} </div> </div> </a>`)} <!-- slide control bars for mobile display --> <div class="card-controls" data-astro-cid-jdorlhla> <span class="bar bar-event-section" data-astro-cid-jdorlhla></span> <span class="bar bar-event-section" data-astro-cid-jdorlhla></span> <span class="bar bar-event-section" data-astro-cid-jdorlhla></span> <span class="bar bar-event-section" data-astro-cid-jdorlhla></span> </div> </div> <!-- link to redirect landing page of events --> <a href="/events" class="cta-link" data-astro-cid-jdorlhla>See All</a> </div>  `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/FeaturedEventSection.astro", void 0);

const NewsJSON = [
	{
		id: 0,
		headline: "Global warming turns up the heat on Nepal’s climate diplomacy",
		newsSrc: "https://www.himalmag.com/politics/global-warming-nepal-climate-crisis-diplomacy-adaptation-international-support-himalaya",
		imgSrc: "https://media.assettype.com/himalmag%2F2024-06%2F09528eb5-fe43-405b-97d7-41c2c528c866%2F03_Dawa_Lama_Holymoglobal_warming_nepal_climate_crisis_diplomacy_adaptation_international_support_hi.jpg?w=1200&auto=format%2Ccompress&fit=max",
		linkText: "www.himalmag.com",
		date: "Jun 07, 2024"
	},
	{
		id: 1,
		headline: "Failure is Not an Option for Nepal",
		newsSrc: "https://myrepublica.nagariknetwork.com/news/failure-is-not-an-option-for-nepal/",
		imgSrc: "https://myrepublica.nagariknetwork.com/uploads/media/ClimateFinance_20230901151718.jpg",
		linkText: "myrepublica.nagariknetwork.com",
		date: "Jun 10, 2024"
	},
	{
		id: 2,
		headline: "Nepal's Water Resources In The Face Of Climate Change",
		newsSrc: "https://www.actioncontrelafaim.org/en/headline/nepals-water-resources-in-the-face-of-climate-change/",
		imgSrc: "https://res.cloudinary.com/actioncontrelafaim/image/upload/f_auto/ar_16:9,w_1900,c_fill/b_rgb:000000,e_gradient_fade:10,y_0.3,o_70/w_1900,c_scale,dpr_1,q_auto,f_auto,fl_lossy,d_acf-ui:acf-default-blue.png/v1515011253/acf-prod/2024/03/DSC03591-min-1024x683.jpg",
		linkText: "www.actioncontrelafaim.org",
		date: "Mar 21, 2024"
	},
	{
		id: 3,
		headline: "Mountain villages bearing direct brunt of climate change",
		newsSrc: "https://kathmandupost.com/climate-environment/2024/04/22/mountain-villages-bearing-direct-brunt-of-climate-change",
		imgSrc: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2024/news/DingbocheKhumbu0002-1713748711.jpg",
		linkText: "www.kathmandupost.com",
		date: "Apr 22, 2024"
	},
	{
		id: 4,
		headline: "Nepal's mountains are crying out for help and COP28 must respond, says UN chief Guterres",
		newsSrc: "https://kathmandupost.com/climate-environment/2023/12/03/nepal-s-mountains-are-crying-out-for-help-and-cop28-must-respond-says-un-chief-guterres",
		imgSrc: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2023/third-party/PM-1701567214.jpg&w=900&height=601",
		linkText: "thekathmandupost.com",
		date: "Dec 03, 2023"
	},
	{
		id: 5,
		headline: "Nepal to host first-ever international dialogue on mountains and climate change",
		newsSrc: "https://english.ratopati.com/story/32343",
		imgSrc: "https://encdn.ratopati.com/media/news/Effects_page_triptych_6Dl7QCaNd5.webp",
		linkText: "english.ratopati.com",
		date: "Apr 15, 2024"
	},
	{
		id: 6,
		headline: "Climate Action – NOW!",
		newsSrc: "https://www.undp.org/nepal/blog/climate-action-now",
		imgSrc: "https://www.undp.org/sites/g/files/zskgke326/files/2024-06/picture1_0.jpg",
		linkText: "www.undp.org",
		date: "Jun 20, 2024"
	},
	{
		id: 7,
		headline: "UN chief puts a spotlight on Nepal’s climate crisis",
		newsSrc: "https://kathmandupost.com/climate-environment/2023/11/05/un-chief-puts-a-spotlight-on-nepal-s-climate-crisis",
		imgSrc: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2023/news/antonioguterres1698732069-1699147884.jpg",
		linkText: "thekathmandupost.com",
		date: "Nov 5, 2023"
	},
	{
		id: 8,
		headline: "As temperatures start rising, so does the risk of snakebite incidents",
		newsSrc: "https://kathmandupost.com/climate-environment/2024/02/26/as-temperatures-start-rising-so-does-the-risk-of-snakebite-incidents",
		imgSrc: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2024/third-party/thumb6-1708912139.jpg&w=900&height=601",
		linkText: "thekathmandupost.com",
		date: "Feb 26, 2024"
	},
	{
		id: 9,
		headline: "Climate change hits mountain people on multiple fronts",
		newsSrc: "https://kathmandupost.com/climate-environment/2024/06/05/climate-change-hits-mountain-people-on-multiple-fronts",
		imgSrc: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2024/news/Mustangmanagclimatecrisis16-1717566284.jpg&w=900&height=601",
		linkText: "thekathmandupost.com",
		date: "Jun 05, 2024"
	},
	{
		id: 10,
		headline: "Extreme heat disrupts life in West Tarai",
		newsSrc: "https://kathmandupost.com/climate-environment/2024/06/01/extreme-heat-disrupts-life-in-west-terai",
		imgSrc: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2024/miscellaneous/Untitled1-1717206974.jpg&w=900&height=601",
		linkText: "thekathmandupost.com",
		date: "Jun 1, 2024"
	},
	{
		id: 11,
		headline: "Yearender 2023: Changing climate raises alarm in Nepal",
		newsSrc: "https://kathmandupost.com/special-supplement/2023/12/31/yearender-2023-changing-climate-raises-alarm-in-nepal",
		imgSrc: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2023/third-party/Untitled11copy-1703989961.jpg&w=900&height=601",
		linkText: "thekathmandupost.com",
		date: "Dec 31, 2023"
	},
	{
		id: 12,
		headline: "Why Floods Beyond Our Imagination Hit Nepalese Himalayan Town",
		newsSrc: "https://www.globalissues.org/news/2023/09/26/34864",
		imgSrc: "https://static.globalissues.org/ips/2023/09/01-Kagbeni-flood-mustang.jpeg",
		linkText: "www.globalissues.org",
		date: "Sep 26, 2023"
	},
	{
		id: 13,
		headline: "Climate change spells cultural extinction for Nepal’s nomadic herders",
		newsSrc: "https://www.independent.co.uk/climate-change/nepal-cashmere-nomad-herd-climate-change-b2418692.html",
		imgSrc: "https://static.independent.co.uk/2023/09/26/11/4_1.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp",
		linkText: "www.independent.co.uk",
		date: "Oct 02, 2023"
	},
	{
		id: 14,
		headline: "Nepal's migrant workers eye overseas jobs as climate threats loom",
		newsSrc: "https://dialogue.earth/en/climate/nepals-migrant-workers-eye-overseas-jobs-as-climate-threats-loom/",
		imgSrc: "https://dialogue.earth/content/uploads/2024/02/Migrant-worker-from-Nepal-in-Qatar_Alamy_2WHB081-1400x933.jpg",
		linkText: "dialogue.earth",
		date: "Feb 27, 2024"
	},
	{
		id: 15,
		headline: "Is Nepal doing enough to educate children on climate change?",
		newsSrc: "https://dialogue.earth/en/climate/is-nepal-doing-enough-to-educate-children-on-climate-change/",
		imgSrc: "https://dialogue.earth/content/uploads/2023/06/School-children-writing-in-classroom_Alamy_E8GK1C-1400x935.jpg",
		linkText: "dialogue.earth",
		date: "Jun 7, 2023"
	},
	{
		id: 16,
		headline: "Indigenous women discuss their contribution to climate action in Nepal",
		newsSrc: "https://asiapacific.unwomen.org/en/stories/feature-story/2024/03/indigenous-women-discuss-their-contribution-to-climate-action-in-nepal",
		imgSrc: "https://asiapacific.unwomen.org/sites/default/files/2024-03/np-c675-cipred-photo01-1679px-r02.jpg",
		linkText: "asiapacific.unwomen.org",
		date: "Mar 06, 2024"
	},
	{
		id: 17,
		headline: "Glacial Melt Is Dispossessing Nepal’s Indigenous Communities",
		newsSrc: "https://earthjournalism.net/stories/glacial-melt-is-dispossessing-nepals-indigenous-communities",
		imgSrc: "https://earthjournalism.net/sites/default/files/styles/node_hero_large/public/2023-08/thediplomat_2023-04-04-071439.jpg.webp?itok=e23JvJ7S",
		linkText: "earthjournalism.net",
		date: "Aug 12, 2023"
	},
	{
		id: 18,
		headline: "Wildfires are raging in Nepal — climate change isn’t the only culprit",
		newsSrc: "https://www.nature.com/articles/d41586-024-01758-2#:~:text=This%20year%20alone%2C%20Nepal%20has,in%20the%20past%2012%20months.",
		imgSrc: "https://media.nature.com/w1248/magazine-assets/d41586-024-01758-2/d41586-024-01758-2_27089126.jpg?as=webp",
		linkText: "www.nature.com",
		date: "Jun 14, 2024"
	},
	{
		id: 19,
		headline: "Nepal and Climate Diplomacy",
		newsSrc: "https://myrepublica.nagariknetwork.com/news/nepal-and-climate-diplomacy/",
		imgSrc: "https://myrepublica.nagariknetwork.com/uploads/media/climatechange_20220810151835.jpg",
		linkText: "myrepublica.nagariknetwork.com",
		date: "Mar 1, 2024"
	},
	{
		id: 20,
		headline: "Nepal's pavilion for the first time at the COP 28",
		newsSrc: "https://www.undp.org/nepal/news/nepals-pavilion-first-time-cop-28",
		imgSrc: "https://www.undp.org/sites/g/files/zskgke326/files/2023-11/undp-np-lumding-cho-2023.jpg",
		linkText: "www.undp.org",
		date: "Nov 9, 2023"
	},
	{
		id: 21,
		headline: "COP 28: Nepal’s proactive approach to secure compensation on the world stage",
		newsSrc: "https://english.onlinekhabar.com/cop-28-nepal-plan.html",
		imgSrc: "https://english.onlinekhabar.com/wp-content/uploads/2023/11/themes-of-COP28-UAE-banner.jpg",
		linkText: "english.onlinekhabar.com",
		date: "Nov 30, 2023"
	}
];

const OrganizationsJSON = [
	{
		id: 1,
		name: "Nepalese Youth for Climate Action (NYCA)",
		description: "Nepalese Youth for Climate Action (NYCA) is a youth-led coalition of Nepalese youth and youth groups dedicated to tackling climate change, which is the most significant challenge of our generation. Established on August 10, 2008, NYCA operates under the motto “Caring for Climate, Caring for Ourselves.” The organization strives to raise awareness about climate change on local, national, and international levels, educate and empower youth, and build networks of young people engaged in climate campaigns. <br> NYCA's objectives are multifaceted and ambitious. The organization aims to mobilize youth to achieve its goals and vision by conducting research and studies on various components of climate change. It supports the Nepalese government in international negotiations to advocate for Nepal’s and its member coalition's positions. Additionally, NYCA puts pressure on large greenhouse gas-emitting countries to make significant emission reductions and urges developed countries to provide adequate and predictable financial support for adaptation and technology transfer to developing countries. Moreover, NYCA campaigns for the Nepalese government to transition towards a low-carbon economy. <br> The overarching goal of NYCA is to protect Nepal and its people from the adverse impacts of climate change by spreading awareness, advocating for effective policies, and taking concrete actions. The organization aims to lead Nepal towards climate resilience by spearheading adaptation efforts and mitigating greenhouse gas emissions. NYCA envisions an economically prosperous and sustainable Nepal where youth actively lead society towards a cleaner and more sustainable future.",
		address: " Talchikhel, Lalitpur, Nepal",
		contact: {
			email: "nyca.np@gmail.com",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/NYCANepal/",
			linkedin: "https://np.linkedin.com/company/nyca-nepal",
			instagram: "https://www.instagram.com/nyca.nepal/"
		},
		website: "https://nyca.net.np/",
		tags: [
			"environment",
			"youth",
			"climate awareness",
			"campaign"
		],
		logoUrl: "https://nyca.net.np/images/logo.png",
		pictures: [
			"https://annapurnaexpress.prixacdn.net/media/albums/climate_change.jpg_noPgo9PwR4.PNG",
			"https://nyca.net.np/uploads/original/woman-empowerment-fav50lRMwfO9ochwEWlUo52IjftHGYx8Lq5fF7vZ.jpg",
			"https://annapurnaexpress.prixacdn.net/media/albums/climate_change.jpg_noPgo9PwR4.PNG",
			"https://nyca.net.np/uploads/original/woman-empowerment-fav50lRMwfO9ochwEWlUo52IjftHGYx8Lq5fF7vZ.jpg"
		],
		slug: "nyca-nepal"
	},
	{
		id: 2,
		name: "Digo Bikas Institute (DBI)",
		description: "Digo Bikas Institute (DBI) is a research and advocacy organization committed to promoting ecological sustainability and social equity at policy and community levels. Based in Kathmandu, DBI believes that Nepal (and the rest of the world) can develop meaningfully by identifying and applying alternative ways of meeting human needs without harming nature and fellow human beings. <br> Vision: Digo Bikas Institute envisions an ecologically sound, socially just, and prosperous society, and that it will continue to be so for future generations. <br> Mission: Digo Bikas Institute’s mission is to undertake research and action to stimulate informed discussion and strategic thought to advance alternative and local solutions to global problems. <br> Values: Equity, Fairness and Justice, Integrity, Transparency and Accountability, Inclusiveness. <br> Our Approach: Digo Bikas Institute carries out research, training, and advocacy on all aspects of sustainable development. Our research work aims to build evidence for bringing positive policy change. We empower and engage a critical mass of informed citizens through our education and training. We conduct advocacy work based on the evidence generated through our research and analysis by involving informed citizens. <br> We use different approaches to achieve our vision and mission, including research and analysis, seminars and conferences, education and training programs, correspondence and fact-finding missions, public consultations and legal interventions, network building and international solidarity, joint campaigns, and media.",
		address: "Battisputali, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi",
			instagram: "#N/A"
		},
		website: "https://digobikas.org/ ",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://digobikas.org/wp-content/uploads/2018/05/IMG_3605-e1526615873901.jpg",
			"https://superdesk-pro-c.s3.amazonaws.com/sd-nepalitimes/2022111016110/636d12af9c7e80680e0a98e9jpeg.jpg",
			"https://digobikas.org/wp-content/uploads/2018/05/IMG_3605-e1526615873901.jpg",
			"https://superdesk-pro-c.s3.amazonaws.com/sd-nepalitimes/2022111016110/636d12af9c7e80680e0a98e9jpeg.jpg"
		],
		slug: "digobikas-institute"
	},
	{
		id: 3,
		name: "Youth Action for Sustainable and Eco Nepal (YASEN)",
		description: "Youth Action for Sustainable and Eco Nepal (YASEN) is a youth-led non-profit organization dedicated to creating a sustainable and positive impact on individuals and communities in Nepal. Established on March 27, 2023, YASEN operates under the motto “Empowering Younger Generation For Sustainable Future.” Our mission is to create a better world by addressing pressing social and environmental challenges in Nepal through the active involvement of young people. <br> YASEN empowers young people to be leaders in creating a sustainable future for Nepal and the world. We focus on fostering environmental stewardship, driving climate action, and promoting inclusive green growth through education, advocacy, and community engagement. Our efforts include community education and awareness, recycling and waste reduction, capacity building and training, and sustainable agriculture. We also emphasize women’s empowerment and entrepreneurship, loss and damage, and disaster risk reduction. <br> YASEN targets several Sustainable Development Goals (SDGs), including No Poverty (SDG 1), Zero Hunger (SDG 2), Good Health and Well-being (SDG 3), Quality Education (SDG 4), Gender Equality (SDG 5), Sustainable Cities and Communities (SDG 11), Responsible Consumption and Production (SDG 12), Climate Action (SDG 13), Life on Land (SDG 15), and Partnerships for the Goals (SDG 17). Through these initiatives, we aim to create lasting positive changes and build a sustainable future for all.",
		address: "Bharatpur-9, Chitwan, Nepal",
		contact: {
			email: "yasennepa@gmail.com",
			phone: "9867183923"
		},
		socials: {
			facebook: "https://www.facebook.com/yasennepal/",
			linkedin: "https://www.linkedin.com/in/yasennepal/",
			instagram: "https://www.instagram.com/yasennepal/"
		},
		website: "https://yasennepal.com/",
		tags: [
			"environment",
			"youth",
			"climate awareness",
			"campaign"
		],
		logoUrl: "https://i0.wp.com/yasennepal.com/wp-content/uploads/2024/02/yasen-2.png",
		pictures: [
			"https://i0.wp.com/yasennepal.com/wp-content/uploads/2024/04/IMG_3848.jpg",
			"https://i0.wp.com/yasennepal.com/wp-content/uploads/2024/03/IMG_8045-scaled-e1711099500887.jpg",
			"https://i0.wp.com/yasennepal.com/wp-content/uploads/2024/03/IMG_4792-scaled.jpg",
			"https://i0.wp.com/yasennepal.com/wp-content/uploads/2024/03/IMG_3835-scaled.jpg"
		],
		slug: "yasen"
	},
	{
		id: 4,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 5,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 6,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 7,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 8,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 9,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 10,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 11,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 12,
		name: "Bignaharta Nepal",
		description: "Bighnaharta Nepal aims to provide emergency response, disaster risk reduction, and community resilience building in Nepal.",
		address: "Pulchowk Road, Lalitpur, Nepal",
		contact: {
			email: "info@bighnaharta.org",
			phone: "+977 9818349762"
		},
		socials: {
			facebook: "https://www.facebook.com/bighnahartanp",
			linkedin: "https://www.linkedin.com/company/bighnaharta-nepal/",
			instagram: "https://www.instagram.com/bighnaharta_nepal/"
		},
		website: "https://bighnaharta.org/",
		tags: [
			"community resilience",
			"disaster response",
			"climate adaptation",
			"indigenous community"
		],
		logoUrl: "https://bighnaharta.org/assets/images/settings/default_logo.png",
		pictures: [
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg",
			"https://bighnaharta.org/assets/images/gallery-images/1649452941.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 13,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 14,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 15,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 16,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 17,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 18,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 19,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	},
	{
		id: 20,
		name: "Digo Bikas Institute",
		description: "Digo Bikas Institute (DBI) is committed to promoting ecological sustainability and social equity. Based in Kathmandu, DBI works on policy and community levels for a …",
		address: "Pragya Prathisthan Margh, Mid Baneshwor, Kathmandu",
		contact: {
			email: "info@digobikas.org",
			phone: "+977-01-4610656"
		},
		socials: {
			facebook: "https://www.facebook.com/digobikasinstitute/",
			linkedin: "https://np.linkedin.com/company/digo-bikas-institute-dbi-",
			instagram: "N/A"
		},
		website: "https://digobikas.org/",
		tags: [
			"research",
			"policy advocacy",
			"community engagement",
			"renewable energy"
		],
		logoUrl: "https://digobikas.org/wp-content/uploads/2018/05/DBI-.png",
		pictures: [
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg",
			"https://thousandcurrents.org/wp-content/uploads/2022/08/DBI-e1663138237114.jpg"
		],
		slug: "bignaharta-nepal"
	}
];

const $$Astro$1 = createAstro("https://net0.grant.codes");
const $$FeaturedOrganizationSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedOrganizationSection;
  const { startIndex, endIndex, title } = Astro2.props;
  console.log(startIndex, endIndex);
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-2pi2vich> <h2 class="section-heading" data-astro-cid-2pi2vich>${title}</h2> <!-- container to wrap organization cards --> <!-- render the organization from organizationJSON --> <div class="organization-container" data-astro-cid-2pi2vich> ${OrganizationsJSON.slice(startIndex, endIndex).map((organization) => renderTemplate`<a class="organization-card"${addAttribute(`/organizations/${organization.slug}`, "href")} data-astro-cid-2pi2vich> <div class="logo-wrapper" data-astro-cid-2pi2vich> <img${addAttribute(organization.logoUrl, "src")}${addAttribute(organization.name, "alt")} data-astro-cid-2pi2vich> </div> <div class="details" data-astro-cid-2pi2vich> <h3 class="organization-name" data-astro-cid-2pi2vich>${organization.name}</h3> <p class="location" data-astro-cid-2pi2vich> <span class="icon" data-astro-cid-2pi2vich> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:my-location", "class": "icon", "data-astro-cid-2pi2vich": true })} </span> <span class="address" data-astro-cid-2pi2vich>${organization.address}</span> </p> <p class="description" data-astro-cid-2pi2vich>${organization.description.substring(0, 112)}...</p> <div class="tags" data-astro-cid-2pi2vich> ${organization.tags.slice(0, 3).map((tag) => renderTemplate`<span class="tag" data-astro-cid-2pi2vich>${tag}</span>`)} </div> </div> </a>`)} <!-- slide control bars for mobile display --> <div class="card-controls" data-astro-cid-2pi2vich> <span class="bar bar-organization-section" data-astro-cid-2pi2vich></span> <span class="bar bar-organization-section" data-astro-cid-2pi2vich></span> <span class="bar bar-organization-section" data-astro-cid-2pi2vich></span> <span class="bar bar-organization-section" data-astro-cid-2pi2vich></span> </div> </div> <!-- link to redirect landing page of organizations --> <a href="/organizations" class="cta-link" data-astro-cid-2pi2vich>See All</a> </div>  `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/FeaturedOrganizationSection.astro", void 0);

const $$HeroContent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="hero-content section-container" data-astro-cid-wwkfyc33> <h1 data-astro-cid-wwkfyc33><span class="first-keyword" data-astro-cid-wwkfyc33>Knowledge</span> <br data-astro-cid-wwkfyc33> +  &nbsp;<span class="second-keyword" data-astro-cid-wwkfyc33>Action</span> = <br data-astro-cid-wwkfyc33> A Climate-Resilient Nepal</h1> </div> `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/HeroContent.astro", void 0);

const $$CtaSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-ne56ttnc> <div class="content-section" data-astro-cid-ne56ttnc> <p class="tagline" data-astro-cid-ne56ttnc>
A unifying knowledge hub to inspire collective climate action.
</p> <button class="cta-button" data-astro-cid-ne56ttnc><a href="/organizations" data-astro-cid-ne56ttnc>Find Organizations</a></button> </div> <div class="video-section" data-astro-cid-ne56ttnc> <h3 class="video-title" data-astro-cid-ne56ttnc>
UN Chief calls for climate action from Mt. Everest
</h3> <div class="video" data-astro-cid-ne56ttnc> <iframe src="https://www.youtube.com/embed/bN3gVb__tmA?si=1lgCaagaTFdJ7XY-" title="YouTube video player" allow="autoplay; clipboard-write; encrypted-media;" referrerpolicy="strict-origin-when-cross-origin" data-astro-cid-ne56ttnc></iframe> </div> <p class="description" data-astro-cid-ne56ttnc>
“The world cannot wait!” –UN chief, Antonio Guterres from the base of Mt.
			Everest, on the terrible impact of the climate crisis on the Himalayas.
</p> </div> </div> `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/CtaSection.astro", void 0);

const $$FactSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-tev5hvbq> <h2 class="section-heading" data-astro-cid-tev5hvbq>Facts</h2> <!-- container to wrap all three facts --> <div class="fact-container" data-astro-cid-tev5hvbq> <!-- fact card one --> <div class="fact-card" data-astro-cid-tev5hvbq> <h3 class="fact-title" data-astro-cid-tev5hvbq>Rising Temperature</h3> <p class="fact-description" data-astro-cid-tev5hvbq>
Nepal's average temperature has increased by about 0.6°C over the last
				decade, higher than the global average rise, causing Himalayan glaciers
				to melt at an accelerated rate of around 90 meters per year.
</p> <div class="icon-wrapper" data-astro-cid-tev5hvbq> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:temperature", "class": "icon", "data-astro-cid-tev5hvbq": true })} </div> </div> <!-- fact card two --> <div class="fact-card" data-astro-cid-tev5hvbq> <h3 class="fact-title" data-astro-cid-tev5hvbq>Economic Cost</h3> <p class="fact-description" data-astro-cid-tev5hvbq>
The World Bank estimates the economic cost of climate change in Nepal to
				be 2-3% of GDP per year by 2050.
</p> <div class="icon-wrapper" data-astro-cid-tev5hvbq> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:attach-money", "class": "icon", "data-astro-cid-tev5hvbq": true })} </div> </div> <!-- fact card three --> <div class="fact-card" data-astro-cid-tev5hvbq> <h3 class="fact-title" data-astro-cid-tev5hvbq>Natural Resource Vulnerability</h3> <p class="fact-description" data-astro-cid-tev5hvbq>
Increased frequency of floods, landslides, forest fires and droughts are
				threatening biodiversity, agriculture, hydropower generation, and
				freshwater availability.
</p> <div class="icon-wrapper" data-astro-cid-tev5hvbq> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:fire", "class": "icon", "data-astro-cid-tev5hvbq": true })} </div> </div> <!-- slide control bars for mobile display --> <div class="card-controls" data-astro-cid-tev5hvbq> <span class="bar fact-section-bar" data-astro-cid-tev5hvbq></span> <span class="bar fact-section-bar" data-astro-cid-tev5hvbq></span> <span class="bar fact-section-bar" data-astro-cid-tev5hvbq></span> </div> </div> </div>  <!-- script to make slider which is triggered for devices screen width less than 768px --> `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/FactSection.astro", void 0);

const $$FeaturedNewsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="section-container" data-astro-cid-jrexbvog> <h2 class="section-heading" data-astro-cid-jrexbvog>News & Stories</h2> <!-- container to wrap news cards --> <div class="news-container" data-astro-cid-jrexbvog> <!-- news card one --> ${NewsJSON.slice(0, 6).map((news) => renderTemplate`<div class="news-card" data-astro-cid-jrexbvog> <a${addAttribute(news.newsSrc, "href")} target="_blank" data-astro-cid-jrexbvog> <div class="content" data-astro-cid-jrexbvog> <h3 class="news-headline" data-astro-cid-jrexbvog>${news.headline}</h3> <div class="news-image-wrapper" data-astro-cid-jrexbvog> <img${addAttribute(news.imgSrc, "src")} alt="" data-astro-cid-jrexbvog> </div> </div> <div class="link" data-astro-cid-jrexbvog> <span class="link-icon" data-astro-cid-jrexbvog> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:link", "data-astro-cid-jrexbvog": true })} </span> <a${addAttribute(news.newsSrc, "href")} data-astro-cid-jrexbvog>${news.linkText}</a> </div> </a> </div>`)} </div> <!-- link to redirect to news landing page --> <a href="/news&stories" class="cta-link" data-astro-cid-jrexbvog>See All</a> </div> `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/components/FeaturedNewsSection.astro", void 0);

const $$Astro = createAstro("https://net0.grant.codes");
const $$Page = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Page;
  const { title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": title, "data-astro-cid-qo5xhe7c": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-container" data-astro-cid-qo5xhe7c> <section class="hero-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "Header", $$Header, { "logoColor": "white", "data-astro-cid-qo5xhe7c": true })} ${renderComponent($$result2, "HeroContent", $$HeroContent, { "data-astro-cid-qo5xhe7c": true })} </section> <section class="cta-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "CtaSection", $$CtaSection, { "data-astro-cid-qo5xhe7c": true })} </section> <section class="fact-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "FactSection", $$FactSection, { "data-astro-cid-qo5xhe7c": true })} </section> <section class="activist-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "ActivistSection", $$ActivistSection, { "startIndex": "0", "endIndex": "4", "title": "Climate Champions", "data-astro-cid-qo5xhe7c": true })} </section> <section class="organization-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "FeaturedOrganizationSection", $$FeaturedOrganizationSection, { "startIndex": "0", "endIndex": "4", "title": "Featured Organizations", "data-astro-cid-qo5xhe7c": true })} </section> <section class="event-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "FeaturedEventSection", $$FeaturedEventSection, { "startIndex": "0", "endIndex": "4", "title": "Latest Events", "data-astro-cid-qo5xhe7c": true })} </section> <section class="news-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "FeaturedNewsSection", $$FeaturedNewsSection, { "data-astro-cid-qo5xhe7c": true })} </section> <section class="footer-section" data-astro-cid-qo5xhe7c> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-qo5xhe7c": true })} </section> </main> ` })} `;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/layouts/Page.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Page, { "title": "Nepal Climate Hub" })}`;
}, "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/index.astro", void 0);

const $$file = "C:/Users/Dell/Desktop/NepalClimateHub/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ActivistSection as $, NewsJSON as N, OrganizationsJSON as O, $$FeaturedEventSection as a, $$FeaturedOrganizationSection as b, index as i };
