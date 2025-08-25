// --- Scraper modular pentru prețuri reale ---

import { fileURLToPath } from 'url';
import path from 'path';
const scraperPath = path.join(__dirname, 'scrapers', 'index.js');
let getRealPrices;
try {
	({ getRealPrices } = await import(scraperPath));
} catch (e) {
	getRealPrices = null;
	console.warn('Scraper module not found or failed to load:', e);
}

app.post('/api/real-prices', async (req, res) => {
	const { query } = req.body || {};
	if (!query) return buildError(res, 'Câmpul query este obligatoriu.', 400);
	if (!getRealPrices) return buildError(res, 'Scraper module indisponibil.', 500);
	try {
		const prices = await getRealPrices(query);
		if (!prices || prices.length === 0) {
			return res.json({ prices: [], message: 'Nu s-au găsit prețuri reale pentru acest produs.' });
		}
		return res.json({ prices });
	} catch (e) {
		return buildError(res, 'Eroare la extragerea prețurilor reale.');
	}
});

import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';

// ESM equivalent pentru __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (prefer .env.local if present, else fallback to .env)
if (fs.existsSync('.env.local')) {
	dotenv.config({ path: '.env.local' });
} else {
	dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!GEMINI_API_KEY) {
	console.warn('[AI] Missing GEMINI_API_KEY in environment. Endpoints will return 500.');
}

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Shared schemas (keep minimal subset – not importing TS types to keep server.js plain JS)
const marketResearchSchema = {
	type: Type.OBJECT,
	properties: {
		categorySummary: { type: Type.STRING },
		marketStudy: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { productName: { type: Type.STRING }, summary: { type: Type.STRING }, pros: { type: Type.ARRAY, items: { type: Type.STRING } }, cons: { type: Type.ARRAY, items: { type: Type.STRING } }, prices: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { source: { type: Type.STRING }, price: { type: Type.STRING } }, required: ['source','price'] } } }, required: ['productName','summary','pros','cons','prices'] } }
	},
	required: ['categorySummary','marketStudy']
};

const localServicesSchema = {
	type: Type.OBJECT,
	properties: { listings: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { place_id: { type: Type.STRING }, name: { type: Type.STRING }, category: { type: Type.STRING }, types: { type: Type.ARRAY, items: { type: Type.STRING } }, vicinity: { type: Type.STRING }, rating: { type: Type.NUMBER }, user_ratings_total: { type: Type.NUMBER }, coords: { type: Type.OBJECT, properties: { latitude: { type: Type.NUMBER }, longitude: { type: Type.NUMBER } } }, url: { type: Type.STRING }, website: { type: Type.STRING }, phone_number: { type: Type.STRING }, opening_hours: { type: Type.STRING }, detailed_opening_hours: { type: Type.ARRAY, items: { type: Type.STRING } }, business_status: { type: Type.STRING }, price_level: { type: Type.NUMBER }, editorial_summary: { type: Type.STRING } }, required: ['place_id','name','vicinity','rating','user_ratings_total'] } } },
	required: ['listings']
};

const googleReviewsSchema = {
	type: Type.OBJECT,
	properties: { reviews: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { author: { type: Type.STRING }, text: { type: Type.STRING }, rating: { type: Type.NUMBER } }, required: ['author','text','rating'] } } },
	required: ['reviews']
};

function buildError(res, message, status = 500) {
	return res.status(status).json({ error: message });
}

// Lightweight deterministic fallback (used if AI key missing or AI call fails)
function buildMarketFallback(query){
	const base = query.slice(0,1).toUpperCase() + query.slice(1);
	const sample = [
		{
			productName: `${base} Model A`,
			summary: `Variantă de bază pentru ${base}, evidențiază raport preț / valoare și fiabilitate corectă.`,
			pros: ['Preț accesibil', 'Consum redus', 'Disponibil pe scară largă'],
			cons: ['Funcții avansate limitate', 'Materiale medii'],
			prices: [
				{ source: 'eMAG', price: '499 RON' },
				{ source: 'Altex', price: '515 RON' }
			]
		},
		{
			productName: `${base} Pro`,
			summary: `Versiune orientată pe performanță cu specificații superioare și finisaj premium.`,
			pros: ['Performanță rapidă', 'Construcție solidă', 'Caracteristici suplimentare'],
			cons: ['Preț mai ridicat', 'Autonomie moderată'],
			prices: [
				{ source: 'eMAG', price: '899 RON' },
				{ source: 'PC Garage', price: '879 RON' }
			]
		},
		{
			productName: `${base} Ultra`,
			summary: `Gama superioară pentru ${base} cu accent pe longevitate și componente de top.`,
			pros: ['Cele mai bune performanțe', 'Durată de viață extinsă', 'Set complet de funcții'],
			cons: ['Cost foarte ridicat', 'Disponibilitate limitată'],
			prices: [
				{ source: 'Altex', price: '1299 RON' }
			]
		}
	];
	return { categorySummary: `Rezultate demonstrative pentru interogarea "${query}" (fallback local – AI indisponibil).`, marketStudy: sample };
}

app.post('/api/market-research', async (req, res) => {
	const { query, location, coords } = req.body || {};
	if (!query) return buildError(res, 'Câmpul query este obligatoriu.', 400);
	const coordText = coords && coords.latitude && coords.longitude ? `Lat ${coords.latitude}, Lon ${coords.longitude}` : 'fără coordonate';
	console.log(`[market-research] query="${query}" location="${location}" ${coordText}`);
	const prompt = `Ești un analist de piață profesionist. Realizează un studiu de piață complet pentru: "${query}" în zona ${location||'nespecificat'} (${coordText}).

Reguli stricte și obligatorii:
- Include minim 7 produse/branduri REALE, fiecare cu sumar, avantaje, dezavantaje, prețuri de la minim 3 magazine DIFERITE din România (ex: eMAG, Altex, PC Garage, Flanco, Dedeman, Carrefour, Auchan, evoMAG, Cel.ro, Media Galaxy, etc).
- PREȚURILE TREBUIE SĂ FIE REALE, ACTUALE (2025) și să existe pe site-urile magazinelor românești. NU folosi estimări, nu inventa prețuri, nu folosi surse internaționale.
- Pentru fiecare produs, menționează magazinele, prețul exact și dacă este promoție sau preț standard.
- NU include produse speculative, nelansate sau care nu există pe piața reală din România.
- Nu repeta aceleași magazine la toate produsele, diversifică sursele cât mai mult.
- La final, adaugă o scurtă analiză a trendurilor de preț, recomandări și ce branduri sunt cele mai populare.
- Nu inventa magazine care nu există în România.
- Returnează STRICT JSON conform schemei date (fără text suplimentar, fără explicații, fără text liber).
`;
	if (!ai) {
		return res.json(buildMarketFallback(query));
	}
	try {
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: prompt,
			config: { responseMimeType: 'application/json', responseSchema: marketResearchSchema, thinkingConfig: { thinkingBudget: 0 } }
		});
		const text = (response.text||'').trim();
		if (!text) {
			console.warn('[market-research] Răspuns gol – folosesc fallback.');
			return res.json(buildMarketFallback(query));
		}
		try {
			return res.json(JSON.parse(text));
		} catch(parseErr){
			console.warn('[market-research] JSON invalid din AI – fallback.', parseErr);
			return res.json(buildMarketFallback(query));
		}
	} catch (e) {
		console.error('Market research AI error', e);
		return res.json(buildMarketFallback(query));
	}
});

app.post('/api/local-services', async (req, res) => {
	const { category, coords } = req.body || {};
	if (!category) return buildError(res, 'Câmpul category este obligatoriu.', 400);

	// If Google Places key is available, fetch real data first (broader, more forgiving logic for always-return)
	if (GOOGLE_PLACES_API_KEY) {
		const debugLog = (...args) => {
			// Minimal log noise – helps debug “rămâne pe loading” situații
			console.log('[local-services]', ...args);
		};
		try {
			let listings = [];
			// 1. Nearby search with progressive radius expansion if user coords present
			if (coords?.latitude && coords?.longitude) {
				const radii = [5000, 10000, 20000, 35000];
				for (const r of radii) {
					const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=${r}&keyword=${encodeURIComponent(category)}&language=ro&key=${GOOGLE_PLACES_API_KEY}`;
					const nearbyResp = await fetch(nearbyUrl);
					const nearbyJson = await nearbyResp.json();
					debugLog('nearby radius', r, 'status', nearbyJson.status, 'results', nearbyJson.results?.length || 0);
					listings.push(...(nearbyJson.results || []).map(p => mapPlace(p, category)));
					if (listings.length >= 8) break; // enough local hits
				}
			}

			// 2. If still few, run text searches across major + secondary cities (ensures content for homepage "top")
			if (listings.length < 12) {
				const cities = [
					'Bucuresti','Cluj-Napoca','Timisoara','Iasi','Constanta','Brasov','Sibiu','Oradea','Craiova','Pitesti','Arad','Targu Mures'
				];
				for (const city of cities) {
					const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(category + ' in ' + city + ', Romania')}&language=ro&key=${GOOGLE_PLACES_API_KEY}`;
					const resp = await fetch(url);
					const data = await resp.json();
					debugLog('city search', city, 'status', data.status, 'results', (data.results||[]).length);
					const mapped = (data.results || []).slice(0, 4).map(r => mapPlace(r, category));
					listings.push(...mapped);
					if (listings.length >= 40) break; // cap to avoid overload
				}
			}

			// 3. If still empty, do a Romania-wide generic text search
			if (listings.length === 0) {
				const nationalUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(category + ' Romania')}&language=ro&key=${GOOGLE_PLACES_API_KEY}`;
				const nationalResp = await fetch(nationalUrl);
				const nationalJson = await nationalResp.json();
				debugLog('national search status', nationalJson.status, 'results', (nationalJson.results||[]).length);
				listings = (nationalJson.results || []).map(r => mapPlace(r, category));
			}

			// Deduplicate
			const dedupMap = {};
			for (const l of listings) { if (!dedupMap[l.place_id]) dedupMap[l.place_id] = l; }
			let dedup = Object.values(dedupMap);

			// Compute distance if coords provided (no hard filtering now to keep more results visible)
			if (coords?.latitude && coords?.longitude) {
				dedup.forEach(l => { if (l.coords) l.distance = haversineKm(coords.latitude, coords.longitude, l.coords.latitude, l.coords.longitude); });
			}

			// Sort: prioritize distance (if available) then rating then reviews
			dedup.sort((a,b) => {
				if (coords?.latitude && coords?.longitude) {
					const da = a.distance ?? 1e9; const db = b.distance ?? 1e9; if (da !== db) return da - db;
				}
				const rdiff = (b.rating ?? 0) - (a.rating ?? 0); if (rdiff) return rdiff;
				return (b.user_ratings_total ?? 0) - (a.user_ratings_total ?? 0);
			});

			// 4. AI enrichment OR (if still very few) AI synthetic fillers to reach a minimum
			if (ai) {
				try {
					if (dedup.length < 6) {
						// generate synthetic fillers (clearly flagged in editorial_summary)
						const fillerPrompt = `Generează 5 afaceri plauzibile din România pentru categoria "${category}" (JSON conform schemei) cu câmp editorial_summary care începe cu '[Sugerat]'.`;
						const resp = await ai.models.generateContent({
							model: 'gemini-2.5-flash',
							contents: fillerPrompt,
							config: { responseMimeType: 'application/json', responseSchema: localServicesSchema, thinkingConfig: { thinkingBudget: 0 } }
						});
						const txt = (resp.text||'').trim();
						if (txt) {
							const json = JSON.parse(txt);
							json.listings.forEach(l => { if (!dedupMap[l.place_id]) { dedupMap[l.place_id] = l; } });
							dedup = Object.values(dedupMap);
						}
					}
					// Short summaries for first 12 real listings without summary
					for (const l of dedup.slice(0,12)) {
						if (!l.editorial_summary) {
							try {
								const r = await ai.models.generateContent({
									model: 'gemini-2.5-flash',
									contents: `Frază scurtă (max 14 cuvinte) despre ${l.name} (${l.vicinity}). Ton obiectiv.` ,
									config: { responseMimeType: 'text/plain', thinkingConfig: { thinkingBudget: 0 } }
								});
								l.editorial_summary = (r.text||'').trim();
							} catch {}
						}
					}
				} catch(e) { /* enrichment non-critical */ }
			}

			debugLog('final dedup listings', dedup.length);
			return res.json({ listings: dedup });
		} catch (e) {
			console.error('Google Places fetch error', e);
			// continue to AI fallback below
		}
	}

	// AI fallback (less reliable). Constrain coordinates to Romania bounding box.
	if (!ai) return buildError(res, 'Nu există date reale (fără Google Places) și AI indisponibil.');
	const constraintPrompt = `Generează liste de afaceri locale reale-plauzibile în România pentru categoria "${category}".
	Reguli stricte:
	- Dacă se furnizează coordonate utilizator (${coords?JSON.stringify(coords):'none'}), pune primele rezultate la <25 km.
	- Coordonatele trebuie să fie în interiorul României (lat 43.6-48.3, lon 20.2-29.7).
	- rating între 3.5 și 5.0; user_ratings_total între 10 și 50000.
	- Fără dubluri.
	Output STRICT JSON conform schemei.`;
	try {
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: constraintPrompt,
			config: { responseMimeType: 'application/json', responseSchema: localServicesSchema, thinkingConfig: { thinkingBudget: 0 } }
		});
		const text = response.text.trim();
		if (!text) return buildError(res, 'Răspuns gol de la AI');
		const json = JSON.parse(text);
		// Distance filtering client side remains, but we can discard weird far points (>400km) if user coords
		if (coords?.latitude && coords?.longitude) {
			json.listings = (json.listings||[]).filter(l => l.coords && withinRomania(l.coords) &&
				haversineKm(coords.latitude, coords.longitude, l.coords.latitude, l.coords.longitude) <= 400);
		}
		return res.json(json);
	} catch (e) {
		console.error('AI fallback error', e);
		return buildError(res, 'Eroare la generarea fallback AI.');
	}
});

app.post('/api/google-reviews', async (req, res) => {
	if (!ai) return buildError(res, 'AI indisponibil (cheie lipsă).');
	const { name, vicinity } = req.body || {};
	if (!name || !vicinity) return buildError(res, 'name și vicinity obligatorii.', 400);
	const prompt = `Extrage până la 5 recenzii reprezentative (nume autor, text în română, rating numeric) pentru afacerea "${name}" la adresa "${vicinity}". STRICT JSON.`;
	try {
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: prompt,
			config: { responseMimeType: 'application/json', responseSchema: googleReviewsSchema, thinkingConfig: { thinkingBudget: 0 } }
		});
		const text = response.text.trim();
		if (!text) return buildError(res, 'Răspuns gol de la AI');
		return res.json(JSON.parse(text));
	} catch (e) {
		console.error('Google reviews AI error', e);
		return buildError(res, 'Eroare AI la generarea recenziilor.');
	}
});

// Servire frontend (build Vite) dacă există dist/ (pentru VPS un singur proces)
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
	app.use(express.static(distDir));
	app.get('*', (req, res) => {
		if (req.path.startsWith('/api/')) {
			return buildError(res, 'Endpoint inexistent.', 404);
		}
		return res.sendFile(path.join(distDir, 'index.html'));
	});
} else {
	console.warn('[STATIC] Folder dist/ lipsește – rulează `npm run build` pentru producție.');
}

const port = process.env.PORT || 5175;
app.listen(port, () => {
	console.log(`API server running on http://localhost:${port}`);
});

function mapPlace(r, category){
	return {
		place_id: r.place_id || `${r.name}-${r.formatted_address}`,
		name: r.name,
		category,
		vicinity: r.vicinity || r.formatted_address || '',
		rating: r.rating ?? null,
		user_ratings_total: r.user_ratings_total ?? null,
		coords: r.geometry?.location ? { latitude: r.geometry.location.lat, longitude: r.geometry.location.lng } : null,
		url: '',
		website: '',
		phone_number: '',
		opening_hours: r.opening_hours?.open_now != null ? (r.opening_hours.open_now ? 'Deschis acum' : 'Închis') : '',
		detailed_opening_hours: [],
		business_status: r.business_status,
		price_level: r.price_level ?? null,
		editorial_summary: ''
	};
}

function haversineKm(lat1, lon1, lat2, lon2){
	const R=6371; const toRad = d=>d*Math.PI/180; const dLat=toRad(lat2-lat1); const dLon=toRad(lon2-lon1); const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2; return 2*R*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

function withinRomania(c){
	return c.latitude>=43.6 && c.latitude<=48.3 && c.longitude>=20.2 && c.longitude<=29.7;
}
