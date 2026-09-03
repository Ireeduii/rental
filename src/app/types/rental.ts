export type Listing = {
  id: string;
  title: string;
  district: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  tag?: string;
  rating: number;
  reviews: number;
};

export const listings: Listing[] = [
  {
    id: "1",
    title: "Sunlit city apartment",
    district: "Sukhbaatar",
    address: "Peace Avenue, 8th khoroo",
    price: 2850000,
    beds: 2,
    baths: 1,
    area: 68,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    tag: "New this week",
    rating: 4.9,
    reviews: 18,
  },
  {
    id: "2",
    title: "Quiet home near the river",
    district: "Khan-Uul",
    address: "Japan Town, River Garden",
    price: 3200000,
    beds: 2,
    baths: 2,
    area: 74,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    tag: "Top rated",
    rating: 4.8,
    reviews: 31,
  },
  {
    id: "3",
    title: "Modern studio with a view",
    district: "Bayanzurkh",
    address: "13th khoroo, Narnii Zam",
    price: 1800000,
    beds: 1,
    baths: 1,
    area: 42,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    rating: 4.7,
    reviews: 12,
  },
  {
    id: "4",
    title: "Warm family residence",
    district: "Chingeltei",
    address: "4th khoroo, Seoul Street",
    price: 2500000,
    beds: 3,
    baths: 2,
    area: 91,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    tag: "Move-in ready",
    rating: 5,
    reviews: 9,
  },
];

export const formatMnt = (value: number) =>
  `${(value / 1000000).toFixed(1)}M ₮`;

// TODO: connect to API
export async function getFeaturedListings() {
  return listings;
}

export type FilterState = { district: string; maxPrice: number; beds: string };
