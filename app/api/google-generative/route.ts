import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  const { word, fromLang, toLang, level } = await req.json()

  if (!word) {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Translate the word ${word} from ${fromLang} language to ${toLang} language. 
      Create two sentences with  ${word} word for ${level} level in english. 
      Add transcription for the word ${word}
      Add explanation for B2 level in ${fromLang} language. 
      Return answer in structure {translation: '', examples: {
      example1: '',
      example2: ''
    }, explanation, transcription: ''}`

    const result = await model.generateContent(prompt);

    console.log(result, ' result')
   
    return NextResponse.json({ result: result.response.text() })
  } catch(error) {
    console.error("AI API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }  
}