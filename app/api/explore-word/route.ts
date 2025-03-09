import { NextResponse } from "next/server";
//import { GoogleGenerativeAI } from "@google/generative-ai"
//import { generatePrompt } from "@/app/lib/words/wordUtils";

export async function POST(req: Request) {
  const { word, fromLang, type } = await req.json()

  if (!word) {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  try {
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // const prompt = generatePrompt(word, fromLang, request) 
    // `For the word "${word}" in the "${fromLang}" language:
    //   - Identify its part of speech in "${fromLang}".
    //   - Describe its most common usage context in "${fromLang}".
    //   - List word's form depend on language part in "${fromLang}".
    //   - Find three articles in "${fromLang}" where this word is used, providing direct links. 
    //     For each article, return the title, publication date, author, link and an image (if available).
    //   - Find three of the most popular songs that contain "${word}" in "${fromLang}" and provide direct links (preferably from YouTube or Spotify).
    //   - Find three of the most popular YouTube videos where "${word}" appears in the title, description, or transcript and provide direct links.

    //   Return the answer in the following structured JSON format:
    //   {
    //     "partOfLanguage": "",
    //     "context": "",
    //     "wordForms": [],
    //     "articlesLink": [{
    //       "title": "",
    //       "date": "",
    //       "author": "",
    //       "link": "",
    //       "image": '' // URL to article's image (if available)
    //     }, ...],
    //     "songsLink": ["", "", ""],
    //     "videosLink": ["", "", ""]
    //   }`

    //const result = await model.generateContent(prompt); 
    const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API;
    const searchEngineId = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID; 

    let query = word

    if (type === "articles") query += " site:news.google.com OR site:medium.com OR site:bbc.com OR site:techcrunch.com";
    if (type === "videos") query += " site:youtube.com inurl:watch?v= -inurl:channel -inurl:playlist";
    if (type === "songs") query += " song (site:youtube.com inurl:watch?v= -inurl:channel -inurl:playlist OR site:soundcloud.com OR site:deezer.com)";
  
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${searchEngineId}&key=${apiKey}&hl=${fromLang}&num=5`;
   
    const response = await fetch(url);
    const result = await response.json();

    console.log(result, ' result ')
    const regex = /^(.*?)\s*\.\.\./

    const articles = result.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      date: item.snippet.match(regex) ? item.snippet.match(regex)[1] : "No date available", 
      image: item.pagemap && item.pagemap.cse_image ? item.pagemap.cse_image[0].src : ''
    }));

    return NextResponse.json(articles)
  } catch(error) {
    console.error("AI API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }  
}