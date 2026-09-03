/**
 * Tour Guide type definitions and mock data for DillKash Kashmir.
 *
 * The `Guide` interface mirrors the future MySQL table schema so
 * swapping to real API responses is a drop-in replacement.
 */

export interface Guide {
  id: number;
  name: string;
  role: string;
  experience: number; // years
  bio: string;
  imageUrl: string;
  is_active: boolean;
}

/**
 * Realistic mock data — used by both the public About page and
 * the Admin dashboard until the backend API is wired up.
 */
export const mockGuides: Guide[] = [
  {
    id: 1,
    name: "Ali Raza",
    role: "Senior Guide",
    experience: 5,
    bio: "Born in Neelum Valley, Ali knows every hidden waterfall and scenic spot. His warm hospitality makes every group feel at home in the mountains.",
    imageUrl: "/assets/guide-ali-raza.jpg",
    is_active: true,
  },
  {
    id: 2,
    name: "Fatima Noor",
    role: "Cultural Specialist",
    experience: 4,
    bio: "Fatima brings Kashmir's rich heritage to life — from Sufi shrines in Sharda to local Kashmiri cuisine, she adds depth to every journey.",
    imageUrl: "/assets/guide-fatima-noor.jpg",
    is_active: true,
  },
  {
    id: 3,
    name: "Hassan Malik",
    role: "Trekking Expert",
    experience: 7,
    bio: "A certified mountaineer with 7 years on Kashmir's toughest trails. Hassan leads Ratti Gali and Baboon Valley expeditions with unmatched safety awareness.",
    imageUrl: "/assets/guide-hassan-malik.jpg",
    is_active: true,
  },
  {
    id: 4,
    name: "Bilal Ahmed",
    role: "Photography Guide",
    experience: 3,
    bio: "Part guide, part photographer — Bilal ensures you capture the best angles at Arang Kel, Keran Bridge and every sunset along the Neelum River.",
    imageUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop",
    is_active: true,
  },
];
