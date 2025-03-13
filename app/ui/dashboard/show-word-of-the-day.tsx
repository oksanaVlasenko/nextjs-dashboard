import WordOfTheDay from "@/app/ui/learning/word-of-the-day";
import { getWordOfTheDay } from "@/app/lib/words/actions";
import { findWordOfTheDay } from "@/app/lib/words/data";

export default async function ShowWordOfTheDay() {
  const wordOfDay = await getWordOfTheDay()

  if (!wordOfDay) {
    return null
  }

  const wordExistInUser = await findWordOfTheDay(wordOfDay.word)

  return ( <WordOfTheDay data={wordOfDay} existInUser={wordExistInUser} /> )
}