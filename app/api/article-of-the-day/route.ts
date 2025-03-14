import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API;
    const searchEngineId = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID; 

    const query = `inurl:blog "English learning" OR "word of the day" OR "language tips" OR "vocabulary" site:dictionaryblog.cambridge.org OR site:babbel.com/en/magazine OR site:ef.com/wwen/blog`;

    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${searchEngineId}&key=${apiKey}`

    const response = await fetch(url);
    const result = await response.json();

    if (!result.items.length) {
      return NextResponse.json({ error: "No result" }, { status: 400 });
    }

    const randomNumber = Math.floor(Math.random() * 10);

    const item = result.items[randomNumber]

    const article = {
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      image: item.pagemap && item.pagemap.cse_image ? item.pagemap.cse_image[0].src : ''
    }

    return NextResponse.json(article)
  } catch(error) {
    console.error("AI API error word of the day:", error);
    return NextResponse.json({ error: "Failed to generate response word of the day" }, { status: 500 });
  }  
}
