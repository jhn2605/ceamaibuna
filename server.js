import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Config valori implicite (se pot ajusta prin variabile de mediu)
const MAX_RADIUS_METERS = 20000; // 20km hard cap
const SEARCH_RADII = [4000, 8000, 12000, 20000];
const PAGE_LIMIT_PER_QUERY = 3; // maxim 3 pagini (Nearby/Search API)
const HARD_RESULT_LIMIT = 40; // nu întoarcem mai mult
const MIN_RATING = parseFloat(process.env.MIN_RATING || '3.5');
const MIN_REVIEWS = parseInt(process.env.MIN_REVIEWS || '5', 10);

// Mapare categorie -> Google Place types (extensibilă)
const CATEGORY_TYPE_MAP = {
	'hotel': ['lodging'],
	'cazare': ['lodging'],
	'restaurant': ['restaurant'],
	'cafenea': ['cafe'],
	'cafea': ['cafe'],
	'bar': ['bar'],
	'pub': ['bar'],
	'farmacie': ['pharmacy'],
	'medical': ['doctor','hospital'],
	'spital': ['hospital'],
	'dentist': ['dentist'],
	'service auto': ['car_repair'],
	'auto': ['car_repair'],
	'benzinarie': ['gas_station'],
	'salon': ['beauty_salon','hair_care'],
	'frizerie': ['hair_care','beauty_salon'],
	'cosmetica': ['beauty_salon'],
	'spa': ['spa'],
	'florarie': ['florist'],
	'supermarket': ['supermarket','grocery_or_supermarket'],
	'magazin': ['store'],
	'banca': ['bank'],
	'atm': ['atm'],
	'parcare': ['parking'],
	'gradinita': ['school'],
	'scoala': ['school'],
	'universitate': ['university'],
};

function normalizedCategory(cat){
	return (cat||'').toLowerCase().trim();
}

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
	const prompt = `Ești un analist de piață. Query: "${query}" Locație: ${location||'nespecificat'} (${coordText}). Returnează STRICT JSON conform schemei.`;
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
	const { category, coords, openNow } = req.body || {};
	if (!category) return buildError(res, 'Câmpul category este obligatoriu.', 400);
	if (!coords?.latitude || !coords?.longitude) {
		return buildError(res, 'Trebuie să permiți locația pentru a obține servicii locale (rază 20 km).', 400);
	}

	const debugLog = (...a) => console.log('[local-services]', ...a);
	const catNorm = normalizedCategory(category);
	const mappedTypes = CATEGORY_TYPE_MAP[catNorm] || [];
	const keywords = [catNorm]; // se pot adăuga sinonime viitor

	async function delay(ms){ return new Promise(r=>setTimeout(r, ms)); }

	async function fetchNearbyPaged({ lat, lng, radius, keyword, type }){
		const accum = [];
		let pageToken = null;
		for (let page=0; page < PAGE_LIMIT_PER_QUERY; page++) {
			const base = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
			base.searchParams.set('location', `${lat},${lng}`);
			base.searchParams.set('radius', radius.toString());
			base.searchParams.set('language', 'ro');
			if (openNow) base.searchParams.set('opennow','true');
			if (keyword) base.searchParams.set('keyword', keyword);
			if (type) base.searchParams.set('type', type);
			base.searchParams.set('key', GOOGLE_PLACES_API_KEY);
			if (pageToken) base.searchParams.set('pagetoken', pageToken);
			const url = base.toString();
			const resp = await fetch(url);
			const json = await resp.json();
			debugLog('nearby', { radius, type, keyword, status: json.status, got: json.results?.length || 0, page });
			if (json.results) accum.push(...json.results.map(r=>mapPlace(r, category)));
			if (!json.next_page_token) break;
			pageToken = json.next_page_token;
			await delay(1600); // necesar pentru activarea token-ului
		}
		return accum;
	}

	function deduplicateAndFilter(list){
		const byId = new Map();
		for (const l of list){
			// distanță + rating filter preliminar (dar păstrăm câteva dacă nu avem nimic)
			byId.set(l.place_id, l);
		}
		let arr = Array.from(byId.values());
		// Calculează distanța & elimină >20km
		arr.forEach(l=>{ if (l.coords) l.distance = haversineKm(coords.latitude, coords.longitude, l.coords.latitude, l.coords.longitude); });
		arr = arr.filter(l => l.distance == null || l.distance <= (MAX_RADIUS_METERS/1000));
		// Filtre rating / reviews, dar doar dacă avem suficient volum
		const prelim = arr.filter(l => (l.rating ?? 0) >= MIN_RATING && (l.user_ratings_total ?? 0) >= MIN_REVIEWS);
		if (prelim.length >= 8) arr = prelim; // altfel păstrăm și pe cele slabe
		// Sort principal: distanță, rating, reviews
		arr.sort((a,b)=>{
			const da = a.distance ?? 1e9; const db = b.distance ?? 1e9; if (da!==db) return da-db;
			const rdiff = (b.rating??0) - (a.rating??0); if (rdiff) return rdiff;
			return (b.user_ratings_total??0) - (a.user_ratings_total??0);
		});
		return arr.slice(0, HARD_RESULT_LIMIT);
	}

	let collected = [];

	if (GOOGLE_PLACES_API_KEY){
		try {
			for (const radius of SEARCH_RADII){
				// Queries by mapped types (more precise)
				for (const t of mappedTypes){
					const batch = await fetchNearbyPaged({ lat: coords.latitude, lng: coords.longitude, radius, type: t });
					collected.push(...batch);
				}
				// Keyword based (fallback)
				for (const kw of keywords){
					const batch = await fetchNearbyPaged({ lat: coords.latitude, lng: coords.longitude, radius, keyword: kw });
					collected.push(...batch);
				}
				collected = deduplicateAndFilter(collected);
				debugLog('after radius', radius, 'unique', collected.length);
				if (collected.length >= 25) break; // destule rezultate
			}
			if (collected.length === 0){
				return res.json({ listings: [] });
			}
			// AI enrichment (scurt) pe primele 12
			if (ai){
				for (const l of collected.slice(0,12)){
					if (!l.editorial_summary){
						try {
							const r = await ai.models.generateContent({
								model: 'gemini-2.5-flash',
								contents: `Frază scurtă (max 14 cuvinte) despre ${l.name} (${l.vicinity}). Ton obiectiv.`,
								config: { responseMimeType: 'text/plain', thinkingConfig: { thinkingBudget: 0 } }
							});
							l.editorial_summary = (r.text||'').trim();
						} catch {}
					}
				}
			}
			debugLog('final listings', collected.length);
			return res.json({ listings: collected });
		} catch (e){
			console.error('Google Places refined fetch error', e);
			// continuăm spre fallback AI
		}
	}

	// Fallback AI dacă nu avem cheie sau a eșuat apelul real
	if (!ai) return buildError(res, 'Nu s-au găsit rezultate reale și AI indisponibil.', 500);
	const constraintPrompt = `Generează până la 15 afaceri locale reale/plauzibile pentru categoria "${category}" în jurul coordonatelor ${JSON.stringify(coords)}.
Reguli:
- Toate coordonatele <20 km.
- rating 3.5-5.0, user_ratings_total 10-50000.
- Fără dubluri, JSON conform schemei.
Returnează doar JSON.`;
	try {
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: constraintPrompt,
			config: { responseMimeType: 'application/json', responseSchema: localServicesSchema, thinkingConfig: { thinkingBudget: 0 } }
		});
		const text = response.text.trim();
		if (!text) return buildError(res, 'Răspuns gol de la AI');
		const json = JSON.parse(text);
		json.listings = (json.listings||[]).filter(l => l.coords && withinRomania(l.coords) &&
			haversineKm(coords.latitude, coords.longitude, l.coords.latitude, l.coords.longitude) <= (MAX_RADIUS_METERS/1000));
		return res.json(json);
	} catch (e){
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
