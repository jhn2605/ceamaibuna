import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function generatePrompt(query, location, coords) {
    let locationInstruction;
    if (coords && coords.latitude && coords.longitude) {
        locationInstruction = `**ABSOLUTE RULE: ALL vendors/products MUST be available or have physical locations in the city identified from these coordinates: Latitude ${coords.latitude}, Longitude ${coords.longitude}.** First, identify the city from the coordinates, then search STRICTLY within that city.`;
    } else if (location) {
        locationInstruction = `**ABSOLUTE RULE: ALL vendors/products MUST be available or have physical locations in the specified city: "${location}".** You MUST find results EXCLUSIVELY for this area.`;
    } else {
        locationInstruction = "The user has not specified a location, so perform a general search for Romania.";
    }
    return `
You are a Senior MarketAnalyst for the Romanian publication "CeAmaiBuna.ro". Your expertise is in creating comprehensive, data-driven market reports for consumers. Your primary language for all user-facing text is Romanian.

Your task is to conduct a detailed market study for a specific product based on the user's query.
You MUST use Google Search to find up-to-date prices and product information.

The user's query is: "${query}".
${locationInstruction}

*CRITICAL RULES:*
1.  *ALL user-facing text values in the response fields MUST be in ROMANIAN.*
2.  *PRODUCT FOCUS:* Focus exclusively on variants of the requested product (different colors, storage sizes, official accessories etc.). Do NOT include competitor products from other brands.
3.  *RESPONSE FORMAT:* Your entire response MUST be a single JSON object enclosed in a markdown block (\\json ... \\). Do not add any text outside of it.

*JSON STRUCTURE:*
The JSON object must follow this structure:
\`json
{
  "categorySummary": "Un rezumat detaliat al categoriei de produse solicitate...",
  "marketStudy": [
    {
      "productName": "Numele complet și specific al variantei de produs.",
      "summary": "Un rezumat detaliat și obiectiv pentru această variantă...",
      "pros": ["Avantaj 1", "Avantaj 2"],
      "cons": ["Dezavantaj 1", "Dezavantaj 2"],
      "prices": [
        {
          "source": "Numele vânzătorului (ex: eMAG, Altex).",
          "price": "Prețul, inclusiv moneda (ex: '2.499,99 RON').",
          "sourceUrl": "URL-ul paginii principale a vânzătorului (ex: 'https://www.emag.ro')."
        }
      ]
    }
  ]
}
\`

*EXECUTION MANDATES:*
1.  *EMPTY STATE:* If you cannot find any relevant information after searching, provide a JSON object with an empty "marketStudy" array and a "categorySummary" explaining (in Romanian) why no data was found.
`;
}

function extractJson(text) {
    const markdownMatch = text.match(/json\s*([\s\S]*?)\s*$/);
    if (markdownMatch && markdownMatch[1]) {
        return markdownMatch[1].trim();
    }
    const firstBracket = text.indexOf('{');
    if (firstBracket === -1) {
        return null;
    }
    let openBrackets = 0;
    for (let i = firstBracket; i < text.length; i++) {
        if (text[i] === '{') openBrackets++;
        else if (text[i] === '}') openBrackets--;
        if (openBrackets === 0) {
            const potentialJson = text.substring(firstBracket, i + 1);
            try {
                JSON.parse(potentialJson);
                return potentialJson;
            } catch (e) {
                return null;
            }
        }
    }
    return null;
}

export async function performMarketResearch(query, location, coords) {
    const prompt = generatePrompt(query, location, coords);
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] }
    });
    const jsonString = extractJson(response.text);
    if (!jsonString) {
        throw new Error('AI-ul a returnat un răspuns gol sau într-un format nevalid.');
    }
    let parsedResult;
    try {
        parsedResult = JSON.parse(jsonString);
    } catch (e) {
        throw new Error('AI-ul a returnat un răspuns într-un format nevalid.');
    }
    if (!parsedResult || !Array.isArray(parsedResult.marketStudy)) {
        throw new Error('AI-ul a returnat date incomplete.');
    }
    return { ...parsedResult, queryFor: query };
}
