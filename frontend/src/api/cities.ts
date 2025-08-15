import { apiGet } from './client';

export type City = {
  slug: string;
  name: string;
  center: [number, number];
  bbox?: [[number, number], [number, number]];
  season?: string;
  country?: string;
};

export async function getCities(): Promise<City[]> {
  try {
    const data = await apiGet<unknown>('/cities');
    if (Array.isArray(data)) {
      return data as City[];
    }
    throw new Error('Invalid cities response');
  } catch {
    const res = await fetch('/data/cities.json');
    const data = await res.json();
    return Array.isArray(data) ? (data as City[]) : [];
  }
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const cities = await getCities();
  return cities.find((c) => c.slug === slug) || null;
}

export async function getCityZones(slug: string): Promise<any> {
  try {
    const data = await apiGet<any>(`/cities/${slug}/zones`);
    if (data && typeof data === 'object') return data;
    throw new Error('Invalid zones response');
  } catch {
    const res = await fetch(`/data/zones/${slug}.geojson`);
    return res.json();
  }
}

export async function getCityParkings(slug: string): Promise<Array<{ id: string; name: string; coords: [number, number] }>> {
  try {
    const data = await apiGet<unknown>(`/cities/${slug}/parkings`);
    if (Array.isArray(data)) return data as Array<{ id: string; name: string; coords: [number, number] }>;
    throw new Error('Invalid parkings response');
  } catch {
    const res = await fetch(`/data/parkings/${slug}.json`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
}


