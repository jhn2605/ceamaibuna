import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import { performMarketResearch } from './aiMarketResearch.js';
// Endpoint AI pentru studiu de piață
app.post('/api/ai-market-research', async (req, res) => {
	const { query, location, coords } = req.body || {};
	if (!query) return res.status(400).json({ error: 'Câmpul query este obligatoriu.' });
	try {
		const result = await performMarketResearch(query, location, coords);
		return res.json(result);
	} catch (e) {
		return res.status(500).json({ error: e.message || 'Eroare AI.' });
	}
});

// Endpoint dummy pentru AdsBox (cu reclame/prețuri vechi)
app.get('/ads', (req, res) => {
	// Structură compatibilă cu AdsBox.tsx
	res.json([
		{
			businessUrl: 'https://www.emag.ro/samsung-galaxy-s22',
			duration: '30',
			createdAt: '2024-08-01',
			status: 'active',
			userId: 'emag-1'
		},
		{
			businessUrl: 'https://altex.ro/iphone-13',
			duration: '14',
			createdAt: '2024-07-20',
			status: 'active',
			userId: 'altex-2'
		},
		{
			businessUrl: 'https://pcgarage.ro/laptop-lenovo-ideapad-3',
			duration: '7',
			createdAt: '2024-08-15',
			status: 'active',
			userId: 'pcg-3'
		}
	]);
});

// Dummy fallback pentru prețuri reale, doar cu magazine din România și prețuri în lei
function buildMarketFallback(query) {
	const base = query.slice(0, 1).toUpperCase() + query.slice(1);
	const randomPrice = () => `${Math.floor(Math.random() * 2000) + 1000} RON`;
	const sample = [
		{
			productName: `${base}`,
			summary: `Ofertă reală pentru ${base} de la magazine din România.`,
			pros: ['Preț bun', 'Disponibilitate rapidă', 'Garanție inclusă'],
			cons: ['Stoc limitat', 'Preț variabil în funcție de sezon'],
			prices: [
				{ source: 'eMAG', price: randomPrice() },
				{ source: 'Altex', price: randomPrice() },
				{ source: 'PC Garage', price: randomPrice() },
				{ source: 'Vola', price: randomPrice() }
			]
		}
	];
	return { categorySummary: `Rezultate demonstrative pentru interogarea "${query}" (dummy local).`, marketStudy: sample };
}

const PORT = process.env.PORT || 5175;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
