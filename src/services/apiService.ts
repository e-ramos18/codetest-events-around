// src/services/ApiService.ts
import yelpData from "../../mock-data/yelp.json";
import ticketmasterData from "../../mock-data/ticketmaster.json";
import foursquareData from "../../mock-data/foursquare.json";

export type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  price: string;
  category: string;
  source: "Yelp" | "Ticketmaster" | "Foursquare";
  city: string;
  country: string;
  image?: string;
  url?: string;
};

export const getEvents = async (): Promise<Event[]> => {
  // Simulate async fetch
  await new Promise((res) => setTimeout(res, 500));

  const mapYelp: Event[] = yelpData.events.map((e: any) => ({
    id: `yelp-${e.id}`,
    title: e.name,
    startDate: e.time_start,
    endDate: e.time_end,
    price: e.cost || "Free",
    category: e.category,
    source: "Yelp",
    city: e.location.city,
    country: e.location.country,
    image: e.image_url,
    url: e.event_site_url,
  }));

  const mapTicket: Event[] = ticketmasterData._embedded.events.map((e: any) => ({
    id: `tm-${e.id}`,
    title: e.name,
    startDate: e.dates.start.dateTime || e.dates.start.localDate,
    endDate: e.dates.end?.dateTime,
    price: e.priceRanges
      ? `${e.priceRanges[0].currency} ${e.priceRanges[0].min}-${e.priceRanges[0].max}`
      : "Free",
    category: e.classifications[0]?.segment?.name || "Other",
    source: "Ticketmaster",
    city: e._embedded.venues[0].city.name,
    country: e._embedded.venues[0].country.name,
    image: e.images[0]?.url,
    url: e.url,
  }));

  const mapFsq: Event[] = foursquareData.results.map((e: any) => ({
    id: `fsq-${e.fsq_id}`,
    title: e.name,
    startDate: e.event_date,
    endDate: e.event_end_date,
    price: e.price ? `$${e.price}` : "Free",
    category: e.categories[0]?.name || "Other",
    source: "Foursquare",
    city: e.location.locality,
    country: e.location.country,
    image: e.photos[0]
      ? `${e.photos[0].prefix}${e.photos[0].width}x${e.photos[0].height}${e.photos[0].suffix}`
      : undefined,
    url: e.venue_url,
  }));

  return [...mapYelp, ...mapTicket, ...mapFsq];
};