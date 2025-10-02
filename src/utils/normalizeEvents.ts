// src/utils/normalizeEvents.ts
import { Event } from "../types/Event";
import fsqData from "../../mock-data/foursquare.json";
import tmData from "../../mock-data/ticketmaster.json";
import yelpData from "../../mock-data/yelp.json";

export function getAllEvents(): Event[] {
  const fsqEvents: Event[] = fsqData.results.map((e) => ({
    id: e.fsq_id,
    name: e.name,
    description: e.description,
    startDate: e.event_date,
    endDate: e.event_end_date,
    category: e.categories?.[0]?.name,
    price: `$${e.price}`,
    imageUrl: e.photos?.[0]?.prefix + e.photos?.[0]?.suffix,
    venue: {
      name: e.name,
      address: e.location?.address,
      city: e.location?.locality,
      state: e.location?.region,
      country: e.location?.country,
      latitude: e.geocodes?.main?.latitude,
      longitude: e.geocodes?.main?.longitude,
    },
    source: "foursquare",
    url: e.venue_url,
  }));

  const tmEvents: Event[] = tmData._embedded.events.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.info,
    startDate: e.dates.start.dateTime,
    endDate: e.dates.end?.dateTime,
    category: e.classifications?.[0]?.segment?.name,
    price: e.priceRanges ? { min: e.priceRanges[0].min, max: e.priceRanges[0].max, currency: e.priceRanges[0].currency } : undefined,
    imageUrl: e.images?.[0]?.url,
    venue: {
      name: e._embedded.venues?.[0]?.name,
      address: e._embedded.venues?.[0]?.address?.line1,
      city: e._embedded.venues?.[0]?.city?.name,
      state: e._embedded.venues?.[0]?.state?.name,
      country: e._embedded.venues?.[0]?.country?.name,
      latitude: parseFloat(e._embedded.venues?.[0]?.location?.latitude),
      longitude: parseFloat(e._embedded.venues?.[0]?.location?.longitude),
    },
    source: "ticketmaster",
    url: e.url,
  }));

  const yelpEvents: Event[] = yelpData.events.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description,
    startDate: e.time_start,
    endDate: e.time_end,
    category: e.category,
    price: e.cost,
    imageUrl: e.image_url,
    venue: {
      name: e.business_id,
      address: e.location.address1,
      city: e.location.city,
      state: e.location.state,
      country: e.location.country,
      latitude: e.location.latitude,
      longitude: e.location.longitude,
    },
    source: "yelp",
    url: e.event_site_url,
  }));

  return [...fsqEvents, ...tmEvents, ...yelpEvents];
}