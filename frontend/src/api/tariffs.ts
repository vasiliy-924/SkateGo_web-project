import { apiGet } from './client';

export type Tariff = {
  id: string;
  title: string;
  start_price: number;
  per_minute: number;
  additional?: string;
};

export async function getTariffs(): Promise<Tariff[]> {
  try {
    const data = await apiGet<unknown>('/tariffs');
    if (Array.isArray(data)) return data as Tariff[];
    throw new Error('Invalid tariffs response');
  } catch {
    const res = await fetch('/data/tariffs.json');
    const data = await res.json();
    return Array.isArray(data) ? (data as Tariff[]) : [];
  }
}


