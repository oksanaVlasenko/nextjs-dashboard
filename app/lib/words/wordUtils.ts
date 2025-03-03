import isoCodes from '@/app/lib/languages-code-list.json'

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