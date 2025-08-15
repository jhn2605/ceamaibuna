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
	const { category, coords } = req.body || {};
	if (!category) return buildError(res, 'Câmpul category este obligatoriu.', 400);
	// Nou: obligatoriu coordonate pentru a afișa DOAR rezultate locale (max 20km)
	if (!coords?.latitude || !coords?.longitude) {
		return buildError(res, 'Trebuie să permiți locația pentru a obține servicii locale (rază 20 km).', 400);
	}

	// Dicționar sinonime / alias-uri pentru categorii mai puțin standard (extensibil ușor)
	const CATEGORY_ALIASES = {
		'service it': [
			' service IT', 'service IT', 'service calculatoare', 'service laptop', 'reparatii laptop', 'reparatii calculatoare', 'repair computer', 'computer service'
		],
		'frizerie': ['frizerie', 'coafor', 'barber', 'barbershop'],
		'dentist': ['dentist', 'stomatolog', 'cabinet stomatologic']
	};
	// Normalizare categorie pentru lookup (lowercase, fără diacritice simple)
	const norm = (s)=> s.toLowerCase().normalize('NFD').replace(/[^\w\s]/g,'').replace(/\s+/g,' ').trim();
	const catKey = norm(category);
	let keywords = [category]; // păstrăm input original primul
	if (CATEGORY_ALIASES[catKey]) {
		// păstrăm ordine: original -> alias-uri
		CATEGORY_ALIASES[catKey].forEach(a=>{ if(!keywords.includes(a)) keywords.push(a); });
	}

	// If Google Places key is available, fetch real data first (broader, more forgiving logic for always-return)
	if (GOOGLE_PLACES_API_KEY) {
		const debugLog = (...args) => {
			// Minimal log noise – helps debug “rămâne pe loading” situații
			console.log('[local-services]', ...args);
		};
		try {
			let listings = [];
			// Nearby search cu raze progresive și mai multe cuvinte cheie (alias-uri) până la 20km
			const radii = [5000, 10000, 20000];
			let firstErrorStatus = null;
			for (const kw of keywords) {
				for (const r of radii) {
					const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=${r}&keyword=${encodeURIComponent(kw)}&language=ro&key=${GOOGLE_PLACES_API_KEY}`;
					const nearbyResp = await fetch(nearbyUrl);
					const nearbyJson = await nearbyResp.json();
					debugLog('kw', kw, 'radius', r, 'status', nearbyJson.status, 'results', nearbyJson.results?.length || 0);
					if (nearbyJson.status && !['OK','ZERO_RESULTS'].includes(nearbyJson.status)) {
						if (!firstErrorStatus) firstErrorStatus = { status: nearbyJson.status, message: nearbyJson.error_message };
						// Trecem la următorul keyword dacă status e fatal (REQUEST_DENIED etc.)
						if (['REQUEST_DENIED','INVALID_REQUEST'].includes(nearbyJson.status)) break;
					}
					listings.push(...(nearbyJson.results || []).map(p => ({ ...mapPlace(p, category), _kw: kw })));
					if (listings.length >= 25) break; // suficient
				}
				if (listings.length >= 25) break;
			}

			// Dacă nu am găsit nimic și există un status de eroare de la API, îl returnăm explicit
			if (listings.length === 0 && firstErrorStatus) {
				return buildError(res, `Google Places error: ${firstErrorStatus.status}${firstErrorStatus.message ? ' - ' + firstErrorStatus.message : ''}`, 502);
			}

			// Dacă după toate alias-urile nu avem rezultate → returnăm listă goală (UI va afișa mesaj)
			if (listings.length === 0) {
				return res.json({ listings: [] });
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

			// AI enrichment opțional păstrat doar pentru scurte rezumate (nu generăm liste fictive, păstrăm real local)
			if (ai) {
				try {
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
				} catch(e) { /* ignore enrichment errors */ }
			}

			debugLog('final dedup listings', dedup.length);
			return res.json({ listings: dedup });
		} catch (e) {
			console.error('Google Places fetch error', e);
			// continue to AI fallback below
		}
	}

	// AI fallback – limitat la 20km, doar dacă există AI (dacă nu, mesaj clar)
	if (!ai) return buildError(res, 'Nu s-au găsit rezultate reale și AI indisponibil pentru generare locală.', 500);
	const constraintPrompt = `Generează afaceri locale (max 15) pentru categoria "${category}" în jurul coordonatelor ${JSON.stringify(coords)}.
	Reguli:
	- Toate coordonatele la <20 km de utilizator.
	- rating 3.5-5.0, user_ratings_total 10-50000.
	- Fără dubluri.
	- JSON strict conform schemei.`;
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
