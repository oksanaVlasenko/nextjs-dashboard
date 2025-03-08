import isoCodes from '@/app/lib/languages-code-list.json'
import { ArticleType } from '../definitions';

export async function convertISO3toISO1(iso3: string): Promise<string | null> {
  const iso1 =  isoCodes.find((codes: any) => codes['alpha3-b'] === iso3)?.alpha2;
  return iso1 || null; 
} 

export const speakText = async (fromLang: string, word: string) => {
  const iso1 = await convertISO3toISO1(fromLang)
  const message = new SpeechSynthesisUtterance(word);
  message.lang = iso1 || "en";
  
  const voices = speechSynthesis.getVoices().filter(voice => voice.lang === iso1);
  message.voice = voices[0];

  speechSynthesis.speak(message);
}

export function isValidArticle(result: any): result is ArticleType {
  return (
    result &&
    typeof result.title === 'string' &&
    typeof result.date === 'string' &&
    typeof result.snippet === 'string' &&
    typeof result.link === 'string' &&
    (result.image === undefined || typeof result.image === 'string')
  );
}

export function isValidArticleArray(results: any): results is ArticleType[] {
  return Array.isArray(results) && results.every(isValidArticle);
}

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get("v");
  } catch {
    return null;
  }
}

export function generatePrompt(word: string, fromLang: string, request: string[]) {
  let prompt = `For the word "${word}" in the "${fromLang}" language:`;

  if (request.includes("partOfSpeech")) {
    prompt += `\n      - Identify its part of speech in "${fromLang}".`;
  }

  if (request.includes("context")) {
    prompt += `\n      - Describe its most common usage context in "${fromLang}".`;
  }

  if (request.includes("wordForms")) {
    prompt += `\n      - List word's form depend on language part in "${fromLang}".`;
  }

  if (request.includes("articles")) {
    prompt += `\n      Find three recourses available in "${fromLang}" where the word or phrase "${word}" is used. 
      Focus on well-known sources such as:
      - Google News
      - Medium
      - Wikipedia
      - BBC
      - TechCrunch

      For each article, provide the following:
      - The title of the article
      - The publication date
      - The author
      - A direct link to the article
      - An image (if available)

      Ensure that the articles are fully open to the public. 
      If no valid article can be found from these sources, suggest other publicly accessible resources.`;
  }

  if (request.includes("songs")) {
    prompt += `\n      - Find three of the most popular songs that contain "${word}" in "${fromLang}" and provide direct links (preferably from YouTube or Spotify).`;
  }

  if (request.includes("videos")) {
    prompt += `\n      - Find three of the most popular YouTube videos where "${word}" appears in the title, description, or transcript. Use YouTube Data API to get direct video links.`;
  }

  prompt += `\nReturn the answer in the following structured JSON format:
{
  "partOfLanguage": "",
  "context": "",
  "wordForms": [],
  "articlesLink": [{
    "title": "",
    "date": "",
    "author": "",
    "link": "",
    "image": '' // URL to article's image (if available)
  }, ...],
  "songsLink": ["", "", ""],
  "videosLink": ["", "", ""]
}`;

  return prompt;
}

