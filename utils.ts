import { type Coords } from "./types";

// Bounding box for Romania
const ROMANIA_BOUNDS = {
  minLat: 43.6,
  maxLat: 48.3,
  minLon: 20.2,
  maxLon: 29.7,
};

export function isCoordsInRomania(coords: Coords): boolean {
  if (!coords) return false;
  return (
    coords.latitude >= ROMANIA_BOUNDS.minLat &&
    coords.latitude <= ROMANIA_BOUNDS.maxLat &&
    coords.longitude >= ROMANIA_BOUNDS.minLon &&
    coords.longitude <= ROMANIA_BOUNDS.maxLon
  );
}

export function calculateDistance(coords1: Coords, coords2: Coords): number {
  if (!coords1 || !coords2) {
    return Infinity;
  }

  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.latitude)) *
      Math.cos(toRad(coords2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
}