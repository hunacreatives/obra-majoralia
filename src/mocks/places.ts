// Map places for the projects page. Only towns we actually know are listed;
// projects whose location is just "Philippines" stay off the map until the
// studio confirms where they are.
export const PLACES: Record<string, { lat: number; lng: number }> = {
  'Dipolog City': { lat: 8.5872, lng: 123.3409 },
  Katipunan: { lat: 8.5133, lng: 123.2836 },
  Loboc: { lat: 9.6333, lng: 124.0333 },
};

/** The known place for a project location string, or null if it isn't specific */
export const placeOf = (location: string): string | null =>
  Object.keys(PLACES).find(place => location.toLowerCase().includes(place.toLowerCase().split(' ')[0])) ?? null;
