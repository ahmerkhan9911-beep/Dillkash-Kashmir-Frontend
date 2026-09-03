/**
 * Hotel data types, constants, and mock dataset for DillKash Kashmir.
 *
 * Used by both the public /hotels page (browsing + filtering)
 * and the admin /admin/hotels section (CRUD management).
 */

/* ─────────────────────── Types ─────────────────────── */

export interface Hotel {
  id: number;
  slug: string;
  name: string;
  location: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  pricePerNight: number;
  description: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  is_active: boolean;
}

/* ─────────────────────── Constants ─────────────────── */

export const HOTEL_LOCATIONS = [
  "Muzaffarabad",
  "Neelum Valley",
  "Arang Kel",
  "Sharda",
  "Taobat",
  "Keran",
  "Kutton",
  "Pir Chinasi",
] as const;

export const HOTEL_AMENITIES = [
  "WiFi",
  "Heater",
  "River View",
  "Parking",
  "Complimentary Breakfast",
  "Room Service",
  "Hot Water",
  "Generator Backup",
] as const;

export const STAR_OPTIONS = [5, 4, 3, 2, 1] as const;

/* ─────────────────────── Mock Data ─────────────────── */

export const mockHotels: Hotel[] = [
  /* ══════════ 5-Star Luxury ══════════ */
  {
    id: 1,
    slug: "pearl-continental-muzaffarabad",
    name: "Pearl Continental Muzaffarabad",
    location: "Muzaffarabad",
    starRating: 5,
    pricePerNight: 32000,
    description:
      "The crown jewel of Azad Kashmir hospitality. Perched above the Jhelum River with panoramic mountain views, PC Muzaffarabad offers world-class dining, a heated indoor pool, spa, and impeccable service that rivals the finest hotels in Islamabad.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    ],
    amenities: ["WiFi", "Heater", "River View", "Parking", "Complimentary Breakfast", "Room Service", "Hot Water", "Generator Backup"],
    featured: true,
    is_active: true,
  },
  {
    id: 2,
    slug: "neelum-valley-grand-resort",
    name: "Neelum Valley Grand Resort & Spa",
    location: "Neelum Valley",
    starRating: 5,
    pricePerNight: 28000,
    description:
      "An exclusive 5-star retreat nestled in the heart of Neelum Valley. Floor-to-ceiling windows frame the turquoise Neelum River, while luxury suites, a full-service spa, and gourmet Kashmiri cuisine make this the ultimate luxury escape.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    amenities: ["WiFi", "Heater", "River View", "Parking", "Complimentary Breakfast", "Room Service", "Hot Water", "Generator Backup"],
    featured: true,
    is_active: true,
  },

  /* ══════════ 4-Star ══════════ */
  {
    id: 3,
    slug: "keran-riverside-hotel",
    name: "Keran Riverside Hotel",
    location: "Keran",
    starRating: 4,
    pricePerNight: 15000,
    description:
      "A premium riverside hotel in the picturesque town of Keran, right at the Line of Control. Enjoy stunning views of the Neelum River, comfortable rooms with modern amenities, and authentic Kashmiri hospitality.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    ],
    amenities: ["WiFi", "Heater", "River View", "Parking", "Complimentary Breakfast", "Hot Water", "Generator Backup"],
    featured: false,
    is_active: true,
  },
  {
    id: 4,
    slug: "sharda-fort-view-hotel",
    name: "Sharda Fort View Hotel",
    location: "Sharda",
    starRating: 4,
    pricePerNight: 12500,
    description:
      "Overlooking the ancient Sharda Peeth ruins, this boutique 4-star property combines historical charm with modern comfort. The rooftop restaurant serves panoramic views alongside traditional Kashmiri wazwan.",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
    ],
    amenities: ["WiFi", "Heater", "Parking", "Complimentary Breakfast", "Room Service", "Hot Water", "Generator Backup"],
    featured: false,
    is_active: true,
  },
  {
    id: 12,
    slug: "keran-hilltop-retreat",
    name: "Keran Hilltop Retreat",
    location: "Keran",
    starRating: 4,
    pricePerNight: 14000,
    description:
      "A hidden gem above the town of Keran offering panoramic views of both sides of the LoC. Spacious rooms, a beautiful garden terrace, and warm Kashmiri chai served every evening.",
    images: [
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    ],
    amenities: ["WiFi", "Heater", "River View", "Parking", "Complimentary Breakfast", "Hot Water", "Generator Backup"],
    featured: true,
    is_active: true,
  },

  /* ══════════ 3-Star ══════════ */
  {
    id: 5,
    slug: "pine-top-lodge-kutton",
    name: "Pine Top Lodge",
    location: "Kutton",
    starRating: 3,
    pricePerNight: 8500,
    description:
      "Surrounded by towering pine forests in the serene Kutton Jagran valley, this comfortable lodge offers clean rooms, warm hospitality, and easy access to Kutton waterfall and local hiking trails.",
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
    ],
    amenities: ["Heater", "Parking", "Complimentary Breakfast", "Hot Water", "Generator Backup"],
    featured: false,
    is_active: true,
  },
  {
    id: 6,
    slug: "taobat-valley-inn",
    name: "Taobat Valley Inn",
    location: "Taobat",
    starRating: 3,
    pricePerNight: 7500,
    description:
      "At the last accessible point of the Neelum Valley, Taobat Valley Inn offers a cozy base for adventurers. Wake up to snow-capped peaks and crisp mountain air, just minutes from the Taobat bridge.",
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    ],
    amenities: ["Heater", "Parking", "Hot Water", "Generator Backup"],
    featured: false,
    is_active: true,
  },
  {
    id: 7,
    slug: "pir-chinasi-mountain-view",
    name: "Pir Chinasi Mountain View Hotel",
    location: "Pir Chinasi",
    starRating: 3,
    pricePerNight: 6800,
    description:
      "Perched along the winding road to Pir Chinasi summit, this 3-star hotel offers breathtaking views of Muzaffarabad city below and the Jhelum Valley. Popular with families and hikers alike.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    ],
    amenities: ["WiFi", "Heater", "Parking", "Hot Water", "Generator Backup"],
    featured: false,
    is_active: true,
  },

  /* ══════════ Budget ══════════ */
  {
    id: 8,
    slug: "neelum-backpackers-hostel",
    name: "Neelum Backpackers Hostel",
    location: "Neelum Valley",
    starRating: 2,
    pricePerNight: 3500,
    description:
      "Perfect for solo travelers and budget adventurers. Clean dorms and private rooms with shared kitchen facilities, a communal bonfire area, and the friendliest staff in the valley.",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    amenities: ["WiFi", "Hot Water", "Parking"],
    featured: false,
    is_active: true,
  },
  {
    id: 9,
    slug: "arang-kel-guest-house",
    name: "Arang Kel Traditional Guest House",
    location: "Arang Kel",
    starRating: 2,
    pricePerNight: 4000,
    description:
      "An authentic Kashmiri wooden guest house in the stunning hilltop village of Arang Kel. Simple rooms, home-cooked meals, and unmatched views of the valley — the real Kashmir experience.",
    images: [
      "https://images.unsplash.com/photo-1604014237256-11d475e2a2d8?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    ],
    amenities: ["Heater", "Complimentary Breakfast", "Hot Water"],
    featured: false,
    is_active: true,
  },
  {
    id: 10,
    slug: "muzaffarabad-city-lodge",
    name: "Muzaffarabad City Lodge",
    location: "Muzaffarabad",
    starRating: 2,
    pricePerNight: 2800,
    description:
      "A clean, affordable stay in the heart of Muzaffarabad city. Close to the bus stand, markets, and Red Fort. Ideal for travelers passing through or on a tight budget.",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    ],
    amenities: ["WiFi", "Hot Water", "Parking"],
    featured: false,
    is_active: true,
  },
  {
    id: 11,
    slug: "sharda-budget-inn",
    name: "Sharda Budget Inn",
    location: "Sharda",
    starRating: 1,
    pricePerNight: 2500,
    description:
      "The most affordable option in Sharda. Basic but clean rooms with shared bathroom facilities. A no-frills base for exploring Sharda Fort and the surrounding wilderness.",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1604014237256-11d475e2a2d8?w=800&q=80",
    ],
    amenities: ["Hot Water", "Parking"],
    featured: false,
    is_active: true,
  },
];
