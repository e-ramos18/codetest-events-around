import { makeAutoObservable, runInAction } from "mobx";
import { getEvents, Event } from "../services/apiService";

export class EventStore {
  events: Event[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchEvents = async () => {
    this.loading = true;
    this.error = null;

    try {
      const data = await getEvents();
      runInAction(() => {
        this.events = data;
        this.loading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "Failed to fetch events";
        this.loading = false;
      });
    }
  };

  get categorizedEvents() {
    const categories: Record<string, Event[]> = {};
    this.events.forEach((event) => {
      if (!categories[event.category]) {
        categories[event.category] = [];
      }
      categories[event.category].push(event);
    });
    return categories;
  }
}

// Singleton store
export const eventStore = new EventStore();