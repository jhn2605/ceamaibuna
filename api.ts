// Client-side thin wrappers calling backend endpoints (server.js) so secret Gemini key stays server-side
import { type MarketResearchResult, type GooglePlaceListing, type Coords, type Review } from "./types";

const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:5175';

async function handleJsonResponse(res: Response, fallbackMessage: string) {
  let payload: any = null;
  try { payload = await res.json(); } catch {}
  if (!res.ok) {
    const msg = payload?.error || fallbackMessage;
    throw new Error(msg);
  }
  return payload;
}

export async function performMarketResearch(query: string, location: string, coords: Coords | null): Promise<MarketResearchResult> {
  try {
    const res = await fetch(`${API_BASE}/api/market-research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, location, coords })
    });
    const data = await handleJsonResponse(res, 'Eroare la server (market research).');
    return { ...data, queryFor: query };
  } catch (e) {
    console.error('[performMarketResearch] fetch error', e);
    throw e instanceof Error ? e : new Error('Eroare de rețea (market research).');
  }
}

export async function fetchLocalServices(category: string, coords: Coords | null): Promise<GooglePlaceListing[]> {
  if (category === 'Toate') return [];
  try {
    const res = await fetch(`${API_BASE}/api/local-services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, coords })
    });
    const { listings } = await handleJsonResponse(res, 'Eroare la server (local services).');
    return listings || [];
  } catch (e) {
    console.error('[fetchLocalServices] fetch error', e);
    throw e instanceof Error ? e : new Error('Eroare de rețea (local services).');
  }
}

export async function fetchGoogleReviews(listing: GooglePlaceListing): Promise<Review[]> {
  try {
    const res = await fetch(`${API_BASE}/api/google-reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: listing.name, vicinity: listing.vicinity })
    });
    const { reviews } = await handleJsonResponse(res, 'Eroare la server (reviews).');
    return reviews || [];
  } catch (e) {
    console.error('[fetchGoogleReviews] fetch error', e);
    throw e instanceof Error ? e : new Error('Eroare de rețea (reviews).');
  }
}