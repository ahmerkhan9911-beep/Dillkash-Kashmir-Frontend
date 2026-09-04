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
	"/favicon-192.png": {
		"type": "image/png",
		"etag": "\"a9d7-ZBDrfcfwejEhKsfjpqGuX4LfCUw\"",
		"mtime": "2026-08-26T06:38:06.891Z",
		"size": 43479,
		"path": "../public/favicon-192.png"
	},
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
	"/assets/about-HGTm5vX4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26ab-mCg8hjc8FsULYE2ptONsLNY1X4c\"",
		"mtime": "2026-09-04T05:49:52.449Z",
		"size": 9899,
		"path": "../public/assets/about-HGTm5vX4.js"
	},
	"/assets/admin-aSwEfSEe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"800-fOgdviDlLJaNn1JR/HGr0n3IvIU\"",
		"mtime": "2026-09-04T05:49:52.452Z",
		"size": 2048,
		"path": "../public/assets/admin-aSwEfSEe.js"
	},
	"/assets/admin-BS7aEM8d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d9-Q9ULr/aW+sk4OmowCbn3BZZhzkA\"",
		"mtime": "2026-09-04T05:49:52.450Z",
		"size": 5337,
		"path": "../public/assets/admin-BS7aEM8d.js"
	},
	"/assets/api-yz6JsV8R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"607-HfFguiFmMkk/Xq/Jpf+A9Q3YcQU\"",
		"mtime": "2026-09-04T05:49:52.454Z",
		"size": 1543,
		"path": "../public/assets/api-yz6JsV8R.js"
	},
	"/assets/BookingModal-BsaJ180K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc0-bRtsiElWf/2GNyQVfSu30/eWnnE\"",
		"mtime": "2026-09-04T05:49:52.440Z",
		"size": 7360,
		"path": "../public/assets/BookingModal-BsaJ180K.js"
	},
	"/assets/bus-DM0MQ-91.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-miTvfSwxNp32+Dk8lAd+g/VHY+A\"",
		"mtime": "2026-09-04T05:49:52.455Z",
		"size": 441,
		"path": "../public/assets/bus-DM0MQ-91.js"
	},
	"/assets/car-CzSzJx5P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-+PI7yjC8aHVfq/JElCbgPlEG0rg\"",
		"mtime": "2026-09-04T05:49:52.456Z",
		"size": 396,
		"path": "../public/assets/car-CzSzJx5P.js"
	},
	"/assets/check-BLW0KBBR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-lHz4jFj0S7MYYpLO7fLwePxDZNw\"",
		"mtime": "2026-09-04T05:49:52.456Z",
		"size": 113,
		"path": "../public/assets/check-BLW0KBBR.js"
	},
	"/assets/chevron-down-DoqNuhA5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-uNKicPpLtesy/yOF/GzjRzlQjpo\"",
		"mtime": "2026-09-04T05:49:52.457Z",
		"size": 117,
		"path": "../public/assets/chevron-down-DoqNuhA5.js"
	},
	"/assets/chevron-left-B_x1dXD4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-2nypbKM2M3nm67X7ECRayXRF1AM\"",
		"mtime": "2026-09-04T05:49:52.459Z",
		"size": 119,
		"path": "../public/assets/chevron-left-B_x1dXD4.js"
	},
	"/assets/chevron-right-sZPuW3NH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-FiyO2dqZdJFqgRlFld/j1Ug+3Xg\"",
		"mtime": "2026-09-04T05:49:52.459Z",
		"size": 119,
		"path": "../public/assets/chevron-right-sZPuW3NH.js"
	},
	"/assets/circle-alert-H8_aAFOR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-9D63gttYObn6odjeq//WFpreLfo\"",
		"mtime": "2026-09-04T05:49:52.460Z",
		"size": 239,
		"path": "../public/assets/circle-alert-H8_aAFOR.js"
	},
	"/assets/contact-EMkT2z0F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b16-vHzkx+51GyCwXlcb1IJJJ+SYqOc\"",
		"mtime": "2026-09-04T05:49:52.461Z",
		"size": 6934,
		"path": "../public/assets/contact-EMkT2z0F.js"
	},
	"/assets/custom-tour-BovZLJX0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21bb-g7l3rk3CpddrhOwqQIKuJ7BmDWg\"",
		"mtime": "2026-09-04T05:49:52.462Z",
		"size": 8635,
		"path": "../public/assets/custom-tour-BovZLJX0.js"
	},
	"/assets/DeleteConfirmDialog-2PsZ8c_K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bd-Kd/g7Utw8kXzBED5kL0b1pgJa4A\"",
		"mtime": "2026-09-04T05:49:52.441Z",
		"size": 1725,
		"path": "../public/assets/DeleteConfirmDialog-2PsZ8c_K.js"
	},
	"/assets/dest-arang-kel-DKOwxMgm.jpg": {
		"type": "image/jpeg",
		"etag": "\"3f5e5-7wX6QoRpx4USmT0yrkT28kD+Jhg\"",
		"mtime": "2026-09-04T05:49:52.589Z",
		"size": 259557,
		"path": "../public/assets/dest-arang-kel-DKOwxMgm.jpg"
	},
	"/assets/dest-keran-Cg9dWLsQ.jpg": {
		"type": "image/jpeg",
		"etag": "\"36d44-M/fEeEBK28mQY3N9tsGRNQPC6Ac\"",
		"mtime": "2026-09-04T05:49:52.591Z",
		"size": 224580,
		"path": "../public/assets/dest-keran-Cg9dWLsQ.jpg"
	},
	"/assets/dest-dhani-D6SIqGnJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"479a3-wQz1jyE2hnIQnWxJ5FesB90tgas\"",
		"mtime": "2026-09-04T05:49:52.590Z",
		"size": 293283,
		"path": "../public/assets/dest-dhani-D6SIqGnJ.jpg"
	},
	"/assets/dest-muzaffarabad-BbIG2K_S.jpg": {
		"type": "image/jpeg",
		"etag": "\"2481c-fyxHV81TdgpvcHA3hqlfRF9LNRs\"",
		"mtime": "2026-09-04T05:49:52.593Z",
		"size": 149532,
		"path": "../public/assets/dest-muzaffarabad-BbIG2K_S.jpg"
	},
	"/assets/dest-kutton-DeCd3YNa.jpg": {
		"type": "image/jpeg",
		"etag": "\"35f8b-juHuOtmlREoHgshmx/77jnW1fZg\"",
		"mtime": "2026-09-04T05:49:52.592Z",
		"size": 221067,
		"path": "../public/assets/dest-kutton-DeCd3YNa.jpg"
	},
	"/assets/dest-muzaffarabad-DGAajrm-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-GN4SdisvgtEFL9KJWtexFtOzX40\"",
		"mtime": "2026-09-04T05:49:52.463Z",
		"size": 465,
		"path": "../public/assets/dest-muzaffarabad-DGAajrm-.js"
	},
	"/assets/dest-neelum-river-CioHRbMZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"310a9-7qTWNfcv8AEpdHKImTZbxO2nJWw\"",
		"mtime": "2026-09-04T05:49:52.594Z",
		"size": 200873,
		"path": "../public/assets/dest-neelum-river-CioHRbMZ.jpg"
	},
	"/assets/dest-pir-chinasi-DlIC9x-y.jpg": {
		"type": "image/jpeg",
		"etag": "\"18471-DQGkhE1dQQQ6QMcxrK+HVszTiIA\"",
		"mtime": "2026-09-04T05:49:52.599Z",
		"size": 99441,
		"path": "../public/assets/dest-pir-chinasi-DlIC9x-y.jpg"
	},
	"/assets/dest-ratti-gali-BQtFxHhA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c-WKDooGuoebENogk5MYkvvu3Gd+0\"",
		"mtime": "2026-09-04T05:49:52.464Z",
		"size": 60,
		"path": "../public/assets/dest-ratti-gali-BQtFxHhA.js"
	},
	"/assets/dest-ratti-gali-BXSOR1Xp.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fb64-oc2gNLKTqv9J8F8Qq4+e8c5UDjY\"",
		"mtime": "2026-09-04T05:49:52.603Z",
		"size": 129892,
		"path": "../public/assets/dest-ratti-gali-BXSOR1Xp.jpg"
	},
	"/assets/dest-taobat-D4gvPTvC.jpg": {
		"type": "image/jpeg",
		"etag": "\"30fbc-7XVpAhbLR+ew28Ba05OJJPO/cQo\"",
		"mtime": "2026-09-04T05:49:52.606Z",
		"size": 200636,
		"path": "../public/assets/dest-taobat-D4gvPTvC.jpg"
	},
	"/assets/dest-sharda-Dl-TR9Wb.jpg": {
		"type": "image/jpeg",
		"etag": "\"3758f-HA/YNjrkJzo2GosttE6yyNpSH8Y\"",
		"mtime": "2026-09-04T05:49:52.605Z",
		"size": 226703,
		"path": "../public/assets/dest-sharda-Dl-TR9Wb.jpg"
	},
	"/assets/DestinationForm-Cktm3CPW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11f6-Vj/V9K1wgHHsVvmCuN5R8a+Nx84\"",
		"mtime": "2026-09-04T05:49:52.442Z",
		"size": 4598,
		"path": "../public/assets/DestinationForm-Cktm3CPW.js"
	},
	"/assets/destinations-Cvtj96Eb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"348-Qs3p45bOnOUt0YNNkIicZysLoGs\"",
		"mtime": "2026-09-04T05:49:52.465Z",
		"size": 840,
		"path": "../public/assets/destinations-Cvtj96Eb.js"
	},
	"/assets/destinations.create-Ebrj6bO3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-W/pZbMCjQVQ51c53KdcKuNuTDsI\"",
		"mtime": "2026-09-04T05:49:52.474Z",
		"size": 703,
		"path": "../public/assets/destinations.create-Ebrj6bO3.js"
	},
	"/assets/destinations.index-RHaZUYrv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11bd-Bzt69EuEI671+Q1g74a/pko3KPY\"",
		"mtime": "2026-09-04T05:49:52.476Z",
		"size": 4541,
		"path": "../public/assets/destinations.index-RHaZUYrv.js"
	},
	"/assets/destinations._id.edit-B4V-gVl7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65d-vEisRJgYPv0wnOiIJz1+kQo+Eo4\"",
		"mtime": "2026-09-04T05:49:52.473Z",
		"size": 1629,
		"path": "../public/assets/destinations._id.edit-B4V-gVl7.js"
	},
	"/assets/dillkash-logo-horizontal-CB6wnloB.png": {
		"type": "image/png",
		"etag": "\"23288-fj6DPwllRcKtadb6wSJNANYq/0Q\"",
		"mtime": "2026-09-04T05:49:52.607Z",
		"size": 144008,
		"path": "../public/assets/dillkash-logo-horizontal-CB6wnloB.png"
	},
	"/assets/eye-BZpmolsV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f5-ETYD15HnmZNDRyaq+/symo/nb5I\"",
		"mtime": "2026-09-04T05:49:52.477Z",
		"size": 245,
		"path": "../public/assets/eye-BZpmolsV.js"
	},
	"/assets/eye-off-DNxJnpnW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-ZTyGmhTqie/dHLRfzS2bXth0gKA\"",
		"mtime": "2026-09-04T05:49:52.478Z",
		"size": 419,
		"path": "../public/assets/eye-off-DNxJnpnW.js"
	},
	"/assets/GalleryUploader-kh-Ta_q1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170f-RR+Cs1XQGlNZjVOqhPNOgetA0Y8\"",
		"mtime": "2026-09-04T05:49:52.442Z",
		"size": 5903,
		"path": "../public/assets/GalleryUploader-kh-Ta_q1.js"
	},
	"/assets/dillkash-logo-icon-j89f-8IK.png": {
		"type": "image/png",
		"etag": "\"481de-rS+MQ91GwiAHp3tD+ynJzEslCag\"",
		"mtime": "2026-09-04T05:49:52.609Z",
		"size": 295390,
		"path": "../public/assets/dillkash-logo-icon-j89f-8IK.png"
	},
	"/assets/guides-CxYrB9ML.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"432-3iE9mOwqXga+B/6CdMMCM/2SezI\"",
		"mtime": "2026-09-04T05:49:52.478Z",
		"size": 1074,
		"path": "../public/assets/guides-CxYrB9ML.js"
	},
	"/assets/guides.index-CEGPA-Lc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2763-ATHyJ14iyQPe1KnWDCk/3SHhX4w\"",
		"mtime": "2026-09-04T05:49:52.479Z",
		"size": 10083,
		"path": "../public/assets/guides.index-CEGPA-Lc.js"
	},
	"/assets/hand-platter-CwdL3Ths.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-cedl2GCuHC5zRgi6IYdFb7SKNQ8\"",
		"mtime": "2026-09-04T05:49:52.497Z",
		"size": 703,
		"path": "../public/assets/hand-platter-CwdL3Ths.js"
	},
	"/assets/heart-handshake-Hdi_awE0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c6-veWdFbPQvnExgb5JQwumU+hli2E\"",
		"mtime": "2026-09-04T05:49:52.498Z",
		"size": 710,
		"path": "../public/assets/heart-handshake-Hdi_awE0.js"
	},
	"/assets/hero-kashmir-CpvkCpfn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39-BhqCUo9/Wf6xy90I0Oclcv9PtiU\"",
		"mtime": "2026-09-04T05:49:52.498Z",
		"size": 57,
		"path": "../public/assets/hero-kashmir-CpvkCpfn.js"
	},
	"/assets/guide-ali-raza-C755ZYyQ.jpg": {
		"type": "image/jpeg",
		"etag": "\"bbc4a-+Rq8fZ23aHG1JKWzXKVbhq3EmwA\"",
		"mtime": "2026-09-04T05:49:52.611Z",
		"size": 769098,
		"path": "../public/assets/guide-ali-raza-C755ZYyQ.jpg"
	},
	"/assets/guide-fatima-noor-Cx_6upyb.jpg": {
		"type": "image/jpeg",
		"etag": "\"cb2f3-zFG1fxMxqbbughsHaSlfhDL+h6A\"",
		"mtime": "2026-09-04T05:49:52.612Z",
		"size": 832243,
		"path": "../public/assets/guide-fatima-noor-Cx_6upyb.jpg"
	},
	"/assets/guide-hassan-malik-BbHdTmO6.jpg": {
		"type": "image/jpeg",
		"etag": "\"bd89f-c3dxVZNlDIFB7nHrnvMsL9CDHSc\"",
		"mtime": "2026-09-04T05:49:52.614Z",
		"size": 776351,
		"path": "../public/assets/guide-hassan-malik-BbHdTmO6.jpg"
	},
	"/assets/hotel-C-bRo5IA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ef-iz9/uR9FOAxfkB2TaRxlgJ4GlXk\"",
		"mtime": "2026-09-04T05:49:52.499Z",
		"size": 495,
		"path": "../public/assets/hotel-C-bRo5IA.js"
	},
	"/assets/HotelForm-V4b8LR-P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d4-AQybAMjaqA7uAw/IHLnyeuZbDuA\"",
		"mtime": "2026-09-04T05:49:52.443Z",
		"size": 6356,
		"path": "../public/assets/HotelForm-V4b8LR-P.js"
	},
	"/assets/hotels-B9KaqiGn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"715-NagXTeKKRJKNSK/1MaI4Uyqk13A\"",
		"mtime": "2026-09-04T05:49:52.499Z",
		"size": 1813,
		"path": "../public/assets/hotels-B9KaqiGn.js"
	},
	"/assets/hotels-BRdeEfto.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-9jwLCJBLtnBMQWBwQ46tzfPafrI\"",
		"mtime": "2026-09-04T05:49:52.527Z",
		"size": 253,
		"path": "../public/assets/hotels-BRdeEfto.js"
	},
	"/assets/hotels-CoQY4y9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41d3-4MU5CpZakGj1EEXyh+aE2ZaFLzc\"",
		"mtime": "2026-09-04T05:49:52.548Z",
		"size": 16851,
		"path": "../public/assets/hotels-CoQY4y9w.js"
	},
	"/assets/hotels-C_sTuMcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-Kx34pslIRvS1Wi27MuSAZ4HTUts\"",
		"mtime": "2026-09-04T05:49:52.529Z",
		"size": 154,
		"path": "../public/assets/hotels-C_sTuMcb.js"
	},
	"/assets/hotels.index-BOKD4Fo-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a39-xildoU+8jZ+Q47mb5asRNwMUK5o\"",
		"mtime": "2026-09-04T05:49:52.552Z",
		"size": 6713,
		"path": "../public/assets/hotels.index-BOKD4Fo-.js"
	},
	"/assets/hotels.create-6S-pUVIW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a6-cPu3rNmzg9xOCwfAtWiHFLFYlNk\"",
		"mtime": "2026-09-04T05:49:52.551Z",
		"size": 678,
		"path": "../public/assets/hotels.create-6S-pUVIW.js"
	},
	"/assets/hotels._id.edit-MO5_EvBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c5-AuIYESRjokWMISeG+vKb/7bfexc\"",
		"mtime": "2026-09-04T05:49:52.549Z",
		"size": 1733,
		"path": "../public/assets/hotels._id.edit-MO5_EvBM.js"
	},
	"/assets/images-CCqRI3wg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-QtJTqFBIGhi6KEmybos85/IlEBg\"",
		"mtime": "2026-09-04T05:49:52.553Z",
		"size": 359,
		"path": "../public/assets/images-CCqRI3wg.js"
	},
	"/assets/ImageUploader-PsI2ZR1a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1901-adX920y0OO7PXyrRJshuWJ7IED8\"",
		"mtime": "2026-09-04T05:49:52.444Z",
		"size": 6401,
		"path": "../public/assets/ImageUploader-PsI2ZR1a.js"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-09-04T05:49:52.554Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/link-B4NTyaEC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb4-xpOV4LbP5OVt+s6cEzMpzaRnLXo\"",
		"mtime": "2026-09-04T05:49:52.555Z",
		"size": 7860,
		"path": "../public/assets/link-B4NTyaEC.js"
	},
	"/assets/loader-circle--uvfAiO0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85-WIzdGfj94PzaBFGLymUMCLTzUtA\"",
		"mtime": "2026-09-04T05:49:52.555Z",
		"size": 133,
		"path": "../public/assets/loader-circle--uvfAiO0.js"
	},
	"/assets/login-Dn5tyalM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32a4-1EYwMcuvnbxA6pZGRa4cEJcl5IY\"",
		"mtime": "2026-09-04T05:49:52.556Z",
		"size": 12964,
		"path": "../public/assets/login-Dn5tyalM.js"
	},
	"/assets/Match-TvrDzFK_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be05-WCWhlUZs2bqzuNzkBFY+uCqa0eo\"",
		"mtime": "2026-09-04T05:49:52.445Z",
		"size": 48645,
		"path": "../public/assets/Match-TvrDzFK_.js"
	},
	"/assets/matchContext-qESg7g4D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-k8oj2CsjfOV0/evjJYp1TZ1TQww\"",
		"mtime": "2026-09-04T05:49:52.557Z",
		"size": 668,
		"path": "../public/assets/matchContext-qESg7g4D.js"
	},
	"/assets/message-circle-tHPUh_VW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-AiEzQ1WVVqfaR/HXrMs0ZvStQMo\"",
		"mtime": "2026-09-04T05:49:52.557Z",
		"size": 230,
		"path": "../public/assets/message-circle-tHPUh_VW.js"
	},
	"/assets/index-BxHQjmkF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51c92-t5yzZX79+SvC7eJfNp8iGESrSTY\"",
		"mtime": "2026-09-04T05:49:52.439Z",
		"size": 334994,
		"path": "../public/assets/index-BxHQjmkF.js"
	},
	"/assets/package-B48Vipiq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"169-jcjJAQIZF4nSyK+nC/Wr26SCYlY\"",
		"mtime": "2026-09-04T05:49:52.558Z",
		"size": 361,
		"path": "../public/assets/package-B48Vipiq.js"
	},
	"/assets/PackageForm-CYxOvu25.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"327a-rSIKwuePDM6msorW54rFYrc89vI\"",
		"mtime": "2026-09-04T05:49:52.445Z",
		"size": 12922,
		"path": "../public/assets/PackageForm-CYxOvu25.js"
	},
	"/assets/packages-BUKzABEi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"641-p9xxAGqBYkZ1gxDEXaVkgGzLoQo\"",
		"mtime": "2026-09-04T05:49:52.559Z",
		"size": 1601,
		"path": "../public/assets/packages-BUKzABEi.js"
	},
	"/assets/packages-ClkhMYjy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-Kx34pslIRvS1Wi27MuSAZ4HTUts\"",
		"mtime": "2026-09-04T05:49:52.560Z",
		"size": 154,
		"path": "../public/assets/packages-ClkhMYjy.js"
	},
	"/assets/packages-C_sTuMcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-Kx34pslIRvS1Wi27MuSAZ4HTUts\"",
		"mtime": "2026-09-04T05:49:52.559Z",
		"size": 154,
		"path": "../public/assets/packages-C_sTuMcb.js"
	},
	"/assets/hero-kashmir-D97SDFp7.jpg": {
		"type": "image/jpeg",
		"etag": "\"11a715-rEn6Ky+ePrPYFXbg4jkErC1MHLw\"",
		"mtime": "2026-09-04T05:49:52.616Z",
		"size": 1156885,
		"path": "../public/assets/hero-kashmir-D97SDFp7.jpg"
	},
	"/assets/packages.create-CSE6T9uq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29d-syCcfX2ZLcSsJCPQ5rxcx7KNW/c\"",
		"mtime": "2026-09-04T05:49:52.562Z",
		"size": 669,
		"path": "../public/assets/packages.create-CSE6T9uq.js"
	},
	"/assets/packages.index-BosID2UI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a1-kCX7j90aMcTF2zegN6SnNpyx1tc\"",
		"mtime": "2026-09-04T05:49:52.563Z",
		"size": 4513,
		"path": "../public/assets/packages.index-BosID2UI.js"
	},
	"/assets/packages.index-E8OauyDs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1252-/FQQ7JibpoXY5a30A9PHhnGDUDA\"",
		"mtime": "2026-09-04T05:49:52.573Z",
		"size": 4690,
		"path": "../public/assets/packages.index-E8OauyDs.js"
	},
	"/assets/packages._id.edit-D0TkqE5Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ee-dhFnw+cu1KsHT6aTaHN62GpEjYM\"",
		"mtime": "2026-09-04T05:49:52.561Z",
		"size": 2286,
		"path": "../public/assets/packages._id.edit-D0TkqE5Q.js"
	},
	"/assets/packages._slug-DlVU6iDC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28c9-0PaQnUZOd1f+uIFOGVNspoyfob8\"",
		"mtime": "2026-09-04T05:49:52.561Z",
		"size": 10441,
		"path": "../public/assets/packages._slug-DlVU6iDC.js"
	},
	"/assets/plus-DLmmRPST.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-vclJLF7yqsoE1o3x0lYq8NrAbyE\"",
		"mtime": "2026-09-04T05:49:52.575Z",
		"size": 142,
		"path": "../public/assets/plus-DLmmRPST.js"
	},
	"/assets/resolveImage-aMgP2Q9M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"691-fEnW4BaKPk77j1L70PFZX5K/nHM\"",
		"mtime": "2026-09-04T05:49:52.575Z",
		"size": 1681,
		"path": "../public/assets/resolveImage-aMgP2Q9M.js"
	},
	"/assets/Reveal-CmCfgld8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-reAw65PCrpcJhEY5njxXFg6Gmyo\"",
		"mtime": "2026-09-04T05:49:52.446Z",
		"size": 543,
		"path": "../public/assets/Reveal-CmCfgld8.js"
	},
	"/assets/routes-C471G_4v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f64-G5K4W++wSpv5tvJmuSq6Qcht87c\"",
		"mtime": "2026-09-04T05:49:52.576Z",
		"size": 24420,
		"path": "../public/assets/routes-C471G_4v.js"
	},
	"/assets/search-DUmuUxoA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-a/pbRPGCOWSioBps+ZRtWQtZkfI\"",
		"mtime": "2026-09-04T05:49:52.577Z",
		"size": 163,
		"path": "../public/assets/search-DUmuUxoA.js"
	},
	"/assets/SectionHeader-DKrsjMdp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f7-qGeyfA9BarkI7a+ukXZ7n6p6oww\"",
		"mtime": "2026-09-04T05:49:52.448Z",
		"size": 759,
		"path": "../public/assets/SectionHeader-DKrsjMdp.js"
	},
	"/assets/send-DuN6kfk2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-Bx9+Mozj40efjOLUFnb87g4ZiZw\"",
		"mtime": "2026-09-04T05:49:52.577Z",
		"size": 279,
		"path": "../public/assets/send-DuN6kfk2.js"
	},
	"/assets/shield-check-CLR9yBb3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-R+MkYsOLppNalbcYOipYpsfp09s\"",
		"mtime": "2026-09-04T05:49:52.578Z",
		"size": 421,
		"path": "../public/assets/shield-check-CLR9yBb3.js"
	},
	"/assets/signup-d0p8zCaY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b70-h55HKmeAU5RbKrfUfURB92sTfIM\"",
		"mtime": "2026-09-04T05:49:52.579Z",
		"size": 7024,
		"path": "../public/assets/signup-d0p8zCaY.js"
	},
	"/assets/sliders-horizontal-PK_6k5yY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-eCak4/sfchaSVHiFY0BG9CKQa5M\"",
		"mtime": "2026-09-04T05:49:52.579Z",
		"size": 413,
		"path": "../public/assets/sliders-horizontal-PK_6k5yY.js"
	},
	"/assets/star-DN8-IzrE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd-EH0Uj2Z8p68T1rw45XV7pW4FJnA\"",
		"mtime": "2026-09-04T05:49:52.580Z",
		"size": 461,
		"path": "../public/assets/star-DN8-IzrE.js"
	},
	"/assets/styles--5p5zPQQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1e312-bIMTUwOb1Q11h5A3KoVB+KausP8\"",
		"mtime": "2026-09-04T05:49:52.623Z",
		"size": 123666,
		"path": "../public/assets/styles--5p5zPQQ.css"
	},
	"/assets/TourCard-ByLP9-yZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1702-2UdgTkWQ5AMbg+agv57gQwASzXE\"",
		"mtime": "2026-09-04T05:49:52.448Z",
		"size": 5890,
		"path": "../public/assets/TourCard-ByLP9-yZ.js"
	},
	"/assets/trash-2-C1_o8cOq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-xtFXwD9MAGhOcxx20lF4ndDGRAE\"",
		"mtime": "2026-09-04T05:49:52.581Z",
		"size": 317,
		"path": "../public/assets/trash-2-C1_o8cOq.js"
	},
	"/assets/upload-C47cxqHm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-lo8c4KtcujA4vS1sCDFP8x+tHLQ\"",
		"mtime": "2026-09-04T05:49:52.581Z",
		"size": 219,
		"path": "../public/assets/upload-C47cxqHm.js"
	},
	"/assets/user-check-Dqe_k2Tv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-uE6GE7/2A5AI12POK3ZWSwqigrM\"",
		"mtime": "2026-09-04T05:49:52.584Z",
		"size": 232,
		"path": "../public/assets/user-check-Dqe_k2Tv.js"
	},
	"/assets/user-plus-CRDxpC4h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12b-vcVl+CHn6gacjJ+OdfOdRRz5XuY\"",
		"mtime": "2026-09-04T05:49:52.587Z",
		"size": 299,
		"path": "../public/assets/user-plus-CRDxpC4h.js"
	},
	"/assets/useRouter-CwjitLz4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-RAU16egCj2YoU17v/JNQx0lTbng\"",
		"mtime": "2026-09-04T05:49:52.582Z",
		"size": 151,
		"path": "../public/assets/useRouter-CwjitLz4.js"
	},
	"/assets/users-BYFCDNHw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-bGZGvB3AAF4Q0+e5nTCQo3O82JQ\"",
		"mtime": "2026-09-04T05:49:52.588Z",
		"size": 295,
		"path": "../public/assets/users-BYFCDNHw.js"
	},
	"/assets/useStore-_X7btxmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a98-EK+rilZG0ukcJBqm5SzmvVflKvU\"",
		"mtime": "2026-09-04T05:49:52.583Z",
		"size": 19096,
		"path": "../public/assets/useStore-_X7btxmK.js"
	},
	"/assets/video-thumb-lFQyWBTB.jpg": {
		"type": "image/jpeg",
		"etag": "\"28be2-kNH949XYgoc0r97B3xH5Lz5UoYo\"",
		"mtime": "2026-09-04T05:49:52.624Z",
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
