import heroKashmir from "@/assets/hero-kashmir.jpg";
import videoThumb from "@/assets/video-thumb.jpg";
import arangKel from "@/assets/dest-arang-kel.jpg";
import neelumRiver from "@/assets/dest-neelum-river.jpg";
import sharda from "@/assets/dest-sharda.jpg";
import rattiGali from "@/assets/dest-ratti-gali.jpg";
import taobat from "@/assets/dest-taobat.jpg";
import pirChinasi from "@/assets/dest-pir-chinasi.jpg";
import kutton from "@/assets/dest-kutton.jpg";
import dhani from "@/assets/dest-dhani.jpg";
import keran from "@/assets/dest-keran.jpg";
import muzaffarabad from "@/assets/dest-muzaffarabad.jpg";

export const site = {
  name: "DillKash Kashmir",
  tagline: "Experience Majestic Kashmir — Tours Departing Weekly from Lahore!",
  phone: "+92 300 1234567",
  phoneHref: "tel:+923001234567",
  whatsapp: "923001234567",
  whatsappMessage:
    "Hi DillKash Kashmir, I want details regarding Kashmir Tour departing from Lahore.",
  email: "info@dillkashkashmir.com",
  address: "Main Boulevard, Johar Town, Lahore, Pakistan",
  hours: "Mon – Sun: 9:00 AM – 10:00 PM",
};

export const whatsappLink = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const images = {
  heroKashmir,
  videoThumb,
  arangKel,
  neelumRiver,
  sharda,
  rattiGali,
  taobat,
  pirChinasi,
  kutton,
  dhani,
  keran,
  muzaffarabad,
};

export interface ItineraryDay {
  day: number;
  title: string;
  details: string[];
}

export interface Tour {
  slug: string;
  title: string;
  short: string;
  durationDays: number;
  type: ("Family" | "Couples" | "Honeymoon" | "Corporate" | "Group" | "Budget")[];
  price: number;
  rating: number;
  reviews: number;
  image: string;
  destinations: string[];
  featured: boolean;
  nextDeparture: string;
  transport: string;
  accommodation: string;
  meals: string;
  included: string[];
  notIncluded: string[];
  itinerary: ItineraryDay[];
  gallery: string[];
}

export const pickupPoints = [
  {
    name: "Thokar Niaz Baig",
    detail: "Main pickup — motorway entry point, parking available",
    time: "10:30 PM",
  },
  {
    name: "Kalma Chowk",
    detail: "Central Lahore pickup — easy access from Gulberg & Model Town",
    time: "9:45 PM",
  },
  {
    name: "Lahore Ring Road",
    detail: "Convenient stop for DHA, Cantt & Airport-side travelers",
    time: "10:00 PM",
  },
];

export const tours: Tour[] = [
  {
    slug: "neelum-keran-3-days",
    title: "3-Day Express Neelum Valley & Keran Tour",
    short: "Ideal for quick weekend trips from Lahore.",
    durationDays: 3,
    type: ["Family", "Couples", "Budget"],
    price: 14500,
    rating: 4.8,
    reviews: 212,
    image: keran,
    destinations: ["Muzaffarabad", "Neelum Valley", "Keran"],
    featured: true,
    nextDeparture: "Fri, 28 Aug 2026",
    transport: "AC Saloon Coaster from Lahore",
    accommodation: "2 nights — riverside hotel in Keran",
    meals: "2 breakfasts + 2 dinners",
    included: [
      "AC Saloon Coaster transport from Lahore & back",
      "2 nights hotel stay in Keran",
      "Daily breakfast & dinner",
      "Professional tour manager",
      "Neelum River sightseeing stops",
      "All tolls, taxes & fuel",
    ],
    notIncluded: [
      "Lunch & personal snacks",
      "Jeep rides (optional)",
      "Boating / rafting tickets",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Departure from Lahore",
        details: [
          "Evening pickup from Thokar Niaz Baig / Kalma Chowk",
          "Overnight comfortable journey via motorway & Hazara Expressway",
          "Early morning arrival in Muzaffarabad",
          "Breakfast stop & transfer to Neelum Valley",
          "Hotel check-in at Keran by afternoon, evening by the Neelum River",
        ],
      },
      {
        day: 2,
        title: "Keran & Local Sightseeing",
        details: [
          "Riverside breakfast with mountain views",
          "Keran local sightseeing & Upper Neelum viewpoint",
          "Walk along the Neelum River banks",
          "Bonfire & BBQ dinner at the hotel (weather permitting)",
        ],
      },
      {
        day: 3,
        title: "Return Journey to Lahore",
        details: [
          "Early breakfast & hotel checkout",
          "Photo stop at Dhani Waterfall viewpoint",
          "Departure for Lahore via Muzaffarabad",
          "Late-night arrival in Lahore with lifetime memories",
        ],
      },
    ],
    gallery: [keran, neelumRiver, muzaffarabad, dhani],
  },
  {
    slug: "complete-kashmir-5-days",
    title: "5-Day Complete Kashmir Exploration",
    short: "The full Neelum Valley experience — rivers, waterfalls & Arang Kel.",
    durationDays: 5,
    type: ["Family", "Couples", "Honeymoon", "Group"],
    price: 24500,
    rating: 4.9,
    reviews: 348,
    image: arangKel,
    destinations: ["Muzaffarabad", "Kutton", "Sharda", "Arang Kel", "Keran"],
    featured: true,
    nextDeparture: "Wed, 2 Sep 2026",
    transport: "AC Saloon Coaster + 4x4 jeep to Arang Kel",
    accommodation: "4 nights — Keran, Sharda & Kutton hotels",
    meals: "4 breakfasts + 4 dinners",
    included: [
      "AC Saloon Coaster from Lahore & back",
      "4 nights hotel accommodation",
      "Daily breakfast & dinner",
      "4x4 jeep transfer to Arang Kel base",
      "Kutton Waterfall & Sharda sightseeing",
      "Experienced tour manager throughout",
    ],
    notIncluded: ["Lunch", "Chairlift / rafting tickets", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Lahore to Muzaffarabad",
        details: [
          "Night departure from Lahore pickup points",
          "Morning arrival in Muzaffarabad",
          "Breakfast & short city orientation",
          "Drive into Neelum Valley, night stay at Keran",
        ],
      },
      {
        day: 2,
        title: "Keran to Kutton",
        details: [
          "Breakfast at Keran",
          "Scenic drive to Kutton",
          "Kutton Waterfall visit & photography",
          "Overnight stay at Kutton",
        ],
      },
      {
        day: 3,
        title: "Sharda & Kel",
        details: [
          "Drive to Sharda, visit ancient Sharda ruins",
          "Continue to Kel",
          "4x4 transfer & hike / chairlift to Arang Kel meadows",
          "Evening return, night stay at Sharda",
        ],
      },
      {
        day: 4,
        title: "Upper Neelum Exploration",
        details: [
          "Leisurely morning by the river",
          "Upper Neelum & Dhani Waterfall viewpoint",
          "Local bazaar visit for Kashmiri handicrafts",
          "Farewell dinner & bonfire",
        ],
      },
      {
        day: 5,
        title: "Return to Lahore",
        details: [
          "Breakfast & checkout",
          "Return journey via Muzaffarabad",
          "Late-night drop-off at Lahore pickup points",
        ],
      },
    ],
    gallery: [arangKel, sharda, kutton, neelumRiver],
  },
  {
    slug: "ultimate-adventure-7-days",
    title: "7-Day Ultimate Adventure & Lakes Tour",
    short: "Ratti Gali Lake, Taobat & Baboon Valley — the wild side of AJK.",
    durationDays: 7,
    type: ["Group", "Corporate", "Family"],
    price: 36500,
    rating: 4.9,
    reviews: 187,
    image: rattiGali,
    destinations: ["Ratti Gali Lake", "Taobat", "Baboon Valley", "Sharda"],
    featured: true,
    nextDeparture: "Fri, 4 Sep 2026",
    transport: "Grand Cabin / Coaster + 4x4 Prado & Jeeps",
    accommodation: "6 nights — hotels + 1 night lakeside camping",
    meals: "6 breakfasts + 6 dinners",
    included: [
      "Luxury transport from Lahore & back",
      "6 nights accommodation (incl. Ratti Gali camping)",
      "4x4 jeep adventure to Ratti Gali & Taobat",
      "Daily breakfast & dinner",
      "Professional guide & first aid",
      "Photography support",
    ],
    notIncluded: ["Lunch", "Horse riding at Ratti Gali", "Personal gear", "Tips"],
    itinerary: [
      { day: 1, title: "Lahore to Neelum Valley", details: ["Night departure from Lahore", "Morning arrival, breakfast in Muzaffarabad", "Drive to Keran, riverside evening"] },
      { day: 2, title: "Keran to Sharda", details: ["Breakfast at Keran", "Scenic drive to Sharda", "Sharda ruins & river view point", "Night stay at Sharda"] },
      { day: 3, title: "Ratti Gali Base Camp", details: ["4x4 jeep departure to Ratti Gali base camp", "Trek / horse ride to Ratti Gali Lake", "Lakeside camping under the stars"] },
      { day: 4, title: "Ratti Gali to Kel", details: ["Sunrise at the lake", "Descend to base camp", "Drive to Kel, evening at leisure"] },
      { day: 5, title: "Taobat Expedition", details: ["Full-day 4x4 expedition to Taobat", "The last village of Neelum Valley", "Return to Kel for overnight stay"] },
      { day: 6, title: "Baboon Valley", details: ["Day trip to Baboon Valley meadows", "Picnic lunch & photography", "Farewell dinner at Sharda"] },
      { day: 7, title: "Return to Lahore", details: ["Breakfast & checkout", "Return journey with waterfall photo stops", "Late-night arrival in Lahore"] },
    ],
    gallery: [rattiGali, taobat, videoThumb, sharda],
  },
  {
    slug: "honeymoon-keran-4-days",
    title: "4-Day Kashmir Honeymoon Special",
    short: "Private riverside rooms & romantic evenings in Keran & Sharda.",
    durationDays: 4,
    type: ["Honeymoon", "Couples"],
    price: 29500,
    rating: 4.8,
    reviews: 96,
    image: neelumRiver,
    destinations: ["Keran", "Sharda", "Upper Neelum"],
    featured: false,
    nextDeparture: "Mon, 31 Aug 2026",
    transport: "Private Grand Cabin option available",
    accommodation: "3 nights — premium riverside rooms",
    meals: "3 breakfasts + 3 candle-light dinners",
    included: [
      "Comfortable transport from Lahore & back",
      "3 nights premium private rooms",
      "Candle-light dinner setup",
      "Decorated room on request",
      "Tour manager on call",
    ],
    notIncluded: ["Lunch", "Personal expenses", "Optional jeep rides"],
    itinerary: [
      { day: 1, title: "Lahore to Keran", details: ["Overnight journey from Lahore", "Riverside check-in at Keran", "Private dinner by the Neelum River"] },
      { day: 2, title: "Keran Leisure Day", details: ["Late breakfast", "Upper Neelum viewpoint", "Bonfire evening for two"] },
      { day: 3, title: "Sharda Day Trip", details: ["Scenic drive to Sharda", "Ruins & river photography", "Candle-light dinner"] },
      { day: 4, title: "Return to Lahore", details: ["Breakfast & checkout", "Return journey to Lahore"] },
    ],
    gallery: [neelumRiver, keran, sharda],
  },
  {
    slug: "family-sharda-5-days",
    title: "5-Day Family Sharda & Kutton Retreat",
    short: "Slow-paced, kid-friendly tour with verified family hotels.",
    durationDays: 5,
    type: ["Family", "Budget"],
    price: 21500,
    rating: 4.7,
    reviews: 154,
    image: sharda,
    destinations: ["Kutton", "Sharda", "Keran"],
    featured: false,
    nextDeparture: "Fri, 11 Sep 2026",
    transport: "AC Saloon Coaster from Lahore",
    accommodation: "4 nights — family rooms, verified hotels",
    meals: "4 breakfasts + 4 dinners",
    included: [
      "AC transport from Lahore & back",
      "Separate family rooms",
      "Daily breakfast & dinner",
      "Tour guide & first aid kit",
    ],
    notIncluded: ["Lunch", "Jeep rides", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Lahore to Keran", details: ["Night departure", "Morning arrival & breakfast", "Hotel check-in at Keran"] },
      { day: 2, title: "Kutton Waterfall", details: ["Drive to Kutton", "Waterfall visit & family picnic", "Night stay at Kutton"] },
      { day: 3, title: "Sharda Exploration", details: ["Sharda ruins & bazaar", "Riverside evening", "Night stay at Sharda"] },
      { day: 4, title: "Leisure & Local Culture", details: ["Free morning", "Kashmiri handicraft bazaar", "Farewell dinner"] },
      { day: 5, title: "Return to Lahore", details: ["Breakfast & departure", "Late-night arrival in Lahore"] },
    ],
    gallery: [sharda, kutton, keran],
  },
  {
    slug: "corporate-retreat-3-days",
    title: "3-Day Corporate Kashmir Retreat",
    short: "Team-building in the mountains with dedicated coordinators.",
    durationDays: 3,
    type: ["Corporate", "Group"],
    price: 18500,
    rating: 4.8,
    reviews: 63,
    image: muzaffarabad,
    destinations: ["Muzaffarabad", "Pir Chinasi", "Keran"],
    featured: false,
    nextDeparture: "On demand",
    transport: "Dedicated coaster with company branding option",
    accommodation: "2 nights — conference-friendly hotel",
    meals: "2 breakfasts + 2 dinners + hi-tea",
    included: [
      "Dedicated transport from Lahore office",
      "2 nights hotel with meeting space",
      "Team activity coordination",
      "Pir Chinasi viewpoint visit",
      "Group photography",
    ],
    notIncluded: ["Lunch", "AV equipment rental", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Lahore to Muzaffarabad", details: ["Morning departure", "Check-in & hi-tea", "Team session & dinner"] },
      { day: 2, title: "Pir Chinasi & Keran", details: ["Pir Chinasi sunrise viewpoint", "Drive to Keran", "Bonfire & team activities"] },
      { day: 3, title: "Return to Lahore", details: ["Breakfast & group photos", "Return journey to Lahore"] },
    ],
    gallery: [muzaffarabad, pirChinasi, keran],
  },
];

export interface Destination {
  name: string;
  description: string;
  image: string;
}

export const destinations: Destination[] = [
  { name: "Arang Kel", description: "A lush green meadow plateau above Kel — the postcard of Neelum Valley.", image: arangKel },
  { name: "Neelum River", description: "Turquoise waters winding 200km through the heart of the valley.", image: neelumRiver },
  { name: "Sharda", description: "Riverside town home to the ancient Sharda University ruins.", image: sharda },
  { name: "Ratti Gali Lake", description: "A glacial alpine lake at 12,130 ft, ringed by snow-capped peaks.", image: rattiGali },
  { name: "Taobat", description: "The last village of Neelum Valley — raw, remote and unforgettable.", image: taobat },
  { name: "Pir Chinasi", description: "Hilltop shrine with sweeping views over Muzaffarabad.", image: pirChinasi },
  { name: "Kutton Waterfall", description: "Multi-tiered falls thundering through Jagran Valley's forests.", image: kutton },
  { name: "Dhani Waterfall", description: "One of AJK's tallest waterfalls, misting the mountainside.", image: dhani },
];

export interface Review {
  name: string;
  initials: string;
  rating: number;
  review: string;
  trip: string;
}

export const reviews: Review[] = [
  {
    name: "Ahmed Raza",
    initials: "AR",
    rating: 5,
    review:
      "Booked the 5-day tour from Kalma Chowk. Coaster was comfortable, hotels were clean and our guide Bilal bhai managed everything perfectly. Arang Kel was beyond words.",
    trip: "5-Day Complete Kashmir Exploration",
  },
  {
    name: "Fatima & Usman",
    initials: "FU",
    rating: 5,
    review:
      "Our honeymoon trip was beautifully arranged — private riverside room in Keran, candle-light dinner, everything on time. Highly recommended for couples!",
    trip: "4-Day Kashmir Honeymoon Special",
  },
  {
    name: "Muhammad Bilal",
    initials: "MB",
    rating: 5,
    review:
      "Took the office team on the corporate retreat. Dedicated coaster, great food, and the Pir Chinasi sunrise was the highlight. Very professional management.",
    trip: "3-Day Corporate Kashmir Retreat",
  },
  {
    name: "Ayesha Khan",
    initials: "AK",
    rating: 4,
    review:
      "Traveled with two kids on the family retreat. Separate family rooms and patient guides made it stress-free. Kutton Waterfall was magical for the children.",
    trip: "5-Day Family Sharda & Kutton Retreat",
  },
  {
    name: "Hassan Javed",
    initials: "HJ",
    rating: 5,
    review:
      "Ratti Gali has been on my list for years. The 4x4 ride, the camping, the lake at sunrise — DillKash Kashmir nailed every detail. Worth every rupee.",
    trip: "7-Day Ultimate Adventure & Lakes Tour",
  },
  {
    name: "Sana Tariq",
    initials: "ST",
    rating: 5,
    review:
      "Weekend Neelum trip was smooth from pickup to drop-off. Transparent pricing — no surprise charges. Already planning Taobat with them next month!",
    trip: "3-Day Express Neelum Valley & Keran Tour",
  },
];

export const formatPKR = (amount: number) =>
  `PKR ${amount.toLocaleString("en-PK")}`;
