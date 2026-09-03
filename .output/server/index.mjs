globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon-32.png": {
		"type": "image/png",
		"etag": "\"924-6E+V5f3TnVjSOGJ7ptZ8jgUWlL8\"",
		"mtime": "2026-08-26T06:38:06.935Z",
		"size": 2340,
		"path": "../public/favicon-32.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-26T05:47:50.000Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/favicon-192.png": {
		"type": "image/png",
		"etag": "\"a9d7-ZBDrfcfwejEhKsfjpqGuX4LfCUw\"",
		"mtime": "2026-08-26T06:38:06.891Z",
		"size": 43479,
		"path": "../public/favicon-192.png"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1220-COcaQKdu0TrHZoHrFk8GsUhquQY\"",
		"mtime": "2026-08-26T06:38:06.978Z",
		"size": 4640,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-26T05:47:50.000Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/about-CjQMubxs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce0-tAxvNtAiZ6fTDYjS0QZwDDjDbSY\"",
		"mtime": "2026-09-01T19:52:47.422Z",
		"size": 7392,
		"path": "../public/assets/about-CjQMubxs.js"
	},
	"/assets/admin-CynNAmk6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1417-XuRDgLZdJCQjP22zTkxYxVFDJdU\"",
		"mtime": "2026-09-01T19:52:47.423Z",
		"size": 5143,
		"path": "../public/assets/admin-CynNAmk6.js"
	},
	"/assets/admin-D2zFdIJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"800-xHrCjvsT/j8m3t+2rzidBnPkcaI\"",
		"mtime": "2026-09-01T19:52:47.424Z",
		"size": 2048,
		"path": "../public/assets/admin-D2zFdIJM.js"
	},
	"/assets/api-yz6JsV8R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"607-HfFguiFmMkk/Xq/Jpf+A9Q3YcQU\"",
		"mtime": "2026-09-01T19:52:47.424Z",
		"size": 1543,
		"path": "../public/assets/api-yz6JsV8R.js"
	},
	"/assets/BookingModal-BEaHXF27.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc5-0RHrEah1aFJZqzAwzTwd8dYiAGM\"",
		"mtime": "2026-09-01T19:52:47.416Z",
		"size": 7365,
		"path": "../public/assets/BookingModal-BEaHXF27.js"
	},
	"/assets/bus-fnnhBQqL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-9/GmABEIza+1WC7baNOiAQPD4kQ\"",
		"mtime": "2026-09-01T19:52:47.425Z",
		"size": 441,
		"path": "../public/assets/bus-fnnhBQqL.js"
	},
	"/assets/check-FHv9l6Wt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-rxtGdweaVLOFIlGWxaHIvrUptA4\"",
		"mtime": "2026-09-01T19:52:47.426Z",
		"size": 113,
		"path": "../public/assets/check-FHv9l6Wt.js"
	},
	"/assets/chevron-left-B9LbPoNg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-PvlVux7rLJ5qyV+et1fZkMiUsZg\"",
		"mtime": "2026-09-01T19:52:47.426Z",
		"size": 119,
		"path": "../public/assets/chevron-left-B9LbPoNg.js"
	},
	"/assets/contact-CgpTwvsz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b1b-v/ntLXHzKke4jc6A8kUuWwg+6Qw\"",
		"mtime": "2026-09-01T19:52:47.427Z",
		"size": 6939,
		"path": "../public/assets/contact-CgpTwvsz.js"
	},
	"/assets/custom-tour-ZM3CI5DY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bb6-JeMO+n7zu1DdlUGxgwmyI+wVGgQ\"",
		"mtime": "2026-09-01T19:52:47.428Z",
		"size": 7094,
		"path": "../public/assets/custom-tour-ZM3CI5DY.js"
	},
	"/assets/DeleteConfirmDialog-Dfgeokir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bd-/d1QuT3P6pf6laruqGGNhSEQtZ8\"",
		"mtime": "2026-09-01T19:52:47.417Z",
		"size": 1725,
		"path": "../public/assets/DeleteConfirmDialog-Dfgeokir.js"
	},
	"/assets/dest-arang-kel-DKOwxMgm.jpg": {
		"type": "image/jpeg",
		"etag": "\"3f5e5-7wX6QoRpx4USmT0yrkT28kD+Jhg\"",
		"mtime": "2026-09-01T19:52:47.459Z",
		"size": 259557,
		"path": "../public/assets/dest-arang-kel-DKOwxMgm.jpg"
	},
	"/assets/dest-dhani-D6SIqGnJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"479a3-wQz1jyE2hnIQnWxJ5FesB90tgas\"",
		"mtime": "2026-09-01T19:52:47.460Z",
		"size": 293283,
		"path": "../public/assets/dest-dhani-D6SIqGnJ.jpg"
	},
	"/assets/dest-kutton-DeCd3YNa.jpg": {
		"type": "image/jpeg",
		"etag": "\"35f8b-juHuOtmlREoHgshmx/77jnW1fZg\"",
		"mtime": "2026-09-01T19:52:47.462Z",
		"size": 221067,
		"path": "../public/assets/dest-kutton-DeCd3YNa.jpg"
	},
	"/assets/dest-keran-Cg9dWLsQ.jpg": {
		"type": "image/jpeg",
		"etag": "\"36d44-M/fEeEBK28mQY3N9tsGRNQPC6Ac\"",
		"mtime": "2026-09-01T19:52:47.461Z",
		"size": 224580,
		"path": "../public/assets/dest-keran-Cg9dWLsQ.jpg"
	},
	"/assets/dest-muzaffarabad-DGAajrm-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-GN4SdisvgtEFL9KJWtexFtOzX40\"",
		"mtime": "2026-09-01T19:52:47.429Z",
		"size": 465,
		"path": "../public/assets/dest-muzaffarabad-DGAajrm-.js"
	},
	"/assets/dest-muzaffarabad-BbIG2K_S.jpg": {
		"type": "image/jpeg",
		"etag": "\"2481c-fyxHV81TdgpvcHA3hqlfRF9LNRs\"",
		"mtime": "2026-09-01T19:52:47.464Z",
		"size": 149532,
		"path": "../public/assets/dest-muzaffarabad-BbIG2K_S.jpg"
	},
	"/assets/dest-neelum-river-CioHRbMZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"310a9-7qTWNfcv8AEpdHKImTZbxO2nJWw\"",
		"mtime": "2026-09-01T19:52:47.464Z",
		"size": 200873,
		"path": "../public/assets/dest-neelum-river-CioHRbMZ.jpg"
	},
	"/assets/dest-pir-chinasi-DlIC9x-y.jpg": {
		"type": "image/jpeg",
		"etag": "\"18471-DQGkhE1dQQQ6QMcxrK+HVszTiIA\"",
		"mtime": "2026-09-01T19:52:47.465Z",
		"size": 99441,
		"path": "../public/assets/dest-pir-chinasi-DlIC9x-y.jpg"
	},
	"/assets/dest-ratti-gali-BQtFxHhA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c-WKDooGuoebENogk5MYkvvu3Gd+0\"",
		"mtime": "2026-09-01T19:52:47.429Z",
		"size": 60,
		"path": "../public/assets/dest-ratti-gali-BQtFxHhA.js"
	},
	"/assets/dest-ratti-gali-BXSOR1Xp.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fb64-oc2gNLKTqv9J8F8Qq4+e8c5UDjY\"",
		"mtime": "2026-09-01T19:52:47.466Z",
		"size": 129892,
		"path": "../public/assets/dest-ratti-gali-BXSOR1Xp.jpg"
	},
	"/assets/dest-sharda-Dl-TR9Wb.jpg": {
		"type": "image/jpeg",
		"etag": "\"3758f-HA/YNjrkJzo2GosttE6yyNpSH8Y\"",
		"mtime": "2026-09-01T19:52:47.467Z",
		"size": 226703,
		"path": "../public/assets/dest-sharda-Dl-TR9Wb.jpg"
	},
	"/assets/DestinationForm-Bdxx-p8I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ab-yvz7Rg+UXJiibH2nSMntQc+0AHk\"",
		"mtime": "2026-09-01T19:52:47.418Z",
		"size": 4523,
		"path": "../public/assets/DestinationForm-Bdxx-p8I.js"
	},
	"/assets/dest-taobat-D4gvPTvC.jpg": {
		"type": "image/jpeg",
		"etag": "\"30fbc-7XVpAhbLR+ew28Ba05OJJPO/cQo\"",
		"mtime": "2026-09-01T19:52:47.468Z",
		"size": 200636,
		"path": "../public/assets/dest-taobat-D4gvPTvC.jpg"
	},
	"/assets/destinations-DZYRfoKL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"348-MBam1NSi6JZW/OQ/wwMgOXBj2NY\"",
		"mtime": "2026-09-01T19:52:47.432Z",
		"size": 840,
		"path": "../public/assets/destinations-DZYRfoKL.js"
	},
	"/assets/destinations.create-COKVgKP5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-aeOVG4uCqIZqdnk3iavLjykTTDI\"",
		"mtime": "2026-09-01T19:52:47.433Z",
		"size": 703,
		"path": "../public/assets/destinations.create-COKVgKP5.js"
	},
	"/assets/destinations.index-z4HK2dUj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119a-Qcd69gxsET4d5QnixgYbvmv/ssM\"",
		"mtime": "2026-09-01T19:52:47.434Z",
		"size": 4506,
		"path": "../public/assets/destinations.index-z4HK2dUj.js"
	},
	"/assets/destinations._id.edit-C4Xkskg7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65d-cHVV8AdWGWAgQAkn2+ymy71uZX8\"",
		"mtime": "2026-09-01T19:52:47.433Z",
		"size": 1629,
		"path": "../public/assets/destinations._id.edit-C4Xkskg7.js"
	},
	"/assets/eye-daGk1e1x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-8I4agHrZf8TQlLc04+hNEC4gfq0\"",
		"mtime": "2026-09-01T19:52:47.435Z",
		"size": 622,
		"path": "../public/assets/eye-daGk1e1x.js"
	},
	"/assets/dillkash-logo-horizontal-CB6wnloB.png": {
		"type": "image/png",
		"etag": "\"23288-fj6DPwllRcKtadb6wSJNANYq/0Q\"",
		"mtime": "2026-09-01T19:52:47.469Z",
		"size": 144008,
		"path": "../public/assets/dillkash-logo-horizontal-CB6wnloB.png"
	},
	"/assets/dillkash-logo-icon-j89f-8IK.png": {
		"type": "image/png",
		"etag": "\"481de-rS+MQ91GwiAHp3tD+ynJzEslCag\"",
		"mtime": "2026-09-01T19:52:47.471Z",
		"size": 295390,
		"path": "../public/assets/dillkash-logo-icon-j89f-8IK.png"
	},
	"/assets/GalleryUploader-B61JsjI3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3015-kL3JD/dmOBrWJoXsHZIEwtETU7k\"",
		"mtime": "2026-09-01T19:52:47.418Z",
		"size": 12309,
		"path": "../public/assets/GalleryUploader-B61JsjI3.js"
	},
	"/assets/hand-platter-Bhd8yAFm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-WSMtE7/heg64yJ2MVmhf81sEQzs\"",
		"mtime": "2026-09-01T19:52:47.435Z",
		"size": 703,
		"path": "../public/assets/hand-platter-Bhd8yAFm.js"
	},
	"/assets/heart-handshake-BGfnd9lt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c6-BQBleOqJUOXXJ/Ol2/qtpTcEq/c\"",
		"mtime": "2026-09-01T19:52:47.437Z",
		"size": 710,
		"path": "../public/assets/heart-handshake-BGfnd9lt.js"
	},
	"/assets/hero-kashmir-CHa0yRWs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39-GqjMUZYvjHjqlqQQC2uF/XHTDe4\"",
		"mtime": "2026-09-01T19:52:47.437Z",
		"size": 57,
		"path": "../public/assets/hero-kashmir-CHa0yRWs.js"
	},
	"/assets/images-C4V6c_UG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-ftY7ST8B5ZFH0wZ3VneBZWx/o8Y\"",
		"mtime": "2026-09-01T19:52:47.438Z",
		"size": 359,
		"path": "../public/assets/images-C4V6c_UG.js"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-09-01T19:52:47.438Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/hero-kashmir-DiMhvv-O.jpg": {
		"type": "image/jpeg",
		"etag": "\"67738-rh3sEp5iPpPrjDGJZ+85i26BG7Q\"",
		"mtime": "2026-09-01T19:52:47.472Z",
		"size": 423736,
		"path": "../public/assets/hero-kashmir-DiMhvv-O.jpg"
	},
	"/assets/index-Bk0PCMWk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5108d-+xPWL1X1IbBW6FZzHLfQ3qQetwk\"",
		"mtime": "2026-09-01T19:52:47.415Z",
		"size": 331917,
		"path": "../public/assets/index-Bk0PCMWk.js"
	},
	"/assets/link-B4NTyaEC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb4-xpOV4LbP5OVt+s6cEzMpzaRnLXo\"",
		"mtime": "2026-09-01T19:52:47.440Z",
		"size": 7860,
		"path": "../public/assets/link-B4NTyaEC.js"
	},
	"/assets/loader-circle-DaFRR-IQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85-kMphd5XKE4WThOGE2zfIg0SCN4w\"",
		"mtime": "2026-09-01T19:52:47.440Z",
		"size": 133,
		"path": "../public/assets/loader-circle-DaFRR-IQ.js"
	},
	"/assets/login-Cun5t9i0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"316b-Ty9O/ZqJRFwQxgjgn+17dqKnfDU\"",
		"mtime": "2026-09-01T19:52:47.441Z",
		"size": 12651,
		"path": "../public/assets/login-Cun5t9i0.js"
	},
	"/assets/matchContext-qESg7g4D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-k8oj2CsjfOV0/evjJYp1TZ1TQww\"",
		"mtime": "2026-09-01T19:52:47.441Z",
		"size": 668,
		"path": "../public/assets/matchContext-qESg7g4D.js"
	},
	"/assets/Match-TvrDzFK_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be05-WCWhlUZs2bqzuNzkBFY+uCqa0eo\"",
		"mtime": "2026-09-01T19:52:47.419Z",
		"size": 48645,
		"path": "../public/assets/Match-TvrDzFK_.js"
	},
	"/assets/package-CIetk4L8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"169-JOLd6ztIyRpFdgeiG3V7nS6blHE\"",
		"mtime": "2026-09-01T19:52:47.442Z",
		"size": 361,
		"path": "../public/assets/package-CIetk4L8.js"
	},
	"/assets/PackageForm-Ckzm_UD6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"322f-mv3bEdgITgmckL4t7FEH4YX5qaw\"",
		"mtime": "2026-09-01T19:52:47.419Z",
		"size": 12847,
		"path": "../public/assets/PackageForm-Ckzm_UD6.js"
	},
	"/assets/packages-BGPALiII.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"641-n8KF/kB0MzK5lWI6JGestej1fos\"",
		"mtime": "2026-09-01T19:52:47.443Z",
		"size": 1601,
		"path": "../public/assets/packages-BGPALiII.js"
	},
	"/assets/packages-ClkhMYjy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-Kx34pslIRvS1Wi27MuSAZ4HTUts\"",
		"mtime": "2026-09-01T19:52:47.445Z",
		"size": 154,
		"path": "../public/assets/packages-ClkhMYjy.js"
	},
	"/assets/packages-C_sTuMcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-Kx34pslIRvS1Wi27MuSAZ4HTUts\"",
		"mtime": "2026-09-01T19:52:47.444Z",
		"size": 154,
		"path": "../public/assets/packages-C_sTuMcb.js"
	},
	"/assets/packages.create-CKhbXNcj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29d-7p3iLvF+Fzrdek6M/Ve8CAgZ+/4\"",
		"mtime": "2026-09-01T19:52:47.447Z",
		"size": 669,
		"path": "../public/assets/packages.create-CKhbXNcj.js"
	},
	"/assets/packages.index-BBtzOKQ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1183-arGFL2hoJR4j4P+8ia1FgP+cnJQ\"",
		"mtime": "2026-09-01T19:52:47.448Z",
		"size": 4483,
		"path": "../public/assets/packages.index-BBtzOKQ-.js"
	},
	"/assets/packages.index-IXYWaJWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1389-lTtlhq9p1VGPmyhg+CaY66FSiKg\"",
		"mtime": "2026-09-01T19:52:47.449Z",
		"size": 5001,
		"path": "../public/assets/packages.index-IXYWaJWC.js"
	},
	"/assets/packages._id.edit-CaHwYhpW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ee-U/s3lQUof6GC9Wd9xkm7pwuQMAI\"",
		"mtime": "2026-09-01T19:52:47.446Z",
		"size": 2286,
		"path": "../public/assets/packages._id.edit-CaHwYhpW.js"
	},
	"/assets/packages._slug-B9dYngBX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e0-mvQwjFDpvVU4kmt1n+jIS+Au3gI\"",
		"mtime": "2026-09-01T19:52:47.446Z",
		"size": 10464,
		"path": "../public/assets/packages._slug-B9dYngBX.js"
	},
	"/assets/plus-B_KJu5EE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-rKfQc5kLGFcnX0luBoZ+6jh9slE\"",
		"mtime": "2026-09-01T19:52:47.450Z",
		"size": 142,
		"path": "../public/assets/plus-B_KJu5EE.js"
	},
	"/assets/resolveImage-B8rBYTwV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ba-ih2dSyKUzLG28p+tH8ul3ZKCU0c\"",
		"mtime": "2026-09-01T19:52:47.451Z",
		"size": 1466,
		"path": "../public/assets/resolveImage-B8rBYTwV.js"
	},
	"/assets/Reveal-QiHbdtLo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-4vZnow6vs67CLy2L1piyXWeuOh0\"",
		"mtime": "2026-09-01T19:52:47.420Z",
		"size": 543,
		"path": "../public/assets/Reveal-QiHbdtLo.js"
	},
	"/assets/routes-B-q7wVfa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f7f-8JyK4xyYcxAjUv5zOG2VZc4xN/U\"",
		"mtime": "2026-09-01T19:52:47.452Z",
		"size": 24447,
		"path": "../public/assets/routes-B-q7wVfa.js"
	},
	"/assets/SectionHeader-Brs6pcl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f7-5zZy5Bno56cL0lVpYyEyfwXcD2Y\"",
		"mtime": "2026-09-01T19:52:47.421Z",
		"size": 759,
		"path": "../public/assets/SectionHeader-Brs6pcl4.js"
	},
	"/assets/send-CKzW4d1W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-VaJOiqnRb2yrQnOY2rAUoJEsK8Q\"",
		"mtime": "2026-09-01T19:52:47.453Z",
		"size": 279,
		"path": "../public/assets/send-CKzW4d1W.js"
	},
	"/assets/shield-check-CR9cAHXo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-QPG3hFAmtXTm2BHF7sWZcavkRvc\"",
		"mtime": "2026-09-01T19:52:47.454Z",
		"size": 421,
		"path": "../public/assets/shield-check-CR9cAHXo.js"
	},
	"/assets/signup-OuvhLrR6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b4d-h58MTUyvP/8CuO0ETLyaV3JrT30\"",
		"mtime": "2026-09-01T19:52:47.454Z",
		"size": 6989,
		"path": "../public/assets/signup-OuvhLrR6.js"
	},
	"/assets/star-CY2zoR3_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd-2tFlYVooT9w0ntgYU6WD7ck0qa0\"",
		"mtime": "2026-09-01T19:52:47.455Z",
		"size": 461,
		"path": "../public/assets/star-CY2zoR3_.js"
	},
	"/assets/TourCard-DVVfmmKe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1721-AJrZIBxYZXmRUqN6pbPbhcRqunI\"",
		"mtime": "2026-09-01T19:52:47.421Z",
		"size": 5921,
		"path": "../public/assets/TourCard-DVVfmmKe.js"
	},
	"/assets/trash-2-wJrNl0t7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-WDkx1G5GH0XZpDgXjCiIeZrWEXM\"",
		"mtime": "2026-09-01T19:52:47.456Z",
		"size": 317,
		"path": "../public/assets/trash-2-wJrNl0t7.js"
	},
	"/assets/styles-CbLpxL0M.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1c370-GnKZqy39O08BqllnHj7+Idmr09Y\"",
		"mtime": "2026-09-01T19:52:47.473Z",
		"size": 115568,
		"path": "../public/assets/styles-CbLpxL0M.css"
	},
	"/assets/user-plus-BgDiz2fs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12b-kbwgiVHxidBJjJ4huVlzqLHzuHw\"",
		"mtime": "2026-09-01T19:52:47.458Z",
		"size": 299,
		"path": "../public/assets/user-plus-BgDiz2fs.js"
	},
	"/assets/useRouter-CwjitLz4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-RAU16egCj2YoU17v/JNQx0lTbng\"",
		"mtime": "2026-09-01T19:52:47.456Z",
		"size": 151,
		"path": "../public/assets/useRouter-CwjitLz4.js"
	},
	"/assets/users-CCYG9hTv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-3cC+Rt0MZLRIgVwRvRmpl9wcJD8\"",
		"mtime": "2026-09-01T19:52:47.458Z",
		"size": 295,
		"path": "../public/assets/users-CCYG9hTv.js"
	},
	"/assets/useStore-_X7btxmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a98-EK+rilZG0ukcJBqm5SzmvVflKvU\"",
		"mtime": "2026-09-01T19:52:47.457Z",
		"size": 19096,
		"path": "../public/assets/useStore-_X7btxmK.js"
	},
	"/assets/video-thumb-lFQyWBTB.jpg": {
		"type": "image/jpeg",
		"etag": "\"28be2-kNH949XYgoc0r97B3xH5Lz5UoYo\"",
		"mtime": "2026-09-01T19:52:47.474Z",
		"size": 166882,
		"path": "../public/assets/video-thumb-lFQyWBTB.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_Vr5Gav = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_Vr5Gav
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
