const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export interface GeoResult {
  lat: number;
  lng: number;
  displayName: string;
}

export async function geocodeCity(city: string, country: string): Promise<GeoResult | null> {
  try {
    const query = `${city}, ${country}`;
    const url = `${NOMINATIM_URL}?q=${encodeURIComponent(query)}&format=json&limit=1&accept-language=es`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'OurAdventureMap/1.0' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
  } catch {
    return null;
  }
}

export async function searchCities(query: string): Promise<Array<{ city: string; country: string; lat: number; lng: number }>> {
  if (query.length < 2) return [];
  try {
    const url = `${NOMINATIM_URL}?q=${encodeURIComponent(query)}&format=json&limit=5&accept-language=es&addressdetails=1`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'OurAdventureMap/1.0' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data
      .filter((r: any) => r.address)
      .map((r: any) => ({
        city: r.address.city || r.address.town || r.address.village || r.address.municipality || r.name || '',
        country: r.address.country || '',
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lon),
      }))
      .filter((r: any) => r.city);
  } catch {
    return [];
  }
}
