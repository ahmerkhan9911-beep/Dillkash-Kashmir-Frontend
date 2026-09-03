import { n as formatPKR, s as tours } from "./site-Bb-6ZWDl.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages._slug-BhN2FQs7.js
var $$splitComponentImporter = () => import("./packages._slug-BeASGpwR.mjs");
var Route = createFileRoute("/packages/$slug")({
	loader: ({ params }) => {
		return {
			tour: tours.find((t) => t.slug === params.slug) || null,
			slug: params.slug
		};
	},
	head: ({ loaderData }) => ({ meta: loaderData?.tour ? [
		{ title: `${loaderData.tour.title} — Al Kareem Travel & Tours` },
		{
			name: "description",
			content: `${loaderData.tour.short} ${loaderData.tour.durationDays}-day all-inclusive tour from Lahore starting at ${formatPKR(loaderData.tour.price)}.`
		},
		{
			property: "og:title",
			content: `${loaderData.tour.title} — Al Kareem Travel & Tours`
		},
		{
			property: "og:description",
			content: loaderData.tour.short
		}
	] : [{ title: "Tour Package — Al Kareem Travel & Tours" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
