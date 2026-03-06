import { readFileSync } from "fs";
import { join } from "path";

interface GeoPoint {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  connection_count: number;
}

interface GeoStats {
  totalConnections: number;
  countriesServed: number;
  connectionsByCountry: Record<string, number>;
}

let cached: GeoStats | null = null;

export function getGeoStats(): GeoStats {
  if (cached) return cached;

  try {
    const filePath = join(process.cwd(), "public", "data", "geo_data.json");
    const raw = readFileSync(filePath, "utf-8");
    const points: GeoPoint[] = JSON.parse(raw);

    let totalConnections = 0;
    const byCountry: Record<string, number> = {};

    for (const p of points) {
      totalConnections += p.connection_count;
      byCountry[p.country] = (byCountry[p.country] || 0) + p.connection_count;
    }

    cached = {
      totalConnections,
      countriesServed: Object.keys(byCountry).length,
      connectionsByCountry: byCountry,
    };
    return cached;
  } catch {
    return {
      totalConnections: 0,
      countriesServed: 0,
      connectionsByCountry: {},
    };
  }
}
