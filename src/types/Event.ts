// src/types/Event.ts
export type Event = {
  id: string;
  name: string;
  description?: string;
  startDate: string;  // ISO string
  endDate?: string;   // ISO string
  category?: string;
  price?: string | { min: number; max: number; currency: string };
  imageUrl?: string;
  venue?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  source: "foursquare" | "ticketmaster" | "yelp";
  url?: string;
};