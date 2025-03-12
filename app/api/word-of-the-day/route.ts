import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API;
  const searchEngineId = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID; 

  try {
    const date = new Date() 
    const formattedDate = date.toLocaleDateString()

    const query = `word of the day ${formattedDate} site:britannica.com/dictionary/eb/word-of-the-day`

    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${searchEngineId}&key=${apiKey}`

    const response = await fetch(url);
    const result = await response.json();

    if (!result.items.length) {
      return NextResponse.json({ error: "No result" }, { status: 400 });
    }

    const wordItem = extractWordOfTheDay(result.items[0].title) 

    return NextResponse.json(wordItem)
  } catch(error) {
    console.error("AI API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }  
}

function extractWordOfTheDay(title: string): string | null {
  const match = title.match(/^([\w-]+)\s-/); 
  return match ? match[1] : null;
}