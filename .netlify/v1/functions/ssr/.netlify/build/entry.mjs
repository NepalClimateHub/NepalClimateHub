import { renderers } from './renderers.mjs';
import { manifest } from './manifest_C4VFkwcR.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_uFr7ftQb.mjs');
const _page1 = () => import('./chunks/about_CnIB-B3a.mjs');
const _page2 = () => import('./chunks/save-subscription-email_CPW1gxlG.mjs');
const _page3 = () => import('./chunks/save-volunteer_2oDoGCLn.mjs');
const _page4 = () => import('./chunks/_climateChampionDetail__DzCpbv6e.mjs');
const _page5 = () => import('./chunks/climate-champions_BZ-Krxc2.mjs');
const _page6 = () => import('./chunks/_eventDetail__Vk-0pSqQ.mjs');
const _page7 = () => import('./chunks/events_Dv5nmnuW.mjs');
const _page8 = () => import('./chunks/news_stories_DlRoSMOI.mjs');
const _page9 = () => import('./chunks/_organizationName__DwGjHHGB.mjs');
const _page10 = () => import('./chunks/organizations_BoeIK7bF.mjs');
const _page11 = () => import('./chunks/personal-commitments_Dr6vDeNu.mjs');
const _page12 = () => import('./chunks/submit-profile_BParV3hu.mjs');
const _page13 = () => import('./chunks/success_CvPATnEi.mjs');
const _page14 = () => import('./chunks/volunteer_VyOZPsQZ.mjs');
const _page15 = () => import('./chunks/index_poX6sTH-.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/save-subscription-email.ts", _page2],
    ["src/pages/api/save-volunteer.ts", _page3],
    ["src/pages/climate-champions/[climateChampionDetail].astro", _page4],
    ["src/pages/climate-champions.astro", _page5],
    ["src/pages/events/[eventDetail].astro", _page6],
    ["src/pages/events.astro", _page7],
    ["src/pages/news&stories.astro", _page8],
    ["src/pages/organizations/[organizationName].astro", _page9],
    ["src/pages/organizations.astro", _page10],
    ["src/pages/personal-commitments.astro", _page11],
    ["src/pages/submit-profile.astro", _page12],
    ["src/pages/success.astro", _page13],
    ["src/pages/volunteer.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "d4c23b60-4bb4-4035-9310-d9e18a9ea654"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
