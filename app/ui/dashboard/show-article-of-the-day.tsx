import { getArticleOfTheDay } from "@/app/lib/words/actions";
import MediaContent from "@/app/ui/words/media-content";
import { Tab } from "@/app/lib/definitions";

export default async function ShowArticleOfTheDay() {
  const article = await getArticleOfTheDay()
  
  if (!article) {
    return null
  }

  return ( <MediaContent article={article} type={Tab.articles} className="border-t-2 md:border-t-0" /> )
}